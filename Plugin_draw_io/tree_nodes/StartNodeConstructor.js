// Окно коструктора начального узла
var StartConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.height = '100%';
    var tbody = document.createElement('tbody');
    
    var row = addRowStartNode(editorUi);
    tbody.appendChild(row);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button('Create', function () {

        checkAllInputsStartNode(table);

        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 165, 60), "shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;editable=0;");

            strValue = generateStrValueForStartNode(table);

            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'type', "START");
        }
    });

    // Кнопка добавления полей для нового класса
    var addClass = mxUtils.button('Add Variable', function () {
        var newRow = addRowStartNode(editorUi);
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
    this.window = new mxWindow('Start node constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function addRowStartNode(editorUi) {
    var tr1 = document.createElement('tr');

    var td1 = document.createElement('td');
    var name = document.createElement('input');
    name.type = "text";
    name.style.width = '100%';
    name.placeholder = "Variable name";
    td1.appendChild(name);

    var td2 = document.createElement('td');
    var selectClass = document.createElement('select');
    selectClass.style.width = '100%';
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

function checkAllInputsStartNode(table) {
    errors = "";
    for (var i = 0; i < table.rows.length; i++) {
        if(table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value == "") {
            errors += "В строке №" + (i+1) + " отсутствует название; ";
        }
        var classSelect = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("select").item(0);
        if(typeof (classSelect.options[classSelect.options.selectedIndex]) == "undefined") {
            errors += "В строке №" + (i+1) + " отсутствуют классы; ";
        }
    }
    if(errors != "") {
        throw new Error(errors);
    }
}

function generateStrValueForStartNode(table) {
    strValue = "";
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
