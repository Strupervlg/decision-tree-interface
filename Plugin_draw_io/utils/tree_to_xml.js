function treeToXml(editorUi)
{
    let result = '<?xml version="1.0"?>\n';

    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;
    let countStartNode = 0;
    Object.keys(cells).forEach(function (key) {

        var node = cells[key];
        
        if (typeof node.value == "object" && node.value.getAttribute("type") == "START") {
            countStartNode++;
            CheckCycleInTree(node);
            result += startNodeToXml(node, editorUi);
            return;
        }
    });
    if(countStartNode != 1) {
        throw new Error("Начальный узел должен быть один!");
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
                throw new Error('Отсутствует тип у ветки после начального узла');
            }
            result += '<ThoughtBranch type="'+startNode.edges[i].value.getAttribute("type")+'">\n';
            if(startNode.edges[i].target != startNode) {
                result += switchCaseNodes(startNode.edges[i].target, editorUi);
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
        variables += '<DecisionTreeVarDecl name="'+varWithClass[0]+'" type="'+varWithClass[1]+'"/>\n';
    });
    return variables;
}

function switchCaseNodes(node, editorUi)
{
    let result = "";
    //Узел истина
    if(node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;editable=0;") {
        result = branchResultNodeToXml(node, true);
    }
    //Узел ложь
    else if(node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;editable=0;") {
        result = branchResultNodeToXml(node, false);
    }
    //Узел вопрос
    else if(node.style == "ellipse;whiteSpace=wrap;html=1;rounded=0;editable=0;") {
        result = questionNodeToXml(node, false, editorUi);
    }
    //Узел свитч кейс
    else if(node.style == "rhombus;whiteSpace=wrap;html=1;editable=0;") {
        result = questionNodeToXml(node, true, editorUi);
    }
    //Узел действия
    else if(node.style == "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;editable=0;") {
        result = actionNodeToXml(node, editorUi);
    }
    //Узел логическая агрегация
    else if(typeof node.value == "object" 
    && (node.value.getAttribute("type") == "AND" || node.value.getAttribute("type") == "OR")) {
        result = logicNodeToXml(node, editorUi);
    }
    //Узел предрешающий фактор
    else if(typeof node.value == "object" && node.value.getAttribute("type") == "predetermining") {
        result = predeterminingNodeToXml(node, editorUi);
    }
    //Узел цикла
    else if(typeof node.value == "object" 
    && (node.value.getAttribute("operator") == "AND" || node.value.getAttribute("operator") == "OR")) {
        result = cycleNodeToXml(node, editorUi);
    }
    //Узел неопределенность предрешающего фактора
    else if(node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#e6e6e6;strokeColor=#666666;editable=0;") {
        result = '<UndeterminedNode/>\n';
    }
    return result;
}

function branchResultNodeToXml(node, resultBranch) {
    let result = '<BranchResultNode value="'+resultBranch+'">\n';

    //Сделать проверку на пустой экспрешн
    result += "<Expression>\n" + ((node.value.getAttribute("expression") != "") ? codeToXML(globalWS, node.value.getAttribute("expression")) : ("")) + "\n</Expression>\n";

    result += '</BranchResultNode>\n';
    return result;
}

function questionNodeToXml(node, isSwitch, editorUi)
{
    let result = '<QuestionNode type="'+getTypeFromCode(node.value.getAttribute("expression"), editorUi).type+'" isSwitch="'+isSwitch+'">\n';

    result += "<Expression>\n" + codeToXML(globalWS, node.value.getAttribute("expression")) + "\n</Expression>\n";

    //Следующие ветки
    result += outcomeToXml(node, editorUi);

    result += '</QuestionNode>\n';
    return result;
}

function actionNodeToXml(node, editorUi)
{
    let result = '<FindActionNode>\n';

    result += "<Expression>\n" + codeToXML(globalWS, node.value.getAttribute("expression")) + "\n</Expression>\n";

    let typeVar = node.value.getAttribute("typeVar");

    result += '<DecisionTreeVarDecl name="'+node.value.getAttribute("nameVar")+'" type="'+typeVar+'"/>\n';

    //Следующие ветки
    result += outcomeToXml(node, editorUi)


    result += '</FindActionNode>\n';
    return result;
}

