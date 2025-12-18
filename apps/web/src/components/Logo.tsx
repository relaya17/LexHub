import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  height?: number | string;
  className?: string;
  showText?: boolean;
  /**
   * Wrap the logo with a react-router Link.
   * Use `null` when the parent already provides a Link (e.g. Navbar.Brand as={Link}).
   */
  linkTo?: string | null;
}

const Logo: React.FC<LogoProps> = ({ 
  height = 40, 
  className = '',
  showText = true,
  linkTo = '/'
}) => {
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;

  // משתמש ב-favicon.ico כלוגו (או logo.png אם קיים)
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  const fallbackLogoSrc = '/favicon.ico';

  const content = (
    <>
      <img 
        src={logoSrc}
        alt="LexHub Logo"
        className={showText ? "me-2" : ""}
        style={{ display: 'block', height: resolvedHeight, width: 'auto' }}
        onError={(e) => {
          // Fallback ל-favicon אם logo.png לא קיים
          const target = e.target as HTMLImageElement;
          const currentSrc = target.src.replace(window.location.origin, '');
          if (currentSrc !== fallbackLogoSrc) {
            setLogoSrc(fallbackLogoSrc);
          } else {
            // אם גם favicon לא עובד - מסתיר את התמונה
            target.style.display = 'none';
          }
        }}
      />
      {showText && (
        <span 
          className="fw-bold"
          style={{ 
            fontSize: '1.25rem',
            color: 'var(--md-primary)'
          }}
        >
          LexHub
        </span>
      )}
    </>
  );

  return (
    linkTo ? (
      <Link 
        to={linkTo} 
        className={`d-flex align-items-center text-decoration-none ${className}`}
        aria-label="LexHub - דף הבית"
      >
        {content}
      </Link>
    ) : (
      <span className={`d-flex align-items-center ${className}`}>
        {content}
      </span>
    )
  );
};

export default Logo;

