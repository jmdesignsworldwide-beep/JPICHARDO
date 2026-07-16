// ESLint 9 flat config. eslint-config-next 16 exporta configs planas nativas.
import next from 'eslint-config-next/core-web-vitals';

const config = [
  ...next,
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
];

export default config;
