export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: {
            minify: true,      // renames ids to short unique strings
            remove: true,      // removes unused ids
          },
        },
      },
    },
    {
      name: 'removeAttrs',
      params: { attrs: ['width', 'height'] },
    },
  ],
};