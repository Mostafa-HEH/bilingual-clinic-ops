# bilingual-clinic-ops

Open-source bilingual (Arabic/English) clinic operations platform.

## Why bilingual-first

Most clinic tooling treats Arabic as an afterthought — a translation file bolted on
once the product is "done" — which breaks everything from RTL layouts to mixed-script
patient names and dual-calendar scheduling. This project makes bilingual operation a
first-class architectural constraint from day one: every domain model, API contract,
and screen is designed to hold Arabic and English side by side, so clinics serving
Arabic-speaking communities get software that works in the language their staff and
patients actually use.

## Architecture

```
                ┌─────────────────────────────┐
                │  apps/web  (Next.js)        │  ← planned, not built yet
                └──────────────┬──────────────┘
                               │ HTTP
                ┌──────────────▼──────────────┐
                │  apps/api  (NestJS)         │
                │  /health   /docs (Swagger)  │
                └──────────────┬──────────────┘
                               │ TypeORM (DATABASE_URL)
                ┌──────────────▼──────────────┐
                │  PostgreSQL 16 (docker)     │
                └─────────────────────────────┘
```

pnpm workspace monorepo orchestrated by turbo. `apps/api` is live; `apps/web` and
shared `packages/*` slots are reserved.

## Quickstart

```bash
cp .env.example .env      # adjust if ports/credentials differ on your machine
docker compose up -d      # postgres 16 with healthcheck
pnpm i
pnpm dev                  # api on http://localhost:3000
```

Then check:

- `GET http://localhost:3000/health` — app + live Postgres ping
- `http://localhost:3000/docs` — Swagger UI

Other root scripts: `pnpm lint`, `pnpm test`, `pnpm test:e2e` (needs the compose
postgres running), `pnpm build`.

## Roadmap

- [x] Scaffold: monorepo, postgres, config validation, health, docs, CI
- [ ] Auth + RBAC (staff roles: admin / doctor / receptionist)
- [ ] Clinic domain: patients, services, appointments (+ TypeORM migrations)
- [ ] Bilingual content model + i18n conventions (Arabic/English, RTL-first)
- [ ] `apps/web` (Next.js) front office
- [ ] v0.1 release

## Disclaimer

Operations tooling only — this project manages clinic logistics with synthetic data
and provides no medical advice.
