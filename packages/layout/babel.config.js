module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          edge: 17,
          firefox: 60,
          chrome: 67,
          safari: '11.1',
        },
        useBuiltIns: 'usage',
        corejs: '3.7.0',
        loose: true,
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-object-assign',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    [
      'module-resolver',
      {
        root: './lib',
        alias: {
          '@lib': './lib',
        },
      },
    ],
  ],
};
