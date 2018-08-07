module.exports = function () {
	gp.gulp.task('pngSprites:dev', function() {
		return gp.gulp.src('src/img/png_sprites/**/*.png')
			.pipe(gp.$.spritesmith({
				imgName: 'sprite.png',
				cssName: 'sprite.scss'
			}))
			.pipe(gp.gulp.dest('build/img'));
	});
	
	gp.gulp.task('pngSprites:build', function() {
		return gp.gulp.src('src/img/*.png')
			.pipe(gp.$.spritesmith({
				imgName: 'sprite.png',
				cssName: 'sprite.scss'
			}))
			.pipe(gp.$.tinypng({
					key: 'API_KEY',
					summarise: true,
					sigFile: 'src/img/.tinypng-sigs',
					log: true
			}))
			.pipe(gp.gulp.dest('build/img'));
	});
	
};