# Feel_Like_Home

Hybrid stay-and-drive marketplace scaffold built with Next.js 14, Tailwind CSS, and Supabase.

## Included

- App Router starter with home, discover, owner, admin, and membership pages
- Auth pages for login, signup, forgot password, and reset password
- Tailwind-based UI tuned for a trust-heavy Indian rental marketplace
- Pricing helpers for owner onboarding, vehicle time blocks, and booking fee bands
- Supabase SQL schema for profiles, properties, vehicles, bookings, and subscriptions
- Environment template for Supabase

## Quick start

```bash
npm install
npm run dev
```

## Next steps

1. Copy `.env.example` to `.env.local`.
2. Create a Supabase project and run `supabase/schema.sql`.
3. Enable Supabase Auth and add your Vercel/site URLs to the auth redirect settings.
4. Replace mock data with live Supabase queries.
5. Keep online payments disabled for now and use manual handling during the MVP.
