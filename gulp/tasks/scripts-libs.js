'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV ==='development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function (options) {
	return function() {
		return combiner(
			gulp.src('node_modules/**/jquery.bxslider.js'),
			$.rename('libs.js'),
			$.if(!isDev, $.uglify()),
			gulp.dest('build/js')
		).on('error', $.notify.onError(function (err) {
					return {
						title: 'Scripts',
						message: err.message
					};
				}));
	};
};