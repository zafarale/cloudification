// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import mermaid from "astro-mermaid";
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    icon(),
    expressiveCode({
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
      themes: ['vitesse-dark', 'vitesse-light'],
      themeCssSelector: (theme) =>
        theme.type === 'dark' ? 'html:not(.theme-day)' : 'html.theme-day',
      styleOverrides: {
        borderRadius: '0.5rem',
        frames: {
          frameBoxShadowCssValue: 'none',
        },
      },
    }),
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
