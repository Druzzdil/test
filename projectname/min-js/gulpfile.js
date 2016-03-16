var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];


//minify css
gulp.task('cssmin', function(){
  return gulp.src('css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('css/*.css'));

});

//minify js
gulp.task('compress', function() {
  gulp.src('*.js')
    .pipe(minify())
    .pipe(gulp.dest('min-js'))
});



gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});


gulp.task('default', ['sass', 'cssmin', 'compress'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass', 'cssmin', 'compress']);
});
