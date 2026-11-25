# Plan

The build order for Haperd & Co. `docs/project.md` describes each item in detail. "#" numbers refer to its known problems table (§4).

## Rules

- Build phases in this order. Don't add, remove, or reorder phases without the owner's approval.
- Work on one phase at a time. Exception: Phase 3 may start once Phase 1 is done, in parallel with Phase 2.
- One branch and PR per phase, or several small ones. Never push to `main`.
- A phase is done when its PRs are merged and its "Done when" checks pass on a Vercel preview (locally, until Vercel is connected).
- Update the status table in the same PR that changes a phase.
- When a phase needs something from the owner (a key, an account, content), stop and ask. See `project.md` §12.

## Status

Values: `Not started`, `In progress`, `Blocked` (say why), `Done`.

| Phase | Name                          | Status      | Notes |
| ----- | ----------------------------- | ----------- | ----- |
| 0     | Audit, foundation and upgrade | Not started | Vercel setup is not finished. The first deployment (`c1bd7b3`) failed on 2026-11-25, likely the vulnerable Next.js 15.3.0; confirm in the build log. |
| 1     | Design system and layout      | Not started |       |
| 2     | Pages                         | Not started |       |
| 3     | Contact and Brevo             | Not started |       |
| 4     | Motion, performance, SEO      | Not started |       |
| 5     | Harden and launch             | Not started |       |

---

## Phase 0 — Audit, foundation and upgrade

**Goal:** an audited, safe, clean base that builds and deploys. The site looks the same.

**Needed from the owner:** finish connecting the repo to Vercel. The upgrade (#1) comes first, so a deployment can succeed.

### Step 1 — Audit the project (always first)

Do this before changing any code. `project.md` §4 is a starting point from a quick review, not a full audit.

| Area           | Check                                                                              |
| -------------- | ---------------------------------------------------------------------------------- |
| Dependencies   | Known advisories, outdated and unused packages                                     |
| Security       | Every rule in `project.md` §9, API input handling, headers, error leaks            |
| Secrets        | Working tree and full git history; personal data in the code (the repo is public)  |
| Build and deploy | Install, build, lint, types; why the Vercel deployment fails                     |
| Bugs           | Every page and control in the browser, at phone and desktop width                  |
| Quality        | Accessibility, performance and SEO baseline (`project.md` §8)                      |

1. Add each finding to `project.md` §4 with its severity and phase. Remove rows that turn out to be wrong.
2. Show the owner the findings, most severe first, and wait for approval.
3. Then fix. Security and build problems are fixed in this phase; design and content problems go to their phase.

### Step 2 — Fix and set up

| Includes                                                                                      | project.md |
| --------------------------------------------------------------------------------------------- | ---------- |
| Fix the security problems and bugs the audit assigns to this phase                          | §4, §9     |
| Upgrade Next.js (and `eslint-config-next`) to the latest patched release; clear the audit (#1) | §3, §9     |
| pnpm only: commit `pnpm-lock.yaml` and `pnpm-workspace.yaml`, delete `package-lock.json` (#2)  | §3         |
| Scripts `lint` (ESLint CLI), `typecheck`, `test` (Vitest, one first test) (#3)                | §3         |
| Fix `next.config.ts`; remove the Netlify plugin (#4, #5)                                      | §3         |
| `.env.example`, with `.gitignore` allowing it; a real `README.md`                             | §11        |
| CI on every PR: lint, typecheck, test, build                                                  |            |

**Done when:** the audit findings are recorded in `project.md` §4; every security and build finding is fixed or the owner has accepted it; all four checks pass; the production audit shows no critical or high advisories; a PR gets a preview where all four pages work.

---

## Phase 1 — Design system and layout

**Goal:** the new look's foundations and a shared shell that works on every screen.

**Needed from the owner:** approve the type and color direction on the preview.

| Includes                                                                             | project.md |
| ------------------------------------------------------------------------------------ | ---------- |
| Tokens in `@theme`, fonts through `next/font`, global CSS fixes (#6–#9, #13)         | §7         |
| Base components: button, container, section, text styles                             | §7         |
| Header, navigation, mobile menu, footer rebuilt; server components where possible (#10, #11) | §5  |
| One `h1` per page, landmarks, skip link, `lang="es"` (#12)                           | §8         |

**Done when:** every page uses the new shell with no horizontal scroll at 375, 768 and 1440 px; the menu works by keyboard; fonts load as designed; the owner approves the direction.

---

## Phase 2 — Pages

**Goal:** the four pages redesigned, responsive, with real content.

**Needed from the owner:** images, social links, "¿Cómo trabajamos?" steps, voice (§12, questions 1–4). Missing content doesn't block layout work: mark placeholders clearly and set the phase to `Blocked` until they are replaced.

| Includes                                                        | project.md |
| --------------------------------------------------------------- | ---------- |
| Home                                                            | §5, §7     |
| Live art, with working buttons and the how-it-works steps (#15) | §5         |
| About us                                                        | §5         |
| Contact page layout and accessible FAQ (the form logic is Phase 3) | §5      |
| Local optimized images; delete unused files in `public` (#14)   | §8         |
| Real social links (#15)                                         | §5         |

**Done when:** all "Done when" checks in §5 pass; no Unsplash, empty or placeholder asset remains; no dead link or button.

---

## Phase 3 — Contact and Brevo

**Goal:** an enquiry reaches the owner and the visitor gets a confirmation.

**Needed from the owner:** `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `CONTACT_TO_EMAIL` in `.env.local` and Vercel; verified sender; privacy notice decision (§12, questions 5–7).

| Includes                                                                            | project.md |
| ----------------------------------------------------------------------------------- | ---------- |
| Shared zod schema                                                                   | §6.1       |
| Brevo module and both email templates; remove `nodemailer` and `SMTP_*`             | §6.3       |
| New `/api/contact` with honeypot and error handling (#18)                           | §6.2, §9   |
| Form with name, email, message and all states (#16, #17)                            | §6.1       |
| Tests with Brevo mocked: success, invalid input, honeypot, each send failing        | §6.2       |

Build and test with Brevo mocked while the keys are missing.

**Done when:** a real submission on a preview delivers both emails; replying to the notification reaches the visitor; a forced failure keeps the typed text and shows the fallback address.

---

## Phase 4 — Motion, performance, SEO

**Goal:** the site feels modern and meets the targets.

**Needed from the owner:** nothing new.

| Includes                                                               | project.md |
| ---------------------------------------------------------------------- | ---------- |
| Animations and page transitions, with reduced-motion and fallbacks     | §7 Motion  |
| Image, font and client JavaScript pass                                 | §8         |
| Metadata, Open Graph image, `sitemap.ts`, `robots.ts`, favicon         | §8         |
| Styled `error.tsx` and `not-found.tsx` (#19, #20)                      | §9         |

**Done when:** every target in §8 passes on all four pages; with reduced motion on, nothing moves; content is readable with JavaScript off.

---

## Phase 5 — Harden and launch

**Goal:** the core flow works in production.

**Needed from the owner:** hosting plan decision (§12, question 8), domain and DNS, production variables in Vercel.

| Includes                                                       | project.md |
| -------------------------------------------------------------- | ---------- |
| Pass over every security rule; rate limit on `/api/contact`; security headers | §9 |
| Re-run the dependency audit                                    | §9         |
| Browser check: Chrome, Safari (iOS), Firefox, Android Chrome   | §7         |
| Domain connected, `NEXT_PUBLIC_SITE_URL` set                   | §11        |
| Final content review by the owner                              | §5         |

**Done when:** all seven steps of the core flow (§2) pass on the production URL, on a phone and a desktop.
