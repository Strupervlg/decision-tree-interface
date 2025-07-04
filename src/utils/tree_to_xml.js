import { getTextByLocale } from '../utils/locale.js';
import { specialChars, getTypeFromCode } from '../utils/utils.js';
import { codeToXML } from '../export/Export.js';
import { getEnums, getClasses } from '../dictionaries/Utils.js';
import { globalWS } from '../main.js';

//Обход в глубину по узлам дерева и формирование xml
var LAST_ID;
export function treeToXml(editorUi) {
    var serializer = new XMLSerializer();
    const resultDoc = document.implementation.createDocument("", "", null);

    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;
    let countStartNode = 0;
    LAST_ID = 0;
    Object.keys(cells).forEach(function (key) {

        var node = cells[key];

        if (node.value != null && typeof node.value == "object" && node.value.getAttribute("type") == "START") {
            countStartNode++;
            // CheckCycleInTree(node, editorUi);
            resultDoc.appendChild(startNodeToXml(resultDoc, node, editorUi));
            return;
        }
    });
    if (countStartNode != 1) {
        throw new Error(getTextByLocale("StartNodeOnlyOne"));
    }
    return '<?xml version="1.0"?>' + serializer.serializeToString(resultDoc);
}

function startNodeToXml(doc, startNode, editorUi) {
    let resultNode = doc.createElement("StartNode");
    resultNode.appendChild(getVariables(doc, startNode.value.getAttribute("label")));
    if (startNode.edges) {
        for (let i = 0; i < startNode.edges.length; i++) {
            if (startNode.edges[i].target == startNode) {
                throw new Error(getTextByLocale("StartNodeIsTarget"));
            }
            if (startNode.edges[i].value == null || typeof startNode.edges[i].value != "object" || !startNode.edges[i].value.getAttribute("type")) {
                markOutcome(editorUi.editor.graph, startNode.edges[i])
                throw new Error(getTextByLocale("typeOutcomeStartNodeIsMissing"));
            }
            let thoughtBranchNode = doc.createElement("ThoughtBranch");
            thoughtBranchNode.setAttribute("_alias", "startThought");
            thoughtBranchNode.setAttribute("type", startNode.edges[i].value.getAttribute("type"));
            thoughtBranchNode = getQuestionInfoThoughtBranch(thoughtBranchNode, startNode.edges[i]); //TODO: проверить мб присваивать не нужно
            if (startNode.edges[i].target != startNode) {
                thoughtBranchNode.appendChild(switchCaseNodes(doc, startNode.edges[i].target, editorUi, null));
            }
            resultNode.appendChild(thoughtBranchNode);
        }
    }
    return resultNode;
}

function getVariables(doc, nodeValue) {
    let inputVariablesNode = doc.createElement("InputVariables");
    let vars = nodeValue.split("\n");
    vars.forEach(element => {
        let varWithClass = element.split(" - ");
        let decisionTreeVarDeclNode = doc.createElement("DecisionTreeVarDecl");
        decisionTreeVarDeclNode.setAttribute("name", specialChars(varWithClass[0]));
        decisionTreeVarDeclNode.setAttribute("type", specialChars(varWithClass[1]));
        inputVariablesNode.appendChild(decisionTreeVarDeclNode);
    });
    return inputVariablesNode;
}

