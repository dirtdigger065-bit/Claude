# Supabase setup — fixing the exposed key

## Do this first, before anything else

Both source apps (FieldOps and Bid Builder) shipped a Supabase **service_role**
key hardcoded in client-side JavaScript. That key bypasses Row Level Security
entirely — anyone who ever opened dev tools on the deployed site (or now, this
repo's git history) has had full read/write/delete access to your whole
Supabase project: every storage bucket, and every database table if you have
any. Rebuilding the code to use a safer key does **not** undo that exposure.

**Go rotate it now:** Supabase dashboard → Project Settings → API →
"service_role" key → regenerate. This immediately invalidates the old key
everywhere. Do this before continuing.

## What changed in this codebase

Both apps now read their Supabase URL/key from configuration instead of a
hardcoded literal, and use the **anon** key — which is *designed* to be public
and safe to ship in a browser bundle, as long as Row Level Security policies
on the tables/buckets it touches are scoped correctly. That's the other half
of this fix: policies that only allow what the apps actually need.

## 1. Get your anon key

Supabase dashboard → Project Settings → API → copy the "anon public" key
(NOT service_role).

## 2. Configure the React app (Field Ops + the Hub)

```
cp .env.example .env
```

Edit `.env` and paste in your anon key:

```
VITE_SUPABASE_URL=https://vjhhhmgzvwdxrxkthrpx.supabase.co
VITE_SUPABASE_ANON_KEY=<your anon key>
```

## 3. Bid Builder picks up the same values automatically

Bid Builder is a static (non-Vite) app, so it can't read `.env` directly.
`npm run dev` / `npm run build` automatically run
`scripts/gen-bid-builder-config.mjs`, which regenerates
`public/bid-builder/config.js` from the same `.env` values. You don't need to
do anything extra — just make sure `.env` is filled in before you build.

If you deploy via CI/a host that doesn't run `npm run dev` locally, set
`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` as environment variables in
your hosting provider's build settings — the generator script reads
`process.env` first, `.env` second.

## 4. Row Level Security policies

Run this in the Supabase SQL editor. It scopes the anon key to only the two
buckets these apps actually use (`field-ops`, `bids`), allows read/write but
**not delete**, and leaves every other bucket/table denied by default (RLS
default-denies anything without a matching policy).

```sql
-- field-ops bucket (Field Ops app data: jobs, users, timecards, photos, etc.)
create policy "field_ops_select" on storage.objects for select
  to anon using (bucket_id = 'field-ops');

create policy "field_ops_insert" on storage.objects for insert
  to anon with check (bucket_id = 'field-ops');

create policy "field_ops_update" on storage.objects for update
  to anon using (bucket_id = 'field-ops') with check (bucket_id = 'field-ops');

-- bids bucket (Bid Builder data + attached plan files)
create policy "bids_select" on storage.objects for select
  to anon using (bucket_id = 'bids');

create policy "bids_insert" on storage.objects for insert
  to anon with check (bucket_id = 'bids');

create policy "bids_update" on storage.objects for update
  to anon using (bucket_id = 'bids') with check (bucket_id = 'bids');
```

Both buckets should stay marked **Public** in Storage settings (Storage →
bucket → Public toggle) — the apps fetch weather/bids/catalog data via the
unauthenticated `/object/public/...` read path, which is separate from the
policies above and needed for the apps to load without friction.

## Known limitation (please read)

Neither app uses real Supabase Auth — "login" is just a 4-digit PIN checked
against a JSON file, entirely on the client. That means the RLS policies above
can restrict *which buckets* the public anon key can touch, but they can't
tell "an admin who entered the right PIN" apart from "anyone who copied the
anon key out of the JS bundle and hit the API directly" — Supabase has no
concept of that distinction here. This fix closes the "someone deletes your
whole database" risk (service_role → anon+RLS, scoped to two buckets, no
delete). It does not add real per-user authorization.

If you want that, the next step is a small Supabase Edge Function (or any
lightweight server) that validates the PIN server-side and is the *only*
thing allowed to write — the client would call the function instead of
hitting Storage directly. Worth doing before this app handles anything you'd
be upset to see tampered with; out of scope for this rebuild.
