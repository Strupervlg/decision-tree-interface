import { styleBtn, styleDivBtn, styleTextAreaExp, styleBlocklyAreaExp, styleInput, styleSelect } from '../utils/style.js';
import { getTextByLocale } from '../utils/locale.js';
import { toolbox } from '../utils/blocks.js';
import { parser, root } from '../utils/parser.js';
import { toBlock } from '../utils/code_to_block.js';
import { generateCode, checkValidID } from '../utils/utils.js';
import { getClasses } from '../dictionaries/Utils.js';

// Окно редактирования узлов действия
export var WhileNodeEditorWindow = function (cell, editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    div.style.height = "100%";
    var divText = document.createElement('div');
    divText.style.height = "100%";
    var divBlockly = document.createElement('div');
    divBlockly.style.height = "100%";
    divBlockly.style.display = "none";

    var operators = ["And", "Or"];

    //Экран с текстом
    var text = document.createElement('textarea');
    text = styleTextAreaExp(text);
    text.style.height = "74%";
    text.value = cell.value.getAttribute('expression');

    // Кнопка создания узла
    var btnCreateNodeInText = mxUtils.button(getTextByLocale("Apply"), function () {

        var expression = divText.getElementsByTagName("textarea").item(0).value;
        if (expression) {
            //TODO: Возможно сделать обработку ошибок и выводить свои ошибки
            parser.parse(expression)
        } else {
            throw new Error(getTextByLocale("ExpressionIsMissing"));
        }
        let error = "";
        if (!nameVarInText.value) {
            error += getTextByLocale("NameVariableIsMissing");
        } else if (!checkValidID(nameVarInText.value)) {
            error += getTextByLocale("NameVariableIsIncorrect");
        }
        if (typeof (selectClassInText.options[selectClassInText.options.selectedIndex]) == "undefined" || !selectClassInText.options[selectClassInText.options.selectedIndex].value) {
            error += getTextByLocale("TypeVariableIsMissing");
        }
        if (error) {
            throw new Error(error);
        }

        var selectedOperatorInText = selectOperatorInText.options[selectOperatorInText.options.selectedIndex].value;
        var typeInText = selectClassInText.options[selectClassInText.options.selectedIndex].value;


        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("expression", expression);
        cell.value.setAttribute("typeVar", typeInText);
        cell.value.setAttribute("nameVar", nameVarInText.value);
        cell.value.setAttribute("operator", selectedOperatorInText);

        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.destroy();
    });

    var workspace;

    // Кнопка переключение на Blockly
    var btnSwitchToBlockly = mxUtils.button(getTextByLocale("SwitchBlockly"), function () {
        var expression = divText.getElementsByTagName("textarea").item(0).value;
        if (expression) {
            parser.parse(expression)
        }
        divText.style.display = "none";
        divBlockly.style.display = "block";
        nestedDiv.innerHTML = "";
        workspace = Blockly.inject('cycleUpdateBlocklyDiv', { toolbox: toolbox });
        workspace.clear();
        if (expression) {
            parser.parse(expression)
            toBlock(root, workspace);
        }
        nameVarInBlockly.value = nameVarInText.value;
        selectOperatorInBlockly.options.selectedIndex = selectOperatorInText.options.selectedIndex;
        selectClassInBlockly.options.selectedIndex = selectClassInText.options.selectedIndex;
    });

    var nameVarInText = document.createElement('input');
    nameVarInText.type = "text";
    nameVarInText = styleInput(nameVarInText);
    nameVarInText.style.height = '5%';
    nameVarInText.placeholder = "New variable";
    nameVarInText.value = cell.value.getAttribute('nameVar');

    var jsonClasses = getClasses(editorUi);

    var selectClassInText = document.createElement('select');
    selectClassInText = styleSelect(selectClassInText);
    selectClassInText.style.height = '5%';
    jsonClasses.forEach(classItem => {
        var newOption = new Option(classItem.name, classItem.name);
        selectClassInText.options[selectClassInText.options.length] = newOption;
    });
    let type = cell.value.getAttribute('typeVar');
    for (let index = 0; index < selectClassInText.options.length; ++index) {
        if (selectClassInText.options[index].value == type) {
            selectClassInText.options[index].selected = true;
        }
    }

    var selectOperatorInText = document.createElement('select');
    selectOperatorInText = styleSelect(selectOperatorInText);
    selectOperatorInText.style.height = '5%';
    operators.forEach(item => {
        var newOption = new Option(item, item.toUpperCase());
        selectOperatorInText.options[selectOperatorInText.options.length] = newOption;
    });
    let operator = cell.value.getAttribute('operator');
    for (let index = 0; index < selectOperatorInText.options.length; ++index) {
        if (selectOperatorInText.options[index].value == operator) {
            selectOperatorInText.options[index].selected = true;
        }
    }

    divText.appendChild(text);
    var btnTextDiv = document.createElement('div');
    btnTextDiv = styleDivBtn(btnTextDiv);
    btnTextDiv.style.height = "10%";
    btnCreateNodeInText = styleBtn(btnCreateNodeInText);
    btnSwitchToBlockly = styleBtn(btnSwitchToBlockly);
    divText.appendChild(nameVarInText);
    divText.appendChild(selectClassInText);
    divText.appendChild(selectOperatorInText);
    btnTextDiv.appendChild(btnCreateNodeInText);
    btnTextDiv.appendChild(btnSwitchToBlockly);
    divText.appendChild(btnTextDiv);
    div.appendChild(divText);


    //Экран с blockly
    var nestedDiv = document.createElement('div');
    nestedDiv.id = "cycleUpdateBlocklyDiv";
    nestedDiv = styleBlocklyAreaExp(nestedDiv, w, h);
    nestedDiv.style.height = h * 0.72 + 'px';

    // Кнопка создания узла
    var btnCreateNodeInBlockly = mxUtils.button(getTextByLocale("Apply"), function () {
        var code = generateCode(workspace);
        if (!code) {
            throw new Error(getTextByLocale("ExpressionIsMissing"));
        } else {
            try {
                parser.parse(code);
            } catch (e) {
                throw new Error(getTextByLocale("EmptyConnection"));
            }
        }
        let error = "";
        if (!nameVarInBlockly.value) {
            error += getTextByLocale("NameVariableIsMissing");
        } else if (!checkValidID(nameVarInBlockly.value)) {
            error += getTextByLocale("NameVariableIsIncorrect");
        }
        if (typeof (selectClassInBlockly.options[selectClassInBlockly.options.selectedIndex]) == "undefined" || !selectClassInBlockly.options[selectClassInBlockly.options.selectedIndex].value) {
            error += getTextByLocale("TypeVariableIsMissing");
        }
        if (error) {
            throw new Error(error);
        }
        var selectedOperatorInBlockly = selectOperatorInBlockly.options[selectOperatorInBlockly.options.selectedIndex].value;
        var typeInBlockly = selectClassInBlockly.options[selectClassInBlockly.options.selectedIndex].value;

        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("expression", code);
        cell.value.setAttribute("typeVar", typeInBlockly);
        cell.value.setAttribute("nameVar", nameVarInBlockly.value);
        cell.value.setAttribute("operator", selectedOperatorInBlockly);

        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.destroy();
    });

    //кнопка переключения на текстовый вариант
    var btnSwitchToText = mxUtils.button(getTextByLocale("SwitchText"), function () {
        var code = generateCode(workspace);
        divBlockly.style.display = "none";
        divText.style.display = "block";
        divText.getElementsByTagName("textarea").item(0).value = code;
        nameVarInText.value = nameVarInBlockly.value;
        selectOperatorInText.options.selectedIndex = selectOperatorInBlockly.options.selectedIndex;
        selectClassInText.options.selectedIndex = selectClassInBlockly.options.selectedIndex;
    });

    var nameVarInBlockly = document.createElement('input');
    nameVarInBlockly.type = "text";
    nameVarInBlockly = styleInput(nameVarInBlockly);
    nameVarInBlockly.style.height = '5%';
    nameVarInBlockly.placeholder = "New variable";

    var selectClassInBlockly = document.createElement('select');
    selectClassInBlockly = styleSelect(selectClassInBlockly);
    selectClassInBlockly.style.height = '5%';
    jsonClasses.forEach(classItem => {
        var newOption = new Option(classItem.name, classItem.name);
        selectClassInBlockly.options[selectClassInBlockly.options.length] = newOption;
    });

    var selectOperatorInBlockly = document.createElement('select');
    selectOperatorInBlockly = styleSelect(selectOperatorInBlockly);
    selectOperatorInBlockly.style.height = '5%';
    operators.forEach(item => {
        var newOption = new Option(item, item.toUpperCase());
        selectOperatorInBlockly.options[selectOperatorInBlockly.options.length] = newOption;
    });

    divBlockly.appendChild(nestedDiv);
    var btnBlockDiv = document.createElement('div');
    btnBlockDiv = styleDivBtn(btnBlockDiv);
    btnBlockDiv.style.height = "8%";
    btnCreateNodeInBlockly = styleBtn(btnCreateNodeInBlockly);
    btnSwitchToText = styleBtn(btnSwitchToText);
    divBlockly.appendChild(nameVarInBlockly);
    divBlockly.appendChild(selectClassInBlockly);
    divBlockly.appendChild(selectOperatorInBlockly);
    btnBlockDiv.appendChild(btnCreateNodeInBlockly);
    btnBlockDiv.appendChild(btnSwitchToText);
    divBlockly.appendChild(btnBlockDiv);
    div.appendChild(divBlockly);


    // Настройки окна
    var win = new mxWindow(getTextByLocale("TitleWhileNodeEditorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.contentWrapper.style.height = "100%";
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