function switchCaseNodes(doc, node, editorUi) {
    let resultNode = null;
    //Узел истина
    if (node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;editable=0;") {
        resultNode = branchResultNodeToXml(doc, node, true);
    }
    //Узел ложь
    else if (node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;editable=0;") {
        resultNode = branchResultNodeToXml(doc, node, false);
    }
    //Узел вопрос
    else if (node.style == "ellipse;whiteSpace=wrap;html=1;rounded=0;editable=0;") {
        resultNode = questionNodeToXml(doc, node, false, editorUi);
    }
    //Узел свитч кейс
    else if (node.style == "rhombus;whiteSpace=wrap;html=1;editable=0;") {
        resultNode = questionNodeToXml(doc, node, true, editorUi);
    }
    //Узел действия
    else if (node.style == "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;editable=0;") {
        resultNode = actionNodeToXml(doc, node, editorUi);
    }
    //Узел логическая агрегация
    else if (typeof node.value == "object"
        && (node.value.getAttribute("type") == "AND" || node.value.getAttribute("type") == "OR" || node.value.getAttribute("type") == "HYP")) {
        resultNode = logicNodeToXml(doc, node, editorUi);
    }
    //Узел предрешающий фактор
    else if (typeof node.value == "object" && node.value.getAttribute("type") == "predetermining") {
        resultNode = predeterminingNodeToXml(doc, node, editorUi);
    }
    //Узел "пока"
    else if (typeof node.value == "object"
        && (node.value.getAttribute("operator") == "AND" || node.value.getAttribute("operator") == "OR" || node.value.getAttribute("type") == "HYP")
        && node.value.getAttribute("typeCycle") == "while") {
        resultNode = whileNodeToXml(doc, node, editorUi);
    }
    //Узел цикла
    else if (typeof node.value == "object"
        && (node.value.getAttribute("operator") == "AND" || node.value.getAttribute("operator") == "OR" || node.value.getAttribute("type") == "HYP")
        && node.value.getAttribute("typeCycle") == null) {
        resultNode = cycleNodeToXml(doc, node, editorUi);
    }
    //Узел Null
    else if (node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#e6e6e6;strokeColor=#666666;editable=0;") {
        resultNode = branchResultNodeToXml(doc, node, null);
    }
    return resultNode;
}

function branchResultNodeToXml(doc, node, resultBranch) {
    let resultNode = doc.createElement("BranchResultNode");
    resultNode.setAttribute("_id", LAST_ID++);
    if (node.value.getAttribute("skill")) {
        resultNode.setAttribute("_skill", node.value.getAttribute("skill"));
    }
    if (node.value.getAttribute("label")) {
        resultNode.setAttribute("_alias", node.value.getAttribute("label"));
        resultNode.setAttribute("_RU_explanation", node.value.getAttribute("label"));
    }
    if (resultBranch == null) {
        resultNode.setAttribute("value", "null")
    } else if (resultBranch) {
        resultNode.setAttribute("value", "correct")
    } else {
        resultNode.setAttribute("value", "error")
    }

    if (node.value.getAttribute("expression") != "") {
        let expressionNode = doc.createElement("Expression");
        try {
            expressionNode.innerHTML = codeToXML(globalWS, node.value.getAttribute("expression"));
        } catch (e) {
            throw new Error(e.message + "\nУзел с текстом: " + node.value.getAttribute("label"))
        }
        resultNode.appendChild(expressionNode);
    }
    return resultNode;
}

function questionNodeToXml(doc, node, isSwitch, editorUi) {
    let resultNode = doc.createElement("QuestionNode");
    resultNode.setAttribute("_id", LAST_ID++);
    if (node.value.getAttribute("skill")) {
        resultNode.setAttribute("_skill", node.value.getAttribute("skill"));
    }
    if (node.value.getAttribute("label")) {
        resultNode.setAttribute("_alias", node.value.getAttribute("label"))
    }
    try {
        resultNode.setAttribute("type", specialChars(getTypeFromCode(node.value.getAttribute("expression"), editorUi).type));
    } catch (e) {
        throw new Error(e.message + "\nУзел с текстом: " + node.value.getAttribute("label"))
    }
    resultNode.setAttribute("isSwitch", isSwitch);
    resultNode = getQuestionInfoNode(resultNode, node, false); //TODO: проверить мб присваивать не нужно

    let expressionNode = doc.createElement("Expression");
    try {
        expressionNode.innerHTML = codeToXML(globalWS, node.value.getAttribute("expression"));
    } catch (e) {
        throw new Error(e.message + "\nУзел с текстом: " + node.value.getAttribute("label"))
    }
    resultNode.appendChild(expressionNode);

    //Следующие ветки
    resultNode = outcomeToXml(doc, resultNode, node, editorUi);

    return resultNode;
}

