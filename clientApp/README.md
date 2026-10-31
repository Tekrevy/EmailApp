# TekRevy Boilerplate NextJS App

A Next.js starter with authentication, forms, shadcn/ui, and MongoDB—everything you need to build a full-stack application.

## What's Included

- **Next.js 16** (App Router)
- **Authentication** – NextAuth v5 with credentials (email/password) and Google OAuth
- **Forms** – React Hook Form + Zod validation
- **UI** – shadcn/ui + Tailwind CSS v4 + Radix UI
- **Database** – MongoDB with Mongoose
- **Project Structure** – Website, auth (sign-in/sign-up), and protected application layouts

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google Cloud Console project (for Google OAuth)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure MongoDB

Update the MongoDB connection string in `lib/dbConnect.ts`:

- Replace the cluster host (`cluster0.xxxxx.mongodb.net`) with your MongoDB Atlas cluster URL
- The URI is built from env variables for user, password, and database name

### 3. Environment variables

Create a `.env` file in the project root with:

| Variable | Description |
|----------|-------------|
| `DB_USER` | MongoDB Atlas database user |
| `DB_PASSWORD` | MongoDB Atlas database password |
| `DB_NAME` | MongoDB database name |
| `NEXT_PUBLIC_APP_URL` | Your app URL (e.g. `http://localhost:3005`) |
| `VERCEL_URL` | Same as above for Vercel, or your production URL |
| `NEXTAUTH_URL` | Same as above (required by NextAuth) |
| `AUTH_SECRET` | Random string for NextAuth (generate with `openssl rand -hex 32`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_REDIRECT_URI` | Google OAuth redirect URI (e.g. `http://localhost:3005/api/calendar/callback`) |

**Example `.env`:**

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
NEXT_PUBLIC_APP_URL=http://localhost:3005
VERCEL_URL=http://localhost:3005
NEXTAUTH_URL=http://localhost:3005
AUTH_SECRET=your_auth_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3005/api/auth/callback/google
```

> **Note:** For Google OAuth, create credentials in [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and add `http://localhost:3005/api/auth/callback/google` to authorized redirect URIs.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

## Project Structure

```
app/
├── (website)/          # Public pages (e.g. landing)
├── (auth)/             # Auth pages: sign-in, sign-up, logout
├── (app)/              # Protected app area
│   ├── application/    # Main app layout and pages
│   └── (standalone)/   # Standalone routes (e.g. logged-in)
└── api/auth/           # NextAuth API routes

components/
├── auth/               # Sign-in, sign-up forms
├── application/        # App-specific components (header, etc.)
└── ui/                 # shadcn components

lib/                    # Utilities (dbConnect, utils)
models/                 # Mongoose models
providers/              # React context (theme, auth)
```

## Key Features

- **Sign up** – Create account with email/password
- **Sign in** – Email/password or Google
- **Protected routes** – Application area requires authentication
- **Theme** – Light/dark mode with next-themes

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3005 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |

## Deploy on Vercel

1. Push to GitHub and import in Vercel
2. Add all environment variables in Vercel project settings
3. Update `NEXT_PUBLIC_APP_URL`, `VERCEL_URL`, and `NEXTAUTH_URL` to your production URL
4. Add your production URL to MongoDB Atlas Network Access and Google OAuth redirect URIs
