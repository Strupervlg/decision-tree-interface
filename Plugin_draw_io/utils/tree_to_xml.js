function treeToXml(editorUi)
{
    let result = '<?xml version="1.0"?>\n';

    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;
    let countStartNode = 0;
    Object.keys(cells).forEach(function (key) {

        var node = cells[key];
        
        if (node.value != null && typeof node.value == "object" && node.value.getAttribute("type") == "START") {
            countStartNode++;
            // CheckCycleInTree(node);
            result += startNodeToXml(node, editorUi);
            return;
        }
    });
    if(countStartNode != 1) {
        throw new Error(getTextByLocale("StartNodeOnlyOne"));
    }
    return result;
}

function startNodeToXml(startNode, editorUi)
{
    let result = "<StartNode>\n<InputVariables>\n";
    result += getVariables(startNode.value.getAttribute("label"));
    result += '</InputVariables>\n';
    if(startNode.edges) {
        for(let i = 0; i < startNode.edges.length; i++) {
            if(startNode.edges[i].value == null || typeof startNode.edges[i].value != "object" || !startNode.edges[i].value.getAttribute("type")) {
                markOutcome(editorUi.editor.graph, startNode.edges[i])
                throw new Error(getTextByLocale("typeOutcomeStartNodeIsMissing"));
            }
            let questionInfo = getQuestionInfoThoughtBranch(startNode.edges[i]);
            result += '<ThoughtBranch type="'+startNode.edges[i].value.getAttribute("type")+'"'+ questionInfo +'>\n';
            if(startNode.edges[i].target != startNode) {
                result += switchCaseNodes(startNode.edges[i].target, editorUi, false);
            }
            result += '</ThoughtBranch>\n';
        }
    }
    result += "</StartNode>\n";
    return result;
}

function getVariables(nodeValue)
{
    let variables = "";
    let vars = nodeValue.split("\n");
    vars.forEach(element => {
        let varWithClass = element.split(" - ");
        variables += '<DecisionTreeVarDecl name="'+specialChars(varWithClass[0])+'" type="'+specialChars(varWithClass[1])+'"/>\n';
    });
    return variables;
}

function switchCaseNodes(node, editorUi, isPredetermining)
{
    let result = "";
    //Узел истина
    if(node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;editable=0;") {
        if(isPredetermining) {
            result = '<BranchResultNode value="true">\n</BranchResultNode>\n';
        } else {
            result = branchResultNodeToXml(node, true);
        }
    }
    //Узел ложь
    else if(node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;editable=0;") {
        if(isPredetermining) {
            result = '<BranchResultNode value="true">\n</BranchResultNode>\n';
        } else {
            result = branchResultNodeToXml(node, false);
        }
    }
    //Узел вопрос
    else if(node.style == "ellipse;whiteSpace=wrap;html=1;rounded=0;editable=0;") {
        result = questionNodeToXml(node, false, editorUi, isPredetermining);
    }
    //Узел свитч кейс
    else if(node.style == "rhombus;whiteSpace=wrap;html=1;editable=0;") {
        result = questionNodeToXml(node, true, editorUi, isPredetermining);
    }
    //Узел действия
    else if(node.style == "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;editable=0;") {
        result = actionNodeToXml(node, editorUi, isPredetermining);
    }
    //Узел логическая агрегация
    else if(typeof node.value == "object" 
    && (node.value.getAttribute("type") == "AND" || node.value.getAttribute("type") == "OR")) {
        result = logicNodeToXml(node, editorUi, isPredetermining);
    }
    //Узел предрешающий фактор
    else if(typeof node.value == "object" && node.value.getAttribute("type") == "predetermining") {
        result = predeterminingNodeToXml(node, editorUi);
    }
    //Узел цикла
    else if(typeof node.value == "object" 
    && (node.value.getAttribute("operator") == "AND" || node.value.getAttribute("operator") == "OR")) {
        result = cycleNodeToXml(node, editorUi, isPredetermining);
    }
    //Узел неопределенность предрешающего фактора
    else if(node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#e6e6e6;strokeColor=#666666;editable=0;") {
        if(isPredetermining) {
            result = '<BranchResultNode value="false">\n</BranchResultNode>\n';
        } else {
            result = '<UndeterminedNode/>\n';
        }
    }
    return result;
}

