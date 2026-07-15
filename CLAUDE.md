SYSTEM DIRECTIVE: At the start of EVERY new session or task, read this `CLAUDE.md` file first. At the end of EVERY completed task, proactively update this file. Cross off completed TODOs, document new architectural decisions, and update the 'Current State'. Do not wait for permission to update this file.

**Product/project-level context lives outside this repo**, at
`/Users/mac/Documents/personal/obsidian/personal-vault/Projects/Skillswap/` (absolute path — a
folder inside Himanshu's general Obsidian vault). Read `Skillswap.md` and `Now.md` there for
project status and its relationship to Veridian Studio — this file is the authority for
code-level detail only.

**This project is dormant** — last commit June 2024, well over a year with no activity as of
this writing. Everything below is a snapshot, not confirmed-current behavior.

---

# CLAUDE.md — Skillswap

## What this is

A skill-exchange platform: users list skills they can teach and skills they want to learn,
swipe to find complementary matches, then connect to arrange an exchange session. Live at
`skillswap-seven.vercel.app`. Built with two other contributors (Abhishek Singh, Khushi) —
not a solo project, unlike Wisp.

## Layout

One repo, two apps:

```
Skillswap/
  backend/     Express + MongoDB (Mongoose), JWT + bcrypt auth, cookie sessions
    controllers/  admin, home, swipe, user, util
    models/       User, Skill
    routes/       admin, home, swipe, user, util
  frontend/    React 18 + Vite + Tailwind, react-router, axios
```

## Data model

- `User` — `fname`, `lname`, `email`, `password` (bcrypt), `username`, `bio`, `skills[]` /
  `interests[]` (both ref `Skill`), `matchRequests[]` / `matches[]` / `rejected[]` (all ref
  `User`), `notifications[]`.
- `Skill` — just `{ name }`. No categorization, no dedup logic visible in the model.

## Commands

```bash
# backend
cd backend && npm install && npm run dev    # nodemon app.js

# frontend
cd frontend && npm install && npm run dev   # vite
```

Both deploy to Vercel independently (`vercel.json` in each folder).

## Env vars (per the root README — no `.env.example` committed)

Backend: `DATABASE_USERNAME`, `DB_PASSWORD`, `SECRET_KEY`, `PORT`, `FRONTEND_URL`.
Frontend: `VITE_BACKEND_URL`.

## Current state & known gaps (from a first read, not a full audit)

- No `CLAUDE.md` existed before this file — this is a first pass, not a maintained record like
  Wisp's or Veridian Studio's repos. Treat as a starting point.
- No tests wired up (`package.json` test script is a stub).
- Admin routes (`/admin/users`, `/admin/skills`, `/admin/add/*`) have no visible auth guard in
  the route list read so far — worth checking `middlewares/` before assuming they're protected.
- README's env var names (`DATABASE_USERNAME`/`DB_PASSWORD`) don't match a standard
  `MONGODB_URI` pattern — check `config/` for how the connection string is actually assembled.

## Frontend design system (added Jul 2026)

A UI/UX revamp introduced a lightweight design system on top of the original blue + teal
theme. It stays close to the old look but is consistent and light/dark aware.

- **Tokens** live in `tailwind.config.js`: `brand` (blue) and `accent` (teal) color scales,
  `font-display` (Rubik) / `font-grotesk` (Space Grotesk) / `font-sans` (Inter), custom
  shadows (`soft`, `card`, `glow`, `glow-accent`), and keyframe animations (`fade-in-up`,
  `scale-in`, `float`, `gradient-x`, `shimmer`).
- **Component classes** live in `src/index.css` under `@layer components`. Use these instead
  of re-writing utility strings:
  - Surfaces: `.card`, `.card-interactive`, `.panel` (all glassy, backdrop-blur, light/dark).
  - Buttons: `.btn-primary`, `.btn-accent`, `.btn-secondary`, `.btn-ghost`, `+ .btn-lg`.
  - Forms: `.field-input`, `.field-input-underline` (needs `peer` in markup too),
    `.field-label`.
  - Pills: `.pill-skill` (teal) vs `.pill-interest` (blue) — skills and interests now use
    distinct hues everywhere (was inconsistent teal/lime before).
  - Type: `.page-heading`, `.text-gradient`, `.eyebrow`.
- **Ambient glows**: `.ambient-glow` in `App.css` adds blurred brand/accent radial blobs
  behind content; layered with the existing mesh + fingerprint backgrounds.
- Gotcha: never `@apply` the `peer` utility inside `index.css` — Tailwind rejects it. Put
  `peer` directly on the element (see Register.jsx inputs).
- Verified with `npm run build` (vite) — compiles clean.

Bugs fixed in passing: Username's DataRow/SkillRow used `dark:text-black` (invisible text in
dark mode); the `Get started` CTA was wrapped in `scale-50`; skill/interest pills were
visually inconsistent across screens.

