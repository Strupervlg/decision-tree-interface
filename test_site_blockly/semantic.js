const SemanticType = {
    OBJECT: 'object',
    CLASS: 'class',
    STRING: 'string',
    BOOLEAN: 'boolean',
    INT: 'int',
    DOUBLE: 'double',
    COMPARISON_RESULT: 'comparisonResult',
    ENUM: 'enum',
    ASSIGN: 'assign',
    PROPERTY_VALUE: 'propertyValue',
    BLOCK: 'block',
};


function getType(root) {
    if (root.isBlock && root.block) {
        return SemanticType.BLOCK;
    } else if (!root.isBlock && root.stmt) {
        return getType(root.stmt);
    } else if (!root.secondExpr && root.firstExpr) {
        return getType(root.firstExpr);
    } else if (root.secondExpr && root.firstExpr) {
        return SemanticType.ASSIGN;
    } else if (root.type && root.type == ExprType.IF) {
        return SemanticType.ASSIGN;
    } else if (root.type && root.type == ExprType.WITH) {
        return SemanticType.ASSIGN;
    } else if (root.type && root.type == ExprType.STRING) {
        return SemanticType.STRING;
    } else if (root.type && root.type == ExprType.INT) {
        return SemanticType.INT;
    } else if (root.type && root.type == ExprType.DOUBLE) {
        return SemanticType.DOUBLE;
    } else if (root.type && root.type == ExprType.ENUM) {
        return SemanticType.ENUM;
    } else if (root.type && (root.type == ExprType.BOOLEAN
        || root.type == ExprType.IS
        || root.type == ExprType.CHECK_REL
        || root.type == ExprType.AND
        || root.type == ExprType.OR
        || root.type == ExprType.NOT
        || root.type == ExprType.GREATER
        || root.type == ExprType.LESS
        || root.type == ExprType.GE
        || root.type == ExprType.LE
        || root.type == ExprType.EQUAL
        || root.type == ExprType.NOT_EQUAL
        || root.type == ExprType.EXIST
        || root.type == ExprType.FORALL)) {
        return SemanticType.BOOLEAN;
    } else if (root.type && (root.type == ExprType.VAR
        || root.type == ExprType.ID
        || root.type == ExprType.GET_BY_RELATIONSHIP
        || root.type == ExprType.FIND
        || root.type == ExprType.FIND_EXTREM
        || root.type == ExprType.TREE_VAR
        || root.type == ExprType.CAST)) {
        return SemanticType.OBJECT;
    } else if (root.type && root.type == ExprType.GET_CLASS) {
        return SemanticType.CLASS;
    } else if (root.type && root.type == ExprType.PROPERTY) {
        return SemanticType.PROPERTY_VALUE;
    } else if (root.type && root.type == ExprType.COMPARE) {
        return SemanticType.COMPARISON_RESULT;
    } else {
        alert("Error: " + root.type);
    }
}
