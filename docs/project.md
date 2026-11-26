# Project: Haperd & Co.

A portfolio website for Haperd & Co., a studio that designs wedding stationery and paints live illustrations at events. A visitor learns what the studio does, meets María, and sends a message.

This file is the source of truth for **what** we build. `docs/plan.md` says **in what order**. Tasks, owners and status live in JSM HQ.

---

## 1. Users

| User        | What they do                                                    | Where            |
| ----------- | --------------------------------------------------------------- | ---------------- |
| **Visitor** | Learns about the stationery and live art services, gets in touch | The website      |
| **Owner**   | Receives each enquiry by email and replies to it                 | Their inbox      |

---

## 2. Core flow

When this works end to end on a phone and a desktop, the product is done.

1. Open the home page. It loads fast and shows what Haperd & Co. offers.
2. Go to Live art. Read about the service.
3. Press "¿Cómo trabajamos?" and see how the service works.
4. Press "¿Hablamos?" and land on the contact form.
5. Send name, email and message. The page confirms it was sent.
6. The owner receives the enquiry and can press Reply to answer the visitor.
7. The visitor receives a short confirmation email.

---

## 3. Stack

| Layer      | Tool                                         | Notes                                                                    |
| ---------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| App        | Next.js (App Router) + TypeScript + Tailwind v4 | One app at the repo root, code in `src/`. Latest patched Next.js.      |
| Email      | Brevo transactional email API                | Called with `fetch` from the server. No SDK, no SMTP, no `nodemailer`.   |
| Validation | zod                                          | The contact form's schema, shared by the form and the API route.         |
| Tests      | Vitest                                       | API route, validation and pure functions.                                |
| Hosting    | Vercel                                       | Preview per PR, production from `main`.                                  |
| Packages   | pnpm                                         | One lockfile: `pnpm-lock.yaml`.                                          |

**Constraints**

- No database.
- No auth.
- No analytics, event tracking, session replay or error tracking services. Brevo is the only external service the app calls.
- Everything should fit free tiers. See §12 for the Vercel plan question.
- Content (text, images, FAQ) lives in the repo.

---

## 4. Current state

Checked on 2026-11-26, at commit `4ff5069`: Phase 0 done. `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` pass on Next.js 16.4.6, `pnpm audit --prod` reports no known vulnerabilities, and all four pages work on a Vercel preview. Rows for later phases were not re-checked.

### What exists

| Route          | File                           | Content                                             |
| -------------- | ------------------------------ | --------------------------------------------------- |
| `/`            | `src/app/page.tsx`             | Hero header, intro text, "¿Qué ofrecemos?"          |
| `/live-art`    | `src/app/live-art/page.tsx`    | Live art service text, sample work steps, links     |
| `/about-us`    | `src/app/about-us/page.tsx`    | María's story with a portrait                       |
| `/contact`     | `src/app/contact/page.tsx`     | Intro, contact form, three FAQs                     |
| `/api/contact` | `src/app/api/contact/route.ts` | Validates the enquiry and sends both emails (§6.2)  |

Shared components in `src/components`: `Header`, `SkipLink`, `Navbar`, `MobileMenu` (with `MobileMenuToggle` and `NavLink`), `Footer`, `ContactForm`, `FAQCollapse`, the form's parts in `contact/`, and the base components in `ui/`. Nav items, FAQ and site constants are in `src/content`.

### Known problems

From the Phase 0 audit. Each row is assigned to a phase in `plan.md`, unless the owner accepted it (—). Rows are sorted by severity; numbers are stable IDs, so they are not in order. Remove a row when its fix is merged.

| #  | Severity | Area | Problem | Phase |
| -- | -------- | ---- | ------- | ----- |
| 14 | high     | Images | The portrait (`public/images/about-us/`) is a marked local placeholder, and there is no logo or final favicon (the current icon is a temporary key-like mark with its lower end clipped). The hero photo is 1080 px square, so wide screens upscale it. | 2 |
| 15 | high     | Links | The WhatsApp number has not arrived, so the footer shows no WhatsApp link. | 2 |
| 18 | high     | Contact API | `/api/contact` has no rate limit. | 5 |
| 25 | medium   | Privacy | Commit metadata holds personal data: the author fields of `e54da7d` contain a work email address and a local file path with a user name, the author name of `c1bd7b3` looks like an employee ID, and later commits carry a personal email. Accepted by owner (2026-11-26), no history rewrite. | — |
| 34 | medium   | Security | No `Content-Security-Policy` header. | 5 |

---

## 5. Pages

No new pages. We improve the four that exist.

**Shared by every page**

| Item      | Detail                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------- |
| Header    | Brand name and tagline, navigation. Large image variant on the four pages; compact variant on the 404 and error pages. |
| Nav       | Haperd (`/`), Live art, About us, Contacto. Current page marked. Mobile: accessible menu. Defined once. |
| Footer    | Copyright with the current year, Instagram, WhatsApp, link to Contact                           |
| Done when | Works from 375 px to wide desktop, fully usable by keyboard                                     |

