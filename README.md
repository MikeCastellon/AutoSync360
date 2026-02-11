# AutoSync 360

Professional fleet detailing services landing page built with React and Vite.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach with hamburger navigation
- ✨ Smooth scroll animations
- 📧 Contact form with Postmark email integration
- 🚀 Optimized for Netlify deployment

## Tech Stack

- React 18
- Vite
- Netlify Functions (Serverless)
- Postmark API

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment on Netlify

### Environment Variables

Configure these environment variables in your Netlify dashboard under **Site settings > Environment variables**:

- `POSTMARK_API_KEY` - Your Postmark server API token
- `FROM_EMAIL` - The verified sender email address (e.g., noreply@yourdomain.com)
- `TO_EMAIL` - Recipient email addresses, comma-separated (e.g., sales@autosync360.com,info@autosync360.com)

### Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will auto-detect the build settings from `netlify.toml`
4. Add the required environment variables
5. Deploy!

## Contact Form

The contact form uses Netlify Functions to send emails via Postmark API. The serverless function is located at `netlify/functions/send-email.js`.

### Testing Locally with Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create a .env file (copy from .env.example)
cp .env.example .env

# Add your environment variables to .env

# Run locally with Netlify functions
netlify dev
```

## License

© 2035 AutoSync 360
