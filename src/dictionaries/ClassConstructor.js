import { styleTable, styleInput, styleBtn, styleDivBtn } from '../utils/style.js';
import { getTextByLocale } from '../utils/locale.js';
import { toolbox } from '../utils/blocks.js';
import { checkValidID, checkUniqueValues } from '../utils/utils.js';
import { parser } from '../utils/parser.js';
import * as Blockly from 'blockly';

// Окно коструктора блока с классами
export var ClassConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    div.style.height = "100%";
    div.style.width = "100%";
    var table = document.createElement('table');
    table = styleTable(table);
    var tbody = document.createElement('tbody');
    tbody.style.height = "100%";

    var row = addRowClass();
    tbody.appendChild(row);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button(getTextByLocale("Create"), function () {

        checkAllInputsClass(table);

        for (var i = 0; i < table.rows.length; i++) {
            var expression = table.rows.item(i).getElementsByTagName("td")
                .item(2).getElementsByTagName("textarea").item(0).value;
            if (expression) {
                //TODO: Возможно сделать обработку ошибок и выводить свои ошибки
                parser.parse(expression)
            }
        }

        var theGraph = editorUi.editor.graph;

        checkExistClassDictionary(theGraph);

        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17), "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#6666FF;align=center;editable=0;");

            let strValue = generateStrValueForClasses(table);

            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            for (let i = 0; i < table.rows.length; i++) {
                let expression = table.rows.item(i).getElementsByTagName("td")
                    .item(2).getElementsByTagName("textarea").item(0).value;
                theGraph.setAttributeForCell(newElement, 'expression_' + i, expression);
            }
        }
        win.destroy();
    });

    // Кнопка добавления полей для нового класса
    var addClass = mxUtils.button(getTextByLocale("AddClass"), function () {
        var newRow = addRowClass();
        var tdDelRow = document.createElement('td');
        var btnDelRow = mxUtils.button(getTextByLocale("Delete"), function (evt) {
            evt.target.parentElement.parentElement.remove();
        });
        btnDelRow = styleBtn(btnDelRow);
        tdDelRow.appendChild(btnDelRow);
        newRow.appendChild(tdDelRow);
        tbody.appendChild(newRow);
    });

    // Кнопка открытия окна с блокли для выражений
    var openBlockly = mxUtils.button(getTextByLocale("OpenBlockly"), function () {
        var widthBlockly = window.screen.width - 400;
        var heightBlockly = window.screen.height - 300
        var mainDivBlockly = document.createElement('div');
        var divBlockly = document.createElement('div');
        divBlockly.id = 'classCreateBlocklyDiv'
        divBlockly.style.width = widthBlockly + 'px';
        divBlockly.style.height = heightBlockly * 0.83 + 'px';
        mainDivBlockly.appendChild(divBlockly);

        var divInput = document.createElement('div');
        divInput.style.width = '100%';
        var codeInput = document.createElement('input');
        codeInput = styleInput(codeInput);
        codeInput.id = 'outputCode';

        divInput.appendChild(codeInput);
        mainDivBlockly.appendChild(divInput);

        var toCodeBtn = mxUtils.button(getTextByLocale("toСode"), function () {
            let code = Blockly.JavaScript.workspaceToCode(workspaceInWindow);
            codeInput.value = code;
        });
        var btnDivBlockly = document.createElement('div');
        btnDivBlockly = styleDivBtn(btnDivBlockly);
        toCodeBtn = styleBtn(toCodeBtn);
        toCodeBtn.style.marginTop = "5px";
        btnDivBlockly.appendChild(toCodeBtn);
        mainDivBlockly.appendChild(btnDivBlockly);

        var win2 = new mxWindow('Blockly', mainDivBlockly, document.body.offsetLeft + 100, document.body.offsetTop + 100, widthBlockly, heightBlockly, true, true);
        win2.destroyOnClose = true;
        win2.setMaximizable(false);
        win2.setResizable(false);
        win2.setClosable(true);
        win2.setVisible(true);
        var workspaceInWindow = Blockly.inject('classCreateBlocklyDiv', { toolbox: toolbox });
    });

    // Добавление кнопок в окно
    var btnDiv = document.createElement('div');
    btnDiv = styleDivBtn(btnDiv);
    addClass = styleBtn(addClass);
    applyBtn = styleBtn(applyBtn);
    openBlockly = styleBtn(openBlockly);
    btnDiv.appendChild(addClass);
    btnDiv.appendChild(applyBtn);
    btnDiv.appendChild(openBlockly);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow(getTextByLocale("TitleClassConstructorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

//Добавление строки с новым классом в конструкторе
export function addRowClass() {
    var tr1 = document.createElement('tr');
    tr1.style.width = '100%';
    var td1 = document.createElement('td');
    td1.style.width = '25%';
    var name = document.createElement('input');
    name.type = "text";
    name = styleInput(name);
    name.placeholder = "Class name";
    td1.appendChild(name);
    var td2 = document.createElement('td');
    td2.style.width = '25%';
    var extend = document.createElement('input');
    extend.type = "text";
    extend = styleInput(extend);
    extend.placeholder = "Extend";
    td2.appendChild(extend);
    var td3 = document.createElement('td');
    td3.style.width = '25%';
    var expression = document.createElement('textarea');
    expression = styleInput(expression);
    expression.style.resize = 'vertical';
    expression.placeholder = "Expression";
    td3.appendChild(expression);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    return tr1;
}

//Валидация всех полей при сохранении
export function checkAllInputsClass(table) {
    let errors = "";
    let arrayNames = [];
    for (var i = 0; i < table.rows.length; i++) {
        let checkValue = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        arrayNames.push(checkValue);
        let checkValueExtend = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("input").item(0).value;
        if (checkValue == "") {
            errors += getTextByLocale("nameIsMissing").replace("%i", (i + 1));
        } else if (!checkValidID(checkValue)) {
            errors += getTextByLocale("nameIsIncorrect").replace("%i", (i + 1));
        }
        if (checkValueExtend != "" && !checkValidID(checkValueExtend)) {
            errors += getTextByLocale("extendClassIsIncorrect").replace("%i", (i + 1));
        }
    }
    if (arrayNames.length != 0 && !checkUniqueValues(arrayNames)) {
        errors += getTextByLocale("nonUniqueClassName");
    }
    if (errors != "") {
        throw new Error(errors);
    }
}

//Генерация строкового представления словаря для визуализации
export function generateStrValueForClasses(table) {
    let strValue = '<font color="#000000"><b>Classes</b></font>';

    for (var i = 0; i < table.rows.length; i++) {
        var nameClass = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        var classExtend = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("input").item(0).value;

        strValue += '<br><font color="#ff66b3">' + nameClass + '</font>';
        if (classExtend != "") {
            strValue += ' (<font color="#ff66b3">' + classExtend + '</font>)';
        }
    }

    return strValue;
}

//Проверка существования словаря на полотне в draw io
function checkExistClassDictionary(graph) {
    var cells = graph.getModel().cells;
    Object.keys(cells).forEach(function (key) {
        var cellValue = cells[key].value;
        if (cellValue && typeof cellValue == "object" && cellValue.getAttribute('label').startsWith('<font color="#000000"><b>Classes</b></font>')) { //TODO: Возможно это кал способ надо протестировать
            throw new Error(getTextByLocale("ClassExists"));
        }
    });
}
