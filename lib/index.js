'use strict';

const colors = require('colors/safe');
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

function lintPaths(options) {
  const errors = options.roots
    .map(root => {
      return glob.sync(`${root}/**`)
        .map(path.normalize)
        .map(p => path.relative(root, p))
        .filter(keepRelevent(options.ignore))
        .filter(keepErrors(options.pattern));
    })
    .reduce((acc, errs) => acc.concat(errs), []);

  return errors;
}

lintPaths.outputErrors = function(errors, options) {
  if (errors.length > 0) {
    const pattern = colors.blue(options.pattern);
    const s = errors.length === 1 ? '' : 's';
    const errorMsg = colors.red(`${errors.length} invalid path${s}`);
    const msg = `${errorMsg} (expected pattern: ${pattern})`;

    console.error(`\n  ${errors.join('\n  ')}\n\n${msg}\n`);
  }
};

module.exports = lintPaths;
