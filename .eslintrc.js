module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // overrides: [
  //   {
  //     files: ['../background_buddy/src/views/admin/faculties.vue.vue'],
  //     rules: {
  //       // Disable ESLint for the specific file(s)
  //       'vue/valid-v-slot': 'off',
  //     },
  //   },
  // ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'vue/valid-v-slot': 'off',

   


  }
}
