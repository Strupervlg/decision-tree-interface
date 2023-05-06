// Окно коструктора блока с отношениями для классов
var RelationshipsConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    div.style.height = "100%";
    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.height = '80%';
    table.style.overflow = "scroll";
    table.style.display = "block";
    var tbody = document.createElement('tbody');
    tbody.style.height = "100%";

    var rowRelationship = addRowRelationship(editorUi);
    tbody.appendChild(rowRelationship);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button('Apply', function () {
        checkAllInputsRelationship(table);
        var theGraph = editorUi.editor.graph;

        checkExistRelationshipsDictionary(theGraph);

        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17), "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#000000;align=center;editable=0;");

            strValue = generateStrValueForRelationships(table);

            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
        win.destroy();
    });

    // Кнопка добавления полей для нового отношения между классами
    var addRelationship = mxUtils.button('Add relationship', function () {
        var newRowRelationship = addRowRelationship(editorUi);
        var tdDelRow = document.createElement('td');
        tdDelRow.classList = 'delete';
        var btnDelRow = mxUtils.button('Delete', function (evt) {
            evt.target.parentElement.parentElement.remove();
        });
        tdDelRow.appendChild(btnDelRow);
        newRowRelationship.appendChild(tdDelRow);
        tbody.appendChild(newRowRelationship);
    });

    // Добавление кнопок в окно
    var btnDiv = document.createElement('div');
    btnDiv.style.display = "flex";
    btnDiv.style.height = "20%";
    btnDiv.style.alignItems = "center";
    btnDiv.appendChild(addRelationship);
    btnDiv.appendChild(applyBtn);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow('Relationships constructor', div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function addRowRelationship(editorUi) {
    var tr1 = document.createElement('tr');

    var td1 = document.createElement('td');
    td1.style.minWidth = "150px";
    var text = document.createElement('input');
    text.type = "text";
    text.placeholder = "Relationship name";
    text.style.width = '100%';
    td1.appendChild(text);
    tr1.appendChild(td1);

    var td2 = document.createElement('td');
    td2.style.minWidth = "150px";
    var extend = document.createElement('input');
    extend.type = "text";
    extend.style.width = '100%';
    extend.placeholder = "Extend";
    td2.appendChild(extend);
    tr1.appendChild(td2);

    //Добавление классов
    var td3 = document.createElement('td');
    td3.style.minWidth = "150px";
    var selectClass = document.createElement('select');
    selectClass.style.width = '100%';
    var jsonClasses = getClasses(editorUi);
    jsonClasses.forEach(classItem => {
        var newOption = new Option(classItem.name, classItem.name);
        selectClass.options[selectClass.options.length] = newOption;
    });
    td3.appendChild(selectClass);

    var tdAddClass = document.createElement('td');
    tdAddClass.style.minWidth = "50px";
    var btnAddClass = mxUtils.button('+', function (evt) {
        let newTdClass = document.createElement('td');
        newTdClass.style.minWidth = "200px";
        var newSelectClass = document.createElement('select');
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
        btnDelClass.style.float = 'left';
        btnDelClass.style.width = '10%';
        newTdClass.appendChild(newSelectClass);
        newTdClass.appendChild(btnDelClass);
        evt.target.parentElement.parentElement.insertBefore(newTdClass, evt.target.parentElement)
    });

    tdAddClass.appendChild(btnAddClass);
    tr1.appendChild(td3);
    tr1.appendChild(tdAddClass);

    //Селектор с scale
    var td5 = document.createElement('td');
    td5.style.minWidth = "150px";
    var selectScale = document.createElement('select');
    selectScale.style.width = '100%';
    var scales = ["None", "Linear", "Partially linear"]; //"NONE" "LINEAR" "PARTIALLY_LINEAR"
    scales.forEach(element => {
        var newOption = new Option(element, element);
        selectScale.options[selectScale.options.length] = newOption;
    });
    td5.appendChild(selectScale);
    tr1.appendChild(td5);

    var td6 = document.createElement('td');
    td6.style.minWidth = "200px";
    var span = document.createElement('span');
    span.innerText = "is relationship between classes";
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            //Добавление поля с типом
            var tdType = document.createElement('td');
            tdType.style.minWidth = "150px";
            var selectType = document.createElement('select');
            selectType.style.width = '100%';
            var scales = ["One to one", "One to many"]; // "ONE_TO_ONE", "ONE_TO_MANY"
            scales.forEach(element => {
                var newOption = new Option(element, element);
                selectType.options[selectType.options.length] = newOption;
            });
            tdType.appendChild(selectType);
            event.currentTarget.parentElement.parentElement.insertBefore(tdType, event.currentTarget.parentElement.nextElementSibling);
        } else {
            //Удаление поля с типом
            event.currentTarget.parentElement.nextElementSibling.remove();
        }
      })
    td6.appendChild(span);
    td6.appendChild(checkbox);
    tr1.appendChild(td6);

    return tr1;
}

