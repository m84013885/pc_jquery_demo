const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const path = require('path')
const ts = new Date().getTime()
gulp.task('app', () => {
  gulp.src([
    path.resolve(__dirname, '../node_modules/babel-polyfill/dist/polyfill.min.js'),
    path.resolve(__dirname, '../node_modules/jquery/dist/jquery.min.js')

  ])
    .pipe(concat('lib.js', { newLine: ';' }))
    .pipe(rename({ suffix: `.${ts}` }))
    .pipe(uglify()).on('error', () => {})
    .pipe(gulp.dest('./common/'))
})
