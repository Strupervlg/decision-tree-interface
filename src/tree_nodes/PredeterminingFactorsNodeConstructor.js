import { styleBtn, styleInput, styleDivBtn } from '../utils/style.js';
import { getTextByLocale } from '../utils/locale.js';

// Окно создание узлов "Предрешающие факторы"
export var PredeterminingFactorsNodeConstructorWindow = function (editorUi, x, y, w, h) {

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
    tdName.appendChild(name);
    row.appendChild(tdName);
    tbody.appendChild(row);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания узла
    var btnCreateNode = mxUtils.button(getTextByLocale("Create"), function () {
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 80), "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;editable=0;");
            newElement.value = table.rows.item(0).getElementsByTagName("td")
                .item(0).getElementsByTagName("input").item(0).value;
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            table.rows.item(0).getElementsByTagName("td")
                .item(0).getElementsByTagName("input").item(0).value = "";
            theGraph.setAttributeForCell(newElement, 'type', "predetermining");
        }
        win.destroy();
    });

    var btnDiv = document.createElement('div');
    btnDiv = styleDivBtn(btnDiv);
    btnCreateNode = styleBtn(btnCreateNode);
    btnDiv.appendChild(btnCreateNode);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow(getTextByLocale("TitlePredeterminingFactorsNodeConstructorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
