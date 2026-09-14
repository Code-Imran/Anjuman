import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import { fileURLToPath } from 'node:url';

// Fail-safe plugin: Guarantees src/styles/global.css is injected into every page automatically
function injectGlobalCssPlugin() {
  return {
    name: 'vite-plugin-auto-inject-global-css',
    transform(code, id) {
      if (id.endsWith('BaseLayout.astro') && !code.includes('global.css')) {
        return {
          code: `import '../styles/global.css';\n` + code,
          map: null,
        };
      }
      return null;
    },
  };
}

export default defineConfig({
  site: 'https://anjuman.pages.dev',
  output: 'hybrid',
  adapter: cloudflare({
    imageService: 'passthrough',
    runtime: {
      mode: 'advanced',
      type: 'pages',
    },
  }),
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    react(),
    keystatic(),
  ],
  vite: {
    plugins: [injectGlobalCssPlugin()],
    resolve: {
      alias: {
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    ssr: {
      external: [
        'node:path',
        'node:fs',
        'node:fs/promises',
        'node:crypto',
        'node:stream',
        'node:buffer',
        'node:util',
        'node:url',
        'node:os',
      ],
    },
    optimizeDeps: {
      exclude: ['@keystatic/core'],
    },
  },
});
