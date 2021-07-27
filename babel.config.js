module.exports = {
  babelrcRoots: ['.', 'packages/*'],
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            node: 'current',
            edge: 17,
            firefox: 60,
            chrome: 67,
            safari: '11.1',
          },
          modules: false,
          useBuiltIns: 'usage',
          corejs: '3.7.0',
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [],
};
