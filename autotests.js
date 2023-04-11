var parser = require('./parser');
var {StatementNode, ExpressionNode, ExprType, 
    createBinExprNode, createLiteral,
    createGetExprNode, createCheckRelExprNode,
    addObjectToObjectSeqNode, createObjectSeqNode,
    createUnaryExprNode, createFindExtremeExprNode,
    createQuantifierExprNode} = require('./create_nodes');

StatementNode.prototype.valueOf = function() {
    this.id = 0;
    this.firstExpr = this.firstExpr.valueOf()
    return this;
}
ExpressionNode.prototype.valueOf = function() {
    this.id = 0;
    if(this.firstOperand) {
        this.firstOperand = this.firstOperand.valueOf()
    }
    if(this.secondOperand) {
        this.secondOperand = this.secondOperand.valueOf()
    }
    return this;
}

checkAllTests();

function checkAllTests() {
    testProperty();
    testExist();
    testFind();
    testEqual();
    testGE();
    testCheckRelation();
    testGetClass();
    testCheckClass();
    testCompare();
    testPropertyOfResultingObject();
    testAnd();
    testManyAndOr();
    testPropertyOfFindObject()
    testFindExtreme();
    testForAll();
}


function testProperty() {
    console.log("Test property:");
    var obj = createLiteral(ExprType.ID, "X");
    var expExpr = createBinExprNode(ExprType.PROPERTY, obj, "countOfTokens");
    var expStmt = new StatementNode(expExpr, null);
    var string = "X.countOfTokens";

    isEqual(expStmt, parser.parse(string))
}

function testExist() {
    console.log("Test exist:");
    var expExpr = createQuantifierExprNode(ExprType.EXIST, 
        "X", 
        createLiteral(ExprType.BOOLEAN, true),
        createBinExprNode(
            ExprType.AND, 
            createBinExprNode(
                ExprType.AND, 
                createCheckRelExprNode(
                    createLiteral(ExprType.ID, "X"), 
                    "isBetween", 
                    addObjectToObjectSeqNode(
                        createObjectSeqNode(createLiteral(ExprType.ID, "X1")),
                        createLiteral(ExprType.ID, "X2")
                    )
                ),
                createBinExprNode(
                    ExprType.EQUAL, 
                    createBinExprNode(
                        ExprType.PROPERTY, 
                        createLiteral(ExprType.ID, "X"), 
                        "state"
                    ),
                    createLiteral(ExprType.ID, "unevaluated")
                )  
            ), 
            createBinExprNode(
                ExprType.IS, 
                createLiteral(ExprType.ID, "X"), 
                createLiteral(ExprType.ID, "operator"))
            )
        );
    
    var expStmt = new StatementNode(expExpr, null);
    var string = `exist X [ 
        true
     ] {
            X->isBetween(X1, X2) and
            X.state == unevaluated and
            X is operator
        }`;
    isEqual(expStmt, parser.parse(string))
}

function testFind() {
    console.log("Test find:");
    var expExpr = createGetExprNode(
        ExprType.FIND, 
        "C", 
        createBinExprNode(
            ExprType.AND, 
            createBinExprNode(
                ExprType.AND, 
                createBinExprNode(
                    ExprType.IS, 
                    createLiteral(ExprType.ID, "C"), 
                    createLiteral(ExprType.ID, "operand")
                ),
                createCheckRelExprNode(
                    createLiteral(ExprType.ID, "C"), 
                    "isBetween", 
                    addObjectToObjectSeqNode(
                        createObjectSeqNode(createLiteral(ExprType.ID, "X1")),
                        createLiteral(ExprType.ID, "X2")
                    )
                )
            ),
            createBinExprNode(
                ExprType.EQUAL, 
                createBinExprNode(
                    ExprType.PROPERTY, 
                    createLiteral(ExprType.ID, "C"), 
                    "state"
                ),
                createLiteral(ExprType.ID, "unused")
            )
        )
    );
    var expStmt = new StatementNode(expExpr, null);
    var string = `find C {
        C is operand and
        C->isBetween(X1, X2) and
        C.state == unused
    }`;

    isEqual(expStmt, parser.parse(string))
}

