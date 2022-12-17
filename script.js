// mygenerator.js
var Parser = require("jison").Parser;

var string;

var grammar = {
        "lex": {
            "startConditions" : { 
                "STRING": "// extenstions context"
            },

            "rules": [
                /*---------------Ключевые слова-------------------------*/
                ["true",                                 "return 'TRUE';"],
                ["false",                                "return 'FALSE';"],
                ["greater",                              "return 'GREATER';"],
                ["less",                                 "return 'LESS';"],
                ["equal",                                "return 'EQUAL';"],
                ["undetermined",                         "return 'UNDETERMINED';"],
                ["getClass",                             "return 'GET_CLASS';"],
                ["get",                                  "return 'GET';"],
                ["getExtrem",                            "return 'GET_EXTREM';"],
                ["is",                                   "return 'IS';"],
                ["checkVal",                             "return 'CHECK_VAL';"],
                ["checkRel",                             "return 'CHECK_REL';"],
                ["and",                                  "return 'AND';"],
                ["or",                                   "return 'OR';"],
                ["not",                                  "return 'NOT';"],
                ["compare",                              "return 'COMPARE';"],
                ["exist",                                "return 'EXIST';"],
                ["forall",                               "return 'FORALL';"],

                /*---------------Служебные символы-------------------------*/
                ["\\.",                                  "return '.';"],
                ["->",                                   "return '->';"],
                ["{",                                    "return '{';"],
                ["}",                                    "return '}';"],
                ["=",                                    "return '=';"],
                ["\\(",                                    "return '(';"],
                ["\\)",                                    "return ')';"],
                [",",                                    "return ',';"],
                [">",                                    "return '>';"],
                ["<",                                    "return '<';"],
                ["==",                                   "return '==';"],
                [">=",                                   "return '>=';"],
                ["<=",                                   "return '<=';"],

                /*---------------Пользовательские имена-------------------------*/
                ["var:[a-zA-Z_][A-Za-z0-9_]*",           "return 'TREE_VAR';"],
                ["[a-zA-Z_][A-Za-z0-9_]*",               "return 'ID';"], //OBJECT_OR_CLASS_OR_PROPERTY_OR_RELATIONSHIP

                /*----------------Строка-------------------------*/
                // ["\"[a-zA-Z0-9]+\"",           "console.log(1); return 'STRING';"],
                ["\"",                                   "string = ''; this.begin('STRING');"],
                [['STRING'],"[^\\\"\n]+",                "string += yytext;"],
                [['STRING'],"\\a",                       "string += '\\a';"],
                [['STRING'],"\\b",                       "string += '\\b';"],
                [['STRING'],"\\f",                       "string += '\\f';"],
                [['STRING'],"\\n",                       "string += '\\n';"],
                [['STRING'],"\\r",                       "string += '\\r';"],
                [['STRING'],"\\t",                       "string += '\\t';"],
                [['STRING'],"\\v",                       "string += '\\v';"],
                [['STRING'],"\\\\",                      "string += '\\\\';"],
                [['STRING'],"\n",                        "console.log('Error: unfinished string.\\n');"],
                [['STRING'],"\\\"",                      "string += '\"';"],
                [['STRING'],"\\\'",                      "string += '\\'';"],
                [['STRING'],"\"",                        "this.begin('INITIAL'); return 'STRING';"],
                [['STRING'],"$",                         "this.begin('INITIAL'); console.log('Error: expected \".\\n');"],
            
                /*---------------Числовые константы----------------------*/
                ["[0-9]+",                               "return 'INT';"],
                ["([0-9]+\\.[0-9]*|[0-9]*\\.[0-9]+)",    "return 'DOUBLE';"],

                /*---------------Пробельные символы----------------------*/
                ["\\s+",                                 "/* skip whitespace */"],
                // ["\\n",                                  "/* skip new line */"],
                //[ \f\n\r\t\v] ???
            ]
        },
    
        "operators": [
            ["right", "="],
            ["left", "OR"],
            ["left", "AND"],
            ["left", "IS"],
            ["left", ">", "<", "==", "<=", ">="],
            ["right", "NOT"],
            ["nonassoc", ")"],
            ["left", ".", "->"],
        ],
    
        "bnf": {
            "expressions" : [
                [ "exp",   "return $1;"  ]
            ],
            
            "exp" : [
                [ "ID . GET_CLASS ( )", "",],
                [ "GET ID { boolean }", "",],
                [ "property = boolean", "",],
                [ "property = STRING", "",],
                [ "property = INT", "",],
                [ "property = DOUBLE", "",],
                [ "exist ID { boolean }", "",],
                [ "forall ID { boolean } { boolean }", "",],
                [ "boolean", ""],
            ],

            "property": [
                [ "ID -> ID", "" ],
            ],

            "relationship": [
                [ "ID . ID", "" ],
            ],

            "boolean": [
                [ "TRUE", "",],
                [ "FALSE", "",],
                [ "ID IS ID", "",],

                [ "property . CHECK_VAL ( boolean )", "",],
                [ "property . CHECK_VAL ( STRING )", "",],
                [ "property . CHECK_VAL ( INT )", "",],
                [ "property . CHECK_VAL ( DOUBLE )", "",],

                [ "relationship . CHECK_REL ( object_seq )", "",],

                [ "boolean AND boolean", "",],
                [ "boolean OR boolean", "",],
                [ "NOT boolean", "",],

                [ "STRING > STRING", "",],
                [ "INT > INT", "",],
                [ "DOUBLE > DOUBLE", "",],
                [ "DOUBLE > INT", "",],
                [ "INT > DOUBLE", "",],
                
                [ "STRING < STRING", "",],
                [ "INT < INT", "",],
                [ "DOUBLE < DOUBLE", "",],
                [ "DOUBLE < INT", "",],
                [ "INT < DOUBLE", "",],

                [ "STRING == STRING", "",],
                [ "INT == INT", "",],
                [ "DOUBLE == DOUBLE", "",],
                [ "DOUBLE == INT", "",],
                [ "INT == DOUBLE", "",],

                [ "STRING >= STRING", "",],
                [ "INT >= INT", "",],
                [ "DOUBLE >= DOUBLE", "",],
                [ "DOUBLE >= INT", "",],
                [ "INT >= DOUBLE", "",],

                [ "STRING <= STRING", "",],
                [ "INT <= INT", "",],
                [ "DOUBLE <= DOUBLE", "",],
                [ "DOUBLE <= INT", "",],
                [ "INT <= DOUBLE", "",],

                [ "STRING . COMPARE ( STRING )", "",],
                [ "INT . COMPARE ( INT )", "",],
                [ "DOUBLE . COMPARE ( DOUBLE )", "",],
                [ "INT . COMPARE ( DOUBLE )", "",],
                [ "DOUBLE . COMPARE ( INT )", "",],

                [ "( boolean )", "",],
            ],

            "object_seq": [
                [ "ID", "" ],
                [ "object_seq , ID", "" ],
            ]
        }
};

var parser = new Parser(grammar);
// generate source, ready to be written to disk
var parserSource = parser.generate({moduleName: "parser"});

// you can also use the parser directly from memory
// parser.parse("4+5");
console.log(parserSource);