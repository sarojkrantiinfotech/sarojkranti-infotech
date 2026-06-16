# Deployment Guide for Saroj Kranti Infotech

This project is built with Next.js 15, Prisma, and Tailwind CSS. Follow these steps to deploy it to production.

## 1. Database Setup (Neon PostgreSQL)
1. Create a free account at [Neon.tech](https://neon.tech).
2. Create a new project and get your `DATABASE_URL`.
3. Add this URL to your environment variables.

## 2. Environment Variables
Setup the following variables in your hosting provider (Vercel, Railway, etc.):
```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secure_random_string"
NEXTAUTH_SECRET="your_secure_random_string"
NEXTAUTH_URL="https://yourdomain.com"
```

## 3. Prisma Setup
Run the following commands to initialize your database:
```bash
npx prisma generate
npx prisma db push
```

## 4. Deploy to Vercel (Recommended)
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Vercel will automatically detect Next.js and deploy.
4. Add your Environment Variables in the Vercel dashboard.

## 5. Admin Access
The default admin login is:
- **Email**: `admin@skinfotech.com`
- **Password**: `admin123`
*(Note: You should change these in the database or implement a proper user creation flow for production)*

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Auth**: Custom JWT / Admin Login
- **Styling**: Shadcn UI inspired glassmorphism
