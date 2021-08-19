const path = require('path');
const autoprefixer = require('autoprefixer');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  stories: ['../lib/components/**/*.stories.@(js|jsx|ts|tsx)'],
  core: {
    builder: 'webpack5',
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]_[local]__[hash:base64:5]',
          },
        },
        sassLoaderOptions: {
          sassOptions: {
            includePaths: [path.join(__dirname, '..', 'lib')],
          },
        },
      },
    },
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
    reactDocgenTypescriptOptions: {},
  },
  webpackFinal: (config) => {
    config.plugins.push(new NodePolyfillPlugin());
    return config;
  }
};
