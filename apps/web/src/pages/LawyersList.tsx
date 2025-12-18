import React, { useEffect, useState } from 'react';
import type { Lawyer } from '@lexhub/api-client/types';
import { getLawyers, swipeLawyer } from '@lexhub/api-client/lawyers';
import { Card, Button } from '@lexhub/ui';
import { Link } from 'react-router-dom';

export const LawyersList: React.FC = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getLawyers();
        setLawyers(data);
      } catch {
        // eslint-disable-next-line no-alert
        alert('טעינת עורכי הדין נכשלה');
      }
    };
    void load();
  }, []);

  const handleSwipe = async (liked: boolean) => {
    const lawyer = lawyers[currentIndex];
    if (!lawyer) return;
    try {
      await swipeLawyer(lawyer.id, liked);
      setCurrentIndex((prev) => prev + 1);
    } catch {
      // eslint-disable-next-line no-alert
      alert('שמירת הבחירה נכשלה');
    }
  };

  if (currentIndex >= lawyers.length) {
    return <p className="text-center mt-5">אין עוד עורכי דין להצגה</p>;
  }

  const lawyer = lawyers[currentIndex];

  return (
    <div className="d-flex justify-content-center mt-5" dir="rtl">
      <Card>
        <div className="text-center">
          <img
            src={lawyer.avatarUrl}
            alt={lawyer.name}
            className="img-fluid rounded-circle mb-3"
            style={{ width: 120, height: 120, objectFit: 'cover' }}
          />
          <h4>{lawyer.name}</h4>
          <p>{lawyer.specialties.join(', ')}</p>
          <p>
            טווח מחיר: ₪{lawyer.priceRange.min} - ₪{lawyer.priceRange.max}
          </p>
          <p>דירוג: {lawyer.rating.toFixed(1)} ⭐</p>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={() => void handleSwipe(false)}>
              לא מעוניינת
            </Button>
            <Button variant="primary" onClick={() => void handleSwipe(true)}>
              מתעניינת
            </Button>
          </div>
          <div className="mt-3">
            <Link to={`/lawyers/${lawyer.id}`} className="btn btn-outline-primary">
              פרופיל מלא
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LawyersList;


