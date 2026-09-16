import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://claude-code-guide.example.com',
  output: 'static',
  compressHTML: true,
  adapter: cloudflare()
});