//Функции перевода распарсенного кода в блоки Blockly
function toBlock(rootNode, workspace) {
    if (!rootNode.isBlock && rootNode.stmt != null) {
        stmtNodeToBlock(rootNode.stmt, workspace);
    } else if (rootNode.isBlock && rootNode.block != null) {
        blockNodeToBlock(rootNode.block, workspace);
    }
}

function blockNodeToBlock(blockNode, workspace) {
    var resBlock = new Blockly.BlockSvg(workspace, "block");
    resBlock.initSvg();
    resBlock.itemCount_ = 0;
    resBlock.render();

    var current = blockNode.statementSeq.first;
    while (current != null) {
        resBlock.itemCount_++;
        resBlock.updateShape_();
        stmtBlock = stmtNodeToBlock(current, workspace);
        resBlock.getInput("statement" + (resBlock.itemCount_ - 1)).connection.connect(stmtBlock.outputConnection);
        current = current.next;
    }
}

function stmtNodeToBlock(stmtNode, workspace) {
    if (stmtNode.secondExpr == null) {
        return printExprNode(stmtNode.firstExpr, workspace);
    } else if (stmtNode.secondExpr != null && stmtNode.firstExpr.type == ExprType.ID) {
        var assignment = new Blockly.BlockSvg(workspace, "assign_value_to_variable_decision_tree");
        assignment.initSvg();
        assignment.render();

        var block1 = printExprNode(stmtNode.firstExpr, workspace);
        checkTypeBlocks(assignment, block1, "ref_to_object");
        assignment.getInput("ref_to_object").connection.connect(block1.outputConnection);

        var block2 = printExprNode(stmtNode.secondExpr, workspace);
        checkTypeBlocks(assignment, block2, "new_object");
        assignment.getInput("new_object").connection.connect(block2.outputConnection);

        return assignment;
    } else if (stmtNode.secondExpr != null && stmtNode.firstExpr.type == ExprType.PROPERTY) {
        var assignment = new Blockly.BlockSvg(workspace, "assign_value_to_property");
        assignment.initSvg();
        assignment.render();

        var objBlock = printExprNode(stmtNode.firstExpr.firstOperand, workspace);
        checkTypeBlocks(assignment, objBlock, "object");
        assignment.getInput("object").connection.connect(objBlock.outputConnection);

        var propBlock = new Blockly.BlockSvg(workspace, "property");
        propBlock.initSvg();
        propBlock.render();
        propBlock.inputList[0].fieldRow[0].setValue(stmtNode.firstExpr.ident);
        checkTypeBlocks(assignment, propBlock, "property");
        assignment.getInput("property").connection.connect(propBlock.outputConnection);

        var valueBlock = printExprNode(stmtNode.secondExpr, workspace);
        checkTypeBlocks(assignment, valueBlock, "new_value");
        assignment.getInput("new_value").connection.connect(valueBlock.outputConnection);

        return assignment;
    } else if (stmtNode.type == StmtType.ADD_RELATION) {
        var resBlock = new Blockly.BlockSvg(workspace, "add_relationship_to_object");
        resBlock.initSvg();
        resBlock.itemCount_ = 0;
        resBlock.render();

        relBlock = new Blockly.BlockSvg(workspace, "relationship");
        relBlock.initSvg();
        relBlock.render();
        relBlock.inputList[0].fieldRow[0].setValue(stmtNode.ident);
        checkTypeBlocks(resBlock, relBlock, "relationship");
        resBlock.getInput("relationship").connection.connect(relBlock.outputConnection);

        objBlock = printExprNode(stmtNode.firstExpr, workspace);
        checkTypeBlocks(resBlock, objBlock, "object");
        resBlock.getInput("object").connection.connect(objBlock.outputConnection);

        var current = stmtNode.secondExpr.objectSeq.first;
        while (current != null) {
            resBlock.itemCount_++;
            resBlock.updateShape_();
            objOpBlock = printExprNode(current, workspace);
            checkTypeBlocks(resBlock, objOpBlock, "object" + (resBlock.itemCount_ - 1));
            resBlock.getInput("object" + (resBlock.itemCount_ - 1)).connection.connect(objOpBlock.outputConnection);
            current = current.next;
        }

        return resBlock
    } else if (stmtNode.secondExpr != null && stmtNode.firstExpr.type != ExprType.PROPERTY
        && stmtNode.firstExpr.type != ExprType.ID && stmtNode.type != StmtType.ADD_RELATION) {
        throw new Error(getTextByLocale("invalidAssign"));
    }
}

