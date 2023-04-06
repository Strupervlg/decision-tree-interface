// Окно редактирования блока с отношениями для классов
var RelationshipsEditorWindow = function (cell, editorUi, x, y, w, h) {

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

    fillDataRelationships(tbody, cell, editorUi);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button('Apply', function () {
        checkAllInputsRelationship(table);

        strValue = generateStrValueForRelationships(table);
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.geometry.height = (table.rows.length + 1) * 17;
        cell.value = strValue;
        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
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
    var win = new mxWindow('Relationships editor', div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function fillDataRelationships(tbody, cell, editorUi) {
    let cellValue = cell.value;

    cellValue = cellValue.replace('<b><font color="#000000">Relationships between objects</font></b><br>', '');
    var values = cellValue.split('<br>');

    values.forEach((element, index) => {
        var nameRelationship = element.slice(element.indexOf('<font color="#00cccc">')+22, element.indexOf('</font>'));
        element = element.slice(element.indexOf('</font>')+7);

        var extendRelationship = ""
        if(element.indexOf(' (<font color="#00cccc">') != -1) {
            extendRelationship = element.slice(element.indexOf('(<font color="#00cccc">')+23, element.indexOf('</font>)'));
            element = element.slice(element.indexOf('</font>)')+8);
        }

        element = element.slice(element.indexOf('classes:</font>')+15);
        var valuesStr = element.slice(element.indexOf('<font color="#ff66b3">')+22, element.indexOf('</font>'));
        var classes = valuesStr.split(', ');
        element = element.slice(element.indexOf('</font>')+7);

        var scale = "";
        if(element.indexOf('<font color="#6666FF">scale:</font>') != -1) {
            element = element.slice(element.indexOf('scale:</font>')+13);
            scale = element.slice(element.indexOf('<font color="#000000">')+22, element.indexOf('</font>'));
            element = element.slice(element.indexOf('</font>')+7);
        }

        element = element.slice(element.indexOf('classes:</font>')+15);
        isBetween = element.slice(element.indexOf('<font color="#000000">')+22, element.indexOf('</font>'));
        element = element.slice(element.indexOf('</font>')+7);
        var type = "";
        if(isBetween == "true") {
            element = element.slice(element.indexOf('type:</font>')+12);
            type = element.slice(element.indexOf('<font color="#000000">')+22, element.indexOf('</font>'));
        }

        var row = addRowRelationship(editorUi);

        row.getElementsByTagName("td").item(0)
            .getElementsByTagName("input").item(0).value = nameRelationship;

        row.getElementsByTagName("td").item(1)
            .getElementsByTagName("input").item(0).value = extendRelationship;

        let lastIndex = 2;
        classes.forEach(element => {
            if(lastIndex != 2) {
                let newTdClass = document.createElement('td');
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
        lastIndex++;

        var scaleSelect = row.getElementsByTagName("td").item(lastIndex)
            .getElementsByTagName("select").item(0);
        console.log(scale);
        for(let index = 0; index < scaleSelect.options.length; ++index) {
            if(scaleSelect.options[index].value == scale) {
                scaleSelect.options[index].selected = true;
            }
        }
        lastIndex++;
        
        row.getElementsByTagName("td").item(lastIndex)
            .getElementsByTagName("input").item(0).checked = isBetween == 'true';
        if(isBetween == 'true') {
            var tdType = document.createElement('td');
            var selectType = document.createElement('select');
            selectType.style.width = '100%';
            var scales = ["One to one", "One to many"];
            scales.forEach(element => {
                var newOption = new Option(element, element);
                selectType.options[selectType.options.length] = newOption;
            });
            tdType.appendChild(selectType);
            row.insertBefore(tdType, row.getElementsByTagName("td").item(lastIndex).nextElementSibling);

            lastIndex++;

            var typeSelect = row.getElementsByTagName("td").item(lastIndex)
                .getElementsByTagName("select").item(0);
            for(let index = 0; index < typeSelect.options.length; ++index) {
                if(typeSelect.options[index].value == type) {
                    typeSelect.options[index].selected = true;
                }
            }
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
