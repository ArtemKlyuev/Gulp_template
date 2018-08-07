'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {
	
	return function () {
		return combiner(
			gulp.src(['src/img/**/*.{png,jpg,jpeg,gif}', '!src/img/png_sprites'], {
				since: gulp.lastRun('img')
			}),
			$.newer('build/img/'),
			$.debug({
				title: 'img'
			}),
			gulp.dest('build/img/')
		)
	};

};







//module.exports = function () {
//	gp.gulp.task('img:dev', () => {
//		return gp.gulp.src('src/img/**/*.{png,jpg,gif}', '!src/img/png_sprites')
//			.pipe(gp.gulp.dest('build/img/'));
//	});
//
//	gp.gulp.task('img:build', () => {
//		return gp.gulp.src('src/img/**/*.{png,jpg,gif}',  '!src/img/png_sprites')
//			.pipe(gp.$.tinypngCompress({
//					key: 'JgfDkXf_pbETnWAM_xANz_vq8fzAx_aF',
//					summarise: true,
//					sigFile: 'src/img/.tinypng-sigs',
//					log: true
//			}))
//			.pipe(gp.gulp.dest('build/img/'));
//	});
//};


// Возможно добавить rev
