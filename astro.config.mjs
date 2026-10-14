import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { existsSync } from 'node:fs';
if (existsSync('.env')) process.loadEnvFile('.env');
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://haddar-bijoux.invalid',
  output: 'static', trailingSlash: 'always',
  i18n: { defaultLocale: 'fr', locales: ['fr', 'ar'], routing: { prefixDefaultLocale: false } },
  integrations: [sitemap({ filter: page => !/\/(404|merci)\/?$/.test(page), i18n: {defaultLocale:'fr', locales:{fr:'fr',ar:'ar'}} })],
  build: { inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
});