### Layout / interaction pass (also Jul 2026)

- **Profile / ViewProfile / Username** no longer use a narrow centered card. They share a
  "wide header + content grid" pattern: full-width gradient banner, rounded avatar (initial),
  name/handle/email, Edit button, then details in a `md:grid-cols-2` grid. Skill/interest
  rows carry `md:col-span-2` so pills span full width. Header-duplicated + internal fields
  (`username`, `fname`, `lname`, `email`, `_id`, `__v`, `password`, `matchRequests`,
  `rejected`) are filtered out of the grid via each page's `fieldsNotToDisplay`.
  - Gotcha: the header row must be `relative z-10` or the banner paints over the avatar
    (negative margin overlap). Fixed on all three pages.
- **Matches** is a full-width list (`max-w-4xl`) with a connection count, not a boxed column.
- **Swipe** is now a card deck: `Swipe.jsx` renders 1–2 `SkeletonCard` silhouettes behind the
  live `UserProfileCard`, gated on `remaining = potentials.length - index - 1`. The live card
  flings out with rotation on action (interest → left, reject → right — flip the `handleAccept`
  /`handleReject` `setExitDir` values to reverse) with a SWAP/NOPE stamp, then the next card
  plays the `rise-in` keyframe (new in tailwind config) to read as "promoted from the stack".
  Buttons are disabled during the ~350ms exit. Direction convention is a one-line change.
  - Gotcha (cost an iteration): the entrance animation and the exit transform must live on
    DIFFERENT elements. A CSS `@keyframes` animation with `fill: both` (like `animate-rise-in`)
    locks the element's `transform`, so an exit `translate/rotate` on the same node is ignored
    and nothing moves. Outer wrapper = exit transform; inner `.card` = entrance animation.
  - Gotcha: deck skeletons are scaled down, so centered + scaled they hide entirely inside the
    top card. They must be `origin-bottom` + `translate-y-*` so a strip actually peeks out.

### Mobile pass (Jul 2026)

- **Navbar mobile menu was dead**: the hamburger used Flowbite's `data-collapse-toggle`
  attribute but no Flowbite JS is loaded, so nothing toggled. Replaced with real React state
  (`menuOpen`), an X/bars icon swap, and a `useEffect` on `location.pathname` that closes the
  menu on navigation. Menu is `${menuOpen?'block':'hidden'} md:block`.
- Home wordmark is one unwrappable word — capped its base size (`text-5xl sm:text-7xl…`) so it
  doesn't overflow narrow screens. Alert toast is `left-4 right-4 sm:left-auto sm:max-w-md` so
  it can't run off-screen. Profile-header avatars are `w-24 sm:w-28` so they don't crowd the
  Edit button on small phones. Note: `xs:` is NOT a default Tailwind breakpoint — don't use it.

## Active TODO list

- Backend is untouched — this revamp was frontend-only. If picked back up, the known backend
  gaps above (admin auth guard, tests, env var naming) still stand.
- `index.html` still has a redundant Rubik `@import` (weight 600 only); the full family is now
  imported in `src/index.css`. Harmless, could be removed.
