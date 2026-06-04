# Sanity CMS — Searcher Properties

Manage apartments and projects at **`/studio`** (e.g. `http://localhost:3000/studio`).

## 1. Create a Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a project.
2. Copy the **Project ID** and use dataset **`production`** (default).

## 2. Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_editor_or_admin_token
```

Create a token under **Project → API → Tokens** (Editor role is enough for Studio + seed script).

## 3. Run the site + Studio

```bash
npm run dev
```

- Website: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

## 4. Seed existing demo listings (optional)

Imports the current hardcoded properties and uploads images from `public/`:

```bash
npm run seed
```

Requires `SANITY_API_WRITE_TOKEN` in `.env.local`. After seeding, **Publish** each document in Studio (or they stay as drafts).

## 5. Adding a new property in Studio

1. Open **Property** → **Create new**.
2. Choose **Property type** (Shortlet / Developed / Developing).
3. Fill required fields (type-specific fields appear based on type).
4. Upload **Card thumbnail** and **Detail gallery** (hero + extra images).
5. Toggle **Show on homepage featured section** if it should appear on the home page.
6. Click **Publish**.

### Field guide

| Type | Extra fields |
|------|----------------|
| Shortlet | Bedrooms label, Rate (e.g. ₦100,000/night) |
| Developed | Price range, Amenities list |
| Developing | Lease label, Unit options, Progress %, Completion date |

## 6. How the site loads data

- `lib/properties/fetch.ts` reads published documents from Sanity.
- If Sanity is not configured or empty, the site **falls back** to static demo data in `lib/properties/static.ts`.

## 7. Instant updates after publish (optional)

1. Set `SANITY_REVALIDATE_SECRET` in `.env.local` and on your host (Vercel).
2. In Sanity **Manage → API → Webhooks**, add a webhook on publish:
   - URL: `https://your-domain.com/api/revalidate`
   - Header: `x-sanity-secret: <your secret>`
   - Trigger: Create, Update, Delete

Without a webhook, new content appears within ~60 seconds (ISR revalidate) or after redeploy.
