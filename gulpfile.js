//------------ Reqired ------------
var gulp = require('gulp');
//Requires the gulp-sass plugin
var sass = require('gulp-sass');
//Live-reloading with Browser Sync
var browserSync = require('browser-sync').create();
// Gulp-useref concatenates any number of CSS and JavaScript files into a single file
var useref = require('gulp-useref');
//Uglify for minifying files and gulp-if minifying only JavaScript files
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
//Uglifying and minification of CSS file
var cssnano = require('gulp-cssnano');
//Optimizing Images
var imagemin = require('gulp-imagemin');
//GUlp-cache
var cache = require('gulp-cache');
//Cleaning up generated files automatically
var del = require('del');
//Sequences the task to run one after the other
var runSequence = require('run-sequence');


//------------ TASK ---------------
//---------------------------------
gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

// Useref task
gulp.task('useref', function () {
	return gulp.src('app/*.html')
	.pipe(useref())
	// Minifies only if it's a Javascript file
	.pipe(gulpIf('*.js', uglify()))
	// Minifies only if it's a CSS file
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('dist'));
})

//Optimizing Images
gulp.task('images', function () {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
	// Caching images that ran through imagemin
	.pipe(cache(imagemin({
		// Setting interlaed to true
		interlaced: true
	})))
	.pipe(gulp.dest('dist/images'));
});

//Clean cache will clear the caches off your local system if you run "gulp cache:clear"
gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback);
});

//Copy fonts to destination
gulp.task('fonts', function () {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
});

//Del will delete dist folder if "gulp clean:dist" is run
gulp.task('clean:dist', function () {
	return del.sync('dist');
});

//--------- BROWSER SYNC ----------
//---------------------------------
gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

//------------ WATCHED --------------
//---------------------------------
gulp.task('watch',['sass', 'browserSync'], function () {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

//TASK TO RUN
gulp.task('default', function (callback) {
	runSequence(['sass','browserSync', 'watch'],
		callback 
	)
});

gulp.task('build', function (callback) {
	runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'],
		callback
	)
});








