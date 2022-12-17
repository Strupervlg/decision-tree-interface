var
gen, parserSrc,
    opts    = {
        debug: false,
        type: 'lalr',
        moduleName: 'CorParser',
        moduleType: 'js'
    },
fs      = require('fs'),
jison   = require('jison'),
bnf     = require('ebnf-parser'),
lex     = require('lex-parser'),
// grammar = bnf.parse(fs.readFileSync('./par.jison', 'utf8')),
lexer   = lex.parse(fs.readFileSync('./lex.jisonlex', 'utf8'));

grammar.lex = lexer;
gen         = new jison.Generator(grammar, opts);
parserSrc   = gen.generate(opts);

fs.writeFileSync('./t.js', parserSrc);