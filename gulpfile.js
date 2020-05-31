let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    //concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
    return gulp.src('src/sass/**/*.sass')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
            .pipe(gulp.dest('src/css'))

            // .pipe(cssnano())
            // .pipe(rename({suffix: '.min'}))
            // .pipe(gulp.dest('src/css/min'))
        
            .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: { 
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('scripts', function() {
    return gulp.src('src/js/script.js')
            // .pipe(uglify())
            // .pipe(rename({suffix: '.min'}))
            // .pipe(gulp.dest('src/js'));
	        .pipe(browserSync.reload({ stream: true }))
}); 

gulp.task('code', function() {
	return gulp.src('src/*.html')
	        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('clean', async function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});



// ---------------------
gulp.task('prebuild', async function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'src/css/style.css',
		'src/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});
// ----------------------



gulp.task('watch', function() {
	gulp.watch('src/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('src/*.html', gulp.parallel('code'));
	gulp.watch('src/js/script.js', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
// gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));

/* 
https://www.youtube.com/watch?v=vW51JUVT66w&list=PLrcqECnF9A-9otEULvS4lJYmXQkgz1fXh&index=1
https://webdesign-master.ru/blog/tools/2016-03-09-gulp-beginners.html
https://github.com/agragregra/gulp-lesson/blob/master/gulp-4/gulpfile.js
*/