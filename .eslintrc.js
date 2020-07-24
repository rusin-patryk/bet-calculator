module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    'no-plusplus': 'off',
    'space-before-function-paren': 'off',
    semi: 'off',
    'no-useless-constructor': 'off',
    'object-curly-spacing': 'off',
    camelcase: 'off',
    indent: 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'import/extensions': 'off',
    quotes: 'off',
    curly: 'off'
  }
}
