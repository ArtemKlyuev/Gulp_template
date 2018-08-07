'use strict';
//const isDev = !process.env.NODE_ENV || process.env.NODE_ENV ==='development';
//let isDev = process.env.NODE_ENV =='development';
//const isDev = process.env.NODE_ENV;
const gulp = require('gulp');								// Подключаем Gulp
/*	sass 			= require('gulp-sass'),							// Подключаем Sass пакет
	 						// Подключаем Browser Sync
	concat			= require('gulp-concat'), 						// Подключаем gulp-concat (для конкатенации файлов)
	uglify			= require('gulp-uglify'), 						// Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano			= require('gulp-cssnano'), 						// Подключаем пакет для минификации CSS
	rename			= require('gulp-rename'), 						// Подключаем библиотеку для переименования файлов
	del				= require('del'), 								// Подключаем библиотеку для удаления файлов и папок
	imagemin		= require('gulp-imagemin'), 					// Подключаем библиотеку для работы с изображениями
	pngquant		= require('imagemin-pngquant'), 				// Подключаем библиотеку для работы с png
	cache			= require('gulp-cache'), 						// Подключаем библиотеку кеширования
	autoprefixer	= require('gulp-autoprefixer'), 				// Подключаем библиотеку для автоматического добавления префиксов
	uncss 			= require('gulp-uncss'), 						// Подключаем пакет для удаления ненужный CSS-стилей
	htmlmin 		= require('gulp-htmlmin'), 						// Подключаем пакет для минификации HTML
	sourcemaps		= require('gulp-sourcemaps'), 					// Подключаем sourcemaps проекта
	rigger			= require('gulp-rigger'), 						// Подключаем rigger для встатвки файлов внутри файла
	psi				= require('psi'), 								// Подключаем Google PageSpeed Insigths
	pug				= require('gulp-pug'), 							// Подключаем компиляцию Pug
	csscomb			= require('gulp-csscomb'),						// Причёсываем css
	plumber			= require('gulp-plumber'),						// Пишет об ошибках
	pngSprite		= require('gulp.spritesmith'), 					// Png спрайты
	svgSprite		= require('gulp-svg-sprites'),  				// Svg спрайты
	svgMin			= require('gulp-svgmin'),						// Минификация svg
	cheerio			= require('gulp-cheerio'),						// Удаление лишних атрибутов из svg
	replace			= require('gulp-replace'),						// Замена строки(исп для svg плагинов выше, подробнее на заьре в статье про svg)
	notify			= require('gulp-notify'),						// Оповещения
	groupMQ			= require('gulp-group-css-media-queries'),		// Группировка медиа запросов
	purifycss			= require('gulp-purifycss'),					// Очищаем css от лишних стилей(умеет смотреть в js файлы)
	rev				= require('gulp-rev'),
	revReplace		= require('gulp-rev-replace'),
	revCss			= require('gulp-rev-css-url'),
	debug			= require('gulp-debug'),
	gulpIf			= require('gulp-if'),
	newer			= require('gulp-newer'),
	remember		= require('gulp-remember'),
	path			= require('path'),
	cached			= require('gulp-cached'),
	combiner		= require('stream-combiner2').obj,
	browserSync 	= require('browser-sync').create();*/

//  debug(?), ngrok, merge-stream,
	// глянуть csso, typographic, gulp-util, vinyl-source-stream, vinyl-buffer, gulp-manifest, gulp-template, rimraf, gulp-jshint, gulp-jscs, doiuse,
	//  gulp-shorthand, vinyl-ftp



/*global.gp = {
	
	gulp: 	 				require('gulp'),
	combiner:				require('stream-combiner2').obj,
	browserSync:		require('browser-sync').create(),
	$:							require('gulp-load-plugins')(),
	combiner:		 		require('stream-combiner2').obj,
	del:						require('del'),
	//jsonfile:				require('jsonfile'),
	fs:							require('fs'),
	smartGrid:			require('smart-grid'),
	
	path: {
		tasks: require('./gulp/config/tasks.js')
	}
	
};

gp.path.tasks.forEach(function(taskPath) {
	require(taskPath)();
});*/




	
//const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV ==='development'; 			// Если переменная не задана или если её значение равно development, то мы в состоянии разработки

function lazyRequireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);
		
		return task(callback);
		
	});
};

lazyRequireTask('del', './gulp/tasks/del');
lazyRequireTask('sass', './gulp/tasks/sass');
lazyRequireTask('css:libs', './gulp/tasks/css-libs');
lazyRequireTask('pug', './gulp/tasks/pug');
lazyRequireTask('scripts', './gulp/tasks/scripts');
lazyRequireTask('scripts:libs', './gulp/tasks/scripts-libs');
lazyRequireTask('svg:sprites', './gulp/tasks/svg-sprites');
lazyRequireTask('img', './gulp/tasks/img');
lazyRequireTask('serve', './gulp/tasks/serve');
lazyRequireTask('watch', './gulp/tasks/watch');
lazyRequireTask('smartGrid', './gulp/tasks/smartGrid');


/*

gulp.task('assets', function() {
	return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
		.pipe(newer('public'))
		.pipe(gulpIf(!isDevelopment, revReplace({
			manifest: gulp.src('manifest/css.json', {allowEmpty: true})
	})))
		.pipe(debug({title: 'assets'}))
		.pipe(gulp.dest('public'));
});
*/

gulp.task('dev', gulp.series('del', gulp.series('svg:sprites'), gulp.parallel('pug', 'sass', 'css:libs', 'img', 'scripts', 'scripts:libs'), gulp.parallel('watch', 'serve')));
gulp.task('build', gulp.series('del', 'svg:sprites', gulp.parallel('scripts:libs', 'scripts', 'sass', 'css:libs'), 'pug'));


// Создаём таск для сжатия изображений

//gulp.task('img', function(){
//	return gulp.src('src/img/**/*') 			// Берем все изображения из app
//	.pipe(cache(imagemin({ 						// Сжимаем их с наилучшими настройками с учетом кеширования
//		interlaced: true,
//		progressive: true,
//		svgoPlugins: [{removeViewBox: false}],
//		use: [pngquant()]
//	})))
//	.pipe(gulp.dest('dist/img')); 				// Выгружаем на продакшен
//});


//gulp.task('clear', function () { 				// автономный таск для очистки кеша Gulp, чтобы его можно было вызывать простой командой gulp clear
//    return cache.clearAll();
//})