function actionNodeToXml(doc, node, editorUi) {
    let resultNode = doc.createElement("FindActionNode");
    resultNode.setAttribute("_id", LAST_ID++);
    if (node.value.getAttribute("skill")) {
        resultNode.setAttribute("_skill", node.value.getAttribute("skill"));
    }
    if (node.value.getAttribute("label")) {
        resultNode.setAttribute("_alias", node.value.getAttribute("label"));
    }
    resultNode = getQuestionInfoNode(resultNode, node, false);

    let expressionNode = doc.createElement("Expression");
    try {
        expressionNode.innerHTML = codeToXML(globalWS, node.value.getAttribute("expression"));
    } catch (e) {
        throw new Error(e.message + "\nУзел с текстом: " + node.value.getAttribute("label"))
    }
    resultNode.appendChild(expressionNode);

    let typeVar = node.value.getAttribute("typeVar");

    let decisionTreeVarDeclNode = doc.createElement("DecisionTreeVarDecl");
    decisionTreeVarDeclNode.setAttribute("name", specialChars(node.value.getAttribute("nameVar")));
    decisionTreeVarDeclNode.setAttribute("type", specialChars(typeVar));
    resultNode.appendChild(decisionTreeVarDeclNode);

    //Следующие ветки
    resultNode = outcomeToXml(doc, resultNode, node, editorUi);

    return resultNode;
}

function whileNodeToXml(doc, node, editorUi) {
    let resultNode = doc.createElement("WhileCycleNode");
    resultNode.setAttribute("_id", LAST_ID++);
    if (node.value.getAttribute("skill")) {
        resultNode.setAttribute("_skill", node.value.getAttribute("skill"));
    }
    if (node.value.getAttribute("label")) {
        resultNode.setAttribute("_alias", node.value.getAttribute("label"));
    }
    resultNode.setAttribute("operator", node.value.getAttribute("operator"));
    resultNode = getQuestionInfoNode(resultNode, node, false);

    let selectorExpressionNode = doc.createElement("SelectorExpression");
    try {
        selectorExpressionNode.innerHTML = codeToXML(globalWS, node.value.getAttribute("expression"));
    } catch (e) {
        throw new Error(e.message + "\nУзел с текстом: " + node.value.getAttribute("label"))
    }
    resultNode.appendChild(selectorExpressionNode);

    let typeVar = node.value.getAttribute("typeVar");

    let decisionTreeVarDeclNode = doc.createElement("DecisionTreeVarDecl");
    decisionTreeVarDeclNode.setAttribute("name", specialChars(node.value.getAttribute("nameVar")));
    decisionTreeVarDeclNode.setAttribute("type", specialChars(typeVar));
    resultNode.appendChild(decisionTreeVarDeclNode);

    let bodyCount = 0;
    let trueCount = 0;
    let falseCount = 0;
    if (node.edges) {
        for (let i = 0; i < node.edges.length; i++) {
            if (node.edges[i].target != node) {
                let valueEdge = node.edges[i].value;
                if (valueEdge == null || typeof valueEdge != "object"
                    || !valueEdge.getAttribute("type")
                    || (valueEdge.getAttribute("type") != "Correct"
                        && valueEdge.getAttribute("type") != "Error"
                        && valueEdge.getAttribute("type") != "Null"
                        && valueEdge.getAttribute("type") != "Body")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("typeOutcomeCycleIsMissing")
                        + "\nУзел с текстом: " + node.value.getAttribute("label"));
                }
                if (valueEdge.getAttribute("type") == "Correct" || valueEdge.getAttribute("type") == "Error" || valueEdge.getAttribute("type") == "Null") {
                    // if (valueEdge.getAttribute("type") == "Correct") {
                    //     trueCount++;
                    // } else {
                    //     falseCount++;
                    // }

                    let outcomeNode = doc.createElement("Outcome");
                    outcomeNode.setAttribute("value", specialChars(valueEdge.getAttribute("type")));
                    outcomeNode = getQuestionInfoOutcome(outcomeNode, node.edges[i]);
                    outcomeNode.appendChild(switchCaseNodes(doc, node.edges[i].target, editorUi));
                    resultNode.appendChild(outcomeNode);

                } else if (valueEdge.getAttribute("type") == "Body") {

                    let thoughtBranchNode = doc.createElement("ThoughtBranch");
                    thoughtBranchNode.setAttribute("_alias", valueEdge.getAttribute("label"));
                    thoughtBranchNode.setAttribute("type", "bool");
                    thoughtBranchNode.setAttribute("paramName", specialChars(node.value.getAttribute("nameVar")));
                    thoughtBranchNode = getQuestionInfoThoughtBranch(thoughtBranchNode, node.edges[i]); //TODO: проверить мб присваивать не нужно
                    thoughtBranchNode.appendChild(switchCaseNodes(doc, node.edges[i].target, editorUi));
                    resultNode.appendChild(thoughtBranchNode);

                    bodyCount++;
                }
            }
        }
    }
    let errorCycle = "";
    if (bodyCount > 1) {
        errorCycle += getTextByLocale("bodyOnlyOne");
    }
    if (trueCount > 1) {
        errorCycle += getTextByLocale("trueCycleOnlyOne");
    }
    if (falseCount > 1) {
        errorCycle += getTextByLocale("falseCycleOnlyOne");
    }
    if (errorCycle) {
        throw new Error(errorCycle + "\nУзел с текстом: " + node.value.getAttribute("label"));
    }


    return resultNode;
}

