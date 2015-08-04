var nodegit = require("nodegit");
var path = require('path');
var del = require('del');

module.exports = function gitclone(repoPath, repoURL) {
  var cloneOptions = {};
  
  /*
   * OS X (darwin) has issues with validating https for github
   * so use this as a workaround
   */
  if ('darwin' === process.platform) {
    cloneOptions.remoteCallbacks = {
      certificateCheck: function() { return 1; }
    };
  }
  
  return nodegit
  .Clone(repoURL, repoPath, cloneOptions)
  .then(function() {
    // keep from inadvertently versioning homebrew in our repo
    del([
      path.join(repoPath, '.gitignore'),
      path.join(repoPath, '.git')
    ])
  })
  ;
};


