module.exports = {
   env: {
      browser: true,
      es2021: true,
      jest: true,
   },
   extends: [
      'plugin:react/recommended',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:i18next/recommended',
      'airbnb',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'fsd-rules'],
   rules: {
      'react/jsx-indent': 'off',
      'react/jsx-indent-props': [2, 3],
      indent: 'off',
      'react/jsx-filename-extension': [
         2,
         {
            extensions: ['.js', '.jsx', '.tsx'],
         },
      ],
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'no-shadow': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-underscore-dangle': 'off',
      'react/react-in-jsx-scope': 'off',
      'i18next/no-literal-string': [
         'error',
         {
            markupOnly: true,
            ignoreAttribute: [
               'data-testid',
               'to',
               'target',
               'justify',
               'align',
               'direction',
               'gap',
               'div',
            ],
         },
      ],
      'max-len': ['error', { ignoreComments: true, code: 125 }],
      'linebreak-style': 0,
      'arrow-body-style': ['warn', 'as-needed'],
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'implicit-arrow-linebreak': 'off',
      'no-param-reassign': 'off',
      'object-curly-newline': 'off',
      'operator-linebreak': 'off',
      'prefer-template': 'off',
      'no-undef': 'off',
      'react/no-array-index-key': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off',
      'fsd-rules/path-checker': 'error',
   },
   globals: {
      __IS_DEV__: true,
      __API__: true,
      __PROJECT__: true,
   },
   overrides: [
      {
         files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
         rules: {
            'i18next/no-literal-string': 'off',
            'max-len': 'off',
            'operator-linebreak': 'off',
         },
      },
   ],
};
