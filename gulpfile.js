var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    ghPages = require('gulp-gh-pages');

gulp.task('css', function () {
  gulp.src('assets/sass/**/*scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});

gulp.task('js', function () {
  gulp.src('assets/js/**/*js')
      .pipe(gulp.dest('dist/js'));
});

gulp.task('image', function () {
  gulp.src('images/**/*')
      .pipe(gulp.dest('dist/images'));
});

gulp.task('sync', function() {
  gulp.src(['assets/css/**/*css', 'assets/fonts/**/*'], { base: 'assets' })
      .pipe(gulp.dest('dist'));

  gulp.src(['index.html', 'CNAME'], { base: '.' })
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['css', 'js', 'image', 'sync'], function () {
  browserSync.init({
    server: {
      baseDir: "dist/"
    }
  });

  gulp.watch(['assets/sass/*.sass'], ['css']);
  gulp.watch(['index.html'], ['html']).on('change', browserSync.reload);
});

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({ branch: 'master' }));
});

gulp.task('default', ['serve']);
