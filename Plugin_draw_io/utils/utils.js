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
    let obj = {type: getType(root)};
    if(obj.type == SemanticType.PROPERTY_VALUE) {
        let propertyName = root.stmt.firstExpr.ident;
        let properties = getProperties(editorUi);
        let foundProp = properties.filter(el => el.name == propertyName);
        if(typeof foundProp[0] == "undefined") {
            throw new Error('Error: property "'+propertyName+'" does not exist in the dictionary')
        }
        obj = foundProp[0];
        let propType = obj.type;

        if(propType != "Integer" && propType != "Double" 
        && propType != "Boolean" && propType != "String") {
            obj.enum = propType.slice(6);
            propType = propType.slice(0,4)
        }
        if(propType == "Integer") {
            propType = "int"
        }
        if(propType == "Boolean") {
            propType = "bool"
        }
        obj.type = propType.toLowerCase();
    }
    return obj;
}

function getTextFromCode(code, editorUi) {
    if(code == "") {
        return "";
    }
    let type = getTypeFromCode(code, editorUi).type;
    if(type == "int" || type == "double") {
        return "How many ";
    } else if(type == "bool") {
        return "Is ";
    } else if(type == "enum") {
        return "What is ";
    } else if(type == "comparison") {
        return "Compare ";
    }
    return "";
}

function getTextFromValueInOutcome(value) {
    if(value == "") {
        return "";
    } else if(value == "True") {
        return "Yes";
    } else if(value == "False") {
        return "No";
    } 
    else {
        return value;
    }
}

function CheckCycleInTree(startNode) {
    if(hasCycle(startNode)) {
        throw new Error("В графе присутствуют циклы!");
    }
}

function hasCycle(root) {
    const visited = new Set(); // Список посещенных узлов
  
    function dfs(node) {
      if (!node.edges) return false; // Достигнут конец дерева
      if (visited.has(node)) return true; // Найден цикл

      visited.add(node); // Добавляем текущий узел в список посещенных
  
      // Рекурсивно обходим потомков текущего узла
      for(let i = 0; i < node.edges.length; i++) {
        let child = node.edges[i].target;
        if (child != node && dfs(child)) {
            return true; // Найден цикл
        }
      }
  
      return false; // Нет цикла
    }
  
    return dfs(root);
}

function specialChars(str) {
    return str.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
