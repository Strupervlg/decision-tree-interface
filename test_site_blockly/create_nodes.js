var LASTID = 0;

function ProgramNode(statement, isBlock) {
    this.isBlock = isBlock;
    if (isBlock) {
        this.block = statement;
        this.stmt = null;
    } else {
        this.block = null;
        this.stmt = statement;
    }
    this.id = LASTID++;
}

function BlockNode(statementSeq) {
    this.statementSeq = statementSeq;
    this.id = LASTID++;
}

const StmtType = {
    EXPR: 'expr',
    ASSIGNMENT: 'assignment',
    ADD_RELATION: 'add_relation',
}

function StatementNode(type, firstExpression, secondExpression) {
    this.firstExpr = firstExpression;
    this.secondExpr = secondExpression;
    this.type = type;
    this.next = null;
    this.id = LASTID++;
}

function StatementSeq(first, last) {
    this.first = first;
    this.last = last;
}

function createAddRelationshipStmtNode(first, relationship, objectSeq) {
    second = new ExpressionNode();
    second.type = ExprType.ID;
    second.ident = relationship;
    second.objectSeq = objectSeq;
    return new StatementNode(StmtType.ADD_RELATION, first, second);
}

function createStmtSeqNode(stmt) {
    return new StatementSeq(stmt, stmt);
}

function addStmtToStmtSeqNode(seqStmt, stmt) {
    seqStmt.last.next = stmt;
    seqStmt.last = stmt;
    return seqStmt;
}

const ExprType = {
    ID: 'id',
    STRING: 'string',
    INT: 'int',
    DOUBLE: 'double',
    BOOLEAN: 'boolean',
    TREE_VAR: 'tree_var',
    VAR: 'var',
    ENUM: 'enum',
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
    GET_CLASS: 'get_class',
    FIND: 'find',
    FIND_EXTREM: 'find extreme',
    EXIST: 'exist',
    FORALL: 'forall',
    CAST: 'cast',
    IF: 'if',
    WITH: 'with',
};

function ExpressionNode() {
    this.id = LASTID++;
    this.type = null;
    this.typeIdent = null;
    this.ident = null;
    this.rel = null;
    this.extremeIdent = null;
    this.string = null;
    this.int = null;
    this.double = null;
    this.boolean = null;

    this.identValue = null;

    this.cast = null;

    this.firstOperand = null;
    this.secondOperand = null;

    this.objectSeq = null;
    this.next = null;
}

function createBinExprNode(typeNode, firstExprOperand, secondExprOperand) {
    newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = firstExprOperand;
    if (typeNode == ExprType.PROPERTY) {
        newNode.ident = secondExprOperand;
    } else {
        newNode.secondOperand = secondExprOperand;
    }

    return newNode;
}

function createGetObjectByRel(firstExprOperand, relationship) {
    newNode = new ExpressionNode();
    newNode.type = ExprType.GET_BY_RELATIONSHIP;
    newNode.rel = relationship;

    newNode.firstOperand = firstExprOperand;

    return newNode;
}

function createUnaryExprNode(typeNode, operand) {
    newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = operand;
    return newNode;
}

function createCastExprNode(cast, operand) {
    newNode = new ExpressionNode();
    newNode.type = ExprType.CAST;
    newNode.firstOperand = operand;
    newNode.cast = cast;
    return newNode;
}

function createLiteral(typeNode, literal) {
    newNode = new ExpressionNode();
    newNode.type = typeNode;
    if (typeNode == ExprType.ID) {
        newNode.ident = literal;
    } else if (typeNode == ExprType.TREE_VAR) {
        newNode.ident = literal.substring(4);
    } else if (typeNode == ExprType.VAR) {
        newNode.ident = literal.substring(1);
    } else if (typeNode == ExprType.STRING) {
        newNode.string = literal;
    } else if (typeNode == ExprType.INT) {
        newNode.int = Number(literal);
    } else if (typeNode == ExprType.DOUBLE) {
        newNode.double = Number(literal);
    } else if (typeNode == ExprType.BOOLEAN) {
        newNode.boolean = literal;
    }
    return newNode;
}

function createEnum(idOwner, idValue) {
    newNode = new ExpressionNode();
    newNode.type = ExprType.ENUM;
    newNode.ident = idOwner;
    newNode.identValue = idValue;
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

function createGetExprNode(typeNode, type, id, expression) {
    newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = expression;
    newNode.typeIdent = type;
    newNode.ident = id;
    return newNode;
}

function createFindExtremeExprNode(extremeVarName, extremeCondition, typeVar, varName, condition) {
    newNode = new ExpressionNode();
    newNode.type = ExprType.FIND_EXTREM;
    newNode.extremeIdent = extremeVarName;
    newNode.firstOperand = extremeCondition;
    newNode.typeIdent = typeVar;
    newNode.ident = varName;
    newNode.secondOperand = condition;
    return newNode;
}

function createQuantifierExprNode(typeNode, type, id, expression1, expression2) {
    newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = expression1;
    newNode.secondOperand = expression2;
    newNode.typeIdent = type;
    newNode.ident = id;
    return newNode;
}

function createIfExprNode(condition, expression) {
    newNode = new ExpressionNode();
    newNode.type = ExprType.IF;
    newNode.firstOperand = condition;
    newNode.secondOperand = expression;
    return newNode;
}

function createWithExprNode(id, expression1, expression2) {
    newNode = new ExpressionNode();
    newNode.type = ExprType.WITH;
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