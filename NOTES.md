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

## Support System
- Implemented a complete support ticket system with the following features:
  - Ticket creation with categories (Technical, Billing, General, Feature Request)
  - Ticket management (create, view, update status)
  - Support analytics dashboard for admins
  - Email notifications for ticket updates
- Uses Supabase for ticket storage and management
- Protected routes for support features
- Admin-only access to analytics and ticket management

## Last Updated
- Support system implementation completed with ticket management and analytics
- All TODOs and notes reviewed and updated
- Ready for production deployment
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

## Payments (Stripe)
- Stripe is used for payment processing.
- Add the following to your `.env` and Netlify environment variables:
  - `VITE_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_SECRET_KEY`

## Serverless Functions & API Security

### OpenAI Integration
- OpenAI API calls are now handled by Netlify serverless functions
- The `generateIdea.ts` function handles all AI idea generation
- API key is stored securely in Netlify environment variables
- Rate limiting is implemented to prevent abuse
- Client-side code no longer has access to the API key

### Environment Variables
- Server-side variables (Netlify Functions):
  ```env
  OPENAI_API_KEY=your_openai_key
  ```
- Client-side variables (Vite):
  ```env
  VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
  ```

### Security Best Practices
- API keys are never exposed to the client
- Serverless functions handle all sensitive operations
- Rate limiting prevents abuse of the API
- Environment variables are properly segregated
- TypeScript types ensure type safety
- Error handling is implemented at all levels

### Deployment Notes
- Netlify Functions are automatically deployed with the main application
- Environment variables must be set in Netlify dashboard
- Functions are bundled using esbuild
- OpenAI package is marked as external to reduce bundle size 