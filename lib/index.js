'use strict';

const glob = require('glob');
const path = require('path');

function keepRelevent(ignoreList) {
  return path => (
    path !== '.' && ignoreList.every(i => !new RegExp(i).test(path))
  );
}

function keepErrors(pattern) {
  return path => !pattern.test(path);
}

module.exports = function(options) {
  const errors = options.roots
    .map(root => {
      return glob.sync(`${root}/**`)
        .map(path.normalize)
        .filter(keepRelevent(options.ignore))
        .filter(keepErrors(options.pattern));
    })
    .reduce((acc, errs) => acc.concat(errs), []);

  return errors;
};
