## LexHub – פלטפורמה חכמה להתאמת לקוחות ↔ עורכי דין

Web + Mobile · React · React Native · TypeScript · AI · Node.js · MongoDB

### מה זה LexHub?

LexHub היא פלטפורמה משפטית מודרנית שמחברת בין אנשים שמחפשים פתרון משפטי
לבין עורכי דין רלוונטיים – בצורה פשוטה, חכמה ודיגיטלית.

המערכת מאפשרת:

- התאמה חכמה בין לקוח ↔ עורך דין (חוויית Swipe בסגנון Tinder)
- ✍️ כתיבת מכתבים משפטיים (AI + עו״ד)
- 📄 בדיקת חוזים באמצעות בינה מלאכותית (סיכום + סיכונים + סעיפים בעייתיים)
- 💬 צ׳אט מאובטח ושיתוף מסמכים
- 📁 ניהול מסמכים, היסטוריה, פרופילים ומועדפים

### קהל יעד

- **לקוחות**: אנשים פרטיים, עסקים קטנים, כל מי שצריך מכתב / בדיקת חוזה / ייעוץ משפטי מהיר.  
- **עורכי דין**: עצמאיים ומשרדים קטנים–בינוניים שרוצים לקוחות דיגיטליים ותהליך עבודה יעיל מרגע הפנייה ועד הסגירה.

### פלטפורמות נתמכות

| חלק | טכנולוגיה |
| --- | --- |
| Web | React + TypeScript + Bootstrap (RTL) |
| Mobile | React Native + TypeScript |
| Backend | Node.js + Express |
| DB | MongoDB (Atlas / מקומי) |
| Auth | JWT + Role-based access |
| AI | OpenAI / שירות NLP חיצוני (stub כרגע) |

---

## פיצ׳רים מרכזיים

### 🔍 התאמת עו״ד (Matching)

- חיפוש/סינון לפי:
  - תחום משפטי (עבודה, משפחה, חוזים, צרכנות ועוד)
  - מיקום (GPS / עיר)
  - טווח מחירים
  - דירוג
- הצגת עורכי דין ככרטיסים (Web + Mobile):
  - 👉 ימינה – מעוניין / מתעניינת
  - 👈 שמאלה – לא מתאים
- התאמה (Match) מובילה ל:
  - פתיחת צ׳אט
  - שיתוף מסמכים
  - התחלת עבודה (כתיבת מכתב / בדיקת חוזה / ייעוץ)

### ✍️ כתיבת מכתבים משפטיים

- בחירת סוג מכתב (עבודה, חובות, דיור, משפחה, כללי וכו׳)
- שאלות חכמות (QuestionFlow) מותאמות ללקוח
- יצירת טיוטת מכתב (DraftPreview) בצורה קריאה וברורה
- בחירה בין:
  - מכתב שנוצר ע״י AI (טיוטה כללית)
  - העברה לעו״ד לבדיקה/שכתוב
- שמירה, תיעוד והיסטוריה במסך “מסמכים” / “Letters”

### 📄 בדיקת חוזים (AI)

- העלאת חוזה או הדבקת טקסט חופשי
- ניתוח בעזרת שירות AI (כרגע שכבת stub):
  - סיכום חוזה בשפה פשוטה
  - זיהוי סעיפים בעייתיים / חסרים
  - הדגשת סיכונים וחוסר איזון בין הצדדים
- תצוגת:
  - סיכום (ContractSummary)
  - רשימת בעיות/סיכונים (ContractIssues)
- דיסקליימר משפטי ברור: הניתוח אינו ייעוץ משפטי מחייב.

### 💬 צ׳אט ושיתוף מסמכים

- צ׳אט בין לקוח ↔ עו״ד לכל Match
- אפשרות לצרף מסמכים (חוזים, מכתבים, נספחים)
- שמירת היסטוריית שיחות ומסמכים
- בסיס לצ׳אט מוצפן בעתיד

### 👤 פרופיל עורך דין

- תמונת פרופיל
- שם מלא + מספר רישיון (מודל מוכן, אימות ב־Admin)
- שנות ניסיון (להרחבה)
- תחומי התמחות (Tags)
- אזור פעילות + רדיוס / עיר
- טווח מחירים:
  - מכתב
  - בדיקת חוזה
  - ייעוץ
- דירוגים וחוות דעת (מודל מוכן להוספה)
- פרסומים / מאמרים משפטיים (publications)

---

## מבנה הפרויקט (Monorepo)