function cycleNodeToXml(doc, node, editorUi) {
    let resultNode = doc.createElement("CycleAggregationNode");
    resultNode.setAttribute("_id", LAST_ID++);
    if (node.value.getAttribute("skill")) {
        resultNode.setAttribute("_skill", node.value.getAttribute("skill"));
    }
    if (node.value.getAttribute("label")) {
        resultNode.setAttribute("_alias", node.value.getAttribute("label"));
    }
    resultNode.setAttribute("operator", node.value.getAttribute("operator"));
    resultNode = getQuestionInfoNode(resultNode, node, false);

    let selectorExpressionNode = doc.createElement("SelectorExpression");
    try {
        selectorExpressionNode.innerHTML = codeToXML(globalWS, node.value.getAttribute("expression"));
    } catch (e) {
        throw new Error(e.message + "\nУзел с текстом: " + node.value.getAttribute("label"))
    }
    resultNode.appendChild(selectorExpressionNode);

    let typeVar = node.value.getAttribute("typeVar");

    let decisionTreeVarDeclNode = doc.createElement("DecisionTreeVarDecl");
    decisionTreeVarDeclNode.setAttribute("name", specialChars(node.value.getAttribute("nameVar")));
    decisionTreeVarDeclNode.setAttribute("type", specialChars(typeVar));
    resultNode.appendChild(decisionTreeVarDeclNode);

    let bodyCount = 0;
    let trueCount = 0;
    let falseCount = 0;
    if (node.edges) {
        for (let i = 0; i < node.edges.length; i++) {
            if (node.edges[i].target != node) {
                let valueEdge = node.edges[i].value;
                if (valueEdge == null || typeof valueEdge != "object"
                    || !valueEdge.getAttribute("type")
                    || (valueEdge.getAttribute("type") != "Correct"
                        && valueEdge.getAttribute("type") != "Error"
                        && valueEdge.getAttribute("type") != "Null"
                        && valueEdge.getAttribute("type") != "Body")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("typeOutcomeCycleIsMissing")
                        + "\nУзел с текстом: " + node.value.getAttribute("label"));
                }
                if (valueEdge.getAttribute("type") == "Correct" || valueEdge.getAttribute("type") == "Error" || valueEdge.getAttribute("type") == "Null") {
                    // if (valueEdge.getAttribute("type") == "Correct") {
                    //     trueCount++;
                    // } else {
                    //     falseCount++;
                    // }

                    let outcomeNode = doc.createElement("Outcome");
                    outcomeNode.setAttribute("value", specialChars(valueEdge.getAttribute("type")));
                    outcomeNode = getQuestionInfoOutcome(outcomeNode, node.edges[i]);
                    outcomeNode.appendChild(switchCaseNodes(doc, node.edges[i].target, editorUi));
                    resultNode.appendChild(outcomeNode);

                } else if (valueEdge.getAttribute("type") == "Body") {

                    let thoughtBranchNode = doc.createElement("ThoughtBranch");
                    thoughtBranchNode.setAttribute("_alias", valueEdge.getAttribute("label"));
                    thoughtBranchNode.setAttribute("type", "bool");
                    thoughtBranchNode.setAttribute("paramName", specialChars(node.value.getAttribute("nameVar")));
                    thoughtBranchNode = getQuestionInfoThoughtBranch(thoughtBranchNode, node.edges[i]); //TODO: проверить мб присваивать не нужно
                    thoughtBranchNode.appendChild(switchCaseNodes(doc, node.edges[i].target, editorUi));
                    resultNode.appendChild(thoughtBranchNode);

                    bodyCount++;
                }
            }
        }
    }
    let errorCycle = "";
    if (bodyCount > 1) {
        errorCycle += getTextByLocale("bodyOnlyOne");
    }
    if (trueCount > 1) {
        errorCycle += getTextByLocale("trueCycleOnlyOne");
    }
    if (falseCount > 1) {
        errorCycle += getTextByLocale("falseCycleOnlyOne");
    }
    if (errorCycle) {
        throw new Error(errorCycle + "\nУзел с текстом: " + node.value.getAttribute("label"));
    }


    return resultNode;
}

