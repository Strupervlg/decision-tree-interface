/* lexical grammar */
%lex
%x STRING
%%


true            return 'TRUE';
false           return 'FALSE';
getClass           return 'CLASS';
find            return 'FIND';
findExtreme     return 'FIND_EXTREM';
is              return 'IS';
and             return 'AND';
or              return 'OR';
not             return 'NOT';
compare         return 'COMPARE';
exist           return 'EXIST';
forall          return 'FORALL';
where           return 'WHERE';


"->"         return '->';
"{"          return '{';
"}"          return '}';
"["          return '[';
"]"          return ']';
"=="         return '==';
"!="         return '!=';
">="         return '>=';
"<="         return '<=';
"="          return '=';
"("          return '(';
")"          return ')';
","          return ',';
">"          return '>';
"<"          return '<';
"::"          return '::';


var\:[a-zA-Z_][A-Za-z0-9_]*           return 'TREE_VAR';
[a-zA-Z_][A-Za-z0-9_]*               return 'ID'; 
\$[a-zA-Z_][A-Za-z0-9_]*           return 'VAR';


\"                                { string = ''; this.begin('STRING'); }
<STRING>[^\\\"\n]+                string += yytext;
<STRING>\\n                       string += '\n';
<STRING>\\t                       string += '\t';
<STRING>\\\\                      string += '\\';
<STRING>\\[^nt\"\'\\]             throw new Error('Error: invalid escape\n');
<STRING>\n                        throw new Error('Error: unfinished string.\n');
<STRING>\\\"                      string += '"';
<STRING>\\\'                      string += '\'';
<STRING>\"                        { this.begin('INITIAL'); yytext = string; return 'STRING'; }
<STRING><<EOF>>                   { this.begin('INITIAL'); throw new Error('Error: expected \".\n'); }
            

([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)    return 'DOUBLE';
[0-9]+                               return 'INT';

"."          return '.';


\s+                                /* skip whitespace */

/lex


/* operator associations and precedence */
%right '='
%left 'OR'
%left 'AND'
%left 'IS'
%left '>' '<' '==' '<=' '>=' '!='
%right 'NOT'
%left '.' '->' '('
%nonassoc ')'

%start program

%% /* language grammar */

program
    : stmt { root = new ProgramNode($1); return $1;}
    ;

stmt
    : exp { $$ = new StatementNode($1, null); }
    | exp "=" exp { $$ = new StatementNode($1, $3); }
    ;

exp
    : ID { $$ = createLiteral(ExprType.ID, $1); }
    | STRING { $$ = createLiteral(ExprType.STRING, $1); }
    | INT { $$ = createLiteral(ExprType.INT, $1); }
    | DOUBLE { $$ = createLiteral(ExprType.DOUBLE, $1); }
    | TRUE { $$ = createLiteral(ExprType.BOOLEAN, true); }
    | FALSE { $$ = createLiteral(ExprType.BOOLEAN, false); }
    | TREE_VAR { $$ = createLiteral(ExprType.TREE_VAR, $1); }
    | VAR { $$ = createLiteral(ExprType.VAR, $1); }
    | ID "::" ID { $$ = createEnum($1, $3); }
    | exp "->" ID { $$ = createGetObjectByRel($1, $3); }
    | exp "." ID { $$ = createBinExprNode(ExprType.PROPERTY, $1, $3); }
    | exp IS exp { $$ = createBinExprNode(ExprType.IS, $1, $3); }
    | exp ">" exp { $$ = createBinExprNode(ExprType.GREATER, $1, $3); }
    | exp "<" exp { $$ = createBinExprNode(ExprType.LESS, $1, $3); }
    | exp "==" exp { $$ = createBinExprNode(ExprType.EQUAL, $1, $3); }
    | exp "!=" exp { $$ = createBinExprNode(ExprType.NOT_EQUAL, $1, $3); }
    | exp ">=" exp { $$ = createBinExprNode(ExprType.GE, $1, $3); }
    | exp "<=" exp { $$ = createBinExprNode(ExprType.LE, $1, $3); }
    | exp "." COMPARE "(" exp ")" { $$ = createBinExprNode(ExprType.COMPARE, $1, $5); }
    | "(" exp ")" { $$ = $2; }
    | exp AND exp { $$ = createBinExprNode(ExprType.AND, $1, $3); }
    | exp OR exp { $$ = createBinExprNode(ExprType.OR, $1, $3); }
    | NOT exp { $$ = createUnaryExprNode(ExprType.NOT, $2); }
    | exp "->" ID "(" object_seq ")" { $$ = createCheckRelExprNode($1, $3, $5); }
    | exp "." CLASS "(" ")" { $$ = createUnaryExprNode(ExprType.GET_CLASS, $1); }
    | FIND ID "{" exp "}" { $$ = createGetExprNode(ExprType.FIND, $2, $4); }
    | FIND_EXTREM ID "[" exp "]" WHERE ID "{" exp "}" { $$ = createFindExtremeExprNode($2, $4, $7, $9); }
    | EXIST ID "[" exp "]" "{" exp "}" { $$ = createQuantifierExprNode(ExprType.EXIST, $2, $4, $7); }
    | FORALL ID "[" exp "]" "{" exp "}" { $$ = createQuantifierExprNode(ExprType.FORALL, $2, $4, $7); }
    ;

object_seq
    : exp { $$ = createObjectSeqNode($1); }
    | object_seq "," exp { $$ = addObjectToObjectSeqNode($1, $3); }
    ;