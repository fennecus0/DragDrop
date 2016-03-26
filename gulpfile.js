var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.sass')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.sass', ['sass']);
});