| Page          | Content                                                                                      | Done when                                                       |
| ------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Home**      | Hero, intro, "¿Qué ofrecemos?" with three services: wedding stationery and personalised illustration (both link to Contact) and Live art (links to Live art); owner decisions, 2026-11-26. The services are zigzag rows (owner decision, 2026-11-26). Call to action to Contact | The offer is clear on a phone; every service links onward       |
| **Live art**  | Service text, "¿Cómo trabajamos?" steps on the same page, "¿Hablamos?"                       | Both buttons work                                               |
| **About us**  | María's portrait, story and signature                                                        | Real portrait; long text is comfortable to read                 |
| **Contact**   | Large image header, as on the other pages (owner decision, 2026-11-26). Intro, form (§6), business email link, FAQ | §6 passes; FAQ opens and closes by keyboard                     |

**Copy rules**

- Keep the existing Spanish text. Improve layout, not wording.
- Voice: the business speaks as "we". María's life story stays in "I".
- New text is short and in Spanish. List it in the PR so the owner can approve it.
- The "¿Cómo trabajamos?" steps don't exist yet. Ask the owner for them. Never invent how the business works, prices or testimonials. Until the real steps arrive, Live art shows sample steps labelled "Texto de ejemplo" (owner decision, 2026-11-26).

---

## 6. Contact form and email

### 6.1 Form

| Field     | Rule                                                      |
| --------- | --------------------------------------------------------- |
| `name`    | Required, 2–80 characters, no line breaks                 |
| `email`   | Required, valid address, max 254 characters               |
| `message` | Required, 10–3,000 characters                             |
| `website` | Hidden honeypot. Must be empty. Not reachable by keyboard |

| State   | Behavior                                                                          |
| ------- | --------------------------------------------------------------------------------- |
| Invalid | Message next to the field, announced to screen readers                            |
| Sending | Button disabled, "Enviando..."                                                    |
| Sent    | Clear confirmation; form cleared                                                  |
| Failed  | Friendly error with the business email as a fallback; **keep what the user typed** |

**Privacy note** (owner decision, 2026-11-26): a short note by the form says that name, email and message are used to answer the enquiry and are sent by email through Brevo. No legal claims, retention periods or promises.

### 6.2 API

`POST /api/contact`, JSON body with the fields above.

| Step        | Detail                                                                              | Response |
| ----------- | ----------------------------------------------------------------------------------- | -------- |
| 1. Parse    | Invalid JSON or wrong content type                                                  | 400      |
| 2. Honeypot | `website` filled: send nothing, answer as a success                                 | 200      |
| 3. Validate | The shared zod schema                                                               | 400      |
| 4. Notify   | Send the owner email. If it fails, stop.                                            | 502      |
| 5. Confirm  | Send the visitor email. If it fails, log it and still succeed.                      | 200      |

Success is `{ "ok": true }`. Errors are `{ "error": { "code", "message" } }`.

### 6.3 Emails

| Email        | To                 | From               | Reply-to           | Content                                                  |
| ------------ | ------------------ | ------------------ | ------------------ | -------------------------------------------------------- |
| Notification | `CONTACT_TO_EMAIL` | Verified sender    | The visitor        | Name, email, message                                     |
| Confirmation | The visitor        | Verified sender    | `CONTACT_TO_EMAIL` | Fixed Spanish text: we got your message and will answer  |

- Endpoint: `POST https://api.brevo.com/v3/smtp/email`, header `api-key`. Check Brevo's current docs before writing the call.
- Templates live in code, with a plain-text version of each.
- Contacts are **not** added to any Brevo list.
- Turn off open and click tracking in Brevo if the account allows it.
- The free plan has a daily sending limit (300 a day when this was written; verify). Each enquiry uses two.
- All Brevo code sits in one server-only module, `src/lib/email`.

---

## 7. Design

Modern and elegant, still recognisably Haperd. Hand-painted and editorial, not a tech product.

| Area       | Look                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| Colors     | Keep the palette: rose `#bd8a87`, soft rose `#b18a8b`, deep rose `#8b5c5a`, navy `#2a2341`, blush `#f5e6e6`, white. Add a warm off-white. |
| Contrast   | Text meets WCAG AA. Use navy or a darker rose for text; light rose is for surfaces and decoration.          |
| Theme      | Light only                                                                                                  |
| Type       | Proposal, confirmed in Phase 1: Fraunces (headings), Quicksand (body), Geist Mono (small accents), Dancing Script (signature only). Loaded with `next/font`. |
| Layout     | Generous space, large type, overlapping image and text, mobile first                                        |
| Details    | Soft shadows, rounded shapes, the star mark in the nav                                                      |
| Tokens     | Colors, fonts, radius, shadows, spacing and motion defined once in `globals.css` (`@theme`)                 |
| Responsive | Works from 375 px up. No horizontal scrolling.                                                              |
| States     | Hover, focus-visible, disabled, loading and error on every control                                          |

### Motion

