# StartupLaunch

A comprehensive platform for entrepreneurs to generate, validate, and launch startup ideas using AI.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

## Features

### Core Functionality
- AI-powered idea generation
- Idea validation and analysis
- Dashboard for idea management
- Favorites system for saving ideas
- User authentication and profiles

### Paid Features
- Advanced analytics dashboard
- Team management
  - Team creation and settings
  - Member invitations and roles
  - Team activity tracking
- API access for enterprise users
- Custom domains for enterprise users

### Support Features
- Support ticket system
  - Ticket creation and management
  - Priority levels and categories
  - Internal notes and status tracking
- Community forum
  - Discussion posts and comments
  - Reactions and engagement
  - Category-based organization
- Knowledge base
  - Searchable articles
  - Helpful/Not helpful feedback
  - Category organization
- Analytics dashboard
  - Support metrics visualization
  - Team performance tracking
  - Custom date ranges
  - Export capabilities (CSV/PDF)

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: 
  - Radix UI for accessible components
  - Tailwind CSS for styling
  - Recharts for data visualization
- **State Management**: React Context
- **Routing**: React Router
- **Analytics**: Custom analytics service
- **Authentication**: Custom auth system (local storage for demo)
- **Data Visualization**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/startuplaunch.git
   cd startuplaunch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_ANALYTICS_KEY=your_analytics_key
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   └── ...            # Feature-specific components
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
├── services/          # Service layer
├── types/             # TypeScript type definitions
└── routes.tsx         # Application routes
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

- Follow the TypeScript and React best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments and documentation
- Follow the established project structure

### Git Workflow

1. Create a new branch for each feature/fix
2. Write meaningful commit messages
3. Submit a pull request for review
4. Ensure all tests pass before merging

## Deployment

### Netlify Deployment

This project is configured for automatic deployment on Netlify. The deployment process includes:

1. **Automatic Builds**
   - Builds are triggered on push to the main branch
   - Preview deployments are created for pull requests
   - Branch deployments are available for feature branches

2. **Environment Configuration**
   - Environment variables are managed through Netlify's dashboard
   - Required variables:
     ```env
     VITE_API_URL=your_api_url
     VITE_ANALYTICS_KEY=your_analytics_key
     ```

3. **Build Settings**
   - Node.js version: 18
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Build plugins: None required

4. **Security Headers**
   - Content Security Policy (CSP)
   - X-Frame-Options
   - X-Content-Type-Options
   - X-XSS-Protection
   - Referrer-Policy

5. **Custom Domain**
   - Configure your custom domain in Netlify's dashboard
   - SSL/TLS certificates are automatically provisioned
   - DNS records are managed through Netlify

### Manual Deployment

To deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. Test the production build locally:
   ```bash
   npm run preview
   ```

3. Deploy to your hosting provider:
   - Upload the contents of the `dist` directory
   - Configure your server to handle client-side routing
   - Set up environment variables
   - Configure security headers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)