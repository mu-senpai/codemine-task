
# Image Gallery

A modern, responsive Image Gallery web application built with:

- Next.js 15
- TypeScript
- Redux Toolkit
- Supabase (Database & Storage)
- Tailwind CSS
- Material UI (MUI)

This project allows users to upload, view, search, and delete images stored in Supabase with a clean and responsive UI.

---

## Features

### ✅ Core Features:
- Upload Images with Title & Tags
- Responsive Image Grid with Pagination
- Search Images by Title or Tags
- View Large Image in Modal
- Delete Images from Supabase Storage & Database
- Global State Management using Redux Toolkit
- Client-side caching & refetching using Redux

---

## Tech Stack

| Technology  | Purpose                          |
|-------------|----------------------------------|
| Next.js     | React Framework (App Router)    |
| TypeScript  | Type Safety                     |
| Supabase    | Backend (Database & Storage)    |
| Redux Toolkit | Global State Management        |
| Tailwind CSS | Utility First Styling           |
| MUI         | Prebuilt UI Components          |

---

## Project Structure

```
src/
├── app/
│   ├── components/        → Reusable Components
│   │   ├── ImageCard.tsx
│   │   ├── ImageGrid.tsx
│   │   ├── ImageModal.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── UploadModal.tsx
│   │   └── ThemeProvider.tsx
│   ├── globals.css         
│   ├── layout.tsx         → Root Layout
│   └── page.tsx           → Home Page
│
├── store/                 → Redux Store Setup
│   ├── imageSlice.ts      → Image State & Async Thunks
│   └── store.ts           → Store Configuration
│
├── utils/
│   └── supabaseClient.ts  → Supabase Client Instance

```

---

## Environment Variables

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gxlkycxomipjjephngyt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4bGt5Y3hvbWlwamplcGhuZ3l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2Mjg4MTQsImV4cCI6MjA2MDIwNDgxNH0.CqzODYNL_mJPUxEaDJ4KHz8sVGB3H6rAeUANN0vKtFg
```

---

## Installation & Running Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/image-gallery.git
cd image-gallery
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Deployment

Deploy easily on:
- Vercel (Recommended for Next.js)
- Netlify
- Supabase Hosting (Optional)

---

## Future Improvements

- User Authentication
- Image Category Support
- Infinite Scroll instead of Pagination
- Light/Dark Mode Switch
- Drag & Drop Image Reordering

---

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Material UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