function logicNodeToXml(doc, node, editorUi) {
    let resultNode = doc.createElement("BranchAggregationNode");
    resultNode.setAttribute("_id", LAST_ID++);
    if (node.value.getAttribute("skill")) {
        resultNode.setAttribute("_skill", node.value.getAttribute("skill"));
    }
    if (node.value.getAttribute("label")) {
        resultNode.setAttribute("_alias", node.value.getAttribute("label"));
    }
    resultNode.setAttribute("operator", node.value.getAttribute("type").toLowerCase());
    resultNode = getQuestionInfoNode(resultNode, node, true);

    let branchCount = 0;
    let trueCount = 0;
    let falseCount = 0;
    if (node.edges) {
        for (let i = 0; i < node.edges.length; i++) {
            if (node.edges[i].target != node) {
                let valueEdge = node.edges[i].value;
                if (valueEdge == null || typeof valueEdge != "object"
                    || !valueEdge.getAttribute("type")
                    || (valueEdge.getAttribute("type") != "Correct"
                        && valueEdge.getAttribute("type") != "Error"
                        && valueEdge.getAttribute("type") != "Null"
                        && valueEdge.getAttribute("type") != "Branch")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("typeOutcomeLogicNodeIsMissing")
                        + "\nУзел с текстом: " + node.value.getAttribute("label"));
                }
                if (valueEdge.getAttribute("type") == "Correct" || valueEdge.getAttribute("type") == "Error" || valueEdge.getAttribute("type") == "Null") {
                    // if (valueEdge.getAttribute("type") == "Correct") {
                    //     trueCount++;
                    // } else {
                    //     falseCount++;
                    // }
                    let outcomeNode = doc.createElement("Outcome");
                    outcomeNode.setAttribute("value", specialChars(valueEdge.getAttribute("type")));
                    outcomeNode = getQuestionInfoOutcome(outcomeNode, node.edges[i]);
                    outcomeNode.appendChild(switchCaseNodes(doc, node.edges[i].target, editorUi));
                    resultNode.appendChild(outcomeNode);

                } else if (valueEdge.getAttribute("type") == "Branch") {
                    let thoughtBranchNode = doc.createElement("ThoughtBranch");
                    thoughtBranchNode.setAttribute("_alias", valueEdge.getAttribute("label"));
                    thoughtBranchNode.setAttribute("type", "bool");
                    thoughtBranchNode = getQuestionInfoThoughtBranch(thoughtBranchNode, node.edges[i]); //TODO: проверить мб присваивать не нужно
                    thoughtBranchNode.appendChild(switchCaseNodes(doc, node.edges[i].target, editorUi));
                    resultNode.appendChild(thoughtBranchNode);
                    branchCount++;
                }
            }
        }
    }
    let errorLogic = "";
    if (branchCount < 2) {
        errorLogic += getTextByLocale("OutcomeLogicNodeOnlyTwo");
    }
    if (trueCount > 1) {
        errorLogic += getTextByLocale("trueLogicNodeOnlyOne");
    }
    if (falseCount > 1) {
        errorLogic += getTextByLocale("falseLogicNodeOnlyOne");
    }
    if (errorLogic) {
        throw new Error(errorLogic + "\nУзел с текстом: " + node.value.getAttribute("label"));
    }

    return resultNode;
}

