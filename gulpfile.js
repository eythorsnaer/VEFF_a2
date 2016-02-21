var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

gulp.task('minify', function () {
	gulp.src('client/**/*.js')
	    .pipe(uglify())
	    .pipe(gulp.dest('build'))
});

gulp.task('jshint', function() {
	return gulp.src('./lib/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'))

});