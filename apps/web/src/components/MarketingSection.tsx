import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MarketingSection: React.FC = () => {
  return (
    <section className="py-4 py-md-5 lexhub-hero" dir="rtl">
      <Container fluid="lg" className="px-3 px-md-4">
        <div className="mx-auto text-center" style={{ maxWidth: 920 }}>
          <p
            className="mb-2 text-center text-uppercase lexhub-hero__tagline"
            dir="ltr"
            style={{ color: 'var(--md-primary)', fontWeight: 700, letterSpacing: '0.06em' }}
          >
            Legal. Smart. Personal.
          </p>

          <h1
            className="mb-3 mb-md-4 text-center lexhub-hero__headline"
            style={{ color: 'var(--md-primary)', fontWeight: 800 }}
          >
            <span className="lexhub-hero__title">הדור הבא של השירותים המשפטיים</span>
          </h1>

          <p className="mb-3 mb-md-4 text-center lexhub-hero__lead" style={{ color: 'var(--md-text-body)' }}>
            המרכז החכם לשירותים משפטיים מותאמים אישית –
            <br />
            התאמה מדויקת בין לקוח לעורך דין, כתיבת מכתבים משפטיים ובדיקת חוזים, הכל במקום אחד וללא פגישות מיותרות.
          </p>

          {/* כפתורי CTA */}
          <div className="mx-auto" style={{ maxWidth: 680 }}>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center gap-md-3">
              <Link
                to="/lawyers"
                role="button"
                className="btn btn-success px-3 px-md-4 py-2 py-md-3 w-100 w-md-auto lexhub-hero__cta"
                aria-label="מצא עורך דין עכשיו"
              >
                מצא עורך דין עכשיו
              </Link>
              <Link
                to="/write-letter"
                role="button"
                className="btn btn-outline-success px-3 px-md-4 py-2 py-md-3 w-100 w-md-auto lexhub-hero__cta"
                aria-label="כתוב מכתב משפטי"
              >
                כתוב מכתב משפטי
              </Link>
              <Link
                to="/contract-review"
                role="button"
                className="btn btn-outline-success px-3 px-md-4 py-2 py-md-3 w-100 w-md-auto lexhub-hero__cta"
                aria-label="בדוק חוזה בקליק"
              >
                בדוק חוזה בקליק
              </Link>
            </div>
          </div>

          {/* איור/תמונה */}
          <div className="mt-3 mt-md-4 d-flex justify-content-center">
            <div
              className="d-flex align-items-center justify-content-center lexhub-hero__card lexhub-hero__previewCard"
              style={{
                borderRadius: '12px',
                padding: '1.5rem',
                maxWidth: '720px',
                width: '100%',
              }}
            >
              <div className="text-center w-100">
                <div className="d-flex justify-content-center mb-2">
                  <span style={{ fontSize: '3rem' }}>⚖️</span>
                </div>
                <h3 className="text-center h5 mb-2 lexhub-hero__cardTitle">שירותים משפטיים דיגיטליים</h3>
                <p className="text-center text-muted small mb-0">כל מה שצריך במקום אחד</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MarketingSection;

