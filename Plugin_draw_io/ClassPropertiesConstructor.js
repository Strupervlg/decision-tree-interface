// Окно коструктора блока со свойствами классов
var ClassPropertiesConstructorWindow = function (editorUi, x, y, w, h) {

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
    text.style.width = '32%';
    td1.appendChild(text);

    // Создание выпадающего списка с классами
    var select = document.createElement('select');
    select.style.width = '32%';
    var classes_array = getClasses(editorUi);
    classes_array.forEach(element => {
        var newOption = new Option(element, element);
        select.options[select.options.length] = newOption;
    });
    td1.appendChild(select);

    var text2 = document.createElement('input');
    text2.type = "text";
    text2.style.width = '32%';
    td1.appendChild(text2);

    tr1.appendChild(td1);
    tbody.appendChild(tr1);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button('Apply', function () {
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            //TODO Поменять ширину объекта
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17), "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#00CCCC;align=center;");

            strValue = generateStrValueForProperties(table);
            
            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    // Кнопка добавления полей для нового свойства класса
    var addClass = mxUtils.button('Add property class', function () {
        var trAdd = document.createElement('tr');
        var tdAdd = document.createElement('td');
        var text = document.createElement('input');
        text.type = "text";
        text.style.width = '32%';
        tdAdd.appendChild(text);

        // Создание выпадающего списка с классами
        var select = document.createElement('select');
        select.style.width = '32%';
        classes_array.forEach(element => {
            var newOption = new Option(element, element);
            select.options[select.options.length] = newOption;
        });
        tdAdd.appendChild(select);

        var text2 = document.createElement('input');
        text2.type = "text";
        text2.style.width = '32%';
        tdAdd.appendChild(text2);
        trAdd.appendChild(tdAdd);
        table.appendChild(trAdd);
    });

    // Добавление кнопок в окно
    div.appendChild(addClass);
    div.appendChild(applyBtn);

    // Настройки окна
    this.window = new mxWindow('Class properties constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function getClasses(editorUi) {

    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;
    let classes = new Array();

    Object.keys(cells).forEach(function (key) {

        var cellValue = cells[key].value;

        if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
            cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
            var values = cellValue.split('<br>');

            values.forEach(element => {
                var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                classes.push(str);
            });
        }
    });
    return classes;
}

function generateStrValueForProperties(table) {
    strValue = '<b><font color="#000000">Class properties</font></b>';

    for (var i = 0; i < table.rows.length; i++) {
        var property = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        var propertyValues = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(1).value;
        var selectClass = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("select").item(0);
        var selectedIndex = selectClass.options.selectedIndex;
        var selectedClass = selectClass.options[selectedIndex].value;

        //TODO Добавить стили к тексту
        strValue += '<br><font color="#ffb366">' + property + '</font> <font color="#000000"> (</font> <font color="#ff66b3">' + selectedClass + '</font> <font color="#000000">) ' + propertyValues + '</font>';
    }

    return strValue;
}