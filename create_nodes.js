var LASTID = 0;

function ProgramNode(statement) {
    this.stmt = statement;
    this.id = LASTID++;
}

function StatementNode(firstExpression, secondExpression) {
    this.firstExpr = firstExpression;
    this.secondExpr = secondExpression;
    this.id = LASTID++;
}

const ExprType = { 
    ID: 'id', 
    STRING: 'string', 
    INT: 'int',
    DOUBLE: 'double',
    BOOLEAN: 'boolean',
    TREE_VAR: 'tree_var',
    GET_BY_RELATIONSHIP: 'get by relationship',
    PROPERTY: 'property',
    IS: 'is',
    GREATER: 'greater', 
    LESS: 'less', 
    EQUAL: 'equal', 
    NOT_EQUAL: 'not equal', 
    GE: 'ge', 
    LE: 'le', 
    COMPARE: 'compare', 
    AND: 'and', 
    OR: 'or', 
    NOT: 'not', 
    CHECK_REL: 'check_rel', 
    CHECK_VAL: 'check_val', 
    GET_CLASS: 'get_class', 
    FIND: 'find',
    FIND_EXTREM: 'find extreme', 
    EXIST: 'exist', 
    FORALL: 'forall', 
};

function ExpressionNode() {
    this.id = LASTID++;
    this.type = null;
    this.ident = null;
    this.rel = null;
    this.extremeIdent = null;
    this.string = null;
    this.int = null;
    this.double = null;
    this.boolean = null;

    this.firstOperand = null;
    this.secondOperand = null;

    this.objectSeq = null;
    this.next = null;
}

function createBinExprNode(typeNode, firstExprOperand, secondExprOperand) {
    newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = firstExprOperand;
    if(typeNode == ExprType.PROPERTY) {
        newNode.ident = secondExprOperand;
    } else {
        newNode.secondOperand = secondExprOperand;
    }
    
    return newNode;
}

function createGetObjectByRel(firstExprOperand, relationship, id, secondExprOperand) {
    newNode = new ExpressionNode();
    newNode.type = ExprType.GET_BY_RELATIONSHIP;
    newNode.ident = id;
    newNode.rel = relationship;

    newNode.firstOperand = firstExprOperand;
    newNode.secondOperand = secondExprOperand;
    
    return newNode;
}

function createUnaryExprNode(typeNode, operand) {
    newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = operand;
    return newNode;
}

function createLiteral(typeNode, literal) {
    newNode = new ExpressionNode();
    newNode.type = typeNode;
    if(typeNode == ExprType.ID || typeNode == ExprType.TREE_VAR) {
        newNode.ident = literal;
    } else if(typeNode == ExprType.STRING) {
        newNode.string = literal;
    } else if(typeNode == ExprType.INT) {
        newNode.int = Number(literal);
    } else if(typeNode == ExprType.DOUBLE) {
        newNode.double = Number(literal);
    } else if(typeNode == ExprType.BOOLEAN) {
        newNode.boolean = literal;
    } 
    return newNode;
}

function createCheckRelExprNode(expression, relationship, objectSeq) {
    newNode = new ExpressionNode();
    newNode.type = ExprType.CHECK_REL;
    newNode.firstOperand = expression;
    newNode.rel = relationship;
    newNode.objectSeq = objectSeq;
    return newNode;
}

function createGetExprNode(typeNode, id, expression) {
    newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = expression;
    newNode.ident = id;
    return newNode;
}

function createFindExtremeExprNode(extremeVarName, extremeCondition, varName, condition) {
    newNode = new ExpressionNode();
    newNode.type = ExprType.FIND_EXTREM;
    newNode.extremeIdent = extremeVarName;
    newNode.firstOperand = extremeCondition;
    newNode.ident = varName;
    newNode.secondOperand = condition;
    return newNode;
}

function createForAllExprNode(id, expression1, expression2) { 
    newNode = new ExpressionNode();
    newNode.type = ExprType.FORALL;
    newNode.firstOperand = expression1;
    newNode.secondOperand = expression2;
    newNode.ident = id;
    return newNode;
}

function ObjectSeq(first, last) {
    this.first = first;
    this.last = last;
}

function createObjectSeqNode(expr) {
    return new ObjectSeq(expr, expr);
}

function addObjectToObjectSeqNode(seq, expr) {
    seq.last.next = expr;
    seq.last = expr;
    return seq;
}

var root;

var string;