```text
lexhub/
├─ apps/
│  ├─ web/                # אפליקציית Web (React + TS + Bootstrap + RTL)
│  │  ├─ src/
│  │  │  ├─ pages/        # Home, WriteLetter, CheckContract, Lawyers, Profile, Chat, Documents
│  │  │  ├─ components/   # Navbar, Footer, WriteLetter flow, CheckContract flow, Cards וכו׳
│  │  │  ├─ layouts/      # Layout ראשי, Wrapper ל-Navbar/Footer
│  │  │  ├─ services/     # עטיפות ל-@lexhub/api-client
│  │  │  └─ styles/
│  │  └─ main.tsx / index.tsx
│  └─ mobile/             # אפליקציית Mobile (React Native + TS)
│     ├─ src/
│     │  ├─ screens/      # HomeScreen, WriteLetterScreen, ContractReviewScreen, LawyersSwipeScreen, LawyerProfileScreen וכו׳
│     │  ├─ components/   # Header/Footer, כרטיסים, טפסים
│     │  ├─ navigation/   # AppNavigator (Stack), TabNavigator (להרחבה)
│     │  └─ services/     # קריאות API ל-mobile (מבוססות api-client)
│     └─ App.tsx
│
├─ packages/
│  ├─ types/              # טיפוסים משותפים (User, Lawyer, Letter, Contract וכו׳)
│  ├─ api-client/         # קריאות API משותפות (createLetter, checkContractAI, getLawyers, matching וכו׳)
│  └─ ui/                 # קומפוננטות UI משותפות (Button, Card, Input)
│
├─ server/
│  ├─ src/
│  │  ├─ routes/          # auth, users, letters, contracts, lawyers, matching
│  │  ├─ controllers/     # לוגיקת HTTP (מופרדת מה-Express routes בקלות)
│  │  ├─ models/          # MongoDB Models (User, Lawyer, Letter, Contract, Match)
│  │  ├─ services/        # לוגיקה עסקית (AI stubs, Matching, Contract analysis)
│  │  └─ middleware/      # requireAuth, requireRole, errorHandler
│  └─ server.ts           # נקודת כניסה ל-Express
│
└─ README.md
```

---

## התקנה והרצה (למפתחים)

### דרישות מוקדמות

- Node.js 20+
- pnpm (מומלץ דרך Corepack)
- Docker + Docker Compose (לא חובה, אבל מומלץ להרצה מקומית עם MongoDB)
- MongoDB Atlas (אופציונלי) / MongoDB מקומי / MongoDB דרך Docker

### התקנת תלויות (Monorepo עם pnpm + Turborepo)

```bash
git clone <repo-url> lexhub
cd lexhub
corepack enable
pnpm install   # התקנת כל התלויות לכל ה-workspaces
```

### משתני סביבה (Server)

השרת קורא משתנים מקובץ `server/.env`. לא מעלים `.env` ל‑Git.

1) העתיקי את `server/env.example` ל־`server/.env` והחליפי סודות:

```bash
copy server\\env.example server\\.env
```

או ב‑mac/linux:

```bash
cp server/env.example server/.env
```

2) ודאי שב־`server/.env` מוגדרים לפחות:
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `WEB_ORIGIN=http://localhost:3019`
- `COOKIE_SECURE=false` (בלוקאל)

> אין להעלות `.env` ל־Git.

### הרצת השרת (Backend)

#### אופציה א׳: בלי Docker (MongoDB חיצוני / Atlas)

```bash
pnpm start:server
```

השרת מאזין על `http://localhost:6025`.

#### אופציה ב׳: עם Docker Compose (MongoDB + Server)

ברמת ה‑root:

```bash
docker compose up --build
```

> הערה: Windows תומך ב־`docker compose` (בלי מקף). אם אצלך מותקן `docker-compose` הישן, אפשר גם `docker-compose up --build`.

### הרצת Web

```bash
pnpm start:web
```

ה־Web מאזין על `http://localhost:3019`.

---

## Deploy (Vercel + Render)

### Render (Server)
- צרי שירות חדש ב‑Render מתוך הריפו.
- מומלץ להשתמש בקובץ `render.yaml` (ברמת ה‑root) שמגדיר Build/Start לשירות `lexhub-server`.
- הגדרי משתני סביבה (Render Dashboard → Environment):
  - **MONGODB_URI**: ה‑URI שלך ל‑Atlas
  - **JWT_SECRET**: סוד חזק
  - **JWT_REFRESH_SECRET**: סוד חזק (שונה)
  - **WEB_ORIGIN**: הדומיין של Vercel (למשל `https://YOUR_VERCEL_DOMAIN.vercel.app`)
  - **COOKIE_SECURE**: `true`
  - **COOKIE_SAMESITE**: `lax` (או `none` אם צריך cross-site cookies)

