//Вспомогательные функции для парсинга

var LASTID = 0;

export function ProgramNode(statement, isBlock) {
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

export function BlockNode(statementSeq) {
    this.statementSeq = statementSeq;
    this.id = LASTID++;
}

export const StmtType = {
    EXPR: 'expr',
    ASSIGNMENT: 'assignment',
    ADD_RELATION: 'add_relation',
}

export function StatementNode(type, firstExpression, secondExpression) {
    this.firstExpr = firstExpression;
    this.secondExpr = secondExpression;
    this.type = type;
    this.next = null;
    this.id = LASTID++;
}

export function StatementSeq(first, last) {
    this.first = first;
    this.last = last;
}

export function createAddRelationshipStmtNode(first, relationship, objectSeq) {
    let second = new ExpressionNode();
    second.type = ExprType.ID;
    second.ident = relationship;
    second.objectSeq = objectSeq;
    return new StatementNode(StmtType.ADD_RELATION, first, second);
}

export function createStmtSeqNode(stmt) {
    return new StatementSeq(stmt, stmt);
}

export function addStmtToStmtSeqNode(seqStmt, stmt) {
    seqStmt.last.next = stmt;
    seqStmt.last = stmt;
    return seqStmt;
}

export const ExprType = {
    ID: 'id',
    STRING: 'string',
    INT: 'int',
    DOUBLE: 'double',
    BOOLEAN: 'boolean',
    CLASS: 'class',
    OBJ_VAR: 'obj_var',
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

export function ExpressionNode() {
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

export function createBinExprNode(typeNode, firstExprOperand, secondExprOperand) {
    let newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = firstExprOperand;
    if (typeNode == ExprType.PROPERTY) {
        newNode.ident = secondExprOperand;
    } else {
        newNode.secondOperand = secondExprOperand;
    }

    return newNode;
}

export function createGetObjectByRel(firstExprOperand, relationship) {
    let newNode = new ExpressionNode();
    newNode.type = ExprType.GET_BY_RELATIONSHIP;
    newNode.rel = relationship;

    newNode.firstOperand = firstExprOperand;

    return newNode;
}

export function createUnaryExprNode(typeNode, operand) {
    let newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = operand;
    return newNode;
}

export function createCastExprNode(cast, operand) {
    let newNode = new ExpressionNode();
    newNode.type = ExprType.CAST;
    newNode.firstOperand = operand;
    newNode.cast = cast;
    return newNode;
}

export function createLiteral(typeNode, literal) {
    let newNode = new ExpressionNode();
    newNode.type = typeNode;
    if (typeNode == ExprType.ID) {
        newNode.ident = literal;
    } else if (typeNode == ExprType.CLASS) {
        newNode.ident = literal;
    } else if (typeNode == ExprType.OBJ_VAR) {
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

export function createEnum(idOwner, idValue) {
    let newNode = new ExpressionNode();
    newNode.type = ExprType.ENUM;
    newNode.ident = idOwner;
    newNode.identValue = idValue;
    return newNode;
}

export function createCheckRelExprNode(expression, relationship, objectSeq) {
    let newNode = new ExpressionNode();
    newNode.type = ExprType.CHECK_REL;
    newNode.firstOperand = expression;
    newNode.rel = relationship;
    newNode.objectSeq = objectSeq;
    return newNode;
}

export function createGetExprNode(typeNode, type, id, expression) {
    let newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = expression;
    newNode.typeIdent = type;
    newNode.ident = id;
    return newNode;
}

export function createFindExtremeExprNode(extremeVarName, extremeCondition, typeVar, varName, condition) {
    let newNode = new ExpressionNode();
    newNode.type = ExprType.FIND_EXTREM;
    newNode.extremeIdent = extremeVarName;
    newNode.firstOperand = extremeCondition;
    newNode.typeIdent = typeVar;
    newNode.ident = varName;
    newNode.secondOperand = condition;
    return newNode;
}

export function createQuantifierExprNode(typeNode, type, id, expression1, expression2) {
    let newNode = new ExpressionNode();
    newNode.type = typeNode;
    newNode.firstOperand = expression1;
    newNode.secondOperand = expression2;
    newNode.typeIdent = type;
    newNode.ident = id;
    return newNode;
}

export function createIfExprNode(condition, expression) {
    let newNode = new ExpressionNode();
    newNode.type = ExprType.IF;
    newNode.firstOperand = condition;
    newNode.secondOperand = expression;
    return newNode;
}

export function createWithExprNode(id, expression1, expression2) {
    let newNode = new ExpressionNode();
    newNode.type = ExprType.WITH;
    newNode.firstOperand = expression1;
    newNode.secondOperand = expression2;
    newNode.ident = id;
    return newNode;
}

export function ObjectSeq(first, last) {
    this.first = first;
    this.last = last;
}

export function createObjectSeqNode(expr) {
    return new ObjectSeq(expr, expr);
}

export function addObjectToObjectSeqNode(seq, expr) {
    seq.last.next = expr;
    seq.last = expr;
    return seq;
}

export var root;

export var string;
