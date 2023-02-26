function toBlock(rootNode) {
	if (rootNode.stmt != null) {
		stmtNodeToBlock(rootNode.stmt);
	}
}

function stmtNodeToBlock(stmtNode) {
    if(stmtNode.secondExpr == null) {
        printExprNode(stmtNode.firstExpr);
    } else if(stmtNode.secondExpr != null && stmtNode.firstExpr.type == ExprType.TREE_VAR) {
        var assignment = new Blockly.BlockSvg(workspace, "assign_value_to_variable_decision_tree");
        assignment.initSvg();
        assignment.render();

        var block1 = printExprNode(stmtNode.firstExpr);
        assignment.getInput("ref_to_object").connection.connect(block1.outputConnection);

        var block2 = printExprNode(stmtNode.secondExpr);
        assignment.getInput("new_object").connection.connect(block2.outputConnection);

    } else if(stmtNode.secondExpr != null && stmtNode.firstExpr.type == ExprType.PROPERTY) {
        var assignment = new Blockly.BlockSvg(workspace, "assign_value_to_property");
        assignment.initSvg();
        assignment.render();

        var objBlock = printExprNode(stmtNode.firstExpr.firstOperand);
        assignment.getInput("object").connection.connect(objBlock.outputConnection);

        var propBlock = new Blockly.BlockSvg(workspace, "property");
        propBlock.initSvg();
        propBlock.render();
        propBlock.inputList[0].fieldRow[0].setValue(stmtNode.firstExpr.ident);
        assignment.getInput("property").connection.connect(propBlock.outputConnection);

        var valueBlock = printExprNode(stmtNode.secondExpr);
        assignment.getInput("new_value").connection.connect(valueBlock.outputConnection);
    }
}

