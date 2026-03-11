// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import mermaid from "astro-mermaid";

const isGHPages = process.env.DEPLOY_TARGET === 'ghpages';
const site = isGHPages ? 'https://zafarale.github.io' : 'https://acert.dev';
const base = isGHPages ? '/cloudification' : undefined;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    icon({
      include: {
        mdi: ['*'],
        logos: ['*'],
        'skill-icons': ['*'],
        clarity: ['*'],
      },
    }),
    expressiveCode(),
    mermaid({
      autoTheme: false,
      mermaidConfig: {
        theme: 'dark',
        flowchart: { htmlLabels: true, nodeSpacing: 60, rankSpacing: 90 },
        themeVariables: {
          darkMode: true,
          background: 'transparent',
          mainBkg: 'transparent',
          primaryColor: 'transparent',
          primaryBorderColor: '#6b7280',
          primaryTextColor: '#e2e8f0',
          lineColor: '#6b7280',
          edgeLabelBackground: 'transparent',
          clusterBkg: 'transparent',
          clusterBorder: '#374151',
          fontSize: '16px',
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
});
