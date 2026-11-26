# Plan

The build order for Haperd & Co. `docs/project.md` describes each item in detail. "#" numbers refer to its known problems table (§4).

## Rules

- Build phases in this order. Don't add, remove, or reorder phases.
- Every phase after Phase 0 has two parallel lanes, one per developer, so nobody waits.
- Each phase is one board in JSM HQ. The lead creates the board and its tasks there, with the product owner, before the phase starts. The next phase can be broken down while the current one is being built.
- Tasks and their status live only in JSM HQ. This file never lists tasks.
- A phase is done when all its tasks are merged and its "Done when" checks pass on the latest Vercel preview (locally, until Vercel is connected). Production goes live only in Phase 5.
- Each phase lists what it needs from the product owner. When an agent reaches a step that needs it, it stops and asks (see `CLAUDE.md`). Agents never create accounts or handle raw keys in chat. Open questions are in `project.md` §12.
- Keep JSM HQ's "Export plan to docs/plan.md" off. It would overwrite this file.

---

## Phase 0 — Audit, foundation and upgrade

**Goal:** an audited, safe, clean base that builds and deploys. The site looks the same.

**Lanes:** one. The lead plans it like any other phase, and gives every task to one developer.

**Needed from the product owner:** nothing at the start. The Vercel project exists (`zambrana90s-projects/haperd`) and checks the repo's commits. During this phase, before the Next.js upgrade (#1) is merged: turn off automatic production promotion. After it is merged and before the last task: allow `*.vercel.app` in each developer's sandbox, and add `VERCEL_AUTOMATION_BYPASS_SECRET` to each developer's env file (Vercel → Deployment Protection → Protection Bypass for Automation). The lead plans the Vercel check as the last task.

