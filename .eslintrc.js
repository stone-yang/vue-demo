// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow unnamed functions
    'func-names': 0,
    // allow console statement
    'no-console': 0,
    // allow shadow declaration of variables
    'no-shadow': 0,
    // allow param reassign
    'no-param-reassign': 0,
    'prefer-default-export': 0,
    // allow unused variables
    'no-unused-vars': 0,
    'no-unused-expressions': 0,
    // allow require
    'global-require': 0,
    // allow both string concatenation and template string
    'prefer-template': 0,
    // allow block statement surrounding arrow body
    'arrow-body-style': 0,
    // warn for unlisted project's dependencies
    'import/no-extraneous-dependencies': process.env.NODE_ENV === 'production' ? 0 : 1,
  }
}
