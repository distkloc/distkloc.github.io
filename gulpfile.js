var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    ghPages = require('gulp-gh-pages'),
    minifyCss = require('gulp-minify-css'),
    del = require('del');

gulp.task('clean', function () {
  del([
    'dist/**/*',
    // Exclude
    '!dist/CNAME'
  ]);
});

gulp.task('css', function () {
  gulp.src(['src/assets/sass/**/*scss'])
      .pipe(sass())
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});

gulp.task('js', function () {
  gulp.src('src/assets/js/**/*js')
      .pipe(gulp.dest('dist/js'));
});

gulp.task('image', function () {
  gulp.src('src/images/**/*')
      .pipe(gulp.dest('dist/images'));
});

gulp.task('sync', function() {
  gulp.src('node_modules/font-awesome/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));

  gulp.src(['src/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['clean', 'css', 'js', 'image', 'sync'], function () {
  browserSync.init({
    server: {
      baseDir: "dist/"
    }
  });

  gulp.watch(['src/assets/sass/**/*.scss'], ['css']);
  gulp.watch(['src/index.html'], ['sync']).on('change', browserSync.reload);
});

gulp.task('dns', function () {
  gulp.src('src/CNAME')
      .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['dns'], function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({ branch: 'master' }));
});

gulp.task('default', ['serve']);