function predeterminingNodeToXml(doc, node, editorUi) {
    let resultNode = doc.createElement("BranchAggregationNode");
    resultNode.setAttribute("_id", LAST_ID++);
    if (node.value.getAttribute("skill")) {
        resultNode.setAttribute("_skill", node.value.getAttribute("skill"));
    }
    if (node.value.getAttribute("label")) {
        resultNode.setAttribute("_alias", node.value.getAttribute("label"));
    }
    resultNode.setAttribute("operator", "MUTEX");
    resultNode = getQuestionInfoNode(resultNode, node, false);

    //Следующие ветки
    let predCount = 0;
    let undertermCount = 0;
    let branchCount = 0;
    let trueCount = 0;
    let falseCount = 0;
    if (node.edges) {
        for (let i = 0; i < node.edges.length; i++) {
            if (node.edges[i].target != node) {
                let valueEdge = node.edges[i].value;
                if (valueEdge == null || typeof valueEdge != "object"
                    || !valueEdge.getAttribute("type")
                    || (valueEdge.getAttribute("type") != "Correct"
                        && valueEdge.getAttribute("type") != "Error"
                        && valueEdge.getAttribute("type") != "Null"
                        && valueEdge.getAttribute("type") != "Branch")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("typeOutcomeLogicNodeIsMissing")
                        + "\nУзел с текстом: " + node.value.getAttribute("label"));
                }
                if (valueEdge.getAttribute("type") == "Correct" || valueEdge.getAttribute("type") == "Error" || valueEdge.getAttribute("type") == "Null") {
                    // if (valueEdge.getAttribute("type") == "Correct") {
                    //     trueCount++;
                    // } else {
                    //     falseCount++;
                    // }
                    let outcomeNode = doc.createElement("Outcome");
                    outcomeNode.setAttribute("value", specialChars(valueEdge.getAttribute("type")));
                    outcomeNode = getQuestionInfoOutcome(outcomeNode, node.edges[i]);
                    outcomeNode.appendChild(switchCaseNodes(doc, node.edges[i].target, editorUi));
                    resultNode.appendChild(outcomeNode);

                } else if (valueEdge.getAttribute("type") == "Branch") {
                    let thoughtBranchNode = doc.createElement("ThoughtBranch");
                    thoughtBranchNode.setAttribute("_alias", valueEdge.getAttribute("label"));
                    thoughtBranchNode.setAttribute("type", "bool");
                    thoughtBranchNode = getQuestionInfoThoughtBranch(thoughtBranchNode, node.edges[i]); //TODO: проверить мб присваивать не нужно
                    thoughtBranchNode.appendChild(switchCaseNodes(doc, node.edges[i].target, editorUi));
                    resultNode.appendChild(thoughtBranchNode);
                    branchCount++;
                }
            }
        }
    }

    let errorPred = "";
    // if (predCount == 0) {
    //     errorPred += getTextByLocale("predOutcomeIsMissing");
    // }
    // if (undertermCount != 1) {
    //     errorPred += getTextByLocale("undeterminedOnlyOne");
    // }
    // if (errorPred) {
    //     throw new Error(errorPred + "\nУзел с текстом: " + node.value.getAttribute("label"));
    // }

    return resultNode;
}

