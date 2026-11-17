# Deploying GreenLedger

GreenLedger is a Vite single-page app. It can be deployed free on Vercel.

1. Create a new Vercel project from this repository.
2. Use the default build command: `npm run build`.
3. Set the output directory to `dist`.
4. Do not set Supabase variables for a shareable demo. The workspace will run in demonstration mode.
5. For a production setup, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the deployment settings. Never set a service-role key in a `VITE_` variable.

`vercel.json` rewrites client routes to `index.html`, so links such as `/workspace` work when opened directly.

## Production checklist

- Move demo activity records, factors, evidence, and approvals to organization-scoped database tables.
- Enforce Supabase row-level security for organization members and supplier submissions.
- Pin a factor ID, source, reporting period, GWP basis, and calculation version to every calculation run.
- Replace illustrative/demo factors before reporting externally.
- Require human review for AI-extracted evidence and material disclosure decisions.
