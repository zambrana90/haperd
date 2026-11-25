# Haperd & Co. — Agent Rules

A portfolio website for a wedding stationery and live illustration studio. Next.js, no database, no auth, Brevo for the contact emails.

## Start here

1. Read the status table in `docs/plan.md`. Work on the first phase that isn't `Done`, unless the owner asks for something else.
2. Read that phase, then only the `docs/project.md` sections it lists, plus §3 (stack and constraints) and §9 (security).
3. Check the code before trusting the docs. If they disagree, say so and fix the doc.

| File              | Read it for                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `docs/project.md` | What we build: pages, contact form, design, quality targets, open questions |
| `docs/plan.md`    | Phases, in order, with their status                                         |

## Stop and ask

| Situation                                                                 | Do                                                   |
| ------------------------------------------------------------------------- | ---------------------------------------------------- |
| You need a key, account, sign-in or domain change                         | Say exactly what you need and where it goes          |
| You need content: images, links, business details, new claims             | Ask. Never invent it.                                |
| The task is unclear or conflicts with `project.md`                        | Ask. Don't guess.                                    |
| You want to add a service, a database, auth, tracking or a new page       | It is out of scope (`project.md` §13). Ask first.    |

## Never

- Merge your own PR, push to `main`, or deploy production.
- Commit a secret, or handle raw keys in chat.
- Send real emails from tests.

## Code conventions

| Area         | Rule                                                                      |
| ------------ | ------------------------------------------------------------------------- |
| Types        | TypeScript `strict`. No `any`.                                            |
| Components   | Server components by default. Reuse `src/components`.                     |
| Styling      | Tailwind with the tokens in `globals.css`. No hardcoded hex or inline style objects in new code. |
| Language     | UI text in Spanish. Code, comments and docs in English.                   |
| Dependencies | Allowed. Name it and the reason in the PR body.                           |
| Tests        | Vitest. At least one test per API route and per pure function.            |

## Commands

| Command          | Does                            |
| ---------------- | ------------------------------- |
| `pnpm install`   | Install dependencies            |
| `pnpm dev`       | Run locally                     |
| `pnpm build`     | Production build                |
| `pnpm lint`      | Lint (broken after the Next.js upgrade until Phase 0 replaces `next lint`) |
| `pnpm typecheck` | Added in Phase 0                |
| `pnpm test`      | Added in Phase 0                |

## Before you open a PR

- Run lint, typecheck, test and build. All must pass.
- Check UI changes at 375 px and desktop width.
- PR body: what changed, how you tested, and the phase's "Done when" items checked or explained.
- Update `docs/plan.md` status and remove fixed rows from `project.md` §4.

## Talking to the owner

- Lead with the result. Short sentences, plain words.
- For a decision, give 2–4 options with the recommended one first.
- Say what you verified and what you're guessing.
