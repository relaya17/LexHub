import React from 'react';
import { Container } from 'react-bootstrap';

const Privacy: React.FC = () => {
  return (
    <main>
      <Container className="mt-5 mb-5" dir="rtl">
        <h1 className="mb-4 text-center">מדיניות פרטיות</h1>

        <h2 className="h4 mt-4 text-center">1. איזה מידע אנו אוספים?</h2>
        <ul>
          <li>פרטים אישיים (שם, כתובת דוא&quot;ל, פרטי התקשרות).</li>
          <li>מסמכים שהועלו (מכתבים, חוזים, קבצים נוספים).</li>
          <li>היסטוריית שיחות בין המשתמשים והעורכים.</li>
          <li>נתוני שימוש במערכת (כגון תדירות שימוש, פעולות שבוצעו).</li>
        </ul>

        <h2 className="h4 mt-4 text-center">2. איך המידע נשמר?</h2>
        <ul>
          <li>המידע נשמר במערכות אבטחה מתקדמות עם הצפנה.</li>
          <li>קיימת הפרדה לוגית בין נתוני משתמשים שונים.</li>
          <li>הגישה לנתונים מוגבלת לצוות מורשה בלבד ולפי צורך.</li>
        </ul>

        <h2 className="h4 mt-4 text-center">3. למי יש גישה למידע?</h2>
        <ul>
          <li>למשתמש עצמו, לחשבון ולמסמכים שלו.</li>
          <li>לעורך הדין שאליו הופנתה הבקשה (בהתאם להסכמה).</li>
          <li>לצוות המערכת לצורך תמיכה, אבטחה ותפעול השירות.</li>
        </ul>

        <h2 className="h4 mt-4 text-center">4. מחיקת מידע</h2>
        <ul>
          <li>ניתן לבקש מחיקה מלאה של חשבון ונתונים.</li>
          <li>המחיקה תתבצע בתוך פרק זמן סביר, בכפוף לחובות חוקיות.</li>
        </ul>

        <h2 className="h4 mt-4 text-center">5. עוגיות (Cookies) ו‑Tracking</h2>
        <ul>
          <li>השירות משתמש בעוגיות וטכנולוגיות דומות לצורך שיפור חוויית המשתמש.</li>
          <li>המידע משמש למדידת ביצועים, אבטחה והתאמת חוויית השימוש.</li>
        </ul>

        <h2 className="h4 mt-4 text-center">6. יצירת קשר</h2>
        <p>
          לכל שאלה בנוגע לפרטיות, ניתן לפנות אלינו דרך מסך <strong>&quot;צור קשר&quot;</strong>{' '}
          באפליקציה.
        </p>

        <p className="mt-4">
          <strong>שימו לב:</strong> המשך השימוש בפלטפורמת LexHub מהווה הסכמה מלאה
          לתנאי השימוש ולמדיניות הפרטיות.
        </p>
      </Container>
    </main>
  );
};

export default Privacy;


