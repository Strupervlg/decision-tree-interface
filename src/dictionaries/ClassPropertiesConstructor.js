import { styleTable, styleInput, styleBtn, styleDivBtn, styleSelect, styleSpan } from '../utils/style.js';
import { getTextByLocale } from '../utils/locale.js';
import { checkValidID, checkUniqueValues } from '../utils/utils.js';
import { getEnums, getClasses } from './Utils.js';

// Окно коструктора блока со свойствами классов
export var ClassPropertiesConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    div.style.height = "100%";
    var table = document.createElement('table');
    table = styleTable(table);
    var tbody = document.createElement('tbody');
    tbody.style.height = "100%";
    var rowProperty = addRowProperty(editorUi);

    tbody.appendChild(rowProperty);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button(getTextByLocale("Create"), function () {
        checkAllInputsProperty(table);
        var theGraph = editorUi.editor.graph;

        checkExistClassPropertiesDictionary(theGraph);

        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            //TODO Поменять ширину объекта
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17), "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#00CCCC;align=center;editable=0;");

            let strValue = generateStrValueForProperties(table);

            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
        win.destroy();
    });

    // Кнопка добавления полей для нового свойства класса
    var addProperty = mxUtils.button(getTextByLocale("AddPropertyClass"), function () {
        var newRowProperty = addRowProperty(editorUi);
        var tdDelRow = document.createElement('td');
        tdDelRow.classList = 'delete';
        var btnDelRow = mxUtils.button(getTextByLocale("Delete"), function (evt) {
            evt.target.parentElement.parentElement.remove();
        });
        btnDelRow = styleBtn(btnDelRow);
        tdDelRow.appendChild(btnDelRow);
        newRowProperty.appendChild(tdDelRow);
        tbody.appendChild(newRowProperty);
    });

    // Добавление кнопок в окно
    var btnDiv = document.createElement('div');
    btnDiv = styleDivBtn(btnDiv);
    applyBtn = styleBtn(applyBtn);
    addProperty = styleBtn(addProperty);
    btnDiv.appendChild(addProperty);
    btnDiv.appendChild(applyBtn);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow(getTextByLocale("TitleClassPropertiesConstructorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

//Добавление строки с новым свойством в конструкторе
export function addRowProperty(editorUi) {
    var tr1 = document.createElement('tr');

    var td1 = document.createElement('td');
    td1.style.minWidth = "200px";
    var text = document.createElement('input');
    text.type = "text";
    text.placeholder = "Name";
    text = styleInput(text);
    td1.appendChild(text);
    tr1.appendChild(td1);

    // Создание выпадающего списка с типами + enums
    var td2 = document.createElement('td');
    td2.style.minWidth = "150px";
    var selectType = document.createElement('select');
    selectType = styleSelect(selectType);
    var types = ["Integer", "Double", "Boolean", "String"];
    var jsonEnums = getEnums(editorUi);
    jsonEnums.forEach(enumItem => {
        types.push("enum: " + enumItem.nameEnum)
    });
    types.forEach(element => {
        var newOption = new Option(element, element);
        selectType.options[selectType.options.length] = newOption;
    });
    selectType.addEventListener('change', (event) => {
        if (event.currentTarget.value == "Integer" || event.currentTarget.value == "Double") {
            if (event.currentTarget.parentElement.nextElementSibling.classList != 'range') {
                var tdRange = document.createElement('td');
                tdRange.style.minWidth = "200px";
                tdRange.classList = 'range';

                var startInput = document.createElement('input');
                startInput.type = "number";
                startInput.placeholder = "0";
                startInput = styleInput(startInput);
                startInput.style.width = '45%';
                tdRange.appendChild(startInput);

                var dash = document.createElement('span');
                dash.innerText = "-";
                dash = styleSpan(dash);
                dash.style.width = '30%';
                tdRange.appendChild(dash);

                var endInput = document.createElement('input');
                endInput.type = "number";
                endInput.placeholder = "9";
                endInput = styleInput(endInput);
                endInput.style.width = '45%';
                tdRange.appendChild(endInput);

                event.currentTarget.parentElement.parentElement.insertBefore(tdRange, event.currentTarget.parentElement.nextElementSibling);
            }
        } else {
            if (event.currentTarget.parentElement.nextElementSibling.classList == 'range') {
                event.currentTarget.parentElement.nextElementSibling.remove();
            }
        }
    });
    td2.appendChild(selectType);
    var tdRange = document.createElement('td');
    tdRange.style.minWidth = "200px";
    tdRange.classList = 'range';

    var startInput = document.createElement('input');
    startInput.type = "number";
    startInput.placeholder = "0";
    startInput = styleInput(startInput);
    startInput.style.width = '45%';
    tdRange.appendChild(startInput);

    var dash = document.createElement('span');
    dash.innerText = "-";
    dash = styleSpan(dash);
    dash.style.width = '30%';
    tdRange.appendChild(dash);

    var endInput = document.createElement('input');
    endInput.type = "number";
    endInput.placeholder = "9";
    endInput = styleInput(endInput);
    endInput.style.width = '45%';
    tdRange.appendChild(endInput);
    tr1.appendChild(td2);
    tr1.appendChild(tdRange);


    // Создание checkbox isStatic
    var td3 = document.createElement('td');
    td3.style.minWidth = "120px";
    var span = document.createElement('span');
    span = styleSpan(span);
    span.innerText = "is static";
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    td3.appendChild(span);
    td3.appendChild(checkbox);
    tr1.appendChild(td3);

    var tdInputClass = document.createElement('td');
    tdInputClass.style.minWidth = "150px";
    var selectClass = document.createElement('select');
    selectClass = styleSelect(selectClass);
    var jsonClasses = getClasses(editorUi);
    jsonClasses.forEach(classItem => {
        var newOption = new Option(classItem.name, classItem.name);
        selectClass.options[selectClass.options.length] = newOption;
    });
    tdInputClass.appendChild(selectClass);

    var tdAddClass = document.createElement('td');
    tdAddClass.style.minWidth = "50px";
    var btnAddClass = mxUtils.button('+', function (evt) {
        let newTdClass = document.createElement('td');
        newTdClass.style.minWidth = "200px";
        var newSelectClass = document.createElement('select');
        newSelectClass = styleSelect(newSelectClass);
        newSelectClass.style.marginRight = "4px";
        newSelectClass.style.width = '85%';
        newSelectClass.style.float = 'left';
        var jsonClasses = getClasses(editorUi);
        jsonClasses.forEach(classItem => {
            var newOption = new Option(classItem.name, classItem.name);
            newSelectClass.options[newSelectClass.options.length] = newOption;
        });
        var btnDelClass = mxUtils.button('-', function (evt) {
            evt.target.parentElement.remove();
        });
        btnDelClass = styleBtn(btnDelClass);
        btnDelClass.style.float = 'left';
        btnDelClass.style.width = '10%';
        newTdClass.appendChild(newSelectClass);
        newTdClass.appendChild(btnDelClass);
        evt.target.parentElement.parentElement.insertBefore(newTdClass, evt.target.parentElement)
    });
    btnAddClass = styleBtn(btnAddClass);
    tdAddClass.appendChild(btnAddClass);
    tr1.appendChild(tdInputClass);
    tr1.appendChild(tdAddClass);
    return tr1;
}

//Валидация всех полей при сохранении
export function checkAllInputsProperty(table) {
    let errors = "";
    let arrayNames = [];
    for (var i = 0; i < table.rows.length; i++) {
        let checkValue = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        arrayNames.push(checkValue);
        if (checkValue == "") {
            errors += getTextByLocale("nameIsMissing").replace("%i", (i + 1));
        } else if (!checkValidID(checkValue)) {
            errors += getTextByLocale("nameIsIncorrect").replace("%i", (i + 1));
        }

        var typeSelect = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("select").item(0);
        var type = typeSelect.options[typeSelect.options.selectedIndex].value;

        let lastIndex = 2;
        if (type == "Integer" || type == "Double") {
            if (table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("input").item(0).value == "") {
                errors += getTextByLocale("startValueIsMissing").replace("%i", (i + 1));
            }
            if (table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("input").item(1).value == "") {
                errors += getTextByLocale("endValueIsMissing").replace("%i", (i + 1));
            }
            lastIndex++;
        }

        lastIndex++;
        let currentSelect = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("select").item(0);
        while (currentSelect != null) {
            if (typeof (currentSelect.options[currentSelect.options.selectedIndex]) == "undefined") {
                errors += getTextByLocale("classesIsMissing").replace("%i", (i + 1));
                break;
            }
            lastIndex++;
            currentSelect = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("select").item(0);
        }
    }
    if (arrayNames.length != 0 && !checkUniqueValues(arrayNames)) {
        errors += getTextByLocale("nonUniquePropertyName");
    }
    if (errors != "") {
        throw new Error(errors);
    }
}

//Генерация строкового представления словаря для визуализации
export function generateStrValueForProperties(table) {
    let strValue = '<b><font color="#000000">Class and Object properties</font></b>';

    for (var i = 0; i < table.rows.length; i++) {
        var property = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;

        var typeSelect = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("select").item(0);
        var type = typeSelect.options[typeSelect.options.selectedIndex].value;

        let lastIndex = 2;
        if (type == "Integer" || type == "Double") {
            var startValue = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("input").item(0).value;
            var endValue = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("input").item(1).value;
            lastIndex++;
        }

        var isStatic = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("input").item(0).checked;
        lastIndex++;
        var classList = [];
        var classSelect = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("select").item(0);
        classList[0] = classSelect.options[classSelect.options.selectedIndex].value;
        lastIndex++;
        let currentSelect = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("select").item(0);
        while (currentSelect != null) {
            classList.push(currentSelect.options[currentSelect.options.selectedIndex].value);
            lastIndex++;
            currentSelect = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("select").item(0);
        }

        if (isStatic) {
            strValue += '<br><font color="#FF8000">' + property
                + '</font>';
        } else {
            strValue += '<br><font color="#00CC00">' + property
                + '</font>';
        }

        strValue += ' (<font color="#fc49a4">' + classList[0];
        for (let i = 1; i < classList.length; i++) {
            strValue += ', ' + classList[i];
        }
        strValue += '</font>) <font color="#000000">' + type + '</font>';

        if (type == "Integer" || type == "Double") {
            strValue += '<font color="#000000">: ' + startValue + '-' + endValue + '</font>';
        }

        strValue += ' <font color="#19c3c0">isStatic:</font> '
            + '<font color="#000000">' + isStatic + '</font>';
    }

    return strValue;
}

//Проверка существования словаря на полотне в draw io
function checkExistClassPropertiesDictionary(graph) {
    var cells = graph.getModel().cells;
    Object.keys(cells).forEach(function (key) {
        var cellValue = cells[key].value;
        if (typeof cellValue == "string" && cellValue.startsWith('<b><font color="#000000">Class and Object properties</font></b>')) {
            throw new Error(getTextByLocale("PropertyExists"));
        }
    });
}
