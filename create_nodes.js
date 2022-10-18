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
    RELATIONSHIP: 'relationship',
    PROPERTY: 'property',
    IS: 'is',
    GREATER: 'greater', 
    LESS: 'less', 
    EQUAL: 'equal', 
    GE: 'ge', 
    LE: 'le', 
    COMPARE: 'compare', 
    AND: 'and', 
    OR: 'or', 
    NOT: 'not', 
    CHECK_REL: 'check_rel', 
    CHECK_VAL: 'check_val', 
    GET_CLASS: 'get_class', 
    GET: 'get', 
    EXIST: 'exist', 
    FORALL: 'forall', 
};

function ExpressionNode() {
    this.id = LASTID++;
    this.type = null;
    this.ident = null;
    this.string = null;
    this.int = null;
    this.double = null;
    this.boolean = null;

    this.firstOperand = null;
    this.secondOperand = null;

    this.objectSeq = null;
}

function createBinExprNode(typeNode, firstExprOperand, secondExprOperand) {
    newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = firstExprOperand;
    if(typeNode == ExprType.RELATIONSHIP || typeNode == ExprType.PROPERTY) {
        newNode.ident = secondExprOperand;
    } else {
        newNode.secondOperand = secondExprOperand;
    }
    
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
        newNode.int = literal;
    } else if(typeNode == ExprType.DOUBLE) {
        newNode.double = literal;
    } else if(typeNode == ExprType.BOOLEAN) {
        newNode.boolean = literal;
    } 
    return newNode;
}

function createCheckRelExprNode(expression, objectSeq) {
    newNode = new ExpressionNode();
    newNode.type = ExprType.CHECK_REL;
    newNode.firstOperand = expression;
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

function createForAllExprNode(id, expression1, expression2) { 
    newNode = new ExpressionNode();
    newNode.type = ExprType.FORALL;
    newNode.firstOperand = expression1;
    newNode.secondOperand = expression2;
    newNode.ident = id;
    return newNode;
}

function ObjectNode(id) {
    this.id = LASTID++;
    this.ident = id;
    this.next = null;
}

function ObjectSeq(first, last) {
    this.first = first;
    this.last = last;
}

function createObjectSeqNode(id) {
    newNode = new ObjectNode(id);
    return new ObjectSeq(newNode, newNode);
}

function addObjectToObjectSeqNode(seq, id) {
    newNode = new ObjectNode(id);
    seq.last.next = newNode;
    seq.last = newNode;
    return seq;
}

var root;

var string;
