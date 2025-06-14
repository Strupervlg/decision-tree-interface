import { styleBtn, styleInput, styleDivBtn } from '../utils/style.js';
import { getTextByLocale } from '../utils/locale.js';

// Окно редактирования узлов "Предрешающие факторы"
export var PredeterminingFactorsNodeEditorWindow = function (cell, editorUi, x, y, w, h) {

    // Верстка окнаx
    var div = document.createElement('div');
    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.height = '100%';
    var tbody = document.createElement('tbody');

    var row = document.createElement('tr');
    var tdName = document.createElement('td');
    var name = document.createElement('input');
    name.type = "text";
    name = styleInput(name);
    name.placeholder = "Value";
    name.value = cell.value.getAttribute('label');
    tdName.appendChild(name);
    row.appendChild(tdName);
    tbody.appendChild(row);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания узла
    var btnCreateNode = mxUtils.button(getTextByLocale("Apply"), function () {
        var theGraph = editorUi.editor.graph;
        var strValue = table.rows.item(0).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute('label', strValue);
        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.destroy();
    });

    var btnDiv = document.createElement('div');
    btnDiv = styleDivBtn(btnDiv);
    btnCreateNode = styleBtn(btnCreateNode);
    btnDiv.appendChild(btnCreateNode);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow(getTextByLocale("TitlePredeterminingFactorsNodeEditorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
