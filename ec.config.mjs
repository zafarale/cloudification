import { defineEcConfig } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

export default defineEcConfig({
  themes: ['github-dark', 'github-light'],
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) =>
    theme.name === 'github-dark'
      ? '.theme-night'
      : '.theme-day',
  styleOverrides: {
    borderRadius: '0.75rem',
    codeFontFamily: 'JetBrains Mono, monospace',
    codeFontSize: '0.875rem',
  },
});