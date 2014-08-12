var path = require("path");
var url  = require("url");

var nopter = require("../../lib");
var pkg    = require("./package.json");



nopter.config(
{
	title:       "Test App",
	name:        pkg.name,
	description: pkg.description,
	version:     pkg.version,
	options:
	{
		"help":
		{
			short: ["h","?"],
			info: "Display this help text.",
			type: Boolean,
			sort: "Toggles"
		},
		"hidden":
		{
			short: "h",
			info: "A hidden option.",
			hidden: true
		},
		"input":
		{
			short: "i",
			info: "Some input file.",
			type: path
		},
		"inputs":
		{
			info: "Some input files.",
			type: [Array,path]
		},
		"minify-abbr":
		{
			rename: "minifyABBR",
			short: "m",
			info: "Some minifier.",
			type: Boolean,
			sort: "Toggles"
		},
		"output":
		{
			short: "o",
			info: "Some output file.",
			type: path
		},
		"testpath":
		{
			short: "p",
			info: "For testing.",
			type: path
		},
		"testurl":
		{
			short: "u",
			info: "For testing.",
			type: url,
			default: "http://google.com"
		},
		"version":
		{
			short: "v",
			info: "Print the "+pkg.name+" version.",
			type: Boolean,
			sort: "Toggles"
		}
	},
	aliases: ["input", "output"]
});



function cli()
{
	if (nopter.input().help)
	{
		console.log( nopter.help() );
	}
	/*else if (nopter.input().testpath)
	{
		console.log( nopter.rawInput().testpath );
	}*/
	else
	{
		console.log( JSON.stringify( nopter.input() ) );
	}
}



module.exports = cli;
