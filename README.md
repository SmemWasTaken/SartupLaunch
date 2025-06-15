# StartupLaunch - AI-Powered Micro-Startup Generator

A modern React application that helps entrepreneurs generate startup ideas using AI and provides launch-ready templates and tools.

## Features

- 🤖 AI-powered startup idea generation
- 🔐 Supabase authentication with Google & GitHub OAuth
- 📱 Responsive design with mobile-first approach
- 🛡️ Security hardening with CSP, XSS protection, and input sanitization
- 🧪 Comprehensive testing with Vitest and Cypress
- ⚡ Performance optimized with code splitting and lazy loading
- 📊 Analytics integration ready
- 🎨 Beautiful UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth with Google & GitHub OAuth
- **Database**: Supabase (PostgreSQL)
- **Testing**: Vitest (unit), Cypress (e2e)
- **Icons**: Lucide React
- **Validation**: Zod
- **Security**: DOMPurify, CSP headers

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Supabase project with Authentication enabled
- Google OAuth credentials
- GitHub OAuth app

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd startup-launch
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment template:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Supabase Setup

1. Create a new Supabase project at [Supabase Dashboard](https://supabase.com/dashboard)

2. Get your project credentials:
   - Go to Settings > API
   - Copy the Project URL and anon public key
   - Copy the service_role secret key (for server-side operations)

3. Set up the database schema:
   - Go to SQL Editor in your Supabase dashboard
   - Run the migration script from `supabase/migrations/001_initial_schema.sql`

4. Enable Authentication providers:
   - Go to Authentication > Providers
   - Enable Google and GitHub providers
   - Add your OAuth app credentials

5. Configure redirect URLs:
   - Add your domain to the allowed redirect URLs
   - For development: `http://localhost:5173/dashboard`
   - For production: `https://your-domain.com/dashboard`

### OAuth Provider Setup

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Add authorized origins:
   - `http://localhost:5173` (development)
   - Your production domain
6. Add authorized redirect URIs:
   - Use the redirect URL provided in your Supabase Auth settings

#### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL:
   - Use the redirect URL provided in your Supabase Auth settings

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Testing

Run unit tests:
```bash
npm run test
```

Run tests with UI:
```bash
npm run test:ui
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run end-to-end tests:
```bash
npm run test:e2e
```

Run e2e tests headlessly:
```bash
npm run test:e2e:headless
```

### Building

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

### Security

The application includes several security measures:

- **Content Security Policy (CSP)** headers
- **XSS Protection** with DOMPurify
- **Input Sanitization** for all user inputs
- **Row Level Security (RLS)** in Supabase
- **Secure Headers** (HSTS, X-Frame-Options, etc.)
- **Environment Variable Validation**

### Database Schema

The application uses the following main tables:

- **profiles**: User profile information
- **startup_ideas**: AI-generated startup ideas for each user
- **user_templates**: Templates purchased by users

All tables have Row Level Security enabled to ensure users can only access their own data.

### Deployment

The application is configured for deployment on:

- **Netlify** (primary) - see `netlify.toml`
- **Vercel** (alternative) - see `vercel.json`

Both configurations include:
- Automatic builds from main branch
- Security headers
- SPA routing support
- Asset optimization

Make sure to add your Supabase environment variables to your deployment platform's environment settings.

### Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks (including useAuth)
├── lib/                # Library configurations (Supabase client)
├── pages/              # Page components
├── test/               # Test files and utilities
├── types/              # TypeScript type definitions
└── utils/              # Utility functions

supabase/
└── migrations/         # Database migration files
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### License

This project is licensed under the MIT License.