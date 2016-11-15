# lint-paths

> Checks that paths correspond to a desired pattern.

## Install

As a command line tool:

```
npm install -g lint-paths
```

Or as development tool:

```
npm install --save-dev lint-paths
```

## Command line usage

```
lint-paths [options] root[, root]
```

**Options**

 * `-h`, `--help`: display a help message,
 * `-p`, `--pattern`: the expected pattern of the paths, `^[^A-Z]*$` by default,
 * `-i`, `--ignore`: a valid RegExp pattern to ignore, this options can be
   repeated multiple times.

**Examples**

```
$ lint-paths .
$ lint-paths -p "^[a-z]*\$" .
$ lint-paths -p "^[a-z]*\$" -i bin .
$ lint-paths -p "^[a-z]*\$" --ignore=bin -i "\\.json$" .
$ lint-paths --pattern "^[a-z]*\$" src lib
```

## API usage

_Syntax_

```
lintPaths(options)
```

_Parameter_

 * `options`: an _object_ containing:
   * `roots` (_array_): the _array_ of folder to scan,
   * `pattern` (_RegExp_): the expected pattern of the paths,
   * `ignore` (_array_): the _array_ of valid RegExp patterns to ignore.

_Return value_

Return the _array_ of errors. If there are none, the _array_ is empty.

**Example**

```js
const lintPaths = require('lint-paths');

const options = {
  roots: [ src, lib ],
  pattern: /^[^0-9]*$/,
  ignore: [ 'node_modules' ]
};

console.log(lintPaths(options));
```

## License

MIT
