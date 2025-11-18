# Netlify Deployment Guide

## 📋 Prerequisites

- Netlify account
- Git repository connected to Netlify
- Backend server deployed (on Render or another service)

## 🚀 Deployment Steps

### 1. Connect Repository to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Netlify will automatically detect the `netlify.toml` configuration

### 2. Configure Build Settings

Netlify will automatically use the settings from `netlify.toml`:
- **Build command**: `cd apps/client && pnpm install && pnpm build`
- **Publish directory**: `apps/client/dist`
- **Node version**: 18
- **PNPM version**: 8

### 3. Environment Variables

Add these environment variables in Netlify Dashboard → Site settings → Environment variables:

#### Required:
- `VITE_API_URL` - Your backend API URL (e.g., `https://your-server.onrender.com`)

#### Optional:
- `NODE_ENV` - Set to `production`

### 4. Update API URL in Client

If you need to configure the API URL, update `apps/client/vite.config.ts` or create a `.env.production` file:

```env
VITE_API_URL=https://your-server.onrender.com
```

### 5. Deploy

1. Push your changes to the main branch
2. Netlify will automatically build and deploy
3. Your site will be available at `https://your-site.netlify.app`

## 🔧 Configuration Files

### `netlify.toml`

This file contains:
- Build settings
- Redirects for SPA routing
- Security headers
- Cache headers for assets

### Proxy API Requests (Optional)

If you want to proxy API requests through Netlify, uncomment the proxy section in `netlify.toml`:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-server.onrender.com/api/:splat"
  status = 200
  force = true
```

Then update your client code to use `/api` instead of the full server URL.

## 📝 Notes

- The client is deployed as a static site
- The server should be deployed separately (e.g., on Render)
- All routes are redirected to `index.html` for React Router to work
- Assets are cached for 1 year for better performance

## 🐛 Troubleshooting

### Build fails with "pnpm not found"
- Make sure `PNPM_VERSION = "8"` is set in `netlify.toml`
- Or install pnpm globally in Netlify build settings

### Routes return 404
- Make sure the redirect rule `/* → /index.html` is in `netlify.toml`
- Check that React Router is configured correctly

### API calls fail
- Verify `VITE_API_URL` is set correctly
- Check CORS settings on your backend server
- Make sure `CLIENT_URL` in backend includes your Netlify domain