function branchResultNodeToXml(node, resultBranch) {
    let alias = "";
    if(node.value.getAttribute("label")) {
        alias = '_alias="'+node.value.getAttribute("label")+'"';
    }
    let pattern = "";
    if(node.value.getAttribute("pattern")) {
        pattern = '_pattern="'+node.value.getAttribute("pattern")+'"';
    }
    let result = '<BranchResultNode '+alias+pattern+' value="'+resultBranch+'">\n';

    if(node.value.getAttribute("expression") != "") {
        result += "<Expression>\n" + codeToXML(globalWS, node.value.getAttribute("expression")) + "\n</Expression>\n";
    }

    result += '</BranchResultNode>\n';
    return result;
}

function questionNodeToXml(node, isSwitch, editorUi, isPredetermining)
{
    let alias = "";
    if(node.value.getAttribute("label")) {
        alias = '_alias="'+node.value.getAttribute("label")+'"';
    }
    let questionInfo = getQuestionInfoNode(node, false);
    let result = '<QuestionNode '+alias+' type="'+specialChars(getTypeFromCode(node.value.getAttribute("expression"), editorUi).type)+'" isSwitch="'+isSwitch+'"'+questionInfo+'>\n';

    result += "<Expression>\n" + codeToXML(globalWS, node.value.getAttribute("expression")) + "\n</Expression>\n";

    //Следующие ветки
    result += outcomeToXml(node, editorUi, isPredetermining);

    result += '</QuestionNode>\n';
    return result;
}

function actionNodeToXml(node, editorUi, isPredetermining)
{
    let alias = "";
    if(node.value.getAttribute("label")) {
        alias = '_alias="'+node.value.getAttribute("label")+'"';
    }
    let questionInfo = getQuestionInfoNode(node, false);
    let result = '<FindActionNode '+alias+''+questionInfo+'>\n';

    result += "<Expression>\n" + codeToXML(globalWS, node.value.getAttribute("expression")) + "\n</Expression>\n";

    let typeVar = node.value.getAttribute("typeVar");

    result += '<DecisionTreeVarDecl name="'+specialChars(node.value.getAttribute("nameVar"))+'" type="'+specialChars(typeVar)+'"/>\n';

    //Следующие ветки
    result += outcomeToXml(node, editorUi, isPredetermining)


    result += '</FindActionNode>\n';
    return result;
}

function cycleNodeToXml(node, editorUi, isPredetermining)
{
    let alias = "";
    if(node.value.getAttribute("label")) {
        alias = '_alias="'+node.value.getAttribute("label")+'"';
    }
    let questionInfo = getQuestionInfoNode(node, false);
    let result = '<CycleAggregationNode '+alias+' operator="'+node.value.getAttribute("operator")+'"'+questionInfo+'>\n';

    result += "<SelectorExpression>\n" + codeToXML(globalWS, node.value.getAttribute("expression")) + "\n</SelectorExpression>\n";

    let typeVar = node.value.getAttribute("typeVar");
    result += '<DecisionTreeVarDecl name="'+specialChars(node.value.getAttribute("nameVar"))+'" type="'+specialChars(typeVar)+'"/>\n';

    let bodyCount = 0;
    let trueCount = 0;
    let falseCount = 0;
    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node) {
                valueEdge = node.edges[i].value;
                if(valueEdge == null || typeof valueEdge != "object" 
                || !valueEdge.getAttribute("type") 
                || (valueEdge.getAttribute("type") != "True" 
                && valueEdge.getAttribute("type") != "False" 
                && valueEdge.getAttribute("type") != "Body")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("typeOutcomeCycleIsMissing"));
                }
                if(valueEdge.getAttribute("type") == "True" || valueEdge.getAttribute("type") == "False") {
                    if(valueEdge.getAttribute("type") == "True") {
                        trueCount++;
                    } else {
                        falseCount++;
                    }
                    let questionInfo = getQuestionInfoOutcome(node.edges[i]);
                    result += '<Outcome value="'+specialChars(valueEdge.getAttribute("type"))+'"'+questionInfo+'>\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi, isPredetermining);
                    result += "</Outcome>\n";
                } else if(valueEdge.getAttribute("type") == "Body") {
                    let questionInfo = getQuestionInfoThoughtBranch(node.edges[i]);
                    bodyCount++;
                    result += '<ThoughtBranch type="bool" paramName="'+specialChars(node.value.getAttribute("nameVar"))+'"'+ questionInfo +'>\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi, isPredetermining);
                    result += "</ThoughtBranch>\n";
                }
            }
        }
    }
    let errorCycle = "";
    if(bodyCount != 1) {
        errorCycle += getTextByLocale("bodyOnlyOne");
    }
    if(trueCount != 1) {
        errorCycle += getTextByLocale("trueCycleOnlyOne");
    }
    if(falseCount != 1) {
        errorCycle += getTextByLocale("falseCycleOnlyOne");
    }
    if(errorCycle) {
        throw new Error(errorCycle);
    }


    result += '</CycleAggregationNode>\n';
    return result;
}

