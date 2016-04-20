var gulp = require('gulp');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify')
var clean = require('gulp-clean');
var ngAnnotate = require('gulp-ng-annotate')




gulp.task('concatenate', function () {
  gulp.src(['build/pmodules/api/libs/**/collections.js', 'build/pmodules/api/libs/**/documents.js'])
    .pipe(concat('tests/app.js'))
    .pipe(gulp.dest('.'))
})

gulp.task('template-cache', function () {
  return gulp.src('js/directives/**/*.html')
    .pipe(templateCache("templateCache.js",  { module:'templateCache', standalone:true,  base: __dirname}))
    .pipe(gulp.dest('dist'));
});

gulp.task('concatenate', function () {
  gulp.src('dist/json-gui.js', {read: false})
		.pipe(clean());
  gulp.src(['js/directives.js', 'js/directives/**/*.js'])
    .pipe(concat('dist/json-gui.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('.'))
})

gulp.task('concatenatecss', function () {
  gulp.src('dist/json-gui.css', {read: false})
		.pipe(clean());
  gulp.src(['css/directives/**/*.css','js/directives/**/*.css'])
    .pipe(concat('dist/json-gui.css'))
    .pipe(gulp.dest('.'))
})


gulp.task('watch', ['concatenate'], function () {
  gulp.watch('js/directives/**/*.js', ['concatenate'])
  gulp.watch('js/directives.js', ['concatenate'])
  gulp.watch('js/directives/**/*.css', ['concatenatecss'])
  gulp.watch('css/directives/**/*.css', ['concatenatecss'])
})

/** This is a description of the foo function. */
function foo() {
}
