import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// eslint-config-next 15.x usa el formato clásico (.eslintrc); FlatCompat lo
// adapta a la config plana de ESLint 9.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  ...compat.extends('next/core-web-vitals'),
  { ignores: ['.next/**', 'node_modules/**'] },
];

export default config;