function logicNodeToXml(node, editorUi, isPredetermining)
{
    let alias = "";
    if(node.value.getAttribute("label")) {
        alias = '_alias="'+node.value.getAttribute("label")+'"';
    }
    let questionInfo = getQuestionInfoNode(node, true);
    let result = '<LogicAggregationNode '+alias+' operator="'+node.value.getAttribute("type").toLowerCase()+'"'+questionInfo+'>\n';

    let branchCount = 0;
    let trueCount = 0;
    let falseCount = 0;
    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node) {
                valueEdge = node.edges[i].value;
                if(valueEdge == null || typeof valueEdge != "object" 
                || !valueEdge.getAttribute("type") 
                || (valueEdge.getAttribute("type") != "True" 
                && valueEdge.getAttribute("type") != "False" 
                && valueEdge.getAttribute("type") != "Branch")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("typeOutcomeLogicNodeIsMissing"));
                }
                if(valueEdge.getAttribute("type") == "True" || valueEdge.getAttribute("type") == "False") {
                    if(valueEdge.getAttribute("type") == "True") {
                        trueCount++;
                    } else {
                        falseCount++;
                    }
                    let questionInfo = getQuestionInfoOutcome(node.edges[i]);
                    result += '<Outcome value="'+specialChars(valueEdge.getAttribute("type"))+'"'+questionInfo+'>\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi, isPredetermining);
                    result += "</Outcome>\n";
                } else if(valueEdge.getAttribute("type") == "Branch") {
                    let questionInfo = getQuestionInfoThoughtBranch(node.edges[i]);
                    branchCount++;
                    result += '<ThoughtBranch type="bool"'+ questionInfo +'>\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi, isPredetermining);
                    result += "</ThoughtBranch>\n";
                }
            }
        }
    }
    let errorLogic = "";
    if(branchCount < 2) {
        errorLogic += getTextByLocale("OutcomeLogicNodeOnlyTwo");
    }
    if(trueCount != 1) {
        errorLogic += getTextByLocale("trueLogicNodeOnlyOne");
    }
    if(falseCount != 1) {
        errorLogic += getTextByLocale("falseLogicNodeOnlyOne");
    }
    if(errorLogic) {
        throw new Error(errorLogic);
    }

    result += '</LogicAggregationNode>\n';
    return result;
}

function predeterminingNodeToXml(node, editorUi)
{
    let alias = "";
    if(node.value.getAttribute("label")) {
        alias = '_alias="'+node.value.getAttribute("label")+'"';
    }
    let questionInfo = getQuestionInfoNode(node, false);
    let result = '<PredeterminingFactorsNode '+alias+''+questionInfo+'>\n';

    //Следующие ветки
    let predCount = 0;
    let undertermCount = 0;
    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            valueEdge = node.edges[i].value;
            if(node.edges[i].target != node && (valueEdge == null || typeof valueEdge != "object" 
            || !valueEdge.getAttribute("type") 
            || (valueEdge.getAttribute("type") != "predeterminingBranch" 
            && valueEdge.getAttribute("type") != "undetermined"))) {
                markOutcome(editorUi.editor.graph, node.edges[i])
                throw new Error(getTextByLocale("typeOutcomePredIsMissing"));
            }

            if(node.edges[i].target != node && node.edges[i].value.getAttribute("type") == "predeterminingBranch") {
                let resultNode = checkCorrectPredeterminingBranch(node.edges[i].target);
                predCount++;
                let questionInfo = getQuestionInfoPredetermining(node.edges[i]);
                result += '<Outcome value="'+specialChars(node.edges[i].value.getAttribute("label"))+'"'+questionInfo[0]+'>\n';
                
                result += switchCaseNodes(resultNode, editorUi, false);
                
                result += '<ThoughtBranch type="bool"'+questionInfo[1]+'>\n';
                
                result += switchCaseNodes(node.edges[i].target, editorUi, true);
                result += "</ThoughtBranch>\n";
                
                result += "</Outcome>\n";
            }
        }
    }

    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node && node.edges[i] && node.edges[i].value.getAttribute("type") == "undetermined") {
                undertermCount++;
                result += '<Outcome value="undetermined">\n';
                result += switchCaseNodes(node.edges[i].target, editorUi, false);
                result += "</Outcome>\n";
            }
        }
    }
    let errorPred = "";
    if(predCount == 0) {
        errorPred += getTextByLocale("predOutcomeIsMissing");
    }
    if(undertermCount != 1) {
        errorPred += getTextByLocale("undeterminedOnlyOne");
    }
    if(errorPred) {
        throw new Error(errorPred);
    }

    result += '</PredeterminingFactorsNode>\n';
    return result;
}

