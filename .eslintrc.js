module.exports = {
  extends: [
    'standard',
    'plugin:vue/essential',
  ],
  /** Enable ES6 features */
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  rules: {
    "no-debugger": "off",
    'arrow-spacing': [2, {
      before: true,
      after: true,
    } ],

    'no-catch-shadow': 2,
    'no-delete-var': 2,
    'no-label-var': 2,
    'no-shadow-restricted-names': 2,
    'no-shadow': 2,
    'no-undef-init': 2,
    'no-undef': 2,
    'no-magic-numbers': [2, {
      ignoreArrayIndexes: true,
      ignore: [0, 1, -1],
    } ],

    'array-bracket-spacing': [2, 'never', {
      singleValue: true,
      objectsInArrays: true,
      arraysInArrays: true,
    } ],
    quotes: [1, 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    } ],
    eqeqeq: 0,
    'brace-style': [2, '1tbs'],
    'object-property-newline': [2, {
      allowAllPropertiesOnSameLine: false,
    } ],
    'newline-per-chained-call': 2,
    curly: [2, 'all'],

    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    } ],
    'comma-spacing': [2, {
      before: false,
      after: true,
    } ],
    'comma-style': [2, 'last'],

    'eol-last': 0,
    'no-nested-ternary': 1,
    'no-trailing-spaces': 2,
    'no-mixed-spaces-and-tabs': 2,
    'padded-blocks': [2, 'never'],
    'space-before-blocks': 1,
    'space-before-function-paren': [1, {
      anonymous: 'always',
      named: 'never',
    } ],
    'spaced-comment': [2, 'always', {
      exceptions: ['-', '+'],
      markers: ['=', '!'],
    } ],
    semi: [2, 'always'],
    indent: [2, 2, {
      SwitchCase: 1,
      VariableDeclarator: 2,
    } ],

    /**
     * Force use camelCase naming isnstead of underscore
     */
    camelcase: [2, {
      properties: 'always',
    } ],

    /**
     * Require blank lines between some statements:
     * - before return statement
     * - after variables declaration
     * - after directive prologues
     */
    'newline-after-var': 0,
    'padding-line-between-statements': [1, {
      blankLine: 'always',
      prev: '*',
      next: 'return',
    }, {
      blankLine: 'always',
      prev: ['const', 'let', 'var'],
      next: '*',
    }, {
      blankLine: 'any',
      prev: ['const', 'let', 'var'],
      next: ['const', 'let', 'var'],
    }, {
      blankLine: 'always',
      prev: 'directive',
      next: '*',
    }, {
      blankLine: 'any',
      prev: 'directive',
      next: 'directive',
    } ],

    'require-jsdoc': ['warn', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
        ArrowFunctionExpression: false,
      },
    } ],
    'valid-jsdoc': [1, {
      matchDescription: '.+',
      requireReturnDescription: false,
    } ],

    'one-var-declaration-per-line': [ 'warn' ],

    'prefer-const': ['error', {
      destructuring: 'all',
      ignoreReadBeforeAssign: true,
    } ],

    'multiline-comment-style': ['error', 'separate-lines'],
    'no-console': 0,
    'one-var': 0,
    'sort-keys': 0,
    'dot-notation': 0,
    'no-empty': 0,
    'standard/no-callback-literal': 0,
  },
  globals: {
    document: true,
    module: true,
    require: true,
    console: true,
    VERSION: true,
    Promise: true,
    MutationObserver: true,
    FormData: true,
    XMLHttpRequest: true,
    ActiveXObject: true,
    RegExp: true,
    Module: true,
    Node: true,
    Element: true,
    Proxy: true,
    Symbol: true,
    setTimeout: true,
    setInterval: true,
    clearInterval: true,
    clearTimeout: true,
    Math: true,
    Air: true,
    _log: true,

    Paragraph: true,
    Header: true,
    Embed: true,
  },
};
