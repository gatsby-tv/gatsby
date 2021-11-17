const path = require('path');
const withTM = require('next-transpile-modules')([
  '@gatsby-tv/components',
  '@gatsby-tv/layout',
  '@gatsby-tv/services',
  '@gatsby-tv/styles',
  '@gatsby-tv/utilities',
]);

const config = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src'), require('@gatsby-tv/styles')],
  },
  webpack: (config) => {
    config.resolve.alias['@src'] = path.resolve(`${__dirname}/src`);
    return config;
  },
};

module.exports =
  process.env.NODE_ENV === 'development' ? withTM(config) : config;
