import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert, Card, Modal, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { MatchingFilters } from '@lexhub/types/matching';
import type { Lawyer } from '@lexhub/api-client/types';
import SwipeCards from '../components/SwipeCards';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchLawyers, swipeLawyer, undoSwipe, setFilters, resetFilters } from '../redux/slices/matchingSlice';
import type { RootState } from '../redux/store';
import { localStorageUtils } from '../utils/localStorage';

const DEFAULT_FILTERS: MatchingFilters = {
  specialties: [],
  maxDistanceKm: 50,
  availableNow: true,
};

const FindLawyer: React.FC = () => {
  const [filters, setLocalFilters] = useState<MatchingFilters>(DEFAULT_FILTERS);
  const [searchText, setSearchText] = useState<string>(() => {
    // טעינת חיפוש מ-localStorage
    return localStorageUtils.loadSearchText() || '';
  });
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const dispatch = useAppDispatch();
  const { lawyers, loading, error, filters: reduxFilters } = useAppSelector((state: RootState) => state.matching);
  const navigate = useNavigate();

  // טעינת עורכי דין בהתחלה
  useEffect(() => {
    void dispatch(fetchLawyers(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // שמירת חיפוש ב-localStorage
  useEffect(() => {
    if (searchText) {
      localStorageUtils.saveSearchText(searchText);
    } else {
      localStorageUtils.clearSearchText();
    }
  }, [searchText]);

  const handleFilterChange = (field: keyof MatchingFilters, value: string | boolean) => {
    setLocalFilters((prev: MatchingFilters) => {
      if (field === 'specialties') {
        return { ...prev, specialties: value ? [value as string] : [] };
      }
      if (field === 'maxPrice') {
        const num = value ? Number(value) : undefined;
        return { ...prev, maxPrice: Number.isNaN(num as number) ? undefined : num };
      }
      if (field === 'availableNow') {
        return { ...prev, availableNow: Boolean(value) };
      }
      return prev;
    });
  };

  const applyFilters = () => {
    void dispatch(fetchLawyers(filters));
  };

  // סינון עורכי דין לפי חיפוש טקסטואלי + פילטרים מ-Redux
  const filteredLawyers = useMemo(() => {
    let result = lawyers;

    // סינון לפי חיפוש טקסטואלי
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      result = result.filter(
        (lawyer: Lawyer) =>
          lawyer.name.toLowerCase().includes(searchLower) ||
          lawyer.specialties.some((spec: string) => spec.toLowerCase().includes(searchLower)) ||
          lawyer.location.city.toLowerCase().includes(searchLower),
      );
    }

    // סינון לפי פילטרים מ-Redux
    if (reduxFilters.specialization) {
      result = result.filter((lawyer: Lawyer) =>
        lawyer.specialties.some((spec: string) =>
          spec.toLowerCase().includes(reduxFilters.specialization!.toLowerCase()),
        ),
      );
    }

    if (reduxFilters.minRating !== undefined && reduxFilters.minRating > 0) {
      result = result.filter((lawyer: Lawyer) => lawyer.rating >= reduxFilters.minRating!);
    }

    if (reduxFilters.maxPrice !== undefined) {
      result = result.filter((lawyer: Lawyer) => lawyer.priceRange.min <= reduxFilters.maxPrice!);
    }

    if (reduxFilters.minPrice !== undefined) {
      result = result.filter((lawyer: Lawyer) => lawyer.priceRange.min >= reduxFilters.minPrice!);
    }

    return result;
  }, [lawyers, searchText, reduxFilters]);

  const handleUndo = () => {
    dispatch(undoSwipe());
  };

  const handleOpenProfile = useCallback((lawyer: Lawyer): void => {
    setSelectedLawyer(lawyer);
  }, []);

  const handleCloseProfile = useCallback((): void => {
    setSelectedLawyer(null);
  }, []);

  const handleNavigateToFullProfile = useCallback(
    (lawyer: Lawyer): void => {
      navigate(`/lawyers/${lawyer.id}`);
    },
    [navigate],
  );

  const handleSwipe = useCallback(
    (lawyer: Lawyer, direction: 'right' | 'left'): void => {
      const liked = direction === 'right';
      void dispatch(swipeLawyer({ lawyerId: lawyer.id, liked }));
    },
    [dispatch],
  );

  return (
    <main className="page-background">
      <Container className="mt-5" dir="rtl">
        <h2 className="mb-4 text-center">מצא/י עורך דין מתאים</h2>

        <Card className="mb-4 p-3">
          <Form>
            <Row className="g-2 mb-3">
              <Col md={12}>
                <Form.Label className="d-block text-end">חיפוש לפי שם, התמחות או עיר</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="הקלד שם, התמחות או עיר..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  aria-label="חיפוש עורכי דין"
                />
              </Col>
            </Row>
            <Row className="g-2">
              <Col md={3}>
                <Form.Label className="d-block text-end">תחום משפטי</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="הקלד התמחות..."
                  value={reduxFilters.specialization || ''}
                  onChange={(e) => dispatch(setFilters({ specialization: e.target.value || undefined }))}
                  aria-label="חיפוש התמחות"
                />
              </Col>
              <Col md={2}>
                <Form.Label className="d-block text-end">דירוג מינימום</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  placeholder="0"
                  value={reduxFilters.minRating || ''}
                  onChange={(e) =>
                    dispatch(
                      setFilters({
                        minRating: e.target.value ? Number(e.target.value) : undefined,
                      }),
                    )
                  }
                  aria-label="דירוג מינימום"
                />
              </Col>
              <Col md={2}>
                <Form.Label className="d-block text-end">מחיר מינימלי (₪)</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  placeholder="מינימום"
                  value={reduxFilters.minPrice || ''}
                  onChange={(e) =>
                    dispatch(
                      setFilters({
                        minPrice: e.target.value ? Number(e.target.value) : undefined,
                      }),
                    )
                  }
                  aria-label="מחיר מינימלי"
                />
              </Col>
              <Col md={2}>
                <Form.Label className="d-block text-end">מחיר מקסימלי (₪)</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  placeholder="מקסימום"
                  value={reduxFilters.maxPrice || ''}
                  onChange={(e) =>
                    dispatch(
                      setFilters({
                        maxPrice: e.target.value ? Number(e.target.value) : undefined,
                      }),
                    )
                  }
                  aria-label="מחיר מקסימלי"
                />
              </Col>
              <Col md={3} className="d-flex align-items-end justify-content-end gap-2">
                <Form.Check
                  type="checkbox"
                  label="זמינות עכשיו"
                  className="ms-3"
                  checked={Boolean(filters.availableNow)}
                  onChange={(e) => handleFilterChange('availableNow', e.target.checked)}
                />
                <Button variant="primary" onClick={applyFilters} disabled={loading}>
                  {loading ? <Spinner size="sm" /> : 'החל סינון'}
                </Button>
                <Button variant="outline-secondary" onClick={() => dispatch(resetFilters())} size="sm">
                  איפוס
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        {error && (
          <Alert variant="danger" className="text-end">
            אירעה שגיאה בטעינת עורכי הדין: {error}
          </Alert>
        )}

        {loading && lawyers.length === 0 && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status" aria-label="טוען עורכי דין" />
            <p className="mt-2">מחפשים עבורך התאמות…</p>
          </div>
        )}

        {!loading && filteredLawyers.length === 0 && lawyers.length > 0 && (
          <Alert variant="info" className="text-end">
            <Alert.Heading>לא נמצאו תוצאות</Alert.Heading>
            <p className="mb-0">
              לא נמצאו עורכי דין התואמים לחיפוש שלך. נסי לשנות את מילות החיפוש או את הפילטרים.
            </p>
          </Alert>
        )}

        {!loading && lawyers.length === 0 && !error && (
          <div className="text-center my-5 py-5">
            <p className="fs-5 text-muted mb-2">לא נמצאו עורכי דין מתאימים</p>
            <p className="text-muted">נסי לשנות את הסינון או לנסות שוב מאוחר יותר</p>
            <Button variant="outline-primary" onClick={applyFilters} className="mt-3">
              נסה שוב
            </Button>
          </div>
        )}

        {filteredLawyers.length > 0 && (
          <SwipeCards lawyers={filteredLawyers} onSwipe={handleSwipe} onViewProfile={handleOpenProfile} />
        )}

        <div className="text-center mt-3">
          <Button variant="outline-secondary" onClick={handleUndo}>
            ⏪ חזרה לקלף הקודם
          </Button>
        </div>
      </Container>

      {/* Modal לפרופיל מלא */}
      <Modal show={!!selectedLawyer} onHide={handleCloseProfile} size="lg" dir="rtl">
        <Modal.Header closeButton>
          <Modal.Title>{selectedLawyer?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLawyer && (
            <div className="text-end">
              <div className="text-center mb-3">
                <img
                  src={selectedLawyer.avatarUrl || '/default-avatar.png'}
                  alt={selectedLawyer.name}
                  className="img-fluid rounded-circle mb-2"
                  style={{ width: 120, height: 120, objectFit: 'cover' }}
                />
              </div>
              <p>
                <strong>תחומי התמחות:</strong>{' '}
                {selectedLawyer.specialties.map((spec: string, idx: number) => (
                  <Badge key={idx} bg="secondary" className="ms-1">
                    {spec}
                  </Badge>
                ))}
              </p>
              <p>
                <strong>מיקום:</strong> {selectedLawyer.location.city}
              </p>
              <p>
                <strong>טווח מחיר למכתב:</strong> ₪{selectedLawyer.priceRange.min} - ₪
                {selectedLawyer.priceRange.max}
              </p>
              <p>
                <strong>דירוג:</strong> {selectedLawyer.rating.toFixed(1)} / 5 ⭐
              </p>
              {selectedLawyer.bio && (
                <p>
                  <strong>אודות:</strong> {selectedLawyer.bio}
                </p>
              )}
              {selectedLawyer.publications && selectedLawyer.publications.length > 0 && (
                <div>
                  <strong>פרסומים:</strong>
                  <ul>
                    {selectedLawyer.publications.map((pub, idx) => (
                      <li key={idx}>
                        {pub.url ? (
                          <a href={pub.url} target="_blank" rel="noopener noreferrer">
                            {pub.title}
                          </a>
                        ) : (
                          pub.title
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProfile}>
            סגור
          </Button>
          {selectedLawyer && (
            <Button variant="primary" onClick={() => handleNavigateToFullProfile(selectedLawyer)}>
              פרופיל מלא
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default FindLawyer;


