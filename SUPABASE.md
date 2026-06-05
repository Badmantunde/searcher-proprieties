# Supabase — Searcher Properties Admin

Manage properties at **`/admin`** after one-time setup. No developer needed for day-to-day uploads.

## 1. Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create a project.
2. Open **Project Settings → API** and copy:
   - **Project URL**
   - **anon public** key

## 2. Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 3. Database & storage

In Supabase **SQL Editor**, run the full script in [`supabase/schema.sql`](./supabase/schema.sql).

This creates:

- `properties` table with RLS (public reads **published** only; authenticated admins full access)
- `property-images` storage bucket with public read

## 4. Create an admin user

In Supabase **Authentication → Users → Add user**, create an email/password account.

Any authenticated user can manage properties (suitable for a small team). Use a strong password.

## 5. Run the app

```bash
npm run dev
```

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

Sign in with the user you created, then **Add property** to upload listings with images.

## 6. Optional: seed demo data

If `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`:

```bash
npm run seed
```

Imports the static demo properties from `lib/properties/static.ts`.

## Admin workflow

1. **Add property** — fill basics, upload card + gallery images.
2. Choose **Developed** or **Developing** and complete type-specific fields.
3. Toggle **Published** when ready for the public site.
4. Toggle **Featured** to show on the homepage carousel.

## How the site loads data

- `lib/properties/fetch.ts` reads **published** rows from Supabase.
- If Supabase is not configured or empty, the site falls back to static demo data in `lib/properties/static.ts`.

## Deploying (Vercel)

Add the same env vars in your host settings. Run `supabase/schema.sql` on your production Supabase project (or use Supabase migrations).

Set **Site URL** and **Redirect URLs** in Supabase Auth to include your production domain (e.g. `https://yourdomain.com/admin/**`).
