import { styleBtn, styleTable, styleDivBtn, styleInput, styleSelect } from '../utils/style.js';
import { getTextByLocale } from '../utils/locale.js';
import { getClasses } from '../dictionaries/Utils.js';
import { checkValidID } from '../utils/utils.js';

// Окно коструктора начального узла
export var StartConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    div.style.height = "100%";
    div.style.width = "100%";
    var table = document.createElement('table');
    table = styleTable(table);
    var tbody = document.createElement('tbody');
    tbody.style.height = "100%";

    var row = addRowStartNode(editorUi);
    tbody.appendChild(row);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button(getTextByLocale("Create"), function () {

        checkAllInputsStartNode(table);

        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 165, 60), "shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;editable=0;");

            let strValue = generateStrValueForStartNode(table);

            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'type', "START");
        }
        win.destroy();
    });

    // Кнопка добавления полей для нового класса
    var addClass = mxUtils.button(getTextByLocale("AddVariable"), function () {
        var newRow = addRowStartNode(editorUi);
        var tdDelRow = document.createElement('td');
        var btnDelRow = mxUtils.button(getTextByLocale("Delete"), function (evt) {
            evt.target.parentElement.parentElement.remove();
        });
        btnDelRow = styleBtn(btnDelRow);
        tdDelRow.appendChild(btnDelRow);
        newRow.appendChild(tdDelRow);
        table.appendChild(newRow);
    });


    // Добавление кнопок в окно
    var btnDiv = document.createElement('div');
    btnDiv = styleDivBtn(btnDiv);
    addClass = styleBtn(addClass);
    applyBtn = styleBtn(applyBtn);
    btnDiv.appendChild(addClass);
    btnDiv.appendChild(applyBtn);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow(getTextByLocale("TitleStartConstructorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

//Создание строки с входной переменной
export function addRowStartNode(editorUi) {
    var tr1 = document.createElement('tr');

    var td1 = document.createElement('td');
    var name = document.createElement('input');
    name.type = "text";
    name = styleInput(name);
    name.placeholder = "Variable name";
    td1.appendChild(name);

    var td2 = document.createElement('td');
    var selectClass = document.createElement('select');
    selectClass = styleSelect(selectClass);
    var jsonClasses = getClasses(editorUi);
    jsonClasses.forEach(classItem => {
        var newOption = new Option(classItem.name, classItem.name);
        selectClass.options[selectClass.options.length] = newOption;
    });
    td2.appendChild(selectClass);

    tr1.appendChild(td1);
    tr1.appendChild(td2);
    return tr1;
}

//Валидация полей
export function checkAllInputsStartNode(table) {
    let errors = "";
    for (var i = 0; i < table.rows.length; i++) {
        let checkValue = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        if (checkValue == "") {
            errors += getTextByLocale("nameIsMissing").replace("%i", (i + 1));
        } else if (!checkValidID(checkValue)) {
            errors += getTextByLocale("nameIsIncorrect").replace("%i", (i + 1));
        }
        var classSelect = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("select").item(0);
        if (typeof (classSelect.options[classSelect.options.selectedIndex]) == "undefined") {
            errors += getTextByLocale("classesIsMissing").replace("%i", (i + 1));
        }
    }
    if (errors != "") {
        throw new Error(errors);
    }
}

//Генерация строкового представления узла
export function generateStrValueForStartNode(table) {
    let strValue = "";
    for (var i = 0; i < table.rows.length; i++) {
        var nameVar = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        var classSelect = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("select").item(0);
        var classVar = classSelect.options[classSelect.options.selectedIndex].value;

        strValue += nameVar + ' - ' + classVar + "\n";
    }

    return strValue.slice(0, -1);
}
