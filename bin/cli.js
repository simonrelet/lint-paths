#!/usr/bin/env node
/* eslint no-console: "off" */
'use strict';

const defaultOptions = {
  alias: {
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

if (argv._.length === 0) {
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
  const pattern = colors.blue(options.pattern);
  const s = errors.length === 1 ? '' : 's';
  const errorMsg = colors.red(`${errors.length} invalid path${s}`);
  const msg = `${errorMsg} (expected pattern: ${pattern})`;

  console.error(`\n  ${errors.join('\n  ')}\n\n${msg}\n`);
  process.exit(1);
}

process.exit(0);