function outcomeToXml(doc, parentNode, node, editorUi) {
    let prevValues = new Set();
    if (node.edges) {
        for (let i = 0; i < node.edges.length; i++) {
            if (node.edges[i].target != node) {
                let valueEdge = node.edges[i].value;
                if (valueEdge == null || typeof valueEdge != "object" || !valueEdge.getAttribute("value")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("valueInOutcomeIsMissing")
                        + "\nИсходит из узла с текстом: " + node.value.getAttribute("label"));
                }
                let typeNode;
                try {
                    typeNode = getTypeFromCode(node.value.getAttribute('expression'), editorUi);
                } catch (e) {
                    throw new Error(e.message + "\nУзел с текстом: " + node.value.getAttribute("label")
                        + "\nСтрелка с текстом: " + valueEdge.getAttribute("value"))
                }
                if (typeNode.type == valueEdge.getAttribute("typeValue")) {
                    if (valueEdge.getAttribute("typeValue") == "enum") {
                        let enumsList = getEnums(editorUi);
                        let findEnum = enumsList.filter(el => el.nameEnum == typeNode.enum);
                        let valueEnumInOutcome = valueEdge.getAttribute("value").split(":");
                        if (findEnum[0] != undefined) {
                            if (findEnum[0].values.indexOf(valueEnumInOutcome[1]) == -1) {
                                markOutcome(editorUi.editor.graph, node.edges[i])
                                throw new Error(getTextByLocale("valueEnumIsMissing")
                                    + "\nИсходит из узла с текстом: " + node.value.getAttribute("label"));
                            }
                        } else {
                            throw new Error(getTextByLocale("EnumIsMissing")
                                + "\nИсходит из узла с текстом: " + node.value.getAttribute("label"));
                        }
                    } else if (valueEdge.getAttribute("typeValue") == "class") {
                        let jsonClasses = getClasses(editorUi);
                        let findClass = jsonClasses.filter(el => el.name == valueEdge.getAttribute("value"));
                        if (findClass.length == 0) {
                            markOutcome(editorUi.editor.graph, node.edges[i])
                            throw new Error(getTextByLocale("ClassInDictIsMissing")
                                + "\nИсходит из узла с текстом: " + node.value.getAttribute("label"));
                        }
                    }
                } else if (valueEdge.getAttribute("typeValue") && typeNode.type != valueEdge.getAttribute("typeValue")) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("TypesDontMatch")
                        + "\nИсходит из узла с текстом: " + node.value.getAttribute("label"));
                }
                if (prevValues.has(valueEdge.getAttribute("value"))) {
                    markOutcome(editorUi.editor.graph, node.edges[i])
                    throw new Error(getTextByLocale("OutcomesHasSameValues")
                        + "\nИсходит из узла с текстом: " + node.value.getAttribute("label"));
                }
                prevValues.add(valueEdge.getAttribute("value"));
                let resultNode = doc.createElement("Outcome");

                resultNode = getQuestionInfoOutcome(resultNode, node.edges[i]);

                resultNode.setAttribute("value", specialChars(valueEdge.getAttribute("value")));
                resultNode.appendChild(switchCaseNodes(doc, node.edges[i].target, editorUi));
                parentNode.appendChild(resultNode);
            }
        }
    }
    return parentNode;
}

export function markOutcome(graph, cell) {
    graph.getModel().beginUpdate();
    if (!cell.style.includes("strokeColor=#FF0000;")) {
        cell.style += "strokeColor=#FF0000;";
    }
    graph.getModel().endUpdate();
    graph.refresh(); // update the graph
}

function getQuestionInfoThoughtBranch(thoughtBranchNode, edge) {
    if (edge.value.getAttribute("_description")) {
        thoughtBranchNode.setAttribute("_RU_description", specialChars(edge.value.getAttribute("_description")));
    }
    if (edge.value.getAttribute("_nextStepQuestion")) {
        thoughtBranchNode.setAttribute("_RU_nextStepQuestion", specialChars(edge.value.getAttribute("_nextStepQuestion")));
    }
    if (edge.value.getAttribute("_nextStepExplanation")) {
        thoughtBranchNode.setAttribute("_RU_nextStepExplanation", specialChars(edge.value.getAttribute("_nextStepExplanation")));
    }
    return thoughtBranchNode;
}

function getQuestionInfoOutcome(resultNode, edge) {
    if (edge.value.getAttribute("_text")) {
        resultNode.setAttribute("_RU_text", specialChars(edge.value.getAttribute("_text")));
    }
    if (edge.value.getAttribute("_explanation")) {
        resultNode.setAttribute("_RU_explanation", specialChars(edge.value.getAttribute("_explanation")));
    }
    if (edge.value.getAttribute("_nextStepBranchResult")) {
        resultNode.setAttribute("_RU_nextStepBranchResult", specialChars(edge.value.getAttribute("_nextStepBranchResult")));
    }
    if (edge.value.getAttribute("_nextStepQuestion")) {
        resultNode.setAttribute("_RU_nextStepQuestion", specialChars(edge.value.getAttribute("_nextStepQuestion")));
    }
    if (edge.value.getAttribute("_nextStepExplanation")) {
        resultNode.setAttribute("_RU_nextStepExplanation", specialChars(edge.value.getAttribute("_nextStepExplanation")));
    }
    return resultNode;
}

