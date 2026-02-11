# Copilot Instructions - BayanBites Astro

## Project Overview

This is a **static site** for BayanBites (Filipino food service) built with Astro + Tailwind CSS. Content is fetched from a Strapi CMS **only at build time**. After building, the site is fully static and works independently of Strapi.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server at localhost:4321 (fetches from Strapi on every load) |
| `npm run build` | Build static site (fetches all content from Strapi) |
| `npm run preview` | Preview built site locally |
| `rm -rf public/uploads dist .astro && npm run build` | Clean build (use if having issues) |

## Architecture

### Build-Time Data Fetching

All Strapi API calls happen **during build**, not at runtime:
- `/src/pages/*.astro` files fetch data in frontmatter using `fetchStrapi()` or `fetchStrapiSingle()`
- Images are downloaded from Strapi and saved to `public/uploads/` during build
- Final output is pure static HTML with no API dependencies
- Build fails loudly if Strapi is unavailable or `PUBLIC_STRAPI_URL` is not set

### Key Files

- **`src/lib/strapi.ts`** - Strapi API client and TypeScript interfaces
  - `fetchStrapi()` - Fetch collection types (e.g., menu items)
  - `fetchStrapiSingle()` - Fetch single types (e.g., homepage)
  - `downloadStrapiImage()` - Download images to local `public/uploads/` during build
  - Validates `PUBLIC_STRAPI_URL` on import (build fails if missing)

- **`src/pages/index.astro`** - Main page with embedded HTML/Tailwind (no separate layout file)
  - Fetches menu items and homepage data in frontmatter
  - Inline navigation, hero, menu grid, and footer

- **`src/components/Hero.astro`** - Hero section with CMS-managed content
  - Falls back to hardcoded defaults if CMS data unavailable
  - Downloads hero image at build time

- **`src/components/SimpleMenuCard.astro`** - Menu item card
  - Downloads menu item images at build time
  - Displays cuisine badges and "Made to Order" tags

## Environment Setup

Required in `.env`:
```
PUBLIC_STRAPI_URL=https://your-strapi-instance.com
```

Optional:
```
STRAPI_API_TOKEN=your-token-here
```

Copy `.env.example` to `.env` before building.

## Conventions

### Image Handling
- Images are downloaded during build via `downloadStrapiImage()`
- Saved to `public/uploads/` with original filename
- Components use local paths (e.g., `/uploads/image.jpg`) in production
- Remote URLs used as fallback if download fails

### Color Scheme (Tailwind)
- Brown: `#6B4423` (primary text/buttons)
- Gold: `#F5A623` (accents/hover states)
- Beige: `#f5f1ed` (background)
- Tan: `#8B7355` (secondary text)

### Component Props
- Use TypeScript interfaces from `src/lib/strapi.ts`
- Astro components accept props via `interface Props { ... }`
- Extract with `const { prop } = Astro.props;`

### Error Handling
- Build fails if Strapi unreachable (by design)
- Specific error messages for 401, 403, 404, 500+ status codes
- Console logs only in dev mode (`import.meta.env.DEV`)

## Common Workflows

### Adding New CMS Content
1. Update content in Strapi
2. Run `npm run build` (fetches new content)
3. Deploy `dist/` folder

### Adding New Page
1. Create `.astro` file in `src/pages/` (e.g., `about.astro`)
2. Fetch data in frontmatter if needed: `const data = await fetchStrapi('endpoint')`
3. Images will auto-download during build

### Modifying Strapi Types
1. Update interfaces in `src/lib/strapi.ts`
2. Update populate parameters in `fetchStrapi()` or `fetchStrapiSingle()` URL strings
3. Update component props accordingly

## Troubleshooting

### Build Fails
- Check `PUBLIC_STRAPI_URL` is set in `.env`
- Verify Strapi is running and accessible
- Check API token permissions if using authentication
- Run clean build: `rm -rf public/uploads dist .astro && npm run build`

### Images Not Showing
- Images are downloaded to `public/uploads/` at build time
- Check console for download errors during build
- Verify Strapi image URLs are accessible
