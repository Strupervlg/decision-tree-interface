function treeToXml(editorUi)
{
    let result = '<?xml version="1.0"?>\n';

    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;

    Object.keys(cells).forEach(function (key) {

        var node = cells[key];

        if (node.style == "shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;") {
            result += startNodeToXml(node);
            return;
        }
    });
    return result;
}

function startNodeToXml(startNode)
{
    let result = "<StartNode>\n<InputVariables>\n";
    result += getVariables(startNode.value);
    result += "</InputVariables>\n<ThoughtBranch>\n";
    if(startNode.edges) {
        for(let i = 0; i < startNode.edges.length; i++) {
            if(startNode.edges[i].target != startNode) {
                result += switchCaseNodes(startNode.edges[i].target);
            }
        }
    }
    result += "</ThoughtBranch>\n</StartNode>\n";
    return result;
}

function getVariables(nodeValue)
{
    let variables = "";
    let vars = nodeValue.split("\n");
    vars.forEach(element => {
        let varWithClass = element.split(" - ");
        variables += '<DecisionTreeVarDecl name"'+varWithClass[0]+'" type="'+varWithClass[1]+'"/>\n';
    });
    return variables;
}

function switchCaseNodes(node)
{
    let result = "";
    //Узел истина
    if(node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;") {
        result = '<BranchResultNode value="true"/>\n';
    }
    //Узел ложь
    else if(node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;") {
        result = '<BranchResultNode value="false"/>\n';
    }
    //Узел вопрос
    else if(node.style == "ellipse;whiteSpace=wrap;html=1;rounded=0;") {
        result = questionNodeToXml(node, false);
    }
    //Узел свитч кейс
    else if(node.style == "rhombus;whiteSpace=wrap;html=1;") {
        result = questionNodeToXml(node, true);
    }
    //Узел действия
    else if(node.style == "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;") {
        result = actionNodeToXml(node);
    }
    //Узел логическая агрегация
    else if(node.style == "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;align=center;" 
    && (node.value == "AND" || node.value == "OR")) {
        result = logicNodeToXml(node);
    }
    //Узел предрешающий фактор
    else if(node.style == "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;") {
        result = predeterminingNodeToXml(node);
    }
    //Узел цикла
    else if(node.style == "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;align=center;") {
        result = cycleNodeToXml(node);
    }
    //Узел неопределенность предрешающего фактора
    else if(node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#e6e6e6;strokeColor=#666666;") {
        result = '<UndeterminedNode/>\n';
    }
    return result;
}

function questionNodeToXml(node, isSwitch)
{
    let result = '<QuestionNode type="" isSwitch="'+isSwitch+'">\n';

    result += "<Expression>\n" + codeToXML(globalWS, node.value) + "\n</Expression>\n";

    //Следующие ветки
    result += outcomeToXml(node);

    result += '</QuestionNode>\n';
    return result;
}

function actionNodeToXml(node)
{
    let values = node.value.getAttribute("label").split('<br>');
    let result = '<FindActionNode>\n';

    result += "<Expression>\n" + codeToXML(globalWS, values[0]) + "\n</Expression>\n";

    let typeVar = node.value.getAttribute("typeVar");

    result += '<DecisionTreeVarDecl name"'+values[1]+'" type="'+typeVar+'"/>\n';

    //Следующие ветки
    result += outcomeToXml(node)


    result += '</FindActionNode>\n';
    return result;
}

function cycleNodeToXml(node)
{
    let values = node.value.getAttribute("label").split('<br>');
    let result = '<CycleAggregationNode operator="'+values[1]+'">\n';

    result += "<SelectorExpression>\n" + codeToXML(globalWS, values[0]) + "\n</SelectorExpression>\n";

    let typeVar = node.value.getAttribute("typeVar");
    result += '<DecisionTreeVarDecl name"'+values[2]+'" type="'+typeVar+'"/>\n';

    //Следующие ветки TODO: Thoughtbranch должен быть c именем переменной
    result += outcomeToXml(node)


    result += '</CycleAggregationNode>\n';
    return result;
}

function logicNodeToXml(node)
{
    let result = '<LogicAggregationNode operator="'+node.value.toLowerCase()+'">\n';

    //Следующие ветки TODO: Thoughtbranch должен быть
    result += outcomeToXml(node)

    result += '</LogicAggregationNode>\n';
    return result;
}

function predeterminingNodeToXml(node)
{
    let result = '<PredeterminingFactorsNode>\n<Predetermining>\n';

    //Следующие ветки
    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node && !node.edges[i].children) {
                result += switchCaseNodes(node.edges[i].target);
            }
        }
    }
    result += '</Predetermining>\n';

    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node && node.edges[i].children && node.edges[i].children[0].value == "undetermined") {
                result += '<Outcome value="undetermined">\n';
                result += switchCaseNodes(node.edges[i].target);
                result += "</Outcome>\n";
            }
        }
    }

    result += '</PredeterminingFactorsNode>\n';
    return result;
}

function outcomeToXml(node)
{
    let result = "";
    if(node.edges) {
        for(let i = 0; i < node.edges.length; i++) {
            if(node.edges[i].target != node) {
                let valueEdge = "";
                if(node.edges[i].children) {
                    valueEdge = node.edges[i].children[0].value;
                }
                result += '<Outcome value="'+valueEdge+'">\n';
                result += switchCaseNodes(node.edges[i].target);
                result += "</Outcome>\n";
            }
        }
    }
    return result;
}