// Окно коструктора блока с классами
var ClassConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.height = '100%';
    var tbody = document.createElement('tbody');
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var text = document.createElement('input');
    text.type = "text";
    text.style.width = '100%';
    td1.appendChild(text);
    tr1.appendChild(td1);
    tbody.appendChild(tr1);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button('Apply', function () {

        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17), "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#6666FF;align=center;");

            strValue = generateStrValueForClasses(table);

            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    // Кнопка добавления полей для нового класса
    var addClass = mxUtils.button('Add Class', function () {
        var trAdd = document.createElement('tr');
        var tdAdd = document.createElement('td');
        var text = document.createElement('input');
        text.type = "text";
        text.style.width = '100%';
        tdAdd.appendChild(text);
        trAdd.appendChild(tdAdd);
        table.appendChild(trAdd);
    });

    // Добавление кнопок в окно
    div.appendChild(addClass);
    div.appendChild(applyBtn);

    // Настройки окна
    this.window = new mxWindow('Classes constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = false;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function generateStrValueForClasses(table) {
    strValue = '<font color="#000000"><b>Classes</b></font>';

    for (var i = 0; i < table.rows.length; i++) {
        var element = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        
        strValue += '<br><font color="#ff66b3">' + element + '</font>';
    }

    return strValue;
}