function outcomeToXml(node, editorUi, isPredetermining)
{
    let result = "";
    let prevValues = new Set();
    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node) {
                valueEdge = node.edges[i].value;
                if(valueEdge == null || typeof valueEdge != "object" || !valueEdge.getAttribute("value")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("valueInOutcomeIsMissing"));
                }
                let typeNode = getTypeFromCode(node.value.getAttribute('expression'), editorUi);
                if(typeNode.type == valueEdge.getAttribute("typeValue")) {
                    if(valueEdge.getAttribute("typeValue") == "enum") {
                        let enumsList = getEnums(editorUi);
                        let findEnum = enumsList.filter(el => el.nameEnum == typeNode.enum);
                        let valueEnumInOutcome = valueEdge.getAttribute("value").split(":");
                        if(findEnum[0] != undefined) {
                            if(findEnum[0].values.indexOf(valueEnumInOutcome[1]) == -1) {
                                markOutcome(editorUi.editor.graph, node.edges[i])
                                throw new Error(getTextByLocale("valueEnumIsMissing"));
                            }
                        } else {
                            throw new Error(getTextByLocale("EnumIsMissing"));
                        }
                    } else if(valueEdge.getAttribute("typeValue") == "class") {
                        let jsonClasses = getClasses(editorUi);
                        let findClass = jsonClasses.filter(el => el.name == valueEdge.getAttribute("value"));
                        if(findClass.length == 0) {
                            markOutcome(editorUi.editor.graph, node.edges[i])
                            throw new Error(getTextByLocale("ClassInDictIsMissing"));
                        }
                    }
                } else if(valueEdge.getAttribute("typeValue") && typeNode.type != valueEdge.getAttribute("typeValue")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("TypesDontMatch"));
                }
                if(prevValues.has(valueEdge.getAttribute("value"))) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("OutcomesHasSameValues"));
                }
                prevValues.add(valueEdge.getAttribute("value"));
                let questionInfo = getQuestionInfoOutcome(node.edges[i]);
                result += '<Outcome value="'+specialChars(valueEdge.getAttribute("value"))+'"'+questionInfo+'>\n';
                result += switchCaseNodes(node.edges[i].target, editorUi, isPredetermining);
                result += "</Outcome>\n";
            }
        }
    }
    return result;
}

function markOutcome(graph, cell) {
    graph.getModel().beginUpdate();
    if(!cell.style.includes("strokeColor=#FF0000;")) {
        cell.style += "strokeColor=#FF0000;";
    }
    graph.getModel().endUpdate();
    graph.refresh(); // update the graph
}

function getQuestionInfoThoughtBranch(edge) {
    let resultInfo = "";
    if(edge.value.getAttribute("_description")) {
        resultInfo += ` _description="`+specialChars(edge.value.getAttribute("_description"))+`"`;
    }
    if(edge.value.getAttribute("_nextStepQuestion")) {
        resultInfo += ` _nextStepQuestion="`+specialChars(edge.value.getAttribute("_nextStepQuestion"))+`"`;
    }
    if(edge.value.getAttribute("_nextStepExplanation")) {
        resultInfo += ` _nextStepExplanation="`+specialChars(edge.value.getAttribute("_nextStepExplanation"))+`"`;
    }
    return resultInfo + " ";
}

