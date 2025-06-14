var fs = require("fs");
var jison = require("jison");

var bnf = fs.readFileSync("parser.jison", "utf8");
var parser = new jison.Parser(bnf);

module.exports = parser;
var parserSource = parser.generate({moduleName: "parser", type: 'lr',});
console.log(parserSource);