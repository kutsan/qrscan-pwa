module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },
  rules: {
    semi: 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        'prettier/@typescript-eslint',
        'prettier',
      ],
      rules: {
        'react/require-default-props': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/media-has-caption': 'off',
      },
    },
  ],
}
