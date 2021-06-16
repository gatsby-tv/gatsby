import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

import pkg from './package.json';

const externalPackages = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.devDependencies),
];

function external(id) {
  return externalPackages.some((name) => id.startsWith(name));
}

const plugins = [
  resolve({
    extensions: ['.js', '.ts'],
  }),
  commonjs(),
  babel({
    extensions: ['.js', '.ts'],
    envName: 'production',
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
];

export default [
  {
    input: path.join(__dirname, 'lib', 'index.ts'),
    output: [
      {
        format: 'esm',
        dir: path.resolve(__dirname, path.dirname(pkg.main)),
        preserveModules: true,
      },
    ],
    plugins,
    external,
  },
];
