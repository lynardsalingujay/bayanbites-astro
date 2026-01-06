// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  image: {
    domains: ['bayanbites.skyguyver.com'],
  },
  integrations: [tailwind()],
  vite: {
    server: {
      allowedHosts: [
        'vilma-unreverberated-undespondently.ngrok-free.dev',
        'localhost',
      ],
    },
  },
});
