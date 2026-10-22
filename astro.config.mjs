import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// Enforce strict build origin to https://github.com/Code-Imran/Anjuman
const allowedRepo = 'Code-Imran/Anjuman';
const currentRepo = process.env.GITHUB_REPOSITORY || process.env.CF_PAGES_PROJECT_NAME;

// If built in a forked repo or unauthorized CI runner, inject a poison pill
const isAuthorizedBuild = !process.env.GITHUB_REPOSITORY || process.env.GITHUB_REPOSITORY.toLowerCase() === allowedRepo.toLowerCase();

if (!isAuthorizedBuild) {
  console.error('\x1b[31m[SECURITY]\x1b[0m Unauthorized repository build detected. Execution terminated.');
  process.exit(1);
}

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [tailwind()],
  vite: {
    define: {
      __BUILD_REPO__: JSON.stringify(allowedRepo),
      __PROD_HOST__: JSON.stringify('residentialschool.in')
    }
  }
});