### Vercel (Web)
- צרי פרויקט חדש ב‑Vercel מתוך אותו ריפו.
- בחרי **Root Directory = `apps/web`**.
- ה‑Web ניגש ל‑API דרך `/api`.
- הקובץ `apps/web/vercel.json` מגדיר Rewrite:
  - `/api/*` → `https://lexhub-server.onrender.com/api/*`
  - SPA fallback → `/index.html`

חשוב: אם הדומיין ב‑Render שונה (לא `lexhub-server.onrender.com`), עדכני את ה‑destination בתוך `apps/web/vercel.json`.

---

## בדיקות (Server)

הבדיקות רצות עם Jest + Supertest.

```bash
pnpm --filter lexhub-server test
```

### בדיקות עם MongoDB ב‑Docker (סקריפט)

Windows (PowerShell):

```bash
pnpm test:server:docker:win
```

Linux/macOS (bash):

```bash
pnpm test:server:docker
```

הבדיקות תומכות בשתי אפשרויות:
- **Mongo In‑Memory** (ברירת מחדל לוקאלית)
- **Mongo אמיתי** אם מגדירים `MONGODB_URI_TEST` (כמו ב‑CI)

---

## CI/CD (GitHub Actions)

ה־Workflow נמצא ב־`.github/workflows/ci.yml` ומריץ בכל Push/PR ל־`main`:
- MongoDB service
- `pnpm install --frozen-lockfile`
- `pnpm --filter lexhub-server test`

---

### API (דוגמאות)

השרת מספק בין היתר:

- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/auth/me`, `POST /api/auth/refresh`, `POST /api/auth/logout`
- `GET /api/users/:id`
- `POST /api/letters`, `GET /api/letters/:id`
- `POST /api/contracts/check`
- `GET /api/lawyers`, `GET /api/lawyers/:id`

### הרצת Web + Mobile (באמצעות Turborepo)

ברמת ה-root:

```bash
pnpm dev     # מריץ dev ל-web + server (+ mobile כאשר יוגדר)
pnpm build   # build לכל החבילות והאפליקציות
```

ניתן גם להריץ כל אפליקציה בנפרד (לדוגמה, `apps/web`):

```bash
cd apps/web
pnpm dev
```

---

## אבטחה

- JWT Authentication
- **Role-based access** (Client / Lawyer / Admin)
- הצפנת מסמכים בצד השרת (ליישום בשלב הבא)
- Audit Logs לפעולות רגישות (התאמות, מסמכים, צ׳אט)
- אימות ידני של עורכי דין (מסגרת Admin)

---

## נגישות (A11y) ו‑RTL

- תמיכה מלאה ב־RTL (Web + Mobile)
- שימוש ב־labels לכל קלט טופס
- ניווט מקלדת (Web)
- תמיכה ב־Screen Readers (טקסטים ברורים, aria‑labels במקומות רלוונטיים)
- ניגודיות תקינה וצבעים מקצועיים (כחול/אפור/לבן)

---

## היבטים משפטיים (Legal)

- **תנאי שימוש** – LexHub אינה תחליף לייעוץ משפטי, האחריות המשפטית הסופית על העו״ד.
- **מדיניות פרטיות** – שמירת מידע מוצפן, ללא שיתוף מידע לצד ג׳, אפשרות מחיקה לפי בקשה.
- **שימוש ב‑AI** – AI מספק טיוטות ותובנות בלבד, לא ייעוץ מחייב.
- הסכמה מפורשת לפני העלאת מסמכים / שיתוף מידע רגיש.

---

## למה זה סטארטאפ אמיתי?

- **בעיה אמיתית** – חיבור בין לקוחות לבין עורכי דין הוא תהליך ידני, איטי ומבלבל.
- **UX מוכר** – חוויית התאמה בסגנון Tinder מקלה על בחירה ומרגישה מודרנית.
- **הכנסות ברורות** – תשלום לפי מכתב / חוזה / ייעוץ + מנויים ועמלות.
- **סקיילביליות** – Web + Mobile, מודל Multi‑tenant אפשרי, התאמות לפי מדינה/שפה.
- **AI כיתרון, לא כתחליף** – AI תומך בעו״ד, לא מחליף אותו.

---

## צעדים הבאים (Roadmap קצר)

- מערכת Matching חכמה (Location + Price + Rating + Specialty).
- דירוגים וחוות דעת ללקוחות ולעורכי דין.
- חיבור ל‑AI אמיתי (OpenAI / Claude) במקום שכבת ה‑stub.
- SEO מתקדם ל־Web (מטא‑דאטה, Sitemap, Schema.org).
- Analytics (התנהגות משתמשים, המרות, משפך כתיבת מכתב / התאמת עו״ד).

