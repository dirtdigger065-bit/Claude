# RDMPE Ops

One app: a login, a dashboard, and two modules you can jump between —
**Field Ops** (jobs, daily logs, time clock, timecards, scheduling, photos,
crew/user management) and **Bid Builder** (catalog-driven bid pricing, crews,
proposals, approvals). Previously these were two separate, unrelated apps;
this repo merges them behind one login and one dashboard.

**Before you deploy this anywhere: read [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).**
The original apps hardcoded a Supabase `service_role` key in client JS —
full read/write/delete access to the whole project, shipped to every
browser. That key needs to be rotated regardless of anything in this repo.

## How it's put together

```
/                      Vite + React 19 + TypeScript + Tailwind/daisyUI — the shell
  src/App.tsx           Login gate, session persistence, PWA install prompt, router
  src/shell/Hub.tsx      Landing dashboard — tiles into each module + quick stats
  src/shell/BidBuilderFrame.tsx   Mounts Bid Builder in an iframe, does the SSO handshake
  src/modules/field-ops/FieldOpsApp.tsx   The Field Ops screen tree (moved from the old App.tsx)
  src/components/*      Field Ops screens (unchanged from the original app)
  src/utils/supabase.ts Shared data layer — Supabase Storage as a JSON store, weather, GPS

public/bid-builder/     Bid Builder — the original vanilla JS/HTML/CSS app, kept intact
                         (6.8k-line app.js) rather than rewritten, since it works. Loaded
                         via iframe from the Hub; can still be opened standalone.
```

**Why an iframe for Bid Builder instead of a rewrite?** It's a large,
already-working, single-file app with its own DOM-id-based rendering and
global CSS. Porting it into React would be a multi-day rewrite with real
regression risk for something that already works. The iframe keeps it fully
isolated (no CSS/JS collisions with the React app) while still feeling like
one product: the Hub passes the logged-in user into it over `postMessage`
(see the `rdmpe-auth` handshake in `BidBuilderFrame.tsx` and near the top of
`public/bid-builder/app.js`), so there's no second login screen, and Bid
Builder's top bar gets a "← Hub" button that's only shown when embedded.

## One login, one user store

Login is still the original 4-digit PIN system, backed by the `users.json`
file in the `field-ops` Supabase bucket (managed from Field Ops → Users, if
your account has the `admin` role). There's a new `estimator` role for
people who should only use Bid Builder. Bid Builder itself only understands
`admin` vs. everyone-else-is-an-estimator — the Hub maps your real role down
to one of those two when it hands you off.

The session (which user is logged in) is kept in `sessionStorage`, not just
React state, so navigating between the Hub, Field Ops, and Bid Builder — or
reloading — doesn't force a re-login every time.

## Local development

```bash
npm install
cp .env.example .env   # then fill in your Supabase anon key, see SUPABASE_SETUP.md
npm run dev
```

`npm run dev` / `npm run build` both run `scripts/gen-bid-builder-config.mjs`
first, which regenerates `public/bid-builder/config.js` from your `.env` —
that's how the static Bid Builder app gets the same Supabase config as the
React app without hardcoding it.

## Deploying

`npm run build` produces `dist/`, ready for any static host. `public/_redirects`
and `public/_headers` are already set up for Netlify (SPA fallback to
`index.html`, no-cache on HTML so PWA updates land promptly). Set
`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` as build environment variables
on your host so the prebuild step picks them up.

## TV Dashboard

`/tv` (or any URL with a `?token=` query param) still bypasses login entirely
and shows the read-only kiosk dashboard, unchanged from the original app —
handy for an office TV.
