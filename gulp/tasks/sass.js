'use strict';
//const isDev = process.env.NODE_ENV == 'development';
//const isDev = process.env.NODE_ENV || 'development';
//const isDev = process.env.NODE_ENV;
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV ==='development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;


module.exports = function (options) {
	
return function() {
	return combiner(
	gulp.src('src/sass/main.scss'),
			$.if(isDev, $.sourcemaps.init()),
			$.sass(),
			$.autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}),
			$.if(!isDev, $.purifycss(['build/**/*.html', 'build/js/**/*.js'])),
			$.groupCssMediaQueries(),
			$.if(!isDev, $.csscomb()),				// Мешает использовать опцию у Gulp-sass outputStyle: compressed
			$.if(!isDev, $.cssnano()),
			$.if(!isDev, $.rev()),
			$.if(isDev, $.sourcemaps.write()),
			gulp.dest('build/css'),
			$.if(!isDev, $.rev.manifest('css.json', {merge: true})),
			$.if(!isDev, gulp.dest('manifest'))
	).on('error', $.notify.onError(function (err) {
					return {
						title: 'Sass',
						message: err.message
					};
				}));
	
			/*.pipe(gp.browserSync.reload({
				stream: true
			}));*/
	
};

		


	
	
///*	gp.gulp.task('sass:build', function () {
//
//		return gp.gulp.src('src/sass/main.scss')
//			.pipe(gp.$.plumber({
//				errorHandler: gp.$.notify.onError(function (err) {
//					return {
//						title: 'Sass',
//						message: err.message
//					};
//				})
//			}))
//			
//			.pipe(gp.$.sass())
//			.pipe(gp.$.autoprefixer({
//				browsers: ['last 2 versions'],
//				cascade: false
//			}))
//			.pipe(gp.$.purifycss(['build/**/*.html', 'build/js/**/*.js']))
//			.pipe(gp.$.groupCssMediaQueries())
//			.pipe(gp.$.csscomb())
//			.pipe(gp.$.cssnano())
//			.pipe(gp.$.rev())
//			.pipe(gp.gulp.dest('build/css'))
//			.pipe(gp.combiner(gp.$.rev.manifest('css.json', {merge: true}), gp.gulp.dest('manifest')))
//			.pipe(gp.browserSync.reload({
//				stream: true
//			}));
//
//	});*/

};
