// Окно коструктора блока с отношениями для классов
var RelationshipsConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.height = '100%';
    var tbody = document.createElement('tbody');
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');

    // Создание выпадающего списка с классами
    var select = document.createElement('select');
    select.style.width = '25%';
    var classes_array = getClasses(editorUi);
    classes_array.forEach(element => {
        var newOption = new Option(element, element);
        select.options[select.options.length] = newOption;
    });
    td1.appendChild(select);

    //Создание поля для названия отношения
    var text = document.createElement('input');
    text.type = "text";
    text.style.width = '25%';
    td1.appendChild(text);

    // Создание выпадающего списка с классами
    var select2 = document.createElement('select');
    select2.style.width = '25%';
    classes_array.forEach(element => {
        var newOption = new Option(element, element);
        select2.options[select2.options.length] = newOption;
    });
    td1.appendChild(select2);

    // Создания поля для кода джены
    var textArea = document.createElement('textarea');
    textArea.style.width = '23%';
    td1.appendChild(textArea);

    tr1.appendChild(td1);
    tbody.appendChild(tr1);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button('Apply', function () {
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17), "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#00CCCC;align=center;");

            strValue = generateStrValueForRelationships(table);

            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            for (var i = 0; i < table.rows.length; i++) {
                var jenaCode = table.rows.item(i).getElementsByTagName("td")
                    .item(0).getElementsByTagName("textarea").item(0).value;
                theGraph.setAttributeForCell(newElement, 'jena_code_' + i, jenaCode);
            }
        }
    });

    // Кнопка добавления полей для нового свойства класса
    var addClass = mxUtils.button('Add relationship', function () {
        var trAdd = document.createElement('tr');
        var tdAdd = document.createElement('td');

        // Создание выпадающего списка с классами        
        var select = document.createElement('select');
        select.style.width = '25%';
        classes_array.forEach(element => {
            var newOption = new Option(element, element);
            select.options[select.options.length] = newOption;
        });
        tdAdd.appendChild(select);

        //Создание поля для названия отношения
        var text = document.createElement('input');
        text.type = "text";
        text.style.width = '25%';
        tdAdd.appendChild(text);

        // Создание выпадающего списка с классами
        var select2 = document.createElement('select');
        select2.style.width = '25%';
        classes_array.forEach(element => {
            var newOption = new Option(element, element);
            select2.options[select2.options.length] = newOption;
        });
        tdAdd.appendChild(select2);

        // Создания поля для кода джены
        var textArea = document.createElement('textarea');
        textArea.style.width = '24%';
        tdAdd.appendChild(textArea);

        trAdd.appendChild(tdAdd);
        table.appendChild(trAdd);
    });

    // Добавление кнопок в окно
    div.appendChild(addClass);
    div.appendChild(applyBtn);

    // Настройки окна
    this.window = new mxWindow('Relationships constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function generateStrValueForRelationships(table) {
    strValue = '<b><font color="#000000">Relationships between objects</font></b>';

    for (var i = 0; i < table.rows.length; i++) {
        var relationship = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;

        var selectClass1 = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("select").item(0);
        var selectedIndex1 = selectClass1.options.selectedIndex;
        var selectedClass1 = selectClass1.options[selectedIndex1].value;

        var selectClass2 = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("select").item(1);
        var selectedIndex2 = selectClass2.options.selectedIndex;
        var selectedClass2 = selectClass2.options[selectedIndex2].value;

        strValue += '<br>' + '<font color="#000000">&lt;</font>' + '<font color="#ff66b3">' + selectedClass1 + '</font>' + '<font color="#000000">&gt;</font>' + '<font color="#00cccc"> ' + relationship + ' </font>' + '<font color="#000000">&lt;</font>' + '<font color="#ff66b3">' + selectedClass2 + '</font>' + '<font color="#000000">&gt;</font>';
    }

    return strValue;
}