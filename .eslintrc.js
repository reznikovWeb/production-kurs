module.exports = {
   env: {
      browser: true,
      es2021: true,
      jest: true,
   },
   extends: ['plugin:react/recommended', 'airbnb', 'plugin:i18next/recommended'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks'],
   rules: {
      'react/jsx-indent': [2, 3],
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
      'no-unused-vars': 'warn',
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
            ignoreAttribute: ['data-testid', 'to'],
         },
      ],
      'max-len': ['error', { ignoreComments: true, code: 120 }],
      'linebreak-style': 0,
      'arrow-body-style': ['warn', 'as-needed'],
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'implicit-arrow-linebreak': 'warn',
      'no-param-reassign': 'off',
      'object-curly-newline': 'off',
      'operator-linebreak': 'off',
      'prefer-template': 'off',
      'no-undef': 'off',
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