function printExprNode(exprNode, workspace) {
    switch (exprNode.type) {
        case ExprType.OBJ_VAR:
            var resBlock = new Blockly.BlockSvg(workspace, "object");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[0].fieldRow[0].setValue(exprNode.ident);
            return resBlock
        case ExprType.CLASS:
            var classBlock = new Blockly.BlockSvg(workspace, "class");
            classBlock.initSvg();
            classBlock.render();
            classBlock.inputList[0].fieldRow[0].setValue(exprNode.ident);
            return classBlock
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
        case ExprType.ID:
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

            relBlock = new Blockly.BlockSvg(workspace, "relationship");
            relBlock.initSvg();
            relBlock.render();
            relBlock.inputList[0].fieldRow[0].setValue(exprNode.rel);
            checkTypeBlocks(resBlock, relBlock, "relationship");
            resBlock.getInput("relationship").connection.connect(relBlock.outputConnection);

            objBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, objBlock, "object");
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            return resBlock
        case ExprType.PROPERTY:
            var resBlock = new Blockly.BlockSvg(workspace, "get_property_value");
            resBlock.initSvg();
            resBlock.render();

            propBlock = new Blockly.BlockSvg(workspace, "property");
            propBlock.initSvg();
            propBlock.render();
            propBlock.inputList[0].fieldRow[0].setValue(exprNode.ident);
            checkTypeBlocks(resBlock, propBlock, "property");
            resBlock.getInput("property").connection.connect(propBlock.outputConnection);

            objBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, objBlock, "object");
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            return resBlock
        case ExprType.IS:
            var resBlock = new Blockly.BlockSvg(workspace, "check_object_class");
            resBlock.initSvg();
            resBlock.render();

            objBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, objBlock, "object");
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            if (exprNode.secondOperand.type == ExprType.CLASS) {
                var classBlock = new Blockly.BlockSvg(workspace, "class");
                classBlock.initSvg();
                classBlock.render();
                classBlock.inputList[0].fieldRow[0].setValue(exprNode.secondOperand.ident);
            }
            else {
                var classBlock = printExprNode(exprNode.secondOperand, workspace);
            }
            checkTypeBlocks(resBlock, classBlock, "class");
            resBlock.getInput("class").connection.connect(classBlock.outputConnection);
            return resBlock
        case ExprType.GREATER:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("GREATER");

            op1Block = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, op1Block, "operand1");
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, op2Block, "operand2");
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.LESS:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("LESS");

            op1Block = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, op1Block, "operand1");
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, op2Block, "operand2");
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.EQUAL:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("EQUAL");

            op1Block = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, op1Block, "operand1");
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, op2Block, "operand2");
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.NOT_EQUAL:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("NOT_EQUAL");

            op1Block = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, op1Block, "operand1");
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, op2Block, "operand2");
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.GE:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("GE");

            op1Block = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, op1Block, "operand1");
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, op2Block, "operand2");
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.LE:
            var resBlock = new Blockly.BlockSvg(workspace, "comparison");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue("LE");

            op1Block = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, op1Block, "operand1");
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, op2Block, "operand2");
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.COMPARE:
            var resBlock = new Blockly.BlockSvg(workspace, "three_digit_comparison");
            resBlock.initSvg();
            resBlock.render();

            op1Block = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, op1Block, "operand1");
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, op2Block, "operand2");
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.AND:
            var resBlock = new Blockly.BlockSvg(workspace, "and");
            resBlock.initSvg();
            resBlock.render();

            op1Block = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, op1Block, "operand1");
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, op2Block, "operand2");
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.OR:
            var resBlock = new Blockly.BlockSvg(workspace, "or");
            resBlock.initSvg();
            resBlock.render();

            op1Block = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, op1Block, "operand1");
            resBlock.getInput("operand1").connection.connect(op1Block.outputConnection);

            op2Block = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, op2Block, "operand2");
            resBlock.getInput("operand2").connection.connect(op2Block.outputConnection);

            return resBlock
        case ExprType.NOT:
            var resBlock = new Blockly.BlockSvg(workspace, "not");
            resBlock.initSvg();
            resBlock.render();

            opBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, opBlock, "operand");
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
            checkTypeBlocks(resBlock, relBlock, "relationship");
            resBlock.getInput("relationship").connection.connect(relBlock.outputConnection);

            objBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, objBlock, "object");
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            var current = exprNode.objectSeq.first;
            while (current != null) {
                resBlock.itemCount_++;
                resBlock.updateShape_();
                objOpBlock = printExprNode(current, workspace);
                checkTypeBlocks(resBlock, objOpBlock, "object" + (resBlock.itemCount_ - 1));
                resBlock.getInput("object" + (resBlock.itemCount_ - 1)).connection.connect(objOpBlock.outputConnection);
                current = current.next;
            }

            return resBlock
        case ExprType.GET_CLASS:
            var resBlock = new Blockly.BlockSvg(workspace, "get_class");
            resBlock.initSvg();
            resBlock.render();

            objBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, objBlock, "object");
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            return resBlock
        case ExprType.FIND:
            var resBlock = new Blockly.BlockSvg(workspace, "get_condition_object");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[2].fieldRow[0].setValue(exprNode.typeIdent);
            resBlock.inputList[3].fieldRow[0].setValue(exprNode.ident);

            condBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, condBlock, "condition");
            resBlock.getInput("condition").connection.connect(condBlock.outputConnection);

            return resBlock
        case ExprType.FIND_EXTREM:
            var resBlock = new Blockly.BlockSvg(workspace, "get_extr_object");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[1].fieldRow[0].setValue(exprNode.extremeIdent);
            resBlock.inputList[3].fieldRow[0].setValue(exprNode.typeIdent);
            resBlock.inputList[4].fieldRow[0].setValue(exprNode.ident);

            extrCondBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, extrCondBlock, "extreme_condition");
            resBlock.getInput("extreme_condition").connection.connect(extrCondBlock.outputConnection);

            condBlock = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, condBlock, "general_condition");
            resBlock.getInput("general_condition").connection.connect(condBlock.outputConnection);

            return resBlock
        case ExprType.EXIST:
            var resBlock = new Blockly.BlockSvg(workspace, "quantifier_of_existence");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[3].fieldRow[0].setValue(exprNode.typeIdent);
            resBlock.inputList[4].fieldRow[0].setValue(exprNode.ident);

            defBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, defBlock, "definition_area");
            resBlock.getInput("definition_area").connection.connect(defBlock.outputConnection);

            verBlock = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, verBlock, "verification_condition");
            resBlock.getInput("verification_condition").connection.connect(verBlock.outputConnection);

            return resBlock
        case ExprType.FORALL:
            var resBlock = new Blockly.BlockSvg(workspace, "quantifier_of_generality");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[3].fieldRow[0].setValue(exprNode.typeIdent);
            resBlock.inputList[4].fieldRow[0].setValue(exprNode.ident);

            defBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, defBlock, "definition_area");
            resBlock.getInput("definition_area").connection.connect(defBlock.outputConnection);

            verBlock = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, verBlock, "verification_condition");
            resBlock.getInput("verification_condition").connection.connect(verBlock.outputConnection);

            return resBlock
        case ExprType.CAST:
            var resBlock = new Blockly.BlockSvg(workspace, "cast_object_to_class");
            resBlock.initSvg();
            resBlock.render();

            objBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, objBlock, "object");
            resBlock.getInput("object").connection.connect(objBlock.outputConnection);

            if (exprNode.cast.type == ExprType.CLASS) {
                var classBlock = new Blockly.BlockSvg(workspace, "class");
                classBlock.initSvg();
                classBlock.render();
                classBlock.inputList[0].fieldRow[0].setValue(exprNode.cast.ident);
            }
            else {
                var classBlock = printExprNode(exprNode.cast, workspace);
            }
            checkTypeBlocks(resBlock, classBlock, "class");
            resBlock.getInput("class").connection.connect(classBlock.outputConnection);
            return resBlock
        case ExprType.IF:
            var resBlock = new Blockly.BlockSvg(workspace, "if_then_stmt");
            resBlock.initSvg();
            resBlock.render();

            condBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, condBlock, "condition");
            resBlock.getInput("condition").connection.connect(condBlock.outputConnection);

            bodyBlock = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, bodyBlock, "body");
            resBlock.getInput("body").connection.connect(bodyBlock.outputConnection);

            return resBlock
        case ExprType.WITH:
            var resBlock = new Blockly.BlockSvg(workspace, "with_stmt");
            resBlock.initSvg();
            resBlock.render();
            resBlock.inputList[1].fieldRow[0].setValue(exprNode.ident);

            expressionBlock = printExprNode(exprNode.firstOperand, workspace);
            checkTypeBlocks(resBlock, expressionBlock, "expression");
            resBlock.getInput("expression").connection.connect(expressionBlock.outputConnection);

            bodyBlock = printExprNode(exprNode.secondOperand, workspace);
            checkTypeBlocks(resBlock, bodyBlock, "body");
            resBlock.getInput("body").connection.connect(bodyBlock.outputConnection);

            return resBlock
    }
}

function checkTypeBlocks(blockInput, blockOutput, input) {
    let outputCheck = blockOutput.outputConnection.check_;
    let inputCheck = blockInput.getInput(input).connection.check_;
    if (outputCheck.filter(x => inputCheck.includes(x)).length == 0) {
        throw new Error(getTextByLocale("InvalidType").replace("%type", blockInput.type)
            .replace("%inputCheck", inputCheck).replace("%outputCheck", outputCheck))
    }
}
