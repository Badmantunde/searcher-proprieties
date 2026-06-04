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

Open **`/studio/content`** (or click **Content** in the Studio sidebar).

1. Choose a list: **All properties**, **Shortlet apartments**, **Developed properties**, or **Developing projects**.
2. Click **Create** → **Property**.
3. Choose **Property type** (Shortlet / Developed / Developing).
4. Fill required fields (type-specific fields appear based on type).
5. Upload **Card thumbnail** and **Detail gallery** (hero + extra images).
6. Toggle **Show on homepage featured section** if it should appear on the home page.
7. Click **Publish**.

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

## 8. Sanity Dashboard + “Content” tool (registered studios)

If your project is registered on [sanity.io/manage](https://www.sanity.io/manage) but the Dashboard only shows **Presentation** and **Applications** (and not **Content** for editing Properties), the studio manifest is not being served correctly.

This project is configured for an embedded studio at **`/studio`** with the **Content** tool (`structureTool`) listing all Property documents.

### One-time setup

1. Set env vars in `.env.local` (especially `NEXT_PUBLIC_SANITY_PROJECT_ID`).
2. Generate the manifest (also runs automatically before `npm run build`):

   ```bash
   npm run manifest
   ```

   Files are written to `public/studio/static/` and served at  
   `https://your-domain.com/studio/static/create-manifest.json`.

3. Deploy the schema to Sanity (requires login or `SANITY_AUTH_TOKEN`):

   ```bash
   npm run schema:deploy
   ```

4. In **Sanity Manage → Studios**, set the canonical studio URL to  
   `https://your-domain.com/studio` (include the `/studio` path).

5. Redeploy the Next.js site so the manifest and bridge script are live.

The studio layout includes Sanity’s dashboard **bridge script**, which lets the Dashboard discover the **Content** tool and your Property schema.

### Local check

After `npm run manifest`, open:

- `http://localhost:3000/studio/static/create-manifest.json`
- `http://localhost:3000/studio/content` — edit Properties here
