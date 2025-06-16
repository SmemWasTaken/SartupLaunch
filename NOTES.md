# Project Notes: StartupLaunch

## Clerk Authentication Integration
- Integrated Clerk authentication using the Clerk React SDK (`@clerk/clerk-react`).
- The app is wrapped in `<ClerkProvider>` in `src/main.tsx` using the publishable key.
- Professional sign-in and sign-up pages are available at `/sign-in` and `/sign-up`, using Clerk's `<SignIn />` and `<SignUp />` components.
- The header displays Sign In/Sign Up buttons (when signed out) and a user avatar menu (when signed in), all styled to match the app.
- To protect routes, use Clerk's `useAuth`, `SignedIn`, or `SignedOut` components as needed.

## Admin Dashboard
- The `/admin` route is protected and only accessible to the user with the email `admin@startuplaunch.com`.
- If a non-admin user attempts to access `/admin`, they will see an "Access denied: Admins only" message.
- The Admin Dashboard allows customization of the site's primary color and displays an analytics overview section.

## Analytics Integration
- Google Analytics is integrated using Measurement ID: `G-NF4BRVQHV4`.
- The Admin Dashboard includes a placeholder for live analytics (visitors, page views, etc.).
- To enable live analytics, connect the Google Analytics Data API and update the fetch logic in `src/components/AdminDashboard.tsx`.
- See the [Google Analytics Data API docs](https://developers.google.com/analytics/devguides/reporting/data/v1) for setup instructions.

## Deployment
- The project is deployed to Netlify: [https://microsaaslaunch.netlify.app](https://microsaaslaunch.netlify.app)
- To deploy, use `npx netlify deploy --prod` after pushing changes to GitHub.

## Other Features
- Editable profile page at `/profile` for all users.
- All ideas page at `/dashboard/ideas`.
- Protected routes for dashboard and admin features.

## Development Notes
- All protected routes use the `ProtectedRoute` component.
- To add more admin features, update `src/components/AdminDashboard.tsx`.
- For questions or improvements, see the README or contact the project maintainer.

# Deployment & Auth Notes (Updated)

## Authentication
- The app now uses **Clerk** for all authentication (sign in, sign up, user context, protected routes).
- All legacy custom auth and demo mode logic has been removed.

## Database
- Uses **Supabase** for all data storage (ideas, profiles, templates).
- Live Supabase project is configured via `.env`.

## AI Integration
- Uses **OpenAI GPT** for idea generation.
- API key is set in `.env` as `VITE_OPENAI_API_KEY`.

## Environment Variables
- `.env` (for local dev) and Netlify environment settings (for production) must include:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `VITE_OPENAI_API_KEY`
- `.env.example` provides placeholders for onboarding new developers.

## Deployment Checklist
- All environment variables are set in Netlify.
- No custom auth code remains; only Clerk is used.
- All protected routes use Clerk's user context.
- Supabase and OpenAI keys are live.

## Last Updated
- Clerk-only auth, live Supabase, and OpenAI integration completed.
- See GitHub commit history for details.

## Email Integration
- Transactional email is now handled via [Resend](https://resend.com/).
- API key is set directly in `src/lib/resend.ts` (for now; move to env for production).
- Use `sendEmail({ to, subject, html })` from `src/lib/resend.ts` to send emails anywhere in the app.
- Example:
  ```ts
  import { sendEmail } from '../lib/resend';
  await sendEmail({ to: 'user@example.com', subject: 'Welcome!', html: '<b>Hello!</b>' });
  ``` 