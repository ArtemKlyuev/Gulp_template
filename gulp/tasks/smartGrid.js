'use strict';

const smartGrid = require('smart-grid');

module.exports = function (options) {

	return function (cb) {
		
		const settings = {
			outputStyle: 'scss',
			/* less || scss || sass || styl */
			columns: 12,
			/* number of grid columns */
			offset: "30px",
			/* gutter width px || % */
			mobileFirst: false,
			container: {
				maxWidth: '1200px',
				/* max-width оn very large screen */
				fields: '30px' /* side fields */
			},
			breakPoints: {
				lg: {
					'width': '1200px', //1100
					/* -> @media (max-width: 1100px) */
					'fields': '30px' /* side fields */
				},
				md: {
					'width': '992px', //960
					'fields': '15px'
				},
				sm: {
					'width': '768px', //780
					'fields': '15px'
				},
				xs: {
					'width': '560px',
					'fields': '15px'
				}
			}
		};

		smartGrid('src/sass/utilities', settings);

		cb();
	};
	
	
	
	
	
	
	
	
	
	
	
//	gp.gulp.task('smart-grid', function (cb) {
//		
//		const settings = {
//			outputStyle: 'scss',
//			/* less || scss || sass || styl */
//			columns: 12,
//			/* number of grid columns */
//			offset: "30px",
//			/* gutter width px || % */
//			mobileFirst: false,
//			container: {
//				maxWidth: '1200px',
//				/* max-width оn very large screen */
//				fields: '30px' /* side fields */
//			},
//			breakPoints: {
//				lg: {
//					'width': '1200px', //1100
//					/* -> @media (max-width: 1100px) */
//					'fields': '30px' /* side fields */
//				},
//				md: {
//					'width': '992px', //960
//					'fields': '15px'
//				},
//				sm: {
//					'width': '768px', //780
//					'fields': '15px'
//				},
//				xs: {
//					'width': '560px',
//					'fields': '15px'
//				}
//			}
//		};
//
//		gp.smartGrid('src/sass/utilities', settings);
//
//		cb();
//	});

};
