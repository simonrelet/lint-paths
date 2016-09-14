#!/usr/bin/env node
'use strict';

const defaultOptions = {
  alias: {
    help: 'h',
    pattern: 'p',
    ignore: 'i'
  },
  default: {
    pattern: '^[^A-Z]*$',
    ignore: []
  }
};

const argv = require('minimist')(process.argv.slice(2), defaultOptions);
const colors = require('colors/safe');
const lintPaths = require('../lib');

function usage() {
  console.log(
`Usage: lint-paths [options] root[, root]

Checks that all paths under the given roots matches a specified pattern.

Options:
  -h, --help             Display this help.
  -p <p>, --pattern=<p>  The expected pattern of the paths, ^[^A-Z]*$ by
                         default.
  -i <p>, --ignore=<p>   A pattern to ignore, this options can be repeated
                         multiple times.`
  );
}

if (argv.help) {
  usage();
  process.exit(0);
}

if (argv._.length === 0) {
  console.error(colors.red('At least one root folder must be given\n'));
  usage();
  process.exit(1);
}

const options = {
  roots: argv._,
  pattern: new RegExp(argv.pattern),
  ignore: typeof argv.ignore === 'string'
    ? [ argv.ignore ]
    : argv.ignore
};

const errors = lintPaths(options);

if (errors.length > 0) {
  lintPaths.outputErrors(errors);
  process.exit(1);
}

process.exit(0);
