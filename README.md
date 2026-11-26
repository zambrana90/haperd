# Haperd & Co.

Portfolio website for Haperd & Co., a wedding stationery and live illustration studio.

## Requirements

- Node.js 26 or later
- pnpm (the exact version is pinned in `package.json` under `packageManager`)

## Setup

1. Install the dependencies:

   ```bash
   pnpm install
   ```

2. Create your local environment file, then fill in the values you need. Each variable is described in the file.

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server and open <http://localhost:3000>:

   ```bash
   pnpm dev
   ```

The pages run without any values. Sending the contact form needs `CONTACT_TO_EMAIL` and the `SMTP_*` variables.

## Commands

| Command          | Does                 |
| ---------------- | -------------------- |
| `pnpm install`   | Install dependencies |
| `pnpm dev`       | Run locally          |
| `pnpm build`     | Production build     |
| `pnpm lint`      | Lint                 |
| `pnpm typecheck` | Type check           |
| `pnpm test`      | Tests                |

## Docs

- [Project](docs/project.md): what we build, including pages, the contact form, design and quality targets.
- [Plan](docs/plan.md): the phases, in build order.

## Secrets

This repository is public. Never commit secrets: keep values in `.env.local`. Git ignores every `.env*` file except `.env.example`, which holds names only.
