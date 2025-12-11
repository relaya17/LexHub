# הוראות פרסום ב-Render

## שלבים לפרסום

### 1. הכנה
- וודא שהפרויקט נמצא ב-GitHub repository
- וודא שיש לך חשבון ב-[Render](https://render.com)
- הכן את כל משתני הסביבה הנדרשים

### 2. משתני סביבה נדרשים

#### עבור Backend (tastemate-api):
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/localchef
MONGODB_DB_NAME=localchef
JWT_SECRET=<מפתח סודי ארוך ומאובטח>
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
OPENAI_API_KEY=sk-...
```

#### עבור Frontend (tastemate-web):
```
VITE_API_URL=https://tastemate-api.onrender.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. פרסום דרך Render Dashboard

1. **התחבר לחשבון Render**
   - לך ל-https://dashboard.render.com

2. **צור Blueprint חדש**
   - לחץ על "New +" -> "Blueprint"
   - בחר את ה-Repository שלך מ-GitHub
   - Render יזהה את קובץ ה-`render.yaml` באופן אוטומטי

3. **הגדר משתני סביבה**
   - לאחר יצירת השירותים, לך לכל שירות והוסף את משתני הסביבה הנדרשים
   - Backend: tastemate-api
   - Frontend: tastemate-web

4. **עדכן את ה-VITE_API_URL**
   - לאחר שה-Backend עלה, העתק את ה-URL שלו
   - עדכן את `VITE_API_URL` ב-Frontend
   - פרסם מחדש את ה-Frontend

### 4. הגדרת MongoDB Atlas (אם אין לך)

1. לך ל-https://www.mongodb.com/cloud/atlas
2. צור Cluster חינמי
3. הוסף משתמש למסד הנתונים
4. אפשר גישה מכל ה-IPs (0.0.0.0/0)
5. קבל את ה-Connection String והעתק אותו ל-`MONGODB_URI`

### 5. הגדרת Stripe Webhook

1. לך ל-Stripe Dashboard -> Developers -> Webhooks
2. הוסף endpoint חדש: `https://tastemate-api.onrender.com/api/payments/webhook`
3. בחר Events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. העתק את ה-Webhook Secret והוסף ל-`STRIPE_WEBHOOK_SECRET`

### 6. בדיקה

לאחר הפרסום:
- בדוק שה-Backend עובד: `https://tastemate-api.onrender.com/health`
- בדוק שה-Frontend נטען: `https://tastemate-web.onrender.com`
- נסה להירשם ולהתחבר
- נסה להזמין מנה

## טיפים

- **Free Plan**: השירותים החינמיים ב-Render עוברים ל-Sleep mode לאחר 15 דקות של חוסר פעילות. הבקשה הראשונה תיקח ~30 שניות להתעורר.
- **Logs**: ניתן לראות logs בזמן אמת בעמוד השירות ב-Dashboard.
- **Auto-Deploy**: כל push ל-main branch יפרסם מחדש באופן אוטומטי.

## פתרון בעיות נפוצות

### השרת לא עולה
- בדוק את הלוגים ב-Render Dashboard
- וודא שכל משתני הסביבה מוגדרים
- וודא ש-MongoDB URI תקין

### Frontend לא מתחבר ל-Backend
- וודא ש-`VITE_API_URL` מכיל את ה-URL הנכון של ה-Backend
- וודא ש-CORS מאפשר גישה מה-Frontend domain

### תשלומים לא עובדים
- וודא ש-Stripe keys נכונים
- בדוק שה-Webhook מוגדר נכון
- בדוק את הלוגים ב-Stripe Dashboard

## פרטי קשר לתמיכה

אם יש בעיות, בדוק:
- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Stripe Docs: https://stripe.com/docs
