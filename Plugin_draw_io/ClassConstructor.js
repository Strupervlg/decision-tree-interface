// Окно коструктора блока с классами
var ClassConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.height = '100%';
    var tbody = document.createElement('tbody');
    
    var row = addRowClass();
    tbody.appendChild(row);
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
            for (var i = 0; i < table.rows.length; i++) {
                var expression = table.rows.item(i).getElementsByTagName("td")
                    .item(2).getElementsByTagName("textarea").item(0).value;
                theGraph.setAttributeForCell(newElement, 'expression_' + i, expression);
            }
        }
    });

    // Кнопка добавления полей для нового класса
    var addClass = mxUtils.button('Add Class', function () {
        var newRow = addRowClass();
        var tdDelRow = document.createElement('td');
        var btnDelRow = mxUtils.button('Delete', function (evt) {
            evt.target.parentElement.parentElement.remove();
        });
        tdDelRow.appendChild(btnDelRow);
        newRow.appendChild(tdDelRow);
        table.appendChild(newRow);
    });

    // Добавление кнопок в окно
    div.appendChild(addClass);
    div.appendChild(applyBtn);

    // Настройки окна
    this.window = new mxWindow('Classes constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function addRowClass() {
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var name = document.createElement('input');
    name.type = "text";
    name.style.width = '100%';
    name.placeholder = "Class name";
    td1.appendChild(name);
    var td2 = document.createElement('td');
    var extend = document.createElement('input');
    extend.type = "text";
    extend.style.width = '100%';
    extend.placeholder = "Extend";
    td2.appendChild(extend);
    var td3 = document.createElement('td');
    var expression = document.createElement('textarea');
    expression.style.width = '250px';
    expression.style.maxWidth = '250px';
    expression.placeholder = "Expression";
    td3.appendChild(expression);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    return tr1;
}

function generateStrValueForClasses(table) {
    strValue = '<font color="#000000"><b>Classes</b></font>';

    for (var i = 0; i < table.rows.length; i++) {
        var nameClass = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        var classExtend = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("input").item(0).value;
        
        strValue += '<br><font color="#ff66b3">' + nameClass + '</font>';
        if(classExtend != "") {
            strValue += ' (<font color="#ff66b3">' + classExtend + '</font>)';
        }
    }

    return strValue;
}