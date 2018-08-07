'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV ==='development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;
const fs = require('fs');

module.exports = function(options) {
	
	return function() {
		return combiner(
			gulp.src('src/pug/pages/index.pug'),
				$.pugLint2(),
				$.pug({
					locals: {
						nav: JSON.parse(fs.readFileSync('data/navigation.json', 'utf8'))
					},
					pretty: true
				}),
				$.if(!isDev, $.revReplace({
					manifest: gulp.src('manifest/css.json', {allowEmpty: true})
				})),
				gulp.dest('build')
		).on('error', $.notify.onError(function (err) {
					return {
						title: 'Pug',
						message: err.message
					};
				}));
	};
		
//		gulp.src('src/pug/pages/index.pug')
//			.pipe(gp.$.plumber({
//				errorHandler: gp.$.notify.onError(function (err) {
//					return {
//						title: 'Pug',
//						message: err.message
//					};
//				})
//			}))
//			.pipe(gp.$.pugLint2())
//			.pipe(gp.$.pug({
//				locals: {
//					nav: JSON.parse(gp.fs.readFileSync('data/navigation.json', 'utf8'))
//				},
//				pretty: true
//		}))
//		.pipe(gp.gulp.dest('build'))
//		
//	
//	
//	
//	gp.gulp.task('pug:build', function() {
//		
//		return gp.gulp.src('src/pug/pages/index.pug')
//			.pipe(gp.$.pug({
//				locals: {
//						nav: JSON.parse(gp.fs.readFileSync('data/navigation.json', 'utf8'))
//					},
//				pretty: false
//		}))
//		.pipe(gp.$.revReplace({
//			manifest: gp.gulp.src('manifest/css.json')
//		}))
//		.pipe(gp.gulp.dest('build'))
//		.on('end', gp.browserSync.reload);
//		
//	});
	
};