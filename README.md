# Anjuman-I-Islam School Website

Astro website for Anjuman-I-Islam Public School & Jr. College in Panchgani.

## Development

```sh
npm install
npm run dev
```

Build the static site with:

```sh
npm run build
```

## Authentication

Copy `.env.example` to `.env` and replace both values with the public URL and anonymous key from the Supabase project. The login and account creation controls show a clear configuration message until these values are present.

Supabase email/password authentication must also be enabled in the Supabase dashboard. After a successful sign-in, staff are sent to `/admin`.

## Routes

- `/` - school home page
- `/about` - school information
- `/admission-requirements` - admissions guidance
- `/contact` - contact and enquiry page
- `/login` - Supabase sign-in and account creation
- `/admin` - authenticated administration landing page

## Deployment

The site is configured for a static Cloudflare deployment using `wrangler.jsonc`. Set the Supabase public variables in the deployment environment before enabling production authentication.