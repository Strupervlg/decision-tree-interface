// Окно редактирования блока со свойствами классов
var ClassPropertiesEditorWindow = function (cell, editorUi, x, y, w, h) {

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

    fillDataProperties(tbody, cell, editorUi);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button('Apply', function () {
        checkAllInputsProperty(table);

        strValue = generateStrValueForProperties(table);
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.geometry.height = (table.rows.length + 1) * 17;
        cell.value = strValue;
        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.destroy();
    });

    // Кнопка добавления полей для нового свойства класса
    var addProperty = mxUtils.button('Add property class', function () {
        var newRowProperty = addRowProperty(editorUi);
        var tdDelRow = document.createElement('td');
        tdDelRow.classList = 'delete';
        var btnDelRow = mxUtils.button('Delete', function (evt) {
            evt.target.parentElement.parentElement.remove();
        });
        tdDelRow.appendChild(btnDelRow);
        newRowProperty.appendChild(tdDelRow);
        tbody.appendChild(newRowProperty);
    });

    // Добавление кнопок в окно
    var btnDiv = document.createElement('div');
    btnDiv.style.display = "flex";
    btnDiv.style.height = "20%";
    btnDiv.style.alignItems = "center";
    btnDiv.appendChild(addProperty);
    btnDiv.appendChild(applyBtn);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow('Class properties editor', div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function fillDataProperties(tbody, cell, editorUi) {
    let cellValue = cell.value;

    cellValue = cellValue.replace('<b><font color="#000000">Class properties</font></b><br>', '');
    var values = cellValue.split('<br>');

    values.forEach((element, index) => {
        var nameProperty = element.slice(element.indexOf('<font color="#ffb366">')+22, element.indexOf('</font>'));
        element = element.slice(element.indexOf('</font>,')+8);

        var type = element.slice(element.indexOf('<font color="#000000">')+22, element.indexOf('</font>'));
        element = element.slice(element.indexOf('</font>')+7);

        var range = "";
        if(type == "Integer" || type == "Double") {
            range = element.slice(element.indexOf('<font color="#000000">: ')+24, element.indexOf('</font>'));
            element = element.slice(element.indexOf('</font>')+7);
        }
        element = element.slice(element.indexOf('<font color="#19c3c0">isStatic:</font>')+38);
        
        isStatic = element.slice(element.indexOf('<font color="#000000">')+22, element.indexOf('</font>'));
        element = element.slice(element.indexOf('</font>')+7);

        classes = [];
        if(isStatic) {
            var valuesStr = element.slice(element.indexOf('(<font color="#fc49a4">')+23, element.indexOf('</font>'));
            classes = valuesStr.split(', ');
        }

        var row = addRowProperty(editorUi);

        row.getElementsByTagName("td").item(0)
            .getElementsByTagName("input").item(0).value = nameProperty;

        var typeSelect = row.getElementsByTagName("td").item(1)
            .getElementsByTagName("select").item(0);
        for(let index = 0; index < typeSelect.options.length; ++index) {
            if(typeSelect.options[index].value == type) {
                typeSelect.options[index].selected = true;
            }
        }
        
        let lastIndex = 2;
        if(type == "Integer" || type == "Double" || typeSelect.options.selectedIndex == 0) {
            let ranges = range.split("-");
            row.getElementsByTagName("td").item(lastIndex)
                .getElementsByTagName("input").item(0).value = ranges[0];
            row.getElementsByTagName("td").item(lastIndex)
                .getElementsByTagName("input").item(1).value = ranges[1];
            lastIndex++;
        } else {
            row.getElementsByTagName("td").item(lastIndex).remove();
        }

        row.getElementsByTagName("td").item(lastIndex)
            .getElementsByTagName("input").item(0).checked = isStatic == 'true';
        if(isStatic == 'true') {
            var tdInputClass = document.createElement('td');
            tdInputClass.style.minWidth = "150px";
            var selectClass = document.createElement('select');
            selectClass.style.width = '100%';
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

            row.insertBefore(tdAddClass, row.getElementsByTagName("td").item(lastIndex).nextElementSibling);
            row.insertBefore(tdInputClass, row.getElementsByTagName("td").item(lastIndex).nextElementSibling);

            lastIndex++;
            classes.forEach((element, index) => {
                if(index != 0) {
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
                    row.insertBefore(newTdClass, row.getElementsByTagName("td").item(lastIndex));
                }
                var classSelect = row.getElementsByTagName("td").item(lastIndex)
                    .getElementsByTagName("select").item(0);
                for(let index = 0; index < classSelect.options.length; ++index) {
                    if(classSelect.options[index].value == element) {
                        classSelect.options[index].selected = true;
                    }
                }
                lastIndex++;
            });
        }

        if(index != 0) {
            var tdDelRow = document.createElement('td');
            var btnDelRow = mxUtils.button('Delete', function (evt) {
                evt.target.parentElement.parentElement.remove();
            });
            tdDelRow.appendChild(btnDelRow);
            row.appendChild(tdDelRow);
        }

        tbody.appendChild(row);

    });
}