function cycleNodeToXml(node, editorUi)
{
    let result = '<CycleAggregationNode operator="'+node.value.getAttribute("operator")+'">\n';

    result += "<SelectorExpression>\n" + codeToXML(globalWS, node.value.getAttribute("expression")) + "\n</SelectorExpression>\n";

    let typeVar = node.value.getAttribute("typeVar");
    result += '<DecisionTreeVarDecl name="'+node.value.getAttribute("nameVar")+'" type="'+typeVar+'"/>\n';

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
                    throw new Error('Отсутствует тип у ветки после узла цикла');
                }
                if(valueEdge.getAttribute("type") == "True" || valueEdge.getAttribute("type") == "False") {
                    if(valueEdge.getAttribute("type") == "True") {
                        trueCount++;
                    } else {
                        falseCount++;
                    }
                    result += '<Outcome value="'+valueEdge.getAttribute("type")+'">\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi);
                    result += "</Outcome>\n";
                } else if(valueEdge.getAttribute("type") == "Body") {
                    bodyCount++;
                    result += '<ThoughtBranch type="bool" paramName="'+node.value.getAttribute("nameVar")+'">\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi);
                    result += "</ThoughtBranch>\n";
                }
            }
        }
    }
    let errorCycle = "";
    if(bodyCount != 1) {
        errorCycle += "Ветка тела для узла цикла должна быть одна!\n";
    }
    if(trueCount != 1) {
        errorCycle += "Истинная ветка для узла цикла должна быть одна!\n";
    }
    if(falseCount != 1) {
        errorCycle += "Ложная ветка для узла цикла должна быть одна!\n";
    }
    if(errorCycle) {
        throw new Error(errorCycle);
    }


    result += '</CycleAggregationNode>\n';
    return result;
}

function logicNodeToXml(node, editorUi)
{
    let result = '<LogicAggregationNode operator="'+node.value.getAttribute("type").toLowerCase()+'">\n';

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
                    throw new Error('Отсутствует тип у ветки после логического узла');
                }
                if(valueEdge.getAttribute("type") == "True" || valueEdge.getAttribute("type") == "False") {
                    if(valueEdge.getAttribute("type") == "True") {
                        trueCount++;
                    } else {
                        falseCount++;
                    }
                    result += '<Outcome value="'+valueEdge.getAttribute("type")+'">\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi);
                    result += "</Outcome>\n";
                } else if(valueEdge.getAttribute("type") == "Branch") {
                    branchCount++;
                    result += '<ThoughtBranch type="bool">\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi);
                    result += "</ThoughtBranch>\n";
                }
            }
        }
    }
    let errorLogic = "";
    if(branchCount < 2) {
        errorLogic += "Веток для логического узла должно быть 2 и более!\n";
    }
    if(trueCount > 1) {
        errorLogic += "Истинная ветка для логического узла должна быть одна!\n";
    }
    if(falseCount > 1) {
        errorLogic += "Ложная ветка для логического узла должна быть одна!\n";
    }
    if(errorLogic) {
        throw new Error(errorLogic);
    }

    result += '</LogicAggregationNode>\n';
    return result;
}

function predeterminingNodeToXml(node, editorUi)
{
    let result = '<PredeterminingFactorsNode>\n<Predetermining>\n';

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
                throw new Error('Отсутствует тип у ветки после независимого ветвления');
            }

            if(node.edges[i].target != node && node.edges[i].value.getAttribute("type") == "predeterminingBranch") {
                predCount++;
                result += switchCaseNodes(node.edges[i].target, editorUi);
            }
        }
    }
    result += '</Predetermining>\n';

    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node && node.edges[i] && node.edges[i].value.getAttribute("type") == "undetermined") {
                undertermCount++;
                result += '<Outcome value="undetermined">\n';
                result += switchCaseNodes(node.edges[i].target, editorUi);
                result += "</Outcome>\n";
            }
        }
    }
    let errorPred = "";
    if(predCount == 0) {
        errorPred += "Отсутствует предрешающая ветка для узла независимое ветвление!\n";
    }
    if(undertermCount != 1) {
        errorPred += "Ветка undetermined для узла независимое ветвление должна быть одна!\n";
    }
    if(errorPred) {
        throw new Error(errorPred);
    }

    result += '</PredeterminingFactorsNode>\n';
    return result;
}

function outcomeToXml(node, editorUi)
{
    let result = "";
    let prevValues = new Set();
    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node) {
                valueEdge = node.edges[i].value;
                if(valueEdge == null || typeof valueEdge != "object" || !valueEdge.getAttribute("value")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error('Отсутствует значение у ветки');
                }
                if(prevValues.has(valueEdge.getAttribute("value"))) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error('Ветка имеет повторяющееся значение');
                }
                prevValues.add(valueEdge.getAttribute("value"));
                result += '<Outcome value="'+valueEdge.getAttribute("value")+'">\n';
                result += switchCaseNodes(node.edges[i].target, editorUi);
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