function testEqual() {
    console.log("Test equal:");
    var expExpr = createBinExprNode(ExprType.EQUAL, 
        createBinExprNode(ExprType.PROPERTY, 
            createLiteral(ExprType.ID, "Y"), 
            "countOfTokens"
        ), 
        createLiteral(ExprType.INT, "2")
    );
    var expStmt = new StatementNode(expExpr, null);
    var string = "Y.countOfTokens == 2";

    isEqual(expStmt, parser.parse(string))
}

function testGE() {
    console.log("Test GE:");
    var expExpr = createBinExprNode(ExprType.GE, 
        createBinExprNode(ExprType.PROPERTY, 
            createLiteral(ExprType.ID, "a"), 
            "exprValue"
        ), 
        createBinExprNode(ExprType.PROPERTY, 
            createLiteral(ExprType.ID, "L"), 
            "continuationValue"
        )
    );
    var expStmt = new StatementNode(expExpr, null);
    var string = "a.exprValue >= L.continuationValue";

    isEqual(expStmt, parser.parse(string))
}

function testCheckRelation() {
    console.log("Test check relation:");
    var expExpr = createCheckRelExprNode(
        createLiteral(ExprType.ID, "X"), 
        "isBetween", 
        addObjectToObjectSeqNode(
            createObjectSeqNode(createLiteral(ExprType.ID, "Y1")),
            createLiteral(ExprType.ID, "Y2")
        )
    );
    var expStmt = new StatementNode(expExpr, null);
    var string = "X->isBetween(Y1, Y2)";

    isEqual(expStmt, parser.parse(string))
}

function testGetClass() {
    console.log("Test get class:");
    var expExpr = createUnaryExprNode(ExprType.GET_CLASS, 
        createLiteral(ExprType.ID, "X")
    );
    var expStmt = new StatementNode(expExpr, null);
    var string = "X.getClass()";

    isEqual(expStmt, parser.parse(string))
}

function testCheckClass() {
    console.log("Test check class:");
    var expExpr = createBinExprNode(ExprType.IS, 
        createLiteral(ExprType.ID, "T"), 
        createLiteral(ExprType.ID, "LogicalOr")
    );
    var expStmt = new StatementNode(expExpr, null);
    var string = "T is LogicalOr";

    isEqual(expStmt, parser.parse(string))
}

function testCompare() {
    console.log("Test compare:");
    var expExpr = createBinExprNode(ExprType.COMPARE, 
        createBinExprNode(ExprType.PROPERTY, 
            createLiteral(ExprType.ID, "X"), 
            "precedence"
        ), 
        createBinExprNode(ExprType.PROPERTY, 
            createLiteral(ExprType.ID, "Y"), 
            "precedence"
        )
    );
    var expStmt = new StatementNode(expExpr, null);
    var string = "X.precedence.compare(Y.precedence)";

    isEqual(expStmt, parser.parse(string))
}

function testPropertyOfResultingObject() {
    console.log("Test property of resulting object:");
    var expExpr = createBinExprNode(ExprType.PROPERTY, 
        createCheckRelExprNode(
            createLiteral(ExprType.ID, "a"), 
            "next", 
            createObjectSeqNode(createLiteral(ExprType.ID, "tmp"))
        ), 
        "hasCondition"
    );
    
    var expStmt = new StatementNode(expExpr, null);
    var string = "a->next(tmp).hasCondition";

    isEqual(expStmt, parser.parse(string))
}

function testAnd() {
    console.log("Test and:");
    var expExpr = createBinExprNode(ExprType.AND, 
        createCheckRelExprNode(
            createLiteral(ExprType.ID, "X"), 
            "isInOperandOf", 
            createObjectSeqNode(createLiteral(ExprType.ID, "T"))
        ), 
        createCheckRelExprNode(
            createLiteral(ExprType.ID, "X"), 
            "rightOf", 
            createObjectSeqNode(createLiteral(ExprType.ID, "T"))
        )
    );
    
    var expStmt = new StatementNode(expExpr, null);
    var string = "X->isInOperandOf(T) and X->rightOf(T)";

    isEqual(expStmt, parser.parse(string))
}

