// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import mermaid from "astro-mermaid";


// https://astro.build/config
export default defineConfig({
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
      autoTheme: true,
      mermaidConfig: {
        theme: 'base',
        flowchart: { htmlLabels: true },
        themeVariables: {
          background: 'transparent',
          mainBkg: 'transparent',
          primaryColor: 'transparent',
          primaryBorderColor: '#6b7280',
          primaryTextColor: '#9ca3af',
          lineColor: '#6b7280',
          edgeLabelBackground: 'transparent',
          clusterBkg: 'transparent',
          clusterBorder: '#374151',
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
});
