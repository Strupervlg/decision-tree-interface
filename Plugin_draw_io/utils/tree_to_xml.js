function treeToXml(editorUi)
{
    let result = '<?xml version="1.0"?>\n';

    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;

    Object.keys(cells).forEach(function (key) {

        var node = cells[key];
        
        if (typeof node.value == "object" && node.value.getAttribute("type") == "START") {
            CheckCycleInTree(node);
            result += startNodeToXml(node, editorUi);
            return;
        }
    });
    return result;
}

function startNodeToXml(startNode, editorUi)
{
    let result = "<StartNode>\n<InputVariables>\n";
    result += getVariables(startNode.value.getAttribute("label"));
    result += '</InputVariables>\n';
    if(startNode.edges) {
        for(let i = 0; i < startNode.edges.length; i++) {
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
    result += "<Expression>\n" + node.value.getAttribute("expression") != "" ? codeToXML(globalWS, node.value.getAttribute("expression")) : "" + "\n</Expression>\n";

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

    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node) {
                let valueEdge = "";
                if(node.edges[i]) {
                    valueEdge = node.edges[i].value;
                }
                if(valueEdge.getAttribute("type") == "True" || valueEdge.getAttribute("type") == "False") {
                    result += '<Outcome value="'+valueEdge.getAttribute("type")+'">\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi);
                    result += "</Outcome>\n";
                } else if(valueEdge.getAttribute("type") == "Body") {
                    result += '<ThoughtBranch type="bool" paramName="'+node.value.getAttribute("nameVar")+'">\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi);
                    result += "</ThoughtBranch>\n";
                }
            }
        }
    }


    result += '</CycleAggregationNode>\n';
    return result;
}

function logicNodeToXml(node, editorUi)
{
    let result = '<LogicAggregationNode operator="'+node.value.getAttribute("type").toLowerCase()+'">\n';

    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node) {
                let valueEdge = "";
                if(node.edges[i]) {
                    valueEdge = node.edges[i].value;
                }
                if(valueEdge.getAttribute("type") == "True" || valueEdge.getAttribute("type") == "False") {
                    result += '<Outcome value="'+valueEdge.getAttribute("type")+'">\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi);
                    result += "</Outcome>\n";
                } else if(valueEdge.getAttribute("type") == "Branch") {
                    result += '<ThoughtBranch type="bool">\n';
                    result += switchCaseNodes(node.edges[i].target, editorUi);
                    result += "</ThoughtBranch>\n";
                }
            }
        }
    }

    result += '</LogicAggregationNode>\n';
    return result;
}

function predeterminingNodeToXml(node, editorUi)
{
    let result = '<PredeterminingFactorsNode>\n<Predetermining>\n';

    //Следующие ветки
    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node && node.edges[i].value.getAttribute("type") == "predetermining") {
                result += switchCaseNodes(node.edges[i].target, editorUi);
            }
        }
    }
    result += '</Predetermining>\n';

    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node && node.edges[i] && node.edges[i].value.getAttribute("type") == "undetermined") {
                result += '<Outcome value="undetermined">\n';
                result += switchCaseNodes(node.edges[i].target, editorUi);
                result += "</Outcome>\n";
            }
        }
    }

    result += '</PredeterminingFactorsNode>\n';
    return result;
}

function outcomeToXml(node, editorUi)
{
    let result = "";
    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node) {
                let valueEdge = "";
                if(node.edges[i]) {
                    valueEdge = node.edges[i].value;
                }
                result += '<Outcome value="'+valueEdge.getAttribute("value")+'">\n';
                result += switchCaseNodes(node.edges[i].target, editorUi);
                result += "</Outcome>\n";
            }
        }
    }
    return result;
}
