# Project Notes: StartupLaunch

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