# A Day to Remember

یک دعوت‌نامه عاشقانه تعاملی با Vue 3 و Node.js + MongoDB.

## ساختار پروژه

```
A-Day-to-Remember/
├── backend/          # Express + Mongoose
├── frontend/         # Vue 3 + Vite + Pinia
└── shared/
```

## پیش‌نیازها

- Node.js >= 26.12.1
- npm >= 12.2.1
- MongoDB در حال اجرا روی `mongodb://127.0.0.1:27017` (فقط اگر Backend را می‌خواهید)

## راه‌اندازی Frontend (اصلی برای Netlify)

```bash
cd frontend
npm install
npm run dev
```

فرانت روی `http://localhost:5173` اجرا می‌شود.

### استفاده با آیدی تلگرام پویا

لینک را به این شکل بسازید و برای طرف مقابل بفرستید:

```
https://your-netlify-site.netlify.app/?tg=YourTelegramUsername
```

مثال:
```
https://a-day-to-remember.netlify.app/?tg=Alireza_r_Azar
```

اگر `?tg=` وجود نداشته باشد، دکمه تلگرام غیرفعال می‌شود.

## راه‌اندازی Backend (اختیاری)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API روی `http://localhost:5000` اجرا می‌شود.

ثبت پاسخ دعوت فقط وقتی Backend در دسترس باشد انجام می‌شود. اگر فقط فرانت را روی Netlify دیپلوی کنید، بقیه قابلیت‌ها (انتخاب لوکیشن، تاریخ، خلاصه و تلگرام) بدون مشکل کار می‌کنند.

برای سایت منتشرشده، نام کاربری عمومی تلگرام را بدون `@` بعد از `?tg=` قرار دهید:

```
https://day-to-remember.netlify.app/?tg=YourTelegramUsername
```

مثال:

```
https://day-to-remember.netlify.app/?tg=Alireza_r_Azar
```

برای دعوت فرد دیگری، `Alireza_r_Azar` را با نام کاربری عمومی تلگرام او جایگزین کنید. شناسه عددی تلگرام برای این لینک مناسب نیست.
