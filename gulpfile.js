// Build Dependencies
var autoprefix  = require('autoprefixer');
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var minifyCss   = require('gulp-cssnano');
var wiredep     = require('wiredep').stream;
var config      = require('./config/config');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');

// Simple Sass build task
gulp.task('sass', function () {
    return gulp.src('src/styles/master.scss')
        .pipe(sass().on('error', sass.logError))
        // Minify CSS
        .pipe(minifyCss())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('bower', function () {
    gulp.src(['src/*.html', 'src/**/*.html'])
        .pipe(wiredep(config.wiredepConfigs))
        .pipe(gulp.dest('dist/'));
});

gulp.task('assets', function () {
    return gulp.src('src/**/*.{png,svg,jpg}')
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['unique-scripts', 'content-scripts'], function () {
    return gulp.src([
        'src/js/metaController.js',
        'src/js/emailService.js',
        'src/js/*.js',
        'src/js/listeners.js',
        '!src/js/settings/*.js',
        '!src/js/emailController.js',
        '!src/js/content.js'
    ])
        .pipe(concat('scripts.js'))
        //.pipe(uglify()) Uncomment when ready
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('unique-scripts', function () {
    return gulp.src(['src/js/settings/*.js', 'src/js/emailController.js', 'src/js/background.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('content-scripts', function () {
    return gulp.src(['src/js/metaController.js', 'src/js/content.js'])
        .pipe(concat('content.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Convience and for cleaning dist before rebuild, not ASYNC
gulp.task('clean', function () {
    return gulp.src('dist', {
        read: false
    })
    .pipe(clean());
});

// All mighty serve task
gulp.task('serve', function () {
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch(['src/**/views/*.html', 'src/index.html'], ['bower']);
});

gulp.task('build', function() {
    runSequence('clean', ['sass', 'assets', 'bower', 'scripts']);
});

gulp.task('default', ['serve']);
