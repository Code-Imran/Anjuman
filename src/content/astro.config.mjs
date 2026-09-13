import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://anjuman.pages.dev',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    keystatic(),
  ],
  vite: {
    resolve: {
      alias: {
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
