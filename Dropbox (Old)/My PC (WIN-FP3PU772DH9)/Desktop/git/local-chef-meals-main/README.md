# TasteMate - Local Chef Meals

## תיאור הפרויקט

TasteMate היא פלטפורמה להזמנת ארוחות ביתיות איכותיות עם שף דיגיטלי AI שמסייע בבחירת מנות מותאמות אישית.

## מבנה הפרויקט (Monorepo)

```
local-chef-meals-main/
├── apps/
│   ├── web/          # Frontend (React + Vite)
│   └── server/       # Backend API (Express + MongoDB)
├── packages/
│   └── shared/       # קוד משותף
└── render.yaml       # קובץ הגדרות לפרסום ב-Render
```

## התקנה מקומית

דרישות:
- Node.js 18+
- pnpm 9.12.2+

### שלב 1: התקנת תלויות

```sh
# התקנת pnpm (אם אין לך)
npm install -g pnpm@9.12.2

# התקנת כל התלויות
pnpm install
```

### שלב 2: הגדרת משתני סביבה

צור קבצי `.env` בתיקיות המתאימות:

**apps/web/.env.local**
```
VITE_API_URL=http://localhost:2300
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**apps/server/.env**
```
PORT=2300
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=localchef
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
OPENAI_API_KEY=sk-...
```

ראה את הקבצים `ENV_SAMPLE.md` בכל תיקיה למידע נוסף.

### שלב 3: הרצה מקומית

```sh
# הרצת Frontend בלבד
pnpm dev:web

# הרצת Backend בלבד
pnpm dev:server

# הרצת שני השירותים ביחד
pnpm dev:all
```

- Frontend: http://localhost:5173
- Backend: http://localhost:2300

## טכנולוגיות

### Frontend
- **React 18** - ספריית UI
- **Vite** - Build tool
- **TypeScript** - שפת תכנות
- **Tailwind CSS** - עיצוב
- **shadcn/ui** - קומפוננטות UI
- **React Router** - ניווט
- **TanStack Query** - ניהול state מהשרת
- **Stripe** - תשלומים
- **Three.js** - אנימציות 3D

### Backend
- **Express** - Web framework
- **MongoDB** - מסד נתונים
- **JWT** - אימות
- **Stripe** - עיבוד תשלומים
- **OpenAI** - שף AI
- **TypeScript** - שפת תכנות

## פרסום Production

### פרסום ב-Render (מומלץ)

הפרויקט כולל קובץ `render.yaml` להקמה אוטומטית של שני שירותים:
- Backend API
- Frontend Static Site

**הוראות מפורטות:** ראה [RENDER_DEPLOY.md](./RENDER_DEPLOY.md)

**קיצור דרך:**
1. התחבר ל-[Render Dashboard](https://dashboard.render.com)
2. צור Blueprint חדש מה-Repository
3. הגדר את כל משתני הסביבה הנדרשים
4. השירותים יפורסמו אוטומטית

### Build ידני

```sh
# Build כל הפרויקט
pnpm build

# Build Frontend בלבד
pnpm build:web

# Build Backend בלבד
pnpm build:server
```

## פיצ'רים עיקריים

- 🎨 עיצוב מודרני ומותאם לעברית (RTL)
- 🤖 שף AI לייעוץ והמלצות מנות
- 🍽️ קטלוג מנות עשיר עם סינון וחיפוש
- 🛒 עגלת קניות ותהליך הזמנה חלק
- 💳 תשלומים מאובטחים עם Stripe
- 👤 ניהול משתמשים ופרופילים
- 📱 responsive - מותאם לכל המכשירים
- ♿ נגישות מלאה

## תמיכה ופתרון בעיות

- בעיות עם המסד נתונים - בדוק את המחרוזת ב-`MONGODB_URI`
- בעיות עם תשלומים - וודא שמפתחות Stripe נכונים
- שגיאות build - נקה את node_modules והתקן מחדש

## רישיון

פרטי
