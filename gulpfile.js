// Build Dependencies
var autoprefix  = require('autoprefixer');
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var minifyCss   = require('gulp-cssnano');
var wiredep     = require('wiredep').stream;
var config      = require('./config/config');
var minifyJs    = require('gulp-minify');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');

// Simple Sass build task
gulp.task('sass', function () {
    return gulp.src('src/styles/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        // Minify CSS
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('bower', function () {
    gulp.src('./src/views/*.html')
        .pipe(wired(config.wiredepConfigs))
        .pipe(gulp.dest('dist/views'));
});

gulp.task('assets', function () {
    return gulp.src('src/**/*.{png,svg,jpg}')
        .pipe(gulp.dest('dist/assests'));
});

gulp.task('scripts', function () {
    return gulp.src(['src/js/*.js', 'src/js/**/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(minifyJs())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});

// All mighty serve task
gulp.task('serve', function () {
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
});

gulp.task('build', ['sass', 'assets', 'scripts']);
gulp.task('default', ['dev']);