The first deployment (`c1bd7b3`) failed on 2026-11-25. The build log confirms the cause: Vercel blocks the vulnerable Next.js 15.3.0 (#21).

### Step 1 — Audit the project (always first)

Do this before changing any code. `project.md` §4 is a starting point from a quick review, not a full audit.

| Area             | Check                                                                             |
| ---------------- | --------------------------------------------------------------------------------- |
| Dependencies     | Known advisories, outdated and unused packages                                    |
| Security         | Every rule in `project.md` §9, API input handling, headers, error leaks           |
| Secrets          | Working tree and full git history; personal data in the code (the repo is public) |
| Build and deploy | Install, build, lint, types; why the Vercel deployment fails                      |
| Bugs             | Every page and control in the browser, at phone and desktop width                 |
| Quality          | Accessibility, performance and SEO baseline (`project.md` §8)                     |

The audit is the first task on the board, and the only one that can start.

1. Add each finding to `project.md` §4 with its severity and phase. Remove rows that turn out to be wrong. Open a PR.
2. The lead shows the product owner the findings, most severe first, and waits for approval.
3. The lead then creates the fix tasks. Security and build problems are fixed in this phase; design and content problems go to their phase.

### Step 2 — Fix and set up

| Includes                                                                                       | project.md |
| ---------------------------------------------------------------------------------------------- | ---------- |
| Fix the security problems and bugs the audit assigns to this phase                             | §4, §9     |
| Upgrade Next.js (and `eslint-config-next`) to the latest patched release; clear the audit (#1) | §3, §9     |
| pnpm only: commit `pnpm-lock.yaml` and `pnpm-workspace.yaml`, delete `package-lock.json` (#2)  | §3         |
| Scripts `lint` (ESLint CLI), `typecheck`, `test` (Vitest, one first test) (#3)                 | §3         |
| Fix `next.config.ts`; remove the Netlify plugin (#4, #5)                                       | §3         |
| `.env.example`, with `.gitignore` allowing it; a real `README.md`                              | §11        |
| CI on every PR: lint, typecheck, test, build                                                   |            |

**Done when:** the audit findings are recorded in `project.md` §4; every security and build finding is fixed or the product owner has accepted it; all four checks pass; the production audit shows no critical or high advisories; a PR gets a preview where all four pages work.

---

## Phase 1 — Design system and layout

**Goal:** the new look's foundations and a shared shell that works on every screen.

**Needed from the product owner:** approve the type and color direction on the preview.

| Lane                | Includes                                                                                                                                                          | project.md |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **A — Foundations** | Tokens in `@theme`, fonts through `next/font`, global CSS fixes (#6–#9, #13). Base components: button, container, section, text styles                             | §7         |
| **B — Shell**       | Header, navigation, mobile menu, footer rebuilt; server components where possible (#10, #11). One `h1` per page, landmarks, skip link, `lang="es"` (#12) | §5, §8     |

Lane A puts the tokens first. Lane B uses temporary styles until they are merged.

**Done when:** every page uses the new shell with no horizontal scroll at 375, 768 and 1440 px; the menu works by keyboard; fonts load as designed; the product owner approves the direction.

---

## Phase 2 — Pages

**Goal:** the four pages redesigned, responsive, with real content.

**Needed from the product owner:** images, social links, "¿Cómo trabajamos?" steps, voice (`project.md` §12, questions 1–4). Missing content doesn't block layout work: mark placeholders clearly. The phase isn't done until they are replaced.

| Lane                       | Includes                                                                                                                                            | project.md |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **A — Home + Live art**    | Home. Live art, with working buttons and the how-it-works steps (#15). Their local optimized images (#14)                                           | §5, §7, §8 |
| **B — About us + Contact** | About us. Contact page layout and accessible FAQ (the form logic is Phase 3). Real social links (#15). Their images; delete unused files in `public` (#14) | §5, §8     |

**Done when:** all "Done when" checks in `project.md` §5 pass; no Unsplash, empty or placeholder asset remains; no dead link or button.

---

## Phase 3 — Contact and Brevo

**Goal:** an enquiry reaches the owner and the visitor gets a confirmation.

**Needed from the product owner:** `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `CONTACT_TO_EMAIL` in the env files and Vercel; verified sender; privacy notice decision (`project.md` §12, questions 5–7).

| Lane                | Includes                                                                                                                                                                                      | project.md     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **A — API + Brevo** | Brevo module and both email templates; remove `nodemailer` and `SMTP_*`. New `/api/contact` with honeypot and error handling (#18). Tests with Brevo mocked: success, invalid input, honeypot, each send failing | §6.2, §6.3, §9 |
| **B — Form**        | Form with name, email, message and all states (#16, #17)                                                                                                                                      | §6.1, §6.2     |

The shared zod schema comes first, in one task. Lane B mocks the API until Lane A is merged. Lane A mocks Brevo while the keys are missing.

**Done when:** a real submission on a preview delivers both emails; replying to the notification reaches the visitor; a forced failure keeps the typed text and shows the fallback address.

---

## Phase 4 — Motion, performance, SEO

**Goal:** the site feels modern and meets the targets.

**Needed from the product owner:** nothing new.

| Lane                      | Includes                                                                                                                                              | project.md |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **A — Motion**            | Animations and page transitions, with reduced-motion and fallbacks                                                                                    | §7         |
| **B — Performance + SEO** | Image, font and client JavaScript pass. Metadata, Open Graph image, `sitemap.ts`, `robots.ts`, favicon. Styled `error.tsx` and `not-found.tsx` (#19, #20) | §8, §9     |

**Done when:** every target in `project.md` §8 passes on all four pages; with reduced motion on, nothing moves; content is readable with JavaScript off.

---

## Phase 5 — Harden and launch

**Goal:** the core flow works in production.

**Needed from the product owner:** hosting plan decision (`project.md` §12, question 8), domain and DNS, production variables in Vercel.

| Lane             | Includes                                                                                                                                  | project.md  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| **A — Security** | Pass over every security rule; rate limit on `/api/contact`; Content-Security-Policy (#34); re-run the dependency audit                  | §9          |
| **B — Launch**   | Browser check: Chrome, Safari (iOS), Firefox, Android Chrome. Domain connected, `NEXT_PUBLIC_SITE_URL` set. Final content review by the product owner | §5, §7, §11 |

**Done when:** all seven steps of the core flow (`project.md` §2) pass on the production URL, on a phone and a desktop.
