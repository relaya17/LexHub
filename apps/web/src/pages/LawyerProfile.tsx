import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import type { Lawyer } from '@lexhub/api-client/types';
import {
  getLawyer,
  favoriteLawyer,
} from '@lexhub/api-client/lawyers';
import { Card, Button } from '@lexhub/ui';
import { useAppDispatch } from '../redux/hooks';
import {
  buildConversationId,
  ensureConversation,
  setActiveConversation,
} from '../redux/slices/chatSlice';

export const LawyerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [favorited, setFavorited] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setError('לא נמצא מזהה עו״ד בכתובת.');
      return;
    }
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getLawyer(id);
        setLawyer(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  const handleChat = async () => {
    if (!lawyer) return;

    // דמו: מזהה לקוח קבוע. בעתיד זה יגיע מהתחברות/Auth.
    const client = { id: 'client-demo', name: 'ישראל ישראלי' };
    const convId = buildConversationId(client.id, lawyer.id);

    dispatch(
      ensureConversation({
        conversationId: convId,
        lawyer: { id: lawyer.id, name: lawyer.name },
        client,
      }),
    );
    dispatch(setActiveConversation(convId));

    navigate(
      `/chat?as=client&conversationId=${encodeURIComponent(convId)}&lawyerId=${encodeURIComponent(
        lawyer.id,
      )}&lawyerName=${encodeURIComponent(lawyer.name)}`,
    );
  };

  const handleFavorite = async () => {
    if (!lawyer) return;
    try {
      await favoriteLawyer(lawyer.id);
      setFavorited(true);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert((err as Error).message);
    }
  };

  const handleSendLetter = () => {
    // TODO: ניווט למסך כתיבת מכתב עם קישור לעו״ד זה
    // eslint-disable-next-line no-alert
    alert('פתיחת כתיבת מכתב לעו״ד (דמו)');
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" aria-label="טוען פרופיל עו״ד" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-end">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!lawyer) {
    return (
      <Container className="mt-5">
        <Alert variant="info" className="text-end">
          פרופיל עו״ד לא נמצא.
        </Alert>
      </Container>
    );
  }

  const publications = lawyer.publications ?? [];

  return (
    <Container className="mt-5 d-flex justify-content-center" dir="rtl">
      <Card className="p-4" style={{ maxWidth: '520px', width: '100%' }}>
        <div className="text-center mb-3">
          <img
            src={lawyer.avatarUrl}
            alt={lawyer.name}
            className="img-fluid rounded-circle mb-3"
            style={{ width: 140, height: 140, objectFit: 'cover' }}
          />
          <h3 className="mb-1">{lawyer.name}</h3>
          <p className="mb-1">{lawyer.specialties.join(', ')}</p>
          <p className="mb-1">
            טווח מחיר: ₪{lawyer.priceRange.min} - ₪{lawyer.priceRange.max}
          </p>
          <p className="mb-1">דירוג: {lawyer.rating.toFixed(1)} ⭐</p>
          {lawyer.bio && <p className="mt-2">{lawyer.bio}</p>}
        </div>
        <div className="d-flex justify-content-between mb-3">
          <Button variant="primary" onClick={handleChat}>
            צ׳אט עם עו״ד
          </Button>
          <Button
            variant={favorited ? 'secondary' : 'outline'}
            onClick={handleFavorite}
          >
            {favorited ? 'שמורה' : 'שמור'}
          </Button>
          <Button variant="secondary" onClick={handleSendLetter}>
            שלח מכתב
          </Button>
        </div>
        <hr />
        <h5 className="text-center mb-3">פרסומים ומאמרים</h5>
        {publications.length === 0 ? (
          <p className="text-end text-muted">עדיין אין פרסומים להצגה.</p>
        ) : (
          <ul className="text-end">
            {publications.map((pub) => (
              <li key={pub.title}>
                {pub.url ? (
                  <a href={pub.url} target="_blank" rel="noreferrer">
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </Container>
  );
};

export default LawyerProfile;


