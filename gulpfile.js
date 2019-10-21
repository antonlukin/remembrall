const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');


gulp.task('styles', (done) => {
  gulp.src('assets/styles/app.scss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(prefix())
    .pipe(concat('styles.min.css'))
    .pipe(cleanCss({
      compatibility: 'ie9'
    }))
    .pipe(gulp.dest('public/'));

  done();
});


gulp.task('watch', (done) => {
  gulp.watch('./assets/**/*', gulp.series('styles'));

  done();
})


gulp.task('default', gulp.parallel('styles', 'watch'));