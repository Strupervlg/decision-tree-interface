/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,4],$V1=[1,5],$V2=[1,6],$V3=[1,7],$V4=[1,8],$V5=[1,9],$V6=[1,10],$V7=[1,11],$V8=[1,12],$V9=[1,13],$Va=[1,14],$Vb=[1,15],$Vc=[1,16],$Vd=[1,17],$Ve=[1,19],$Vf=[1,20],$Vg=[1,21],$Vh=[1,22],$Vi=[1,23],$Vj=[1,24],$Vk=[1,25],$Vl=[1,26],$Vm=[1,27],$Vn=[1,28],$Vo=[1,29],$Vp=[1,6,16,18,19,20,21,22,23,24,25,26,29,30,31,38,42],$Vq=[1,6,18,20,21,22,23,24,25,26,29,30,31,38,42],$Vr=[29,42];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"program":3,"stmt":4,"exp":5,"=":6,"ID":7,"STRING":8,"INT":9,"DOUBLE":10,"TRUE":11,"FALSE":12,"TREE_VAR":13,"VAR":14,"::":15,"->":16,"{":17,"}":18,".":19,"IS":20,">":21,"<":22,"==":23,"!=":24,">=":25,"<=":26,"COMPARE":27,"(":28,")":29,"AND":30,"OR":31,"NOT":32,"object_seq":33,"CLASS":34,"FIND":35,"FIND_EXTREM":36,"[":37,"]":38,"WHERE":39,"EXIST":40,"FORALL":41,",":42,"$accept":0,"$end":1},
terminals_: {2:"error",6:"=",7:"ID",8:"STRING",9:"INT",10:"DOUBLE",11:"TRUE",12:"FALSE",13:"TREE_VAR",14:"VAR",15:"::",16:"->",17:"{",18:"}",19:".",20:"IS",21:">",22:"<",23:"==",24:"!=",25:">=",26:"<=",27:"COMPARE",28:"(",29:")",30:"AND",31:"OR",32:"NOT",34:"CLASS",35:"FIND",36:"FIND_EXTREM",37:"[",38:"]",39:"WHERE",40:"EXIST",41:"FORALL",42:","},
productions_: [0,[3,1],[4,1],[4,3],[5,1],[5,1],[5,1],[5,1],[5,1],[5,1],[5,1],[5,1],[5,3],[5,7],[5,3],[5,3],[5,3],[5,3],[5,3],[5,3],[5,3],[5,3],[5,6],[5,3],[5,3],[5,3],[5,2],[5,6],[5,5],[5,5],[5,10],[5,8],[5,8],[33,1],[33,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 root = new ProgramNode($$[$0]); return $$[$0];
break;
case 2:
 this.$ = new StatementNode($$[$0], null); 
break;
case 3:
 this.$ = new StatementNode($$[$0-2], $$[$0]); 
break;
case 4:
 this.$ = createLiteral(ExprType.ID, $$[$0]); 
break;
case 5:
 this.$ = createLiteral(ExprType.STRING, $$[$0]); 
break;
case 6:
 this.$ = createLiteral(ExprType.INT, $$[$0]); 
break;
case 7:
 this.$ = createLiteral(ExprType.DOUBLE, $$[$0]); 
break;
case 8:
 this.$ = createLiteral(ExprType.BOOLEAN, true); 
break;
case 9:
 this.$ = createLiteral(ExprType.BOOLEAN, false); 
break;
case 10:
 this.$ = createLiteral(ExprType.TREE_VAR, $$[$0]); 
break;
case 11:
 this.$ = createLiteral(ExprType.VAR, $$[$0]); 
break;
case 12:
 this.$ = createEnum($$[$0-2], $$[$0]); 
break;
case 13:
 this.$ = createGetObjectByRel($$[$0-6], $$[$0-4], $$[$0-3], $$[$0-1]); 
break;
case 14:
 this.$ = createBinExprNode(ExprType.PROPERTY, $$[$0-2], $$[$0]); 
break;
case 15:
 this.$ = createBinExprNode(ExprType.IS, $$[$0-2], $$[$0]); 
break;
case 16:
 this.$ = createBinExprNode(ExprType.GREATER, $$[$0-2], $$[$0]); 
break;
case 17:
 this.$ = createBinExprNode(ExprType.LESS, $$[$0-2], $$[$0]); 
break;
case 18:
 this.$ = createBinExprNode(ExprType.EQUAL, $$[$0-2], $$[$0]); 
break;
case 19:
 this.$ = createBinExprNode(ExprType.NOT_EQUAL, $$[$0-2], $$[$0]); 
break;
case 20:
 this.$ = createBinExprNode(ExprType.GE, $$[$0-2], $$[$0]); 
break;
case 21:
 this.$ = createBinExprNode(ExprType.LE, $$[$0-2], $$[$0]); 
break;
case 22:
 this.$ = createBinExprNode(ExprType.COMPARE, $$[$0-5], $$[$0-1]); 
break;
case 23:
 this.$ = $$[$0-1]; 
break;
case 24:
 this.$ = createBinExprNode(ExprType.AND, $$[$0-2], $$[$0]); 
break;
case 25:
 this.$ = createBinExprNode(ExprType.OR, $$[$0-2], $$[$0]); 
break;
case 26:
 this.$ = createUnaryExprNode(ExprType.NOT, $$[$0]); 
break;
case 27:
 this.$ = createCheckRelExprNode($$[$0-5], $$[$0-3], $$[$0-1]); 
break;
case 28:
 this.$ = createUnaryExprNode(ExprType.GET_CLASS, $$[$0-4]); 
break;
case 29:
 this.$ = createGetExprNode(ExprType.FIND, $$[$0-3], $$[$0-1]); 
break;
case 30:
 this.$ = createFindExtremeExprNode($$[$0-8], $$[$0-6], $$[$0-3], $$[$0-1]); 
break;
case 31:
 this.$ = createQuantifierExprNode(ExprType.EXIST, $$[$0-6], $$[$0-4], $$[$0-1]); 
break;
case 32:
 this.$ = createQuantifierExprNode(ExprType.FORALL, $$[$0-6], $$[$0-4], $$[$0-1]); 
break;
case 33:
 this.$ = createObjectSeqNode($$[$0]); 
break;
case 34:
 this.$ = addObjectToObjectSeqNode($$[$0-2], $$[$0]); 
break;
}
},
table: [{3:1,4:2,5:3,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{1:[3]},{1:[2,1]},{1:[2,2],6:[1,18],16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo},o($Vp,[2,4],{15:[1,30]}),o($Vp,[2,5]),o($Vp,[2,6]),o($Vp,[2,7]),o($Vp,[2,8]),o($Vp,[2,9]),o($Vp,[2,10]),o($Vp,[2,11]),{5:31,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:32,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{7:[1,33]},{7:[1,34]},{7:[1,35]},{7:[1,36]},{5:37,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{7:[1,38]},{7:[1,39],27:[1,40],34:[1,41]},{5:42,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:43,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:44,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:45,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:46,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:47,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:48,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:49,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:50,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{7:[1,51]},{16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,29:[1,52],30:$Vn,31:$Vo},o($Vq,[2,26],{16:$Ve,19:$Vf}),{17:[1,53]},{37:[1,54]},{37:[1,55]},{37:[1,56]},{1:[2,3],16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo},{7:[1,57],28:[1,58]},o($Vp,[2,14]),{28:[1,59]},{28:[1,60]},o([1,6,18,20,29,30,31,38,42],[2,15],{16:$Ve,19:$Vf,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm}),o($Vq,[2,16],{16:$Ve,19:$Vf}),o($Vq,[2,17],{16:$Ve,19:$Vf}),o($Vq,[2,18],{16:$Ve,19:$Vf}),o($Vq,[2,19],{16:$Ve,19:$Vf}),o($Vq,[2,20],{16:$Ve,19:$Vf}),o($Vq,[2,21],{16:$Ve,19:$Vf}),o([1,6,18,29,30,31,38,42],[2,24],{16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm}),o([1,6,18,29,31,38,42],[2,25],{16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn}),o($Vp,[2,12]),o($Vp,[2,23]),{5:61,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:62,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:63,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:64,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{17:[1,65]},{5:67,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,33:66,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:68,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{29:[1,69]},{16:$Ve,18:[1,70],19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo},{16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo,38:[1,71]},{16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo,38:[1,72]},{16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo,38:[1,73]},{5:74,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{29:[1,75],42:[1,76]},o($Vr,[2,33],{16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo}),{16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,29:[1,77],30:$Vn,31:$Vo},o($Vp,[2,28]),o($Vp,[2,29]),{39:[1,78]},{17:[1,79]},{17:[1,80]},{16:$Ve,18:[1,81],19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo},o($Vp,[2,27]),{5:82,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},o($Vp,[2,22]),{7:[1,83]},{5:84,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},{5:85,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},o($Vp,[2,13]),o($Vr,[2,34],{16:$Ve,19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo}),{17:[1,86]},{16:$Ve,18:[1,87],19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo},{16:$Ve,18:[1,88],19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo},{5:89,7:$V0,8:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,28:$V8,32:$V9,35:$Va,36:$Vb,40:$Vc,41:$Vd},o($Vp,[2,31]),o($Vp,[2,32]),{16:$Ve,18:[1,90],19:$Vf,20:$Vg,21:$Vh,22:$Vi,23:$Vj,24:$Vk,25:$Vl,26:$Vm,30:$Vn,31:$Vo},o($Vp,[2,30])],
defaultActions: {2:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 11;
break;
case 1:return 12;
break;
case 2:return 'GREATER';
break;
case 3:return 'LESS';
break;
case 4:return 'EQUAL';
break;
case 5:return 34;
break;
case 6:return 'UNDETERMINED';
break;
case 7:return 35;
break;
case 8:return 36;
break;
case 9:return 20;
break;
case 10:return 30;
break;
case 11:return 31;
break;
case 12:return 32;
break;
case 13:return 27;
break;
case 14:return 40;
break;
case 15:return 41;
break;
case 16:return 39;
break;
case 17:return 16;
break;
case 18:return 17;
break;
case 19:return 18;
break;
case 20:return 37;
break;
case 21:return 38;
break;
case 22:return 23;
break;
case 23:return 24;
break;
case 24:return 25;
break;
case 25:return 26;
break;
case 26:return 6;
break;
case 27:return 28;
break;
case 28:return 29;
break;
case 29:return 42;
break;
case 30:return 21;
break;
case 31:return 22;
break;
case 32:return 15;
break;
case 33:return 13;
break;
case 34:return 7; 
break;
case 35:return 14;
break;
case 36: string = ''; this.begin('STRING'); 
break;
case 37:string += yy_.yytext;
break;
case 38:string += '\b';
break;
case 39:string += '\f';
break;
case 40:string += '\n';
break;
case 41:string += '\r';
break;
case 42:string += '\t';
break;
case 43:string += '\v';
break;
case 44:string += '\\';
break;
case 45:console.log('Error: invalid escape\n');
break;
case 46:console.log('Error: unfinished string.\n');
break;
case 47:string += '"';
break;
case 48:string += '\'';
break;
case 49: this.begin('INITIAL'); yy_.yytext = string; return 8; 
break;
case 50: this.begin('INITIAL'); console.log('Error: expected \".\n'); 
break;
case 51:return 10;
break;
case 52:return 9;
break;
case 53:return 19;
break;
case 54:/* skip whitespace */
break;
}
},
rules: [/^(?:true\b)/,/^(?:false\b)/,/^(?:greater\b)/,/^(?:less\b)/,/^(?:equal\b)/,/^(?:getClass\b)/,/^(?:undetermined\b)/,/^(?:find\b)/,/^(?:findExtreme\b)/,/^(?:is\b)/,/^(?:and\b)/,/^(?:or\b)/,/^(?:not\b)/,/^(?:compare\b)/,/^(?:exist\b)/,/^(?:forall\b)/,/^(?:where\b)/,/^(?:->)/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:==)/,/^(?:!=)/,/^(?:>=)/,/^(?:<=)/,/^(?:=)/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?:>)/,/^(?:<)/,/^(?:::)/,/^(?:var:[a-zA-Z_][A-Za-z0-9_]*)/,/^(?:[a-zA-Z_][A-Za-z0-9_]*)/,/^(?:\$[a-zA-Z_][A-Za-z0-9_]*)/,/^(?:")/,/^(?:[^\\\"\n]+)/,/^(?:\\b)/,/^(?:\\f)/,/^(?:\\n)/,/^(?:\\r)/,/^(?:\\t)/,/^(?:\\v)/,/^(?:\\\\)/,/^(?:\\[^bfnrtv\"\'\\])/,/^(?:\n)/,/^(?:\\")/,/^(?:\\')/,/^(?:")/,/^(?:$)/,/^(?:([0-9]+\.[0-9]*|[0-9]*\.[0-9]+))/,/^(?:[0-9]+)/,/^(?:\.)/,/^(?:\s+)/],
conditions: {"STRING":{"rules":[37,38,39,40,41,42,43,44,45,46,47,48,49,50],"inclusive":false},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,51,52,53,54],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