function getQuestionInfoNode(resultNode, node, isLogic) {
    if (isLogic) {
        if (node.value.getAttribute("_description")) {
            resultNode.setAttribute("_RU_description", specialChars(node.value.getAttribute("_description")));
        }
    } else {
        if (node.value.getAttribute("_question")) {
            resultNode.setAttribute("_RU_question", specialChars(node.value.getAttribute("_question")));
        }
    }
    if (node.value.getAttribute("_asNextStep")) {
        resultNode.setAttribute("_RU_asNextStep", specialChars(node.value.getAttribute("_asNextStep")));
    }
    if (node.value.getAttribute("_endingCause")) {
        resultNode.setAttribute("_RU_endingCause", specialChars(node.value.getAttribute("_endingCause")));
    }
    return resultNode;
}

function getQuestionInfoPredetermining(outcomeNode, thoughtBranchNode, edge) {

    if (edge.value.getAttribute("_text")) {
        outcomeNode.setAttribute("_RU_text", specialChars(edge.value.getAttribute("_text")));
    }
    if (edge.value.getAttribute("_explanation")) {
        outcomeNode.setAttribute("_RU_explanation", specialChars(edge.value.getAttribute("_explanation")));
    }
    if (edge.value.getAttribute("_nextStepBranchResult")) {
        outcomeNode.setAttribute("_RU_nextStepBranchResult", specialChars(edge.value.getAttribute("_nextStepBranchResult")));
    }
    if (edge.value.getAttribute("_nextStepQuestionOutcome")) {
        outcomeNode.setAttribute("_RU_nextStepQuestion", specialChars(edge.value.getAttribute("_nextStepQuestionOutcome")));
    }
    if (edge.value.getAttribute("_nextStepExplanationOutcome")) {
        outcomeNode.setAttribute("_RU_nextStepExplanation", specialChars(edge.value.getAttribute("_nextStepExplanationOutcome")));
    }

    if (edge.value.getAttribute("_description")) {
        thoughtBranchNode.setAttribute("_RU_description", specialChars(edge.value.getAttribute("_description")));
    }
    if (edge.value.getAttribute("_nextStepQuestionThoughtBranch")) {
        thoughtBranchNode.setAttribute("_RU_nextStepQuestion", specialChars(edge.value.getAttribute("_nextStepQuestionThoughtBranch")));
    }
    if (edge.value.getAttribute("_nextStepExplanationThoughtBranch")) {
        thoughtBranchNode.setAttribute("_RU_nextStepExplanation", specialChars(edge.value.getAttribute("_nextStepExplanationThoughtBranch")));
    }

    return [outcomeNode, thoughtBranchNode];
}

function checkCorrectPredeterminingBranch(node) {
    let resultNodes = [];

    function branchBypass(node) {
        if (node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;editable=0;"
            || node.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;editable=0;") {
            let isNewNode = true;
            for (let i = 0; i < resultNodes.length; i++) {
                let resultNode = resultNodes[i];
                isNewNode &= isNotEqualResultNode(resultNode, node);
            }
            if (isNewNode) {
                resultNodes.push(node);
            }
            return true;
        }
        let countChildNodes = 0;
        for (let i = 0; i < node.edges.length; i++) {
            let child = node.edges[i].target;
            if (child != node) {
                countChildNodes++;
            }
        }
        if (countChildNodes == 0) {
            return true;
        }
        // Рекурсивно обходим потомков текущего узла
        for (let i = 0; i < node.edges.length; i++) {
            let child = node.edges[i].target;
            if (child != node) {
                branchBypass(child);
            }
        }
        return true;
    }
    branchBypass(node);
    // if (countResultNode != 1) {
    //     throw new Error(getTextByLocale("ResultOutcomeForPredNode"));
    // }
    return resultNodes;
}

function isNotEqualResultNode(node1, node2) {
    return (node1.style != node2.style ||
        node1.value.getAttribute("expression") != node2.value.getAttribute("expression") ||
        node1.value.getAttribute("label") != node2.value.getAttribute("label"));
}
