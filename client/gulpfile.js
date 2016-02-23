var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    gulpUtil = require('gulp-util'),
    stylish = require('jshint-stylish');

var source  = ['src/**/*.js'];

gulp.task('minify', function () {
        gulp.src(source)
            .pipe(concat('all.js'))
	    .pipe(uglify())
            .pipe(gulp.dest('build'));
});

gulp.task('jshint', function() {
	return gulp.src(source)
	    .pipe(jshint({
			"curly":  true,
			    "immed":  true,
			    "newcap": true,
			    "noarg":  true,
			    "sub":    true,
			    "boss":   true,
			    "eqnull": true,
			    "node":   true,
			    "undef":  true,
			    "globals": {
			    "angular": false,
				"_":       false,
				"jQuery":  false,
				"$":       false,
				"moment":  false,
				"console": false,
				"io":      false,
				},
			    }))
	    .pipe(jshint.reporter('default'))
	    //.pipe(uglify())
	    .pipe(concat('all.js'))
	    .pipe(gulp.dest('build'));
    });

gulp.task('default', ['jshint']);