function printExprNode(exprNode) {
    switch(exprNode.type) {
        case ExprType.ID:
            var resBlock = new Blockly.BlockSvg(workspace, "object");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[0].fieldRow[0].setValue(exprNode.ident);
            return resBlock
        case ExprType.STRING:
            var resBlock = new Blockly.BlockSvg(workspace, "string");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[0].fieldRow[0].setValue(exprNode.string);
            return resBlock
        case ExprType.INT:
            var resBlock = new Blockly.BlockSvg(workspace, "integer");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[0].fieldRow[0].setValue(exprNode.int);
            return resBlock
        case ExprType.DOUBLE:
            var resBlock = new Blockly.BlockSvg(workspace, "double");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[0].fieldRow[0].setValue(exprNode.double);
            return resBlock
        case ExprType.BOOLEAN:
            var resBlock = new Blockly.BlockSvg(workspace, "boolean");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[0].fieldRow[0].setValue(exprNode.boolean);
            return resBlock
        case ExprType.TREE_VAR:
            var resBlock = new Blockly.BlockSvg(workspace, "ref_to_decision_tree_var");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[0].fieldRow[0].setValue(exprNode.ident);
            return resBlock
        case ExprType.VAR:
            var resBlock = new Blockly.BlockSvg(workspace, "variable");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[0].fieldRow[0].setValue(exprNode.ident);
            return resBlock
        case ExprType.ENUM:
            var resBlock = new Blockly.BlockSvg(workspace, "enum");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[0].fieldRow[0].setValue(exprNode.ident);
            resBlock.inputList[1].fieldRow[0].setValue(exprNode.identValue);
            return resBlock
        case ExprType.GET_BY_RELATIONSHIP:
            var resBlock = new Blockly.BlockSvg(workspace, "get_relationship_object");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[3].fieldRow[0].setValue(exprNode.ident);

            relBlock = new Blockly.BlockSvg(workspace, "relationship");
            relBlock.initSvg();
            relBlock.render();
            relBlock.inputList[0].fieldRow[0].setValue(exprNode.rel);
            resBlock.getInput("relationship").connection.connect(relBlock.outputConnection);
            
            objBlock = printExprNode(exprNode.firstOperand);
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            boolBlock = printExprNode(exprNode.secondOperand);
            resBlock.getInput("boolean").connection.connect(boolBlock.outputConnection);

            return resBlock
        case ExprType.PROPERTY:
            var resBlock = new Blockly.BlockSvg(workspace, "get_property_value");
            resBlock.initSvg();
            resBlock.render();

            propBlock = new Blockly.BlockSvg(workspace, "property");
            propBlock.initSvg();
            propBlock.render();
            propBlock.inputList[0].fieldRow[0].setValue(exprNode.ident);
            resBlock.getInput("property").connection.connect(propBlock.outputConnection);
            
            objBlock = printExprNode(exprNode.firstOperand);
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            return resBlock
        case ExprType.IS:
            var resBlock = new Blockly.BlockSvg(workspace, "check_object_class");
            resBlock.initSvg();
            resBlock.render();
            
            objBlock = printExprNode(exprNode.firstOperand);
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            if(exprNode.secondOperand.type == ExprType.ID) {
                var classBlock = new Blockly.BlockSvg(workspace, "class");
                classBlock.initSvg();
                classBlock.render();
                classBlock.inputList[0].fieldRow[0].setValue(exprNode.secondOperand.ident);
            }
            else {
                var classBlock = printExprNode(exprNode.secondOperand);
            }
            resBlock.getInput("class").connection.connect(classBlock.outputConnection);
            return resBlock
        case ExprType.GREATER:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("GREATER");
            
            op1Block = printExprNode(exprNode.firstOperand);
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand);
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.LESS:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("LESS");
            
            op1Block = printExprNode(exprNode.firstOperand);
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand);
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.EQUAL:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("EQUAL");
            
            op1Block = printExprNode(exprNode.firstOperand);
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand);
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.NOT_EQUAL:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("NOT_EQUAL");
            
            op1Block = printExprNode(exprNode.firstOperand);
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand);
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.GE:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("GE");
            
            op1Block = printExprNode(exprNode.firstOperand);
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand);
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.LE:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("LE");
            
            op1Block = printExprNode(exprNode.firstOperand);
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand);
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.COMPARE:
            var resBlock = new Blockly.BlockSvg(workspace, "three_digit_comparison");
            resBlock.initSvg();
            resBlock.render();
            
            op1Block = printExprNode(exprNode.firstOperand);
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand);
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.AND:
            var resBlock = new Blockly.BlockSvg(workspace, "and");
            resBlock.initSvg();
            resBlock.render();
            
            op1Block = printExprNode(exprNode.firstOperand);
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand);
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.OR:
            var resBlock = new Blockly.BlockSvg(workspace, "or");
            resBlock.initSvg();
            resBlock.render();
            
            op1Block = printExprNode(exprNode.firstOperand);
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand);
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.NOT:
            var resBlock = new Blockly.BlockSvg(workspace, "not");
            resBlock.initSvg();
            resBlock.render();
            
            opBlock = printExprNode(exprNode.firstOperand);
            resBlock.getInput("operand").connection.connect(opBlock.outputConnection);

            return resBlock
        case ExprType.CHECK_REL:
            var resBlock = new Blockly.BlockSvg(workspace, "check_relationship");
            resBlock.initSvg();
            resBlock.itemCount_ = 0;
            resBlock.render();

            relBlock = new Blockly.BlockSvg(workspace, "relationship");
            relBlock.initSvg();
            relBlock.render();
            relBlock.inputList[0].fieldRow[0].setValue(exprNode.rel);
            resBlock.getInput("relationship").connection.connect(relBlock.outputConnection);
            
            objBlock = printExprNode(exprNode.firstOperand);
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            var current = exprNode.objectSeq.first;
            while (current != null) {
                resBlock.itemCount_++;
                resBlock.updateShape_();
                objOpBlock = printExprNode(current);
                resBlock.getInput("object" + (resBlock.itemCount_-1)).connection.connect(objOpBlock.outputConnection);
                current = current.next;
            }

            return resBlock
        case ExprType.GET_CLASS:
            var resBlock = new Blockly.BlockSvg(workspace, "get_class");
            resBlock.initSvg();
            resBlock.render();
            
            objBlock = printExprNode(exprNode.firstOperand);
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            return resBlock
        case ExprType.FIND:
            var resBlock = new Blockly.BlockSvg(workspace, "get_condition_object");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue(exprNode.ident);
            
            condBlock = printExprNode(exprNode.firstOperand);
            resBlock.getInput("condition").connection.connect(condBlock.outputConnection);

            return resBlock
        case ExprType.FIND_EXTREM:
            var resBlock = new Blockly.BlockSvg(workspace, "get_extr_object");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[1].fieldRow[0].setValue(exprNode.extremeIdent);
            resBlock.inputList[3].fieldRow[0].setValue(exprNode.ident);
            
            extrCondBlock = printExprNode(exprNode.firstOperand);
            resBlock.getInput("extreme_condition").connection.connect(extrCondBlock.outputConnection);

            condBlock = printExprNode(exprNode.secondOperand);
            resBlock.getInput("general_condition").connection.connect(condBlock.outputConnection);

            return resBlock
        case ExprType.EXIST:
            var resBlock = new Blockly.BlockSvg(workspace, "quantifier_of_existence");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue(exprNode.ident);
            
            condBlock = printExprNode(exprNode.firstOperand);
            resBlock.getInput("condition").connection.connect(condBlock.outputConnection);

            return resBlock
        case ExprType.FORALL:
            var resBlock = new Blockly.BlockSvg(workspace, "quantifier_of_generality");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[3].fieldRow[0].setValue(exprNode.ident);
            
            defBlock = printExprNode(exprNode.firstOperand);
            resBlock.getInput("definition_area").connection.connect(defBlock.outputConnection);

            verBlock = printExprNode(exprNode.secondOperand);
            resBlock.getInput("verification_condition").connection.connect(verBlock.outputConnection);

            return resBlock
    }
}