function testManyAndOr() {
    console.log("Test many and or:");
    var expExpr = createBinExprNode(ExprType.OR, 
            createBinExprNode(
                ExprType.AND, 
                createBinExprNode(
                    ExprType.AND, 
                    createBinExprNode(
                        ExprType.EQUAL, 
                        createBinExprNode(
                            ExprType.PROPERTY, 
                            createLiteral(ExprType.ID, "T"), 
                            "state"
                        ),
                        createLiteral(ExprType.STRING, "unevaluated")
                    ),
                    createBinExprNode(
                        ExprType.IS, 
                        createLiteral(ExprType.ID, "T"), 
                        createLiteral(ExprType.ID, "operator")
                    )
                ),
                createBinExprNode(ExprType.PROPERTY, 
                    createLiteral(ExprType.ID, "T"), 
                    "hasStrictOrderOfOperands"
                )
            ),
            createCheckRelExprNode(
                createLiteral(ExprType.ID, "T"), 
                "leftOf", 
                createObjectSeqNode(createLiteral(ExprType.ID, "X"))
            )
    );
    
    var expStmt = new StatementNode(expExpr, null);
    var string = `T.state == "unevaluated" and
    T is operator and
    T.hasStrictOrderOfOperands or
    T->leftOf(X)`;

    isEqual(expStmt, parser.parse(string))
}

function testPropertyOfFindObject() {
    console.log("Test property of find object:");
    var expExpr = createBinExprNode(ExprType.PROPERTY, 
        createGetExprNode(
            ExprType.FIND, 
            "T1", 
            createCheckRelExprNode(
                createLiteral(ExprType.ID, "T1"), 
                "isOperandOf", 
                createObjectSeqNode(createLiteral(ExprType.ID, "T"))
            )
        ), 
        "evaluatesTo"
    );
    var expStmt = new StatementNode(expExpr, null);
    var string = `find T1 {
        T1->isOperandOf(T)
        }.evaluatesTo`;

    isEqual(expStmt, parser.parse(string))
}

function testFindExtreme() {
    console.log("Test find extreme:");
    var expExpr = createFindExtremeExprNode(
        "A1", 
        createUnaryExprNode(ExprType.NOT, 
            createQuantifierExprNode(ExprType.EXIST, 
                "A", 
                createLiteral(ExprType.BOOLEAN, true),
                createCheckRelExprNode(
                    createLiteral(ExprType.ID, "A"), 
                    "isBetween", 
                    addObjectToObjectSeqNode(
                        createObjectSeqNode(createLiteral(ExprType.ID, "A1")),
                        createLiteral(ExprType.ID, "X")
                    )
                )
            )
        ), 
        "A", 
        createBinExprNode(
            ExprType.IS, 
            createLiteral(ExprType.ID, "A"), 
            createLiteral(ExprType.ID, "operand")
        )
    );
    
    var expStmt = new StatementNode(expExpr, null);
    var string = `findExtreme A1 [
        not exist A [
            true
        ] {
            A->isBetween(A1, X)
        }
        ] where  A { 
            A is operand
        }`;

    isEqual(expStmt, parser.parse(string))
}

function testForAll() {
    console.log("Test for all:");
    var expExpr = createQuantifierExprNode(ExprType.FORALL,
        "X", 
        createLiteral(ExprType.BOOLEAN, true), 
        createLiteral(ExprType.BOOLEAN, false)
    );
    
    var expStmt = new StatementNode(expExpr, null);
    var string = `forall X [ true ] { false }`;

    isEqual(expStmt, parser.parse(string))
}



function isEqual(object1, object2) {
    if(objectEquals(object1, object2)) {
        console.log("Test passed!");
    } else {
        console.log("Expected:");
        console.log(object1.valueOf());
        console.log("Actual:");
        console.log(object2.valueOf());
    }
}

function objectEquals(x, y) {
    'use strict';

    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) { return false; }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) { return x === y; }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) { return x === y; }
    if (x === y || x.valueOf() === y.valueOf()) { return true; }
    if (Array.isArray(x) && x.length !== y.length) { return false; }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) { return false; }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return objectEquals(x[i], y[i]); });
}
