%right '='
%left 'OR'
%left 'AND'
%left 'IS'
%left '>' '<' '==' '<=' '>='
%right 'NOT'
%nonassoc ')'
%left '.' '->'

%start program

%% /* language grammar */

program
    : stmt { root = ProgramNode($1); return $1;}
    ;

stmt
    : exp { $$ = StatementNode($1, null); }
    | exp "=" exp { $$ = StatementNode($1, $3); }
    ;

exp
    : ID { $$ = createLiteral(ExprType.ID, $1); }
    | STRING { $$ = createLiteral(ExprType.STRING, $1); }
    | INT { $$ = createLiteral(ExprType.INT, $1); }
    | DOUBLE { $$ = createLiteral(ExprType.DOUBLE, $1); }
    | TRUE { $$ = createLiteral(ExprType.BOOLEAN, true); }
    | FALSE { $$ = createLiteral(ExprType.BOOLEAN, false); }
    | TREE_VAR { $$ = createLiteral(ExprType.TREE_VAR, $1); }
    | exp "->" ID { $$ = createBinExprNode(ExprType.RELATIONSHIP, $1, $3); }
    | exp "." ID { $$ = createBinExprNode(ExprType.PROPERTY, $1, $3); }
    | exp IS exp { $$ = createBinExprNode(ExprType.IS, $1, $3); }
    | exp ">" exp { $$ = createBinExprNode(ExprType.GREATER, $1, $3); }
    | exp "<" exp { $$ = createBinExprNode(ExprType.LESS, $1, $3); }
    | exp "==" exp { $$ = createBinExprNode(ExprType.EQUAL, $1, $3); }
    | exp ">=" exp { $$ = createBinExprNode(ExprType.GE, $1, $3); }
    | exp "<=" exp { $$ = createBinExprNode(ExprType.LE, $1, $3); }
    | exp "." COMPARE "(" exp ")" { $$ = createBinExprNode(ExprType.COMPARE, $1, $3); }
    | "(" exp ")" { $$ = $1; }
    | exp AND exp { $$ = createBinExprNode(ExprType.AND, $1, $3); }
    | exp OR exp { $$ = createBinExprNode(ExprType.OR, $1, $3); }
    | NOT exp { $$ = createUnaryExprNode(ExprType.NOT, $1); }
    | exp "." CHECK_REL "(" object_seq_e ")" { $$ = createCheckRelExprNode($1, $5); }
    | exp "." CHECK_VAL "(" exp ")" { $$ = createBinExprNode(ExprType.CHECK_VAL, $1, $3); }
    | exp "." GET_CLASS "(" ")" { $$ = createUnaryExprNode(ExprType.GET_CLASS, $1); }
    | GET ID "{" exp "}" { $$ = createGetExprNode(ExprType.GET, $2, $4); }
    | EXIST ID "{" exp "}" { $$ = createGetExprNode(ExprType.EXIST, $2, $4); }
    | FORALL ID "{" exp "}" "{" exp "}" { $$ = createForAllExprNode($2, $4, $7); }
    ;

object_seq
    : ID { $$ = createObjectSeqNode($1); }
    | object_seq "," ID { $$ = addObjectToObjectSeqNode($1, $3); }
    ;

object_seq_e
    : object_seq { $$ = $1; }
    | /*empty*/ { $$ = null; }
    ;