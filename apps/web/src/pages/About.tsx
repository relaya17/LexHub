import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <main role="main" className="page-background">
      <Container className="my-5" dir="rtl">
        {/* כותרת ראשית */}
        <header className="text-center mb-5">
          <h1 className="mb-3">אודות LexHub</h1>
          <p className="lead">
            הפלטפורמה המשפטית החכמה שמשנה את הדרך שבה לקוחות ועורכי דין נפגשים
          </p>
        </header>

        {/* סעיף ראשי - מה אנחנו */}
        <section className="mb-5">
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4 p-md-5">
                  <h2 className="text-center mb-4">מי אנחנו?</h2>
                  <p className="text-center fs-5 mb-4">
                    LexHub היא פלטפורמה דיגיטלית חדשנית שמחברת בין לקוחות הזקוקים לשירותים משפטיים 
                    לבין עורכי דין מקצועיים ומובילים. אנחנו מאמינים שכל אחד זכאי לגישה קלה, מהירה 
                    ונוחה לשירותים משפטיים איכותיים.
                  </p>
                  <p className="text-center">
                    באמצעות טכנולוגיה מתקדמת ובינה מלאכותית, אנחנו יוצרים חוויית משתמש ייחודית 
                    שמפשטת תהליכים משפטיים מורכבים ומאפשרת לכל אחד לקבל את העזרה המשפטית שהוא צריך, 
                    מתי שהוא צריך, איפה שהוא נמצא.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* מה אנחנו מציעים */}
        <section className="mb-5">
          <h2 className="text-center mb-4">מה אנחנו מציעים?</h2>
          <Row className="g-4">
            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>📝</div>
                  <h4 className="mb-3">כתיבת מכתבים משפטיים</h4>
                  <p>
                    יצירת מכתבים משפטיים מקצועיים בעזרת בינה מלאכותית או עורכי דין מומחים. 
                    פשוט, מהיר ויעיל.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>📄</div>
                  <h4 className="mb-3">בדיקת חוזים עם AI</h4>
                  <p>
                    העלו כל חוזה וקבלו ניתוח מפורט, זיהוי סיכונים והמלצות מקצועיות 
                    תוך דקות ספורות.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>👨‍⚖️</div>
                  <h4 className="mb-3">מציאת עורך דין מתאים</h4>
                  <p>
                    חיפוש חכם של עורכי דין לפי התמחות, מיקום, דירוג ומחיר. 
                    מצאו את עורך הדין המושלם עבורכם.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>💬</div>
                  <h4 className="mb-3">צ'אט ישיר עם עורכי דין</h4>
                  <p>
                    תקשורת ישירה ונוחה עם עורכי הדין שלכם. שאלו שאלות, קבלו תשובות 
                    וקבלו ייעוץ מקצועי בזמן אמת.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>📁</div>
                  <h4 className="mb-3">ניהול מסמכים מאובטח</h4>
                  <p>
                    שמירה מאובטחת של כל המסמכים המשפטיים שלכם במקום אחד. 
                    גישה קלה, שמירה אוטומטית והצפנה מלאה.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>🔒</div>
                  <h4 className="mb-3">אבטחה ופרטיות מקסימלית</h4>
                  <p>
                    כל המידע שלכם מוגן בהצפנה מתקדמת. אנחנו מחויבים לשמירה על פרטיותכם 
                    ואבטחת המידע שלכם.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* למה לבחור בנו */}
        <section className="mb-5">
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4 p-md-5">
                  <h2 className="text-center mb-4">למה לבחור ב-LexHub?</h2>
                  <Row className="g-4">
                    <Col xs={12} md={6}>
                      <div className="text-center text-md-end">
                        <h5 className="mb-3">⚡ מהירות ונוחות</h5>
                        <p>
                          קבלו שירותים משפטיים תוך דקות, ללא צורך בנסיעות או תורים. 
                          הכל מהבית או מהמשרד שלכם.
                        </p>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div className="text-center text-md-end">
                        <h5 className="mb-3">💰 מחירים שקופים</h5>
                        <p>
                          רואים את המחירים מראש, ללא הפתעות. השוואת מחירים בין עורכי דין 
                          ומציאת המחיר הטוב ביותר עבורכם.
                        </p>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div className="text-center text-md-end">
                        <h5 className="mb-3">⭐ עורכי דין מובילים</h5>
                        <p>
                          רשת של עורכי דין מקצועיים ומובילים בתחומם, עם דירוגים וביקורות 
                          אמיתיות מלקוחות קודמים.
                        </p>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div className="text-center text-md-end">
                        <h5 className="mb-3">🤖 טכנולוגיה מתקדמת</h5>
                        <p>
                          שימוש בבינה מלאכותית מתקדמת לניתוח מסמכים, כתיבת מכתבים 
                          וסיוע משפטי ראשוני.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* חזון */}
        <section className="mb-5">
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="border-0 bg-primary text-white">
                <Card.Body className="p-4 p-md-5 text-center">
                  <h2 className="mb-4">החזון שלנו</h2>
                  <p className="fs-5 mb-0">
                    אנחנו שואפים להפוך את השירותים המשפטיים לנגישים, שקופים ונוחים לכל אחד. 
                    אנחנו מאמינים שכל אדם, ללא קשר למיקומו או מצבו הכלכלי, זכאי לגישה לשירותים 
                    משפטיים איכותיים. LexHub היא הדרך שלנו להביא את העתיד המשפטי להווה.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* קריאה לפעולה */}
        <section className="text-center">
          <h2 className="mb-4">מוכנים להתחיל?</h2>
          <p className="lead mb-4">
            הצטרפו לאלפי לקוחות ועורכי דין שכבר משתמשים ב-LexHub
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="/write-letter" className="btn btn-primary btn-lg">
              כתוב מכתב משפטי
            </a>
            <a href="/lawyers" className="btn btn-outline-primary btn-lg">
              מצא עו״ד
            </a>
            <a href="/contract-review" className="btn btn-outline-primary btn-lg">
              בדוק חוזה
            </a>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default About;

