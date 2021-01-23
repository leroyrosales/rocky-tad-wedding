// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    cssnano({
      preset: 'default'
    }),
    purgecss({
      content: ['index-2.html'],
      css: ['css/style.css'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }),
  ]
}
