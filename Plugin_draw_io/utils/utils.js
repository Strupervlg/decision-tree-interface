const SemanticType = { 
    OBJECT: 'object',
    CLASS: 'class',
    STRING: 'string', 
    BOOLEAN: 'bool',
    INT: 'int',
    DOUBLE: 'double',
    COMPARISON_RESULT: 'comparison',
    ENUM: 'enum',
    ASSIGN: 'assign',
    PROPERTY_VALUE: 'propertyValue'
};


function getType(root) {
    if(root.stmt) {
        return getType(root.stmt);
    } else if(!root.secondExpr && root.firstExpr) {
        return getType(root.firstExpr);
    } else if(root.secondExpr && root.firstExpr) {
        return SemanticType.ASSIGN;
    } else if(root.type && root.type == ExprType.STRING) {
        return SemanticType.STRING;
    } else if(root.type && root.type == ExprType.INT) {
        return SemanticType.INT;
    } else if(root.type && root.type == ExprType.DOUBLE) {
        return SemanticType.DOUBLE;
    } else if(root.type && root.type == ExprType.ENUM) {
        return SemanticType.ENUM;
    } else if(root.type && (root.type == ExprType.BOOLEAN 
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
    } else if(root.type && (root.type == ExprType.VAR 
        || root.type == ExprType.ID 
        || root.type == ExprType.GET_BY_RELATIONSHIP 
        || root.type == ExprType.FIND
        || root.type == ExprType.FIND_EXTREM
        || root.type == ExprType.TREE_VAR)) {
        return SemanticType.OBJECT;
    } else if(root.type && root.type == ExprType.GET_CLASS) {
        return SemanticType.CLASS;
    } else if(root.type && root.type == ExprType.PROPERTY) {
        return SemanticType.PROPERTY_VALUE;
    } else if(root.type && root.type == ExprType.COMPARE) {
        return SemanticType.COMPARISON_RESULT;
    } else {
        alert("Error: " + root.type);
    }
}

function generateCode(workspace) {
    if(workspace.getTopBlocks().length > 1) {
        throw new Error('Error: There is more than one block in the workspace');
    }
    let code = Blockly.JavaScript.workspaceToCode(workspace);
    if(code.slice(-1) == "\n") {
        code = code.slice(0, -2);
    }
    return code;
}

function getTypeFromCode(code, editorUi) {
    root = null
    parser.parse(code)
    let type = getType(root)
    if(type == SemanticType.PROPERTY_VALUE) {
        let propertyName = root.stmt.firstExpr.ident;
        let properties = getProperties(editorUi);
        let foundProp = properties.filter(el => el.name == propertyName);
        if(typeof foundProp[0] == "undefined") {
            throw new Error('Error: property "'+propertyName+'" does not exist in the dictionary')
        }
        let propType = foundProp[0].type;

        if(propType != "Integer" && propType != "Double" 
        && propType != "Boolean" && propType != "String") {
            propType = propType.slice(0,4)
        }
        if(propType == "Integer") {
            propType = "int"
        }
        if(propType == "Boolean") {
            propType = "bool"
        }
        return propType.toLowerCase();
    }
    return type;
}
