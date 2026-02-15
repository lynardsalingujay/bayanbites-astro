/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#F2B301',      // Main brand color (gold/yellow)
        secondary: '#8B7355',    // Body text color (tan)
        accent: '#F5A623',       // Hover/accent color (gold)
        background: '#f5f1ed',   // Page background (beige)
        'nav-bg': '#F6F1ED',     // Navigation background
      },
    },
  },
  plugins: [],
}