function getQuestionInfoOutcome(edge) {
    let resultInfo = "";
    if(edge.value.getAttribute("_text")) {
        resultInfo += ` _text="`+specialChars(edge.value.getAttribute("_text"))+`"`;
    }
    if(edge.value.getAttribute("_explanation")) {
        resultInfo += ` _explanation="`+specialChars(edge.value.getAttribute("_explanation"))+`"`;
    }
    if(edge.value.getAttribute("_nextStepBranchResult")) {
        resultInfo += ` _nextStepBranchResult="`+specialChars(edge.value.getAttribute("_nextStepBranchResult"))+`"`;
    }
    if(edge.value.getAttribute("_nextStepQuestion")) {
        resultInfo += ` _nextStepQuestion="`+specialChars(edge.value.getAttribute("_nextStepQuestion"))+`"`;
    }
    if(edge.value.getAttribute("_nextStepExplanation")) {
        resultInfo += ` _nextStepExplanation="`+specialChars(edge.value.getAttribute("_nextStepExplanation"))+`"`;
    }
    return resultInfo + " ";
}

function getQuestionInfoNode(node, isLogic) {
    let resultInfo = "";
    if(isLogic) {
        if(node.value.getAttribute("_description")) {
            resultInfo += ` _description="`+specialChars(node.value.getAttribute("_description"))+`"`;
        }
    } else {
        if(node.value.getAttribute("_question")) {
            resultInfo += ` _question="`+specialChars(node.value.getAttribute("_question"))+`"`;
        }
    }
    if(node.value.getAttribute("_asNextStep")) {
        resultInfo += ` _asNextStep="`+specialChars(node.value.getAttribute("_asNextStep"))+`"`;
    }
    if(node.value.getAttribute("_endingCause")) {
        resultInfo += ` _endingCause="`+specialChars(node.value.getAttribute("_endingCause"))+`"`;
    }
    return resultInfo + " ";
}

function getQuestionInfoPredetermining(edge) {
    let resultInfoOutcome = "";
    let resultInfothoughtBranch = "";
    
    if(edge.value.getAttribute("_text")) {
        resultInfoOutcome += ` _text="`+specialChars(edge.value.getAttribute("_text"))+`"`;
    }
    if(edge.value.getAttribute("_explanation")) {
        resultInfoOutcome += ` _explanation="`+specialChars(edge.value.getAttribute("_explanation"))+`"`;
    }
    if(edge.value.getAttribute("_nextStepBranchResult")) {
        resultInfoOutcome += ` _nextStepBranchResult="`+specialChars(edge.value.getAttribute("_nextStepBranchResult"))+`"`;
    }
    if(edge.value.getAttribute("_nextStepQuestionOutcome")) {
        resultInfoOutcome += ` _nextStepQuestion="`+specialChars(edge.value.getAttribute("_nextStepQuestionOutcome"))+`"`;
    }
    if(edge.value.getAttribute("_nextStepExplanationOutcome")) {
        resultInfoOutcome += ` _nextStepExplanation="`+specialChars(edge.value.getAttribute("_nextStepExplanationOutcome"))+`"`;
    }

    if(edge.value.getAttribute("_description")) {
        resultInfothoughtBranch += ` _description="`+specialChars(edge.value.getAttribute("_description"))+`"`;
    }
    if(edge.value.getAttribute("_nextStepQuestionThoughtBranch")) {
        resultInfothoughtBranch += ` _nextStepQuestion="`+specialChars(edge.value.getAttribute("_nextStepQuestionThoughtBranch"))+`"`;
    }
    if(edge.value.getAttribute("_nextStepExplanationThoughtBranch")) {
        resultInfothoughtBranch += ` _nextStepExplanation="`+specialChars(edge.value.getAttribute("_nextStepExplanationThoughtBranch"))+`"`;
    }

    return [resultInfoOutcome + " ", resultInfothoughtBranch + " "];
}

function checkCorrectPredeterminingBranch(node) {
    let countResultNode = 0;
    let resultNode = null;

    function branchBypass(node) {
        if ((node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;editable=0;" 
        || node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;editable=0;")
        && (!resultNode || resultNode && (resultNode.style != node.style || 
        resultNode.value.getAttribute("expression") != node.value.getAttribute("expression")))) {
            countResultNode++;
            resultNode = node;
            return true;
        }
        let countChildNodes = 0;
        for(let i = 0; i < node.edges.length; i++) {
            let child = node.edges[i].target;
            if (child != node) {
                countChildNodes++;
            }
        }
        if (countChildNodes == 0) {
            return true;
        }
        // Рекурсивно обходим потомков текущего узла
        for(let i = 0; i < node.edges.length; i++) {
            let child = node.edges[i].target;
            if (child != node) {
                branchBypass(child);
            }
        }
        return true;
    }
    branchBypass(node);
    if(countResultNode != 1) {
        throw new Error(getTextByLocale("ResultOutcomeForPredNode"));
    }
    return resultNode;
}
