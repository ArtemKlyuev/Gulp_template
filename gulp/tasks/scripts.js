'use strict';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV ==='development';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;

module.exports = function(options) {
	
	return function() {
		
		return combiner (
			gulp.src('src/js/**/*.js'),
			//$.cached('scripts'),
			//$.remember(),
			//.pipe($.concat('scripts.min.js'))
			//$.if(!isDev, $.uglify()),
			gulp.dest('build/js')
		).on('error', $.notify.onError(function (err) {
					return {
						title: 'Scripts',
						message: err.message
					};
				}));
		 
		
	};
	
};