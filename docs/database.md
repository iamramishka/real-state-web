# Database setup

Nordhaven uses Prisma 6 with PostgreSQL. The first migration defines the public
content, admin user, lead, media, AI operations, and audit tables required by
the admin work plan.

The public website still reads from `data/**`. X-102 only establishes the
database and seed pipeline; X-103 will add database-backed content readers.

## Local setup

1. Create an empty PostgreSQL database.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL` to the database connection string.
4. Generate the client, apply migrations, and seed the static content:

```bash
npm run db:generate
npm run db:migrate:deploy
npm run db:seed
```

Use `npm run db:migrate` while developing a new schema migration. Production
deployments should use `npm run db:migrate:deploy`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run db:validate` | Validate the Prisma schema. |
| `npm run db:generate` | Generate the typed Prisma client. |
| `npm run db:migrate` | Create and apply a development migration. |
| `npm run db:migrate:deploy` | Apply committed migrations without prompts. |
| `npm run db:seed` | Replace seeded public content from `data/**`. |
| `npm run db:studio` | Open Prisma Studio. |

## Seed safety

The seed imports the existing typed records from `data/**`. It resets only
seed-managed public content and does not delete admin users, leads, AI
operations, or audit history.

Production seeding is blocked unless `ALLOW_PRODUCTION_SEED=true` is explicitly
set for that command.
