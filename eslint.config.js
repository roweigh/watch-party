import pluginVue from 'eslint-plugin-vue';
import stylisticJs from '@stylistic/eslint-plugin-js';
export default [
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      'no-unused-vars': 'warn',

      'indent': ['warn', 2],
      'quotes': ['warn', 'single'],
      'semi': 'warn',
      'no-trailing-spaces': 'warn',
      'comma-dangle': ['warn', 'always-multiline'],
      'space-in-parens': ['warn', 'never'],
      'object-curly-spacing': ['warn', 'always'],
      'array-bracket-spacing': ['warn', 'never'],
      'quote-props': 0,
      'semi-style': ['error', 'last'],

      'vue/first-attribute-linebreak': ['error', {
        'singleline': 'ignore',
        'multiline': 'below',
      }],
      'vue/multi-word-component-names': 0,
    },
  },
];