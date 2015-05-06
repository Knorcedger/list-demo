var gulp = require('gulp'),
	connect = require('gulp-connect');


gulp.task('run', function() {
	connect.server({
		root: 'app',
		port: 3000
	});
});
