function printProgram(rootNode) {
    var result = "";
    result += "digraph G {\n";
    result += "ID"+ rootNode.id +" [label=\"program\"]\n";

	if (rootNode.stmt != null) {
		result += printStmtNode(rootNode.stmt);
        result += "ID"+ rootNode.id +"->ID"+ rootNode.stmt.id +"\n";
	}
	result += "}";
    return result;
}

function printStmtNode(stmtNode) {
    if(stmtNode.secondExpr == null) {
        result = "ID" + stmtNode.id + " [label=\"expr_stmt\"]\n";
        result += printExprNode(stmtNode.firstExpr);
        result += "ID"+ stmtNode.id +"->ID"+ stmtNode.firstExpr.id +"\n";
    } else if(stmtNode.secondExpr != null) {
        result = "ID" + stmtNode.id + " [label=\"assignment\"]\n";
        result += printExprNode(stmtNode.firstExpr);
        result += printExprNode(stmtNode.secondExpr);
        result += "ID"+ stmtNode.id +"->ID"+ stmtNode.firstExpr.id +"\n";
        result += "ID"+ stmtNode.id +"->ID"+ stmtNode.secondExpr.id +"\n";
    }
    return result;
}

function printExprNode(exprNode) {
    switch(exprNode.type) {
        case ExprType.ID:
            return "ID" + exprNode.id + " [label=\"ID " + exprNode.ident + "\"]\n";
        case ExprType.STRING:
            return "ID" + exprNode.id + " [label=\"String " + exprNode.string + "\"]\n";
        case ExprType.INT:
            return "ID" + exprNode.id + " [label=\"Int " + exprNode.int + "\"]\n";
        case ExprType.DOUBLE:
            return "ID" + exprNode.id + " [label=\"Double " + exprNode.double + "\"]\n";
        case ExprType.BOOLEAN:
            return "ID" + exprNode.id + " [label=\"Boolean " + exprNode.boolean + "\"]\n";
        case ExprType.TREE_VAR:
            return "ID" + exprNode.id + " [label=\"Tree var " + exprNode.ident + "\"]\n";
        case ExprType.RELATIONSHIP:
            result = "ID" + exprNode.id + " [label=\"Relationship: " + exprNode.ident + "\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID"+ exprNode.id +"->ID"+ exprNode.firstOperand.id +"\n";
            return result;
        case ExprType.PROPERTY:
            result = "ID" + exprNode.id + " [label=\"Property: " + exprNode.ident + "\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID"+ exprNode.id +"->ID"+ exprNode.firstOperand.id +"\n";
            return result;
        case ExprType.IS:
            result = "ID" + exprNode.id + " [label=\"Is\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"OBJECT\"]\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.secondOperand.id +"[label=\"CLASS\"]\n";
            return result;
        case ExprType.GREATER:
            result = "ID" + exprNode.id + " [label=\"Greater\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"FIRST\"]\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.secondOperand.id +"[label=\"SECOND\"]\n";
            return result;
        case ExprType.LESS:
            result = "ID" + exprNode.id + " [label=\"Less\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"FIRST\"]\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.secondOperand.id +"[label=\"SECOND\"]\n";
            return result;
        case ExprType.EQUAL:
            result = "ID" + exprNode.id + " [label=\"Equal\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"FIRST\"]\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.secondOperand.id +"[label=\"SECOND\"]\n";
            return result;
        case ExprType.GE:
            result = "ID" + exprNode.id + " [label=\"GE\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"FIRST\"]\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.secondOperand.id +"[label=\"SECOND\"]\n";
            return result;
        case ExprType.LE:
            result = "ID" + exprNode.id + " [label=\"LE\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"FIRST\"]\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.secondOperand.id +"[label=\"SECOND\"]\n";
            return result;
        case ExprType.COMPARE:
            result = "ID" + exprNode.id + " [label=\"Compare\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"FIRST\"]\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.secondOperand.id +"[label=\"SECOND\"]\n";
            return result;
        case ExprType.AND:
            result = "ID" + exprNode.id + " [label=\"And\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"FIRST\"]\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.secondOperand.id +"[label=\"SECOND\"]\n";
            return result;
        case ExprType.OR:
            result = "ID" + exprNode.id + " [label=\"Or\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"FIRST\"]\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.secondOperand.id +"[label=\"SECOND\"]\n";
            return result;
        case ExprType.NOT:
            result = "ID" + exprNode.id + " [label=\"Not\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"\n";
            return result;
        case ExprType.CHECK_REL:
            result = "ID" + exprNode.id + " [label=\"Check Relationship\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"Relationship\"]\n";
            result += printObjectSeq(exprNode.objectSeq, exprNode);
            return result;
        case ExprType.CHECK_VAL:
            result = "ID" + exprNode.id + " [label=\"Check value\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"[label=\"Property\"]\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.secondOperand.id +"[label=\"Value\"]\n";
            return result;
        case ExprType.GET_CLASS:
            result = "ID" + exprNode.id + " [label=\"Get class\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID" + exprNode.id +"->ID"+ exprNode.firstOperand.id +"\n";
            return result;
        case ExprType.GET:
            result = "ID" + exprNode.id + " [label=\"Get newVar: " + exprNode.ident + "\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID"+ exprNode.id +"->ID"+ exprNode.firstOperand.id +"\n";
            return result;
        case ExprType.EXIST:
            result = "ID" + exprNode.id + " [label=\"Exist newVar: " + exprNode.ident + "\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID"+ exprNode.id +"->ID"+ exprNode.firstOperand.id +"\n";
            return result;
        case ExprType.FORALL:
            result = "ID" + exprNode.id + " [label=\"ForAll newVar: " + exprNode.ident + "\"]\n";
            result += printExprNode(exprNode.firstOperand);
            result += "ID"+ exprNode.id +"->ID"+ exprNode.firstOperand.id +"\n";
            result += printExprNode(exprNode.secondOperand);
            result += "ID"+ exprNode.id +"->ID"+ exprNode.secondOperand.id +"\n";
            return result;
    }
}

function printObjectSeq(objectSeqNode, parent) {
    if(objectSeqNode != null) {
        current = objectSeqNode.first;
    }
    else {
        current = null;
    }
    
    result = "";
	while (current != null) {
		result += printObjectNode(current);
        result += "ID"+ parent.id +"->ID"+ current.id +"\n";
		current = current.next;
	}
    return result;
}

function printObjectNode(objectNode) {
    return "ID" + objectNode.id + " [label=\"Object: " + objectNode.ident + "\"]\n";
}