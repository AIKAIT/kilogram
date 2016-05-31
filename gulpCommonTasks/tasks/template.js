var gulp = require('gulp');
var config = require('../config').template;
var inlineCss = require('gulp-inline-css');
var htmlmin = require('gulp-html-minifier');
var notify = require("gulp-notify");
var nunjucksRender = require('gulp-nunjucks-render');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').get('sync');

gulp.task('template', function() {
	nunjucksRender.nunjucks.configure([config.cwd], {
		watch: false
	});
	return gulp.src(config.src, {
			cwd: config.cwd
		})
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(nunjucksRender())
		.pipe(inlineCss({
			removeStyleTags: false
		}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS: true
		}))
		.pipe(notify({
			title: 'Email',
			message: 'Build Done',
			sound: "Pop"
		}))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
});
