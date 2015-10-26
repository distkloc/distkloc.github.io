var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('css', function () {
  gulp.src('assets/sass/**/*scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());

  gulp.src('assets/css/**/*css')
      .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
  gulp.src('assets/js/**/*js')
      .pipe(gulp.dest('dist/js'));
});

gulp.task('font', function () {
  gulp.src('assets/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('html', function () {
  gulp.src('*.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('image', function () {
  gulp.src('images/**/*')
      .pipe(gulp.dest('dist/images'));
});

gulp.task('serve', ['css', 'js', 'font', 'html', 'image'], function () {
  browserSync.init({
    server: {
      baseDir: "dist/"
    }
  });

  gulp.watch(['assets/sass/*.sass'], ['css']);
  gulp.watch(['index.html'], ['html']).on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
