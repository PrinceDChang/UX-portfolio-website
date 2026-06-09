# Oey Chang — UX Portfolio

Personal portfolio site for Oey Chang, UX designer and researcher.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Three Fiber (globe)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Static output is in `dist/` after `npm run build`.

### Netlify

This repo includes a [`netlify.toml`](netlify.toml) with build settings and SPA redirects for React Router.

1. Sign in at [netlify.com](https://www.netlify.com/) and choose **Add new site → Import an existing project**.
2. Connect **GitHub** and select **`PrinceDChang/UX-portfolio-website`**.
3. Netlify should auto-detect:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy site**. Each push to `main` will trigger a new deploy.

After the first deploy, set your site name or custom domain under **Site configuration → Domain management**.
