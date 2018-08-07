'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV ==='development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function(options) {
	
	return function() {
		return combiner(
			gulp.src('src/img/svg/*.svg'),
			$.if(isDev, $.svgSprite({
			mode: {
				css: {
					dest: '../',
					bust: false,
					sprite: '../svg/sprite.svg',
					prefix: '@mixin sprite-%s',
					layout: 'vertical',
					dimensions: true,
					render: {
						scss: {
							template: 'template_svg_sprite.scss',
							dest: 'utilities/_svg-sprite.scss'
						}
					}
				}
			}
		}), $.svgSprite({
			mode: {
				css: {
					dest: '../',
					bust: true,
					sprite: '../svg/sprite.svg',
					prefix: '@mixin sprite-%s',
					layout: 'vertical',
					dimensions: true,
					render: {
						scss: {
							template: 'template_svg_sprite.scss',
							dest: '_svg-sprite.scss'
						}
					}
				}
			}
		})),
			$.if('*.scss', gulp.dest('src/sass/utilities/'), gulp.dest('build/img/svg/'))
		).on('error', $.notify.onError(function (err) {
					return {
						title: 'Svg sprites',
						message: err.message
					};
				}));
	};
	
		
			
			
	
	
	
	
	
//	gp.gulp.task('svg:build', () => {
//		return gp.gulp.src('src/img/svg/*.svg')
//			.pipe(gp.$.plumber({
//					errorHandler: gp.$.notify.onError(function (err) {
//						return {
//							title: 'Svg',
//							message: err.message
//						};
//					})
//				}))
//			.pipe(gp.$.svgSprite({
//			mode: {
//				css: {
//					dest: '.',
//					bust: true,
//					sprite: 'sprite.svg',
//					prefix: '%%',
//					layout: 'vertical',
//					dimensions: true,
//					render: {
//						scss: {
//							dest: '_svg-sprite.scss'
//						}
//					}
//				}
//			}
//		}))
//			.pipe(gp.$.if('*.scss', gp.gulp.dest('src/sass/utilities/'), gp.gulp.dest('build/img/svg/')));
//	});
};