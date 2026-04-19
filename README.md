This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Production Security Baseline

Set these environment variables in production:

- `FINCHLEDGER_BASIC_AUTH`: required in production, format `username:password`
- `FINCHLEDGER_API_WRITE_LIMIT`: optional, defaults to `60` requests per minute per route+IP
- `FINCHLEDGER_API_WRITE_WINDOW_MS`: optional, defaults to `60000`
- `DATABASE_URL`: required for runtime and backup scripts

This project now enforces:

- Basic Auth at middleware entry (pages + APIs)
- API write-method rate limit (POST/PUT/PATCH/DELETE)
- Common secure headers (`X-Frame-Options`, CSP, `X-Content-Type-Options`)
- Request schema validation for major write APIs

## Deploy on Single Server

1. Install dependencies and build:

```bash
npm ci
npm run build
```

2. Start service with PM2:

```bash
pm2 startOrReload ecosystem.config.cjs --env production
pm2 save
```

Or run one command:

```bash
bash scripts/deploy.sh
```

3. Configure Nginx reverse proxy:

- Use `deploy/nginx.finchledger.conf`
- Add `limit_req_zone` in nginx `http {}` block before using rate limit directives

## Backup & Restore

Create backup:

```bash
BACKUP_DIR=./backups DATABASE_URL="postgres://..." bash scripts/backup-db.sh
```

Restore backup:

```bash
DATABASE_URL="postgres://..." bash scripts/restore-db.sh ./backups/finchledger_xxx.dump
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
