# Deployment Guide

## Backend (Already on Render)

Your backend is deployed on Render. The root URL shows:
```json
{
  "message": "Drug Discovery API Server",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

**Backend URL**: `https://your-app.onrender.com` (replace with actual URL)

## Frontend Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   cd /Users/kshitijbhatia/Documents/GitHub/Frontend
   vercel
   ```

3. **Or via GitHub**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Configure:
     - **Framework**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Environment Variable**:
       - `VITE_API_URL` = `https://your-backend.onrender.com`

### Option 2: Netlify

1. **Deploy via CLI**:
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod
   ```

2. **Or via GitHub**:
   - Go to [netlify.com](https://netlify.com)
   - Import repo
   - Configure:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`
     - **Environment Variable**:
       - `VITE_API_URL` = `https://your-backend.onrender.com`

### Option 3: Render Static Site

1. Go to Render Dashboard → New Static Site
2. Connect your repo
3. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variable**:
     - `VITE_API_URL` = `https://your-backend.onrender.com`

## Environment Variables

### Development (Local)
`.env` file (already created, not committed):
```
VITE_API_URL=
```
Empty = uses Vite proxy to `localhost:3001`

### Production
Set in your hosting platform:
```
VITE_API_URL=https://your-backend.onrender.com
```

## Testing Production Build Locally

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Set production API URL for testing
VITE_API_URL=https://your-backend.onrender.com npm run build
npm run preview
```

## Commit & Push

```bash
git add .
git commit -m "Add production config and deployment setup"
git push
```

## Verification Checklist

- [ ] Backend deployed on Render and returns JSON at root
- [ ] Frontend builds without errors (`npm run build`)
- [ ] Environment variable `VITE_API_URL` set in hosting platform
- [ ] Frontend can reach backend APIs
- [ ] CORS configured on backend (already done)
- [ ] Test paracetamol query shows custom data
- [ ] AI chat works
- [ ] Sources modal opens

## Troubleshooting

**CORS errors**: Backend already has CORS enabled for all origins.

**API calls fail**: Check browser console. Verify `VITE_API_URL` is set correctly.

**404 on refresh**: Enable SPA fallback:
- **Vercel**: automatic
- **Netlify**: add `_redirects` file: `/* /index.html 200`
- **Render**: add `Rewrite Rules` in settings

