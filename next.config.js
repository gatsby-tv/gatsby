const path = require('path');
const webpack = require('webpack');
const withTM = require('next-transpile-modules')([
  '@gatsby-tv/components',
  '@gatsby-tv/content',
  '@gatsby-tv/utilities',
]);

const pkg = require('./package.json');

const externals = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.devDependencies),
];

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