| Rule        | Detail                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Tone        | Subtle and slow enough to feel crafted; never delays reading or clicking                            |
| Where       | Hero entrance, reveal on scroll, nav and button feedback, FAQ and menu open/close, page transitions |
| How         | CSS first (transitions, keyframes, scroll-driven animations, view transitions). A library needs a stated reason in the PR. |
| Performance | Animate only `transform` and `opacity` where possible                                               |
| Fallback    | Content is visible without JavaScript and in browsers without a feature                             |
| Accessibility | `prefers-reduced-motion: reduce` turns off movement                                               |

---

## 8. Quality targets

Measured on the production build or a preview, on every page.

| Check                    | Target                       |
| ------------------------ | ---------------------------- |
| Lighthouse Performance (mobile) | 90 or more            |
| Lighthouse Accessibility, Best Practices, SEO | 95 or more |
| Largest Contentful Paint | Under 2.5 s                  |
| Cumulative Layout Shift  | Under 0.1                    |
| Interaction to Next Paint | Under 200 ms (manual check) |

| Area           | Rule                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------- |
| Rendering      | Pages are static server components. `'use client'` only on the smallest interactive part. |
| Images         | Local files, `next/image`, correct `sizes`, priority only for the main image             |
| Fonts          | `next/font`, only the weights used                                                       |
| JavaScript     | Baseline before the redesign: 101 kB shared, 111–113 kB first load per page (Next 15.3.0). Compare after the upgrade and justify large growth. |
| SEO            | Per-page title and description, Open Graph image, `sitemap.ts`, `robots.ts`, `lang="es"` |

---

## 9. Security rules

Every PR must follow these.

| Risk            | Rule                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| Secrets         | `BREVO_API_KEY` is read only on the server. Nothing secret in `NEXT_PUBLIC_*` or a commit. `.env*` stays ignored, except `.env.example`. |
| Input           | Validate on the server. Client checks are only for convenience.                                               |
| HTML injection  | Escape visitor input before it goes into an email's HTML                                                      |
| Header injection | No line breaks in name or email                                                                              |
| Email abuse     | The confirmation email never contains visitor-written text (not the message, not the name), so the form can't be used to send content to strangers |
| Spam            | Honeypot, length limits, and a Vercel firewall rate limit on `/api/contact` (check what the plan allows)      |
| Error leaks     | Visitors never see provider or stack errors                                                                   |
| Personal data   | Don't log names, emails or messages                                                                           |
| Dependencies    | No known critical or high advisories in production dependencies at launch                                      |

---

## 10. Repo layout

Target layout. `src/app` and `src/components` already exist.

```
src/
  app/            # pages, api/contact, sitemap, robots, error, not-found
  components/     # shared UI
  content/        # nav items, FAQ, site constants
  lib/
    contact/      # zod schema and types
    email/        # Brevo client and templates (server only)
public/           # images, icons
docs/
  project.md      # this file
  plan.md         # phases and lanes
```

---

## 11. Environment variables

| Variable               | Used by | Public? | What it is                                    |
| ---------------------- | ------- | ------- | --------------------------------------------- |
| `BREVO_API_KEY`        | Server  | No      | Brevo API key                                 |
| `BREVO_SENDER_EMAIL`   | Server  | No      | A sender verified in Brevo                    |
| `BREVO_SENDER_NAME`    | Server  | No      | Display name, e.g. "Haperd & Co."             |
| `CONTACT_TO_EMAIL`     | Server  | No      | Where enquiries arrive                        |
| `NEXT_PUBLIC_SITE_URL` | Both    | Yes     | Canonical URL, used by metadata and sitemap   |

`.env.example` lists every variable with no values. Local values go in `.env.local`.

---

## 12. Open questions

The owner answers these. Delete a row once answered, and write the answer where it belongs above.

| #  | Question                                                                                                     | Needed by |
| -- | ------------------------------------------------------------------------------------------------------------ | --------- |
| 1  | Missing images: María's portrait, logo, final favicon (the current one is a temporary key-like mark, lower end clipped), a larger hero (if there is one) | Phase 2   |
| 2  | WhatsApp number                                                                                              | Phase 2   |
| 3  | The "¿Cómo trabajamos?" steps                                                                                | Phase 2   |
| 5  | Brevo account, verified sender (ideally a domain with SPF/DKIM set up), recipient address                    | Phase 5   |
| 6  | Is `haperd.com` registered? `hola@haperd.com` is not set up yet (owner, 2026-11-26); it must work before launch. | Phase 5   |
| 8  | Vercel plan: the free Hobby plan is for non-commercial use. Pay for Pro, or reconsider hosting?              | Phase 5   |

---

## 13. Out of scope

| Feature                          | Reason                        |
| -------------------------------- | ----------------------------- |
| Database                         | Content lives in the repo     |
| Auth, admin panel, CMS           | Not needed yet                |
| Gallery or project pages         | No new pages for now          |
| Analytics and event tracking     | Not wanted                    |
| Newsletter and contact lists     | Brevo is only for form emails |
| English version                  | Spanish only. Brand terms such as "Live art" and "About us" stay. |
| Online booking and payments      | Not needed                    |
