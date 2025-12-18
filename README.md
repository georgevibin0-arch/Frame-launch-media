# ABC FilmFactory MVP

A cinema booking full-stack MVP built with Next.js 14, TailwindCSS, Prisma (SQLite), NextAuth, and Stripe.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   ```
   Fill in your Google OAuth credentials (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) and Stripe keys (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`) in `.env`.
   Generate a `NEXTAUTH_SECRET` (e.g. `openssl rand -base64 32`).

3. Setup Database:
   ```bash
   # Create database file and apply migrations
   npx prisma migrate dev --name init

   # Seed the database with fake cinemas and slots
   npm run seed
   ```

4. Run Development Server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) inside your browser.

## Stripe Local Webhook
To test payment confirmation locally:
1. Install Stripe CLI.
2. `stripe login`
3. `stripe listen --forward-to localhost:3000/api/webhook`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET` in `.env`.
