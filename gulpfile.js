'use strict';

var gulp = require('gulp');
var lint = require('gulp-eslint');
// var mocha = require('gulp-mocha');

var paths = {
  js: ['*.js', 'lib/*.js', 'test/*.js']
  // test: ['test/*.js']
};

gulp.task('lint', function(){
  gulp.src(paths.js)
    .pipe(lint({
      'rules': {
        'no-console': 0,
        'indent': [
          2,
          2
        ],
        'quotes': [
          2,
          'single'
        ],
        'linebreak-style': [
          2,
          'unix'
        ],
        'semi': [
          2,
          'always'
        ]
      },
      'env': {
        'es6': true,
        'node': true,
        'browser': true
      },
      'globals': {
        'describe': false,
        'it': false,
        'beforeEach': false,
        'afterEach': false,
        'before': false,
        'after': false
      },
      'ecmaFeatures': {
        'modules': true,
        'experimentalObjectRestSpread': true
      },
      'extends': 'eslint:recommended'
    }))
    .pipe(lint.formatEach('compact', process.stderr));
});

// gulp.task('test', function(){
//   return gulp.src(paths.test)
//   .pipe(mocha());
// });

// gulp.task('watch', function() {
//   gulp.watch(paths.js, ['lint']);
// });

// gulp.task('test:js', ['test:mocha']);

gulp.task('default', ['lint', 'test']);
