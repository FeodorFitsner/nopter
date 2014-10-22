# nopter [![NPM Version](http://badge.fury.io/js/nopter.svg)](http://badge.fury.io/js/nopter) [![Build Status](https://secure.travis-ci.org/stevenvachon/nopter.svg)](http://travis-ci.org/stevenvachon/nopter) [![Build status](https://ci.appveyor.com/api/projects/status/hcw1rfsfb6ph2hhc)](https://ci.appveyor.com/project/stevenvachon/nopter) [![Dependency Status](https://david-dm.org/stevenvachon/nopter.svg)](https://david-dm.org/stevenvachon/nopter)

> A simple [nopt](https://www.npmjs.org/package/nopt) wrapper for Node.js CLI apps.

Features:
* Fast & easy declarative syntax
* Argument aliases
* Integrated help screen

![Compile example](https://raw.github.com/stevenvachon/nopter/master/misc/help-screen.png)

## Getting Started

This utility requires [Node.js](http://nodejs.org/) `~0.10`. To install, type this at the command line:
```
npm install nopter --save-dev
```

### Methods

#### config(object)
Gets or sets the [configuration](#Configuration).

`object` [optional].  

#### config.merge(object)
Merges a new [configuration](#Configuration) with the existing one.

`object` [optional].  

#### error.fatal(error, additional, prefix)
Gets a (red) colored error message with a default "Error" prefix, but does not display/log it.

`error` can be `Error` or `String`. If an `Error`, `error.name` will override the default `prefix`.  
`additional` [optional] is a second, uncolored sentence.  
`prefix` [optional] overrides the default.

#### error.notice(error, additional, prefix)
Gets an uncolored error message with a default "Notice" prefix, but does not display/log it.
See [error.fatal](#errorfatal) for arguments info.

#### error.warn(error, additional, prefix)
Gets a (yellow) colored error message with a default "Warning" prefix, but does not display/log it.
See [error.fatal](#errorfatal) for arguments info.

#### help()
Gets the help screen, but does not display/log it.

#### help.indent()
Gets the indent value for custom additions to the help screen.

#### input()
Gets the input parsed by nopt.

#### rawInput()
**Coming in v0.2** Gets the raw or "uncooked" user input for a particular option. Especially useful when dealing with paths in error messages.

### Configuration

#### config.colors
Type: `Array`  
Default value: `["red","green","magenta"]`  
The colors used in the help screen. Possible [color values](https://www.npmjs.org/package/colors), `[null,…]` to disable a color and `null` to disable all colors.

#### config.description
Type: `String`  
Default value: `""`  
The app description.

#### config.name
Type: `String`  
Default value: `"noname"`  
The app name used in the command line.

#### config.title
Type: `String`  
Default value: `config.name.toUpperCase()`  
The app title, which is sometimes slightly different from `config.name`.

#### config.version
Type: `String`  
Default value: `"0.0.0"`  
The app version.

#### config.options
Type: `Object`  
Default value: `{}`  
The command line options.
```js
options: {
	"option-name": {
		short: "o",
		info: "Description of option.",
		type: String
	}
}
```
`option.default` is optional and can be anything. Undefined options are simply `undefined`.  
`option.hidden` is an optional `Boolean` that hides the option in the help screen.  
`option.info` is required and should be a `String`.  
`option.rename` is an optional `String` that renames the option for easier use.  
`option.short` is optional and can be a `String` or an `Array`.  
`option.sort` is an optional `String` for visual grouping on the help screen.  
`option.type` is required and can be any of [these types](https://www.npmjs.org/package/nopt#types).

#### config.aliases
Type: `Array`  
Default value: `[]`  
Argument shortcuts to options.
```js
aliases: ["option1","option2"]
```
This would allow something like `app foo bar` to be a CLI shortcut to `app --option1 foo --option2 bar`.

### Example
```js
var nopter = require("nopter");
var path   = require("path");
var pkg    = require("./package.json");

nopter.config({
	title:       "Test App",
	name:        pkg.name,
	description: pkg.description,
	version:     pkg.version,
	options: {
		"help": {
			short: ["h","?"],
			info: "Display this help text.",
			type: Boolean
		},
		"input": {
			info: "Some input files.",
			type: [Array,path]
		},
		"output": {
			info: "Some output file.",
			type: path
		},
		"quality": {
			info: "Some compression (0–100, default=80).",
			type: Number,
			default: 80
		},
		"special-cli": {
			rename: "specialCLI",
			info: "Do something special.",
			type: String,
			hidden: true
		}
	},
	aliases: ["input", "output"]
});

function cli() {
	if (nopter.input().help) {
		console.log( nopter.help() );
	} else {
		console.warn( nopter.error.warn("Message","Use --help") );
	}
}

module.exports = cli;
```
For more ideas, check out the [test file](https://github.com/stevenvachon/nopter/tree/master/test/meta/app.js).

## Roadmap Features
* add "safe colors", cell-span and word-wrap features to cli-table
* add "before" and "after" (table?) content for `help()`
* add `option.alias` shortcut:
```js
"option": {
	alias: "--option1 value -xyz"
}
```

## Release History
* 0.1.9 avoided `String.prototype` colors (for the paranoid)
* 0.1.8 simplified color test
* 0.1.7 added `config.colors`, `config.merge()`, `help.indent()`
* 0.1.6 tested on Windows
* 0.1.5 added `option.sort`
* 0.1.4 added `option.rename`
* 0.1.3 added `option.hidden`
* 0.1.2 added `option.default`, help screen cleanup
* 0.1.1 added custom error messages
* 0.1.0 initial release

---

[![Analytics](https://ga-beacon.appspot.com/UA-3614308-14/stevenvachon/nopter)](https://github.com/igrigorik/ga-beacon "Google Analytics")