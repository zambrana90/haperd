# Haperd & Co. — Team Rules

A portfolio website for a wedding stationery and live illustration studio. Next.js, no database, no auth, Brevo for the contact emails. A team of agents builds it, run from JSM HQ. Every agent follows this file. JSM HQ adds your role, the team, the workflow rules and your tools when your session starts. "Owner" in the docs means the product owner.

## Docs

| File              | Read it for                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `docs/project.md` | What we build: pages, contact form, design, quality targets, open questions |
| `docs/plan.md`    | The phases, in build order, and their lanes                                 |

- Your task (from `get_my_task`) lists the `project.md` sections it needs. Read those, plus §3 and §9, not the whole file.
- Tasks and status live only in JSM HQ. Never add them to `docs/plan.md`.
- Phase 0 begins with a project audit. No code changes until the product owner approves its findings.
- Check the code before trusting the docs. If they disagree, say so.
- When your PR fixes a row in `project.md` §4, remove it in the same PR.

## How to talk to the product owner

- Lead with the answer or result. No preamble, no recap at the end.
- Short sentences, plain words. No paragraph over 3 sentences.
- A table for comparisons, a numbered list for steps. Plain text for a short answer.
- Need a decision? Use the AskUserQuestion tool: 2–4 options, recommended first, marked "(Recommended)", one line on why each.
- One decision at a time unless they're linked. Never more than 3.
- Say what you know vs. what you're guessing.

## Before you open a PR

- Run all checks (see Commands). All must pass.
- Check UI changes at 375 px and desktop width.
- PR body: what changed, how you tested, and the task's done-when list with each item checked or explained.
- Vercel deploys a preview of every PR. Check your change on it, and put the preview URL in the PR. If the repo isn't connected to Vercel yet (early Phase 0), say so in the PR and skip this check.

## Checking your change on a Vercel preview

- Get the preview URL from GitHub, never from the branch name (Vercel shortens long names): the Vercel comment on your PR (`gh pr view <n> --comments`), or the PR's deployment status (`gh api repos/<owner>/<repo>/deployments?ref=<branch>`). Wait until the deployment succeeds.
- Previews are protected. Send the header `x-vercel-protection-bypass: $VERCEL_AUTOMATION_BYPASS_SECRET` on every request. For browser tests, also send `x-vercel-set-bypass-cookie: true` on the first request.
- If a preview URL is blocked by your sandbox, call `request_access` for `*.vercel.app` (all previews) rather than the single URL.

## When you must stop and ask

| Situation | Do |
| --- | --- |
| You need to change the contact schema (`src/lib/contact`) after it is merged, or design tokens the other lane uses | Stop. That's a contract change. The lead plans it; the product owner approves it. |
| The task is unclear or conflicts with `project.md` | Stop. Ask. Don't guess. |
| You need content: images, links, business details, new claims | Stop. Ask. Never invent it. |
| You want to add a service, a database, auth, tracking or a new page | Stop. It is out of scope (`project.md` §13). |
| You need an account, a key, a sign-in or a domain change | Stop. Say exactly what you need and where it goes (e.g. your env file). These are the product owner's job. |

## Reviews and your next task

- Fix every valid CodeRabbit or lead comment on the same branch. If a comment is wrong, reply on the PR with the reason. Answer every thread.
- Once your PR is open, the lead may give you your next task. Take it on a new branch from `main`.
- When review comments arrive on an earlier PR, switch back to that branch, fix, push, and return. Don't call `set_my_status` for the earlier task: it would update your current one. HQ tracks the earlier PR by itself.
- Never start a task that needs code from one of your open PRs. If nothing independent is ready, say so.
- Never merge your own PR, never push to `main`, never force-push a branch under review. Never deploy production.

## Security rules

`docs/project.md` §9 lists every rule. The ones you must never break:

- No secret in `NEXT_PUBLIC_*` or a commit. Never remove `.env*` from `.gitignore` (`.env.example` is the only exception). The repo is public.
- Validate input on the server.
- Never put visitor-written text in the confirmation email.
- Never send real emails from tests.

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

| Command          | Does             |
| ---------------- | ---------------- |
| `pnpm install`   | Install dependencies |
| `pnpm dev`       | Run locally      |
| `pnpm build`     | Production build |
| `pnpm lint`      | Lint             |
| `pnpm typecheck` | Type check       |
| `pnpm test`      | Tests            |

`typecheck` and `test` don't exist until Phase 0 adds them. Phase 0 also replaces `next lint`.
