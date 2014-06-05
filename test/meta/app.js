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
			type: Boolean
		},
		"input":
		{
			short: "i",
			info: "Some file input.",
			type: path
		},
		"output":
		{
			short: "o",
			info: "Some file output.",
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
			type: url
		},
		"version":
		{
			short: "v",
			info: "Print the "+pkg.name+" version.",
			type: Boolean
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
