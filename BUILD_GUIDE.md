# Build Guide - BayanBites Astro Site

## 🚀 How This Static Site Works

This is a **fully static site** that fetches content from Strapi **only during build time**. After building:

- All content is embedded in HTML
- All images are downloaded locally
- The site works WITHOUT Strapi running

## 📝 When to Rebuild

You need to rebuild whenever you change content in Strapi:

- ✅ Added/edited menu items
- ✅ Changed hero section
- ✅ Updated images
- ✅ Modified any Strapi content

## 🛠️ Build Commands

### Standard Build (Most Common)

```bash
npm run build
```

### Full Clean Build (If Having Issues)

```bash
rm -rf public/uploads dist .astro && npm run build
```

### Preview Built Site

```bash
npx astro preview
```

Opens preview server (usually at http://localhost:4323)

### Development Server (Fetches from Strapi on Every Load)

```bash
npm run dev
```

Opens dev server (usually at http://localhost:4321)

## 🎯 Typical Workflow

1. **Make changes in Strapi** (add menu items, update hero, etc.)
2. **Rebuild the site:** `npm run build`
3. **Preview locally:** `npx astro preview`
4. **Deploy:** Push to your hosting (Vercel, Netlify, etc.)

## 📦 What Happens During Build

1. ✅ Validates `PUBLIC_STRAPI_URL` is set
2. ✅ Fetches all content from Strapi API
3. ✅ Downloads all images to `public/uploads/`
4. ✅ Generates static HTML with embedded content
5. ✅ Copies everything to `dist/` folder

## ⚠️ Important Notes

- **Build will fail** if Strapi is not running or `PUBLIC_STRAPI_URL` is not set
- **Images are downloaded** during build and stored in `public/uploads/`
- **No runtime API calls** - everything is static after build
- **Strapi can be offline** after the site is built

## 🔧 Environment Variables

Required in `.env` file:

```
PUBLIC_STRAPI_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your-token-here  # Optional
```

## 🌐 Deployment

After building, deploy the `dist/` folder to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting

The site will work completely independently from Strapi!
