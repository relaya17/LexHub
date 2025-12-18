import React, { useState, memo, useEffect, useCallback } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import type { Lawyer } from '@lexhub/api-client/types';
import Card from './Card';
import Button from './Button';

export interface SwipeCardsProps {
  lawyers: Lawyer[];
  onSwipe: (lawyer: Lawyer, direction: 'right' | 'left') => void;
  onViewProfile?: (lawyer: Lawyer) => void;
}

export const SwipeCards: React.FC<SwipeCardsProps> = ({ lawyers, onSwipe, onViewProfile }) => {
  const [gone] = useState<Set<number>>(() => new Set());
  const [history, setHistory] = useState<number[]>([]);
  const [swipeDir, setSwipeDir] = useState<Record<number, 'left' | 'right' | null>>({});
  
  // מציאת הקלף הפעיל הנוכחי
  const getActiveIndex = useCallback(() => {
    return lawyers.length - 1 - history.length;
  }, [lawyers.length, history.length]);

  // תצורת Stack דינמי: קלפים נמוכים יותר קטנים מעט ומוטים
  const springTarget = (index: number) => ({
    x: 0,
    y: index * -10,
    scale: 1 - index * 0.04,
    rot: -10 + Math.random() * 20,
  });

  const springFrom = () => ({
    x: 0,
    y: -1000,
    scale: 1.5,
    rot: 0,
  });

  const [springs, api] = useSprings(lawyers.length, (index: number) => ({
    ...springTarget(index),
    from: springFrom(),
    config: { friction: 30, tension: 500 },
  }));

  const bind = useDrag((state) => {
    const {
      args: [index],
      active,
      movement: [mx, my],
      direction: [xDir],
      velocity: [vx],
    } = state;

    const trigger = Math.abs(vx) > 0.2;
    const dir = xDir < 0 ? -1 : 1;
    const currentIndex = index as number;

    if (!active && trigger && !gone.has(currentIndex)) {
      gone.add(currentIndex);
      setHistory((prev) => [...prev, currentIndex]);
      const direction: 'right' | 'left' = dir > 0 ? 'right' : 'left';
      setSwipeDir((prev) => ({ ...prev, [currentIndex]: direction }));
      onSwipe(lawyers[currentIndex], direction);
    }

    // עדכון כיוון swipe בזמן Drag
    if (active) {
      const currentDirection: 'left' | 'right' | null = mx > 50 ? 'right' : mx < -50 ? 'left' : null;
      setSwipeDir((prev) => ({ ...prev, [currentIndex]: currentDirection }));
    }

    // Stack דינמי: כל הקלפים מתעדכנים בזמן Drag
    api.start((i: number) => {
      const isGone = gone.has(i);
      const isActive = i === currentIndex;

      if (isActive) {
        // קלף פעיל - נמשך
        const x = isGone ? (window.innerWidth + 200) * dir : active ? mx : 0;
        const y = active ? my : i * -10;
        const rot = mx / 100 + (isGone ? dir * 10 * Math.abs(vx) : 0);
        const scale = active ? 1.05 : 1 - i * 0.04;
        return { x, y, rot, scale };
      } else if (active && i > currentIndex) {
        // קלפים שמתחת לקלף הפעיל - נעים מעט למעלה
        const liftAmount = Math.min(Math.abs(mx) * 0.1, 20);
        const y = i * -10 + liftAmount;
        const scale = 1 - i * 0.04 + liftAmount * 0.001;
        return { x: 0, y, rot: -10 + Math.random() * 20, scale };
      } else {
        // קלפים אחרים - חזרה למצב רגיל
        return springTarget(i);
      }
    });
  });

  const handleUndo = () => {
    const lastIndex = history[history.length - 1];
    if (lastIndex === undefined) return;
    gone.delete(lastIndex);
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setSwipeDir((prev) => ({ ...prev, [lastIndex]: null }));
    api.start((i: number) => {
      if (i !== lastIndex) return;
      return springTarget(i);
    });
  };

  const handleButtonSwipe = useCallback((direction: 'right' | 'left') => {
    const activeIndex = getActiveIndex();
    if (activeIndex < 0 || activeIndex >= lawyers.length) return;
    gone.add(activeIndex);
    setHistory((prev) => [...prev, activeIndex]);
    setSwipeDir((prev) => ({ ...prev, [activeIndex]: direction }));
    onSwipe(lawyers[activeIndex], direction);
    const dir = direction === 'right' ? 1 : -1;
    api.start((i: number) => {
      if (i !== activeIndex) return;
      return {
        x: (window.innerWidth + 200) * dir,
        rot: dir * 15,
        scale: 1,
      };
    });
  }, [getActiveIndex, lawyers, gone, onSwipe, api]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeIndex = getActiveIndex();
      if (activeIndex < 0 || activeIndex >= lawyers.length) return;

      // Arrow keys for swiping
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const direction = e.key === 'ArrowRight' ? 'right' : 'left';
        handleButtonSwipe(direction);
      }
      // Enter/Space for viewing profile
      else if ((e.key === 'Enter' || e.key === ' ') && onViewProfile) {
        e.preventDefault();
        onViewProfile(lawyers[activeIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getActiveIndex, lawyers, handleButtonSwipe, onViewProfile]);

  // פונקציה לקביעת צבע overlay לפי כיוון swipe
  const getOverlayColor = (index: number, mx: number): string => {
    const direction = swipeDir[index];
    if (direction === 'right') return 'rgba(40, 167, 69, 0.15)'; // ירוק
    if (direction === 'left') return 'rgba(220, 53, 69, 0.15)'; // אדום
    // בזמן Drag - צבע דינמי לפי מיקום
    if (mx > 50) return 'rgba(40, 167, 69, 0.1)'; // ירוק חלש
    if (mx < -50) return 'rgba(220, 53, 69, 0.1)'; // אדום חלש
    return 'transparent';
  };

  const activeIndex = getActiveIndex();
  const currentLawyer = activeIndex >= 0 && activeIndex < lawyers.length ? lawyers[activeIndex] : null;

  return (
    <div 
      className="position-relative w-100 d-flex justify-content-center align-items-center" 
      style={{ 
        height: '100%',
        minHeight: '480px',
        maxHeight: '600px'
      }}
      role="region"
      aria-label="חיפוש עורכי דין - החלק קלפים או השתמש בכפתורים"
      aria-live="polite"
      aria-atomic="true"
    >
      {currentLawyer && (
        <div className="sr-only" aria-live="polite">
          {`קלף ${activeIndex + 1} מתוך ${lawyers.length}: ${currentLawyer.name}, ${currentLawyer.specialties.join(', ')}`}
        </div>
      )}
      {springs.map(({ x, y, rot, scale }, index) => {
        const lawyer = lawyers[index];
        const isActive = index === activeIndex;
        const mx = typeof x.get === 'function' ? 0 : (x as unknown as number); // קריאת ערך מ-spring
        return (
          <animated.div
            key={lawyer.id}
            {...bind(index)}
            role="button"
            tabIndex={isActive ? 0 : -1}
            aria-label={`${lawyer.name}, ${lawyer.specialties.join(', ')}, עיר: ${lawyer.location.city}, מחיר החל מ-${lawyer.priceRange.min} שקלים, דירוג: ${lawyer.rating.toFixed(1)} מתוך 5`}
            aria-describedby={`lawyer-card-${lawyer.id}`}
            className="swipe-card"
            style={{
              position: 'absolute',
              width: '100%',
              maxWidth: '360px',
              cursor: 'grab',
              backgroundColor: '#FFFFFF',
              transform: interpolate(
                [x, y, rot, scale],
                (xVal, yVal, r, s) =>
                  `translate3d(${xVal}px,${yVal}px,0) rotate(${r}deg) scale(${s})`,
              ),
              boxShadow: interpolate(
                [scale],
                (s) => `0px ${s * 15}px ${s * 25}px rgba(0,0,0,0.15)`,
              ),
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Overlay צבעוני בזמן Swipe - Material Design Colors */}
            <animated.div
              className={swipeDir[index] === 'right' ? 'swipe-overlay-like' : swipeDir[index] === 'left' ? 'swipe-overlay-dislike' : ''}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: interpolate([x], (xVal: number) => {
                  const direction = swipeDir[index];
                  if (direction === 'right') return 'rgba(76, 175, 80, 0.25)'; // Material Green
                  if (direction === 'left') return 'rgba(244, 67, 54, 0.25)'; // Material Red
                  // בזמן Drag - צבע דינמי לפי מיקום
                  if (xVal > 50) return 'rgba(76, 175, 80, 0.15)'; // Material Green Light
                  if (xVal < -50) return 'rgba(244, 67, 54, 0.15)'; // Material Red Light
                  return 'transparent';
                }),
                pointerEvents: 'none',
                zIndex: 10,
                borderRadius: '16px',
              }}
            />
            <Card>
              <div className="text-center" id={`lawyer-card-${lawyer.id}`}>
                <img
                  src={lawyer.avatarUrl || '/default-avatar.png'}
                  alt={`תמונת פרופיל של ${lawyer.name}`}
                  className="img-fluid rounded-circle mb-3"
                  style={{ width: 120, height: 120, objectFit: 'cover' }}
                  loading="lazy"
                />
                <h5 className="text-center">{lawyer.name}</h5>
                <p className="mb-1">{lawyer.specialties.join(' • ')}</p>
                <p className="mb-1">
                  עיר: {lawyer.location.city}
                  <br />
                  מחיר למכתב החל מ־{lawyer.priceRange.min} ₪
                  <br />
                  דירוג: {lawyer.rating.toFixed(1)} / 5
                </p>
                {onViewProfile && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="mt-2"
                    aria-label={`צפה בפרופיל המלא של ${lawyer.name}`}
                    onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                      if (e) e.stopPropagation();
                      onViewProfile(lawyer);
                    }}
                  >
                    🔍 פרופיל מלא
                  </Button>
                )}
              </div>
            </Card>
          </animated.div>
        );
      })}

      <div 
        className="position-absolute bottom-0 mb-3 d-flex justify-content-center gap-2 gap-md-3 w-100 flex-wrap"
        role="toolbar"
        aria-label="פעולות על קלף עורך דין"
      >
        <Button 
          variant="danger" 
          onClick={() => handleButtonSwipe('left')}
          aria-label="לא רלוונטי - דחה קלף"
          disabled={activeIndex < 0}
          style={{ backgroundColor: '#E53935', border: 'none' }}
        >
          <span aria-hidden="true">❌</span> לא רלוונטי
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleUndo}
          aria-label="חזור לקלף הקודם"
          disabled={history.length === 0}
          style={{ backgroundColor: '#E0E0E0', color: '#000', border: 'none' }}
        >
          <span aria-hidden="true">⏪</span> חזרה
        </Button>
        <Button 
          variant="success" 
          onClick={() => handleButtonSwipe('right')}
          aria-label="מעניין - שמור קלף"
          disabled={activeIndex < 0}
          style={{ backgroundColor: '#4CAF50', border: 'none' }}
        >
          <span aria-hidden="true">❤️</span> מעניין
        </Button>
      </div>
      <div className="sr-only" role="status" aria-live="polite">
        {activeIndex >= 0 && currentLawyer 
          ? `קלף ${activeIndex + 1} מתוך ${lawyers.length}. השתמש בחצים לניווט, Enter לצפייה בפרופיל`
          : 'אין עוד קלפים'}
      </div>
    </div>
  );
};

// Memoization לשיפור ביצועים
export default memo(SwipeCards);


