//

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const gulpCssbeautify = require('gulp-cssbeautify');
const browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
    browserSync.watch('build', browserSync.reload)
});

gulp.task('pug',function() {
    return gulp.src('site/dev/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('styles', function() {
    return gulp.src('site/dev/pages/styles/*.scss')
        .pipe(sass())
        .pipe(gulpCssbeautify())
        .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
    gulp.watch('site/dev/**/*.pug', gulp.series('pug'));
    gulp.watch('site/dev/pages/**/*.scss', gulp.series('styles'));
});

gulp.task('default', gulp.series(
    gulp.parallel('pug','styles'),
    gulp.parallel('watch', 'serve')
));