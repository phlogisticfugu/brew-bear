var gulp = require('gulp');
var del = require('del');
var gitclone = require('./lib/gitclone.js');
var path = require('path');
var runSequence = require('run-sequence');

var homebrewPath = path.join(__dirname, 'homebrew');

gulp
.task('clean', function(cb) {
  del([
    homebrewPath
  ], cb);
})
.task('clone-homebrew', function() {
  return gitclone(homebrewPath, 'https://github.com/Homebrew/homebrew');
})
.task('default', function(cb) {
  runSequence(
    'clean',
    ['clone-homebrew'],
    cb
  );
})
;