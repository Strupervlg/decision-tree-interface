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

function generateCode(workspace) {
    if (workspace.getTopBlocks().length > 1) {
        throw new Error(getTextByLocale("moreBlocksInWorkspace"));
    }
    let code = Blockly.JavaScript.workspaceToCode(workspace);
    if (code.slice(-1) == "\n") {
        code = code.slice(0, -2);
    }
    return code;
}

function getTypeFromCode(code, editorUi) {
    root = null
    parser.parse(code)
    let obj = { type: getType(root) };
    if (obj.type == SemanticType.PROPERTY_VALUE) {
        let propertyName = root.stmt.firstExpr.ident;
        let properties = getProperties(editorUi);
        let foundProp = properties.filter(el => el.name == propertyName);
        if (typeof foundProp[0] == "undefined") {
            throw new Error(getTextByLocale("propertyIsMissingInDict").replace("%propertyName", propertyName));
        }
        obj = foundProp[0];
        let propType = obj.type;

        if (propType != "Integer" && propType != "Double"
            && propType != "Boolean" && propType != "String") {
            obj.enum = propType.slice(6);
            propType = propType.slice(0, 4)
        }
        if (propType == "Integer") {
            propType = "int"
        }
        if (propType == "Boolean") {
            propType = "bool"
        }
        obj.type = propType.toLowerCase();
    } else if (obj.type == SemanticType.COMPARISON_RESULT) {
        obj.enum = "comparisonResult";
        obj.type = "enum";
    } else if (obj.type == SemanticType.ENUM && root.stmt.firstExpr.type == ExprType.ENUM) {
        obj.enum = root.stmt.firstExpr.ident;
    }
    return obj;
}

function getTextFromCode(code, editorUi) {
    if (code == "") {
        return "";
    }
    let type = getTypeFromCode(code, editorUi);
    if (type.type == "int" || type.type == "double") {
        return "How many ";
    } else if (type.type == "bool") {
        return "Is ";
    } else if (type.type == "enum" && type.enum != "comparisonResult") {
        return "What is ";
    } else if (type.type == "enum" && type.enum == "comparisonResult") {
        return "Compare ";
    }
    return "";
}

function getTextFromValueInOutcome(value) {
    if (value == "") {
        return "";
    } else if (value == "True") {
        return "Yes";
    } else if (value == "False") {
        return "No";
    }
    else {
        return value;
    }
}

function CheckCycleInTree(startNode, editorUi) {
    if (hasCycle(startNode, editorUi)) {
        throw new Error(getTextByLocale("hasCycleInTree"));
    }
}

function hasCycle(root, editorUi) {
    const visited = new Set(); // Список посещенных узлов

    function dfs(node) {
        if (!node.edges) return false; // Достигнут конец дерева
        if (visited.has(node)) return true; // Найден цикл

        visited.add(node); // Добавляем текущий узел в список посещенных

        // Рекурсивно обходим потомков текущего узла
        for (let i = 0; i < node.edges.length; i++) {
            let child = node.edges[i].target;
            if (!child) {
                markOutcome(editorUi.editor.graph, node.edges[i])
                throw new Error(getTextByLocale("TargetNodeIsMissing"));
            }
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

function checkValidID(str) {
    return /^[a-zA-Z_][A-Za-z0-9_]*$/.test(str);
}

function checkUniqueValues(values) {
    let setUniqueValues = new Set(values);
    let arrayUniqueValues = Array.from(setUniqueValues);
    return arrayUniqueValues.length == values.length;
}
