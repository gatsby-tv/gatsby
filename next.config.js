const path = require('path');
const webpack = require('webpack');
const withTM = require('next-transpile-modules')([
  '@gatsby-tv/components',
  '@gatsby-tv/layout',
  '@gatsby-tv/services',
  '@gatsby-tv/utilities',
]);

const config = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
  webpack: (config) => {
    config.resolve.alias['@src'] = path.resolve(`${__dirname}/src`);
    return config;
  },
};

module.exports =
  process.env.NODE_ENV === 'development' ? withTM(config) : config;