function checkAllInputsRelationship(table) {
    errors = "";
    for (var i = 0; i < table.rows.length; i++) {
        if(table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value == "") {
            errors += "В строке №" + (i+1) + " отсутствует название; ";
        }

        let lastIndex = 2;
        let currentSelect = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("select").item(0);
        while(currentSelect != null) {
            if(typeof (currentSelect.options[currentSelect.options.selectedIndex]) == "undefined") {
                errors += "В строке №" + (i+1) + " отсутствуют классы; ";
                break;
            }
            lastIndex++;
            currentSelect = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("select").item(0);
        }
    }
    if(errors != "") {
        throw new Error(errors);
    }
}

function generateStrValueForRelationships(table) {
    strValue = '<b><font color="#000000">Relationships between objects</font></b>';

    for (var i = 0; i < table.rows.length; i++) {
        var relationship = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;

        var extendRelationship = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("input").item(0).value;
        
        var classList = [];

        var classSelect = table.rows.item(i).getElementsByTagName("td")
            .item(2).getElementsByTagName("select").item(0);
        classList[0] = classSelect.options[classSelect.options.selectedIndex].value;
        lastIndex = 3;
        let currentSelect = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("select").item(0);
        while(currentSelect != null) {
            classList.push(currentSelect.options[currentSelect.options.selectedIndex].value);
            lastIndex++;
            currentSelect = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("select").item(0);
        }
        lastIndex++;

        var scaleSelect = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("select").item(0);
        var scale = scaleSelect.options[scaleSelect.options.selectedIndex].value;
        lastIndex++;

        var isBetween = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("input").item(0).checked;
        var type = "";
        if(isBetween) {
            lastIndex++;
            var typeSelect = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("select").item(0);
            type = typeSelect.options[typeSelect.options.selectedIndex].value;
        }

        strValue += '<br>' + '<font color="#00cccc">' + relationship + '</font>';
        if(extendRelationship != "") {
            strValue += ' (<font color="#00cccc">' + extendRelationship + '</font>)'
        }
        strValue += ' <font color="#6666FF">classes:</font> <font color="#ff66b3">' + classList[0];
        for(let i = 1; i < classList.length; i++) {
            strValue += ', ' + classList[i];
        }
        strValue += '</font>';

        if(scale != "None") {
            strValue += ' <font color="#6666FF">scale:</font> <font color="#000000">' + scale + '</font>';
        }

        strValue += ' <font color="#6666FF">is relationship between classes:</font> <font color="#000000">' 
            + isBetween + '</font>';
        if(isBetween) {
            strValue += ' <font color="#6666FF">type:</font> <font color="#000000">' + type + '</font>';
        }
    }

    return strValue;
}

function checkExistRelationshipsDictionary(graph) {
    var cells = graph.getModel().cells;
    Object.keys(cells).forEach(function (key) {
        var cellValue = cells[key].value;
        if (typeof cellValue == "string" && cellValue.startsWith('<b><font color="#000000">Relationships between objects</font></b>')) {
            throw new Error("Relationships dictionary already exists");
        }
    });
}
