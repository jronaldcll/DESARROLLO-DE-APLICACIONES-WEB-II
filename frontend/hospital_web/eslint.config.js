module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: { 
      ecmaVersion: 2023, 
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      parserOptions: { 
        project: './tsconfig.json',
        ecmaVersion: 2023,
        sourceType: 'module',
      },
    },
    plugins: {
      '@angular-eslint': require('@angular-eslint/eslint-plugin'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: require('@angular-eslint/template-parser'),
    },
    plugins: {
      '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
    },
    rules: {
      ...require('@angular-eslint/eslint-plugin-template').configs.recommended.rules,
    },
  },
];