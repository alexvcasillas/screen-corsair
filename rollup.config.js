import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: './lib/index.js',
    output: {
      file: './dist/screen-corsair.js',
      format: 'cjs',
      globals: {
        react: 'React',
        'react-native': 'ReactNative',
      },
    },
    external: ['react', 'react-native'],
    plugins: [resolve(), babel(), filesize()],
  },
  {
    input: './lib/index.js',
    output: {
      file: './dist/screen-corsair.umd.js',
      format: 'umd',
      name: 'CrateboxReact',
      globals: {
        react: 'React',
        'react-native': 'React Native',
      },
    },
    external: ['react', 'react-native'],
    plugins: [resolve(), babel(), uglify(), filesize()],
  },
  {
    input: './lib/index.js',
    output: {
      file: './dist/screen-corsair.module.js',
      format: 'es',
      globals: {
        react: 'React',
        'react-native': 'React Native',
      },
    },
    external: ['react', 'react-native'],
    plugins: [resolve(), babel(), filesize()],
  },
];
