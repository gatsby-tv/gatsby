const path = require('path');
const { EnvironmentPlugin } = require('webpack');

const { dependencies } = require('./package.json');

module.exports = {
  externals: [...Object.keys(dependencies || {})],

  mode: 'production',
  target: 'node',
  entry: './src/server.dev.js',

  output: {
    filename: 'server.prod.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules'],
  },

  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
    }),
  ],
}
