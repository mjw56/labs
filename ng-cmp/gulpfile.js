'use strict';

var gulp = require('gulp'),
    changed = require('gulp-changed'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    tsify = require('tsify'),
    del = require('del'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    concatCss = require('gulp-concat-css'),
    reload = browserSync.reload,
    p = {
      ts: ['./src/app.ts',
        './src/actions/TestActions.ts',
        './src/components/TestComponent.ts',
        './src/services/TestService.ts',
        './src/utils/Dispatcher.ts'],
      jsx: [],
      css: [],
      bundle: 'app.js',
      distJs: 'dist/js',
      distCss: 'dist/css'
    };

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  })
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify(p.ts.concat(p.jsx), watchify.args));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(p.bundle))
      .pipe(gulp.dest(p.distJs))
      .pipe(reload({stream: true}));
  }

  bundler
  .plugin('tsify', { noImplicitAny: false, module: 'commonjs' })
  .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', function() {
  browserify(p.ts)
    .plugin('tsify', { noImplicitAny: false, module: 'commonjs' })
    .bundle()
    .pipe(source(p.bundle))
    .pipe(buffer())
    .pipe(gulp.dest(p.distJs));
});

gulp.task('styles', function() {
  return gulp.src(p.css)
    .pipe(changed(p.distCss))
    .pipe(autoprefixer('last 1 version'))
    .pipe(csso())
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest(p.distCss))
    .pipe(reload({stream: true}));
});

gulp.task('watchTask', function() {
  gulp.watch(p.css, ['styles']);
});

gulp.task('watch', ['clean'], function() {
  gulp.start(['browserSync', 'watchify']);
});

gulp.task('build', ['clean'], function() {
  process.env.NODE_ENV = 'production';
  gulp.start(['browserify']);
});

gulp.task('default', ['build', 'watch']);
