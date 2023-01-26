// Окно коструктора блока со свойствами классов
var ClassPropertiesConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.height = '100%';
    var tbody = document.createElement('tbody');
    var rowProperty = addRowProperty(editorUi);

    tbody.appendChild(rowProperty);
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
    var addProperty = mxUtils.button('Add property class', function () {
        var newRowProperty = addRowProperty(editorUi);
        var tdDelRow = document.createElement('td');
        tdDelRow.classList = 'delete';
        var btnDelRow = mxUtils.button('Delete', function (evt) {
            evt.target.parentElement.parentElement.remove();
        });
        tdDelRow.appendChild(btnDelRow);
        newRowProperty.appendChild(tdDelRow);
        table.appendChild(newRowProperty);
    });

    // Добавление кнопок в окно
    div.appendChild(addProperty);
    div.appendChild(applyBtn);

    // Настройки окна
    this.window = new mxWindow('Class properties constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function addRowProperty(editorUi) {
    var tr1 = document.createElement('tr');

    var td1 = document.createElement('td');
    var text = document.createElement('input');
    text.type = "text";
    text.placeholder = "Name";
    text.style.width = '100%';
    td1.appendChild(text);
    tr1.appendChild(td1);

    // Создание выпадающего списка с типами + enums
    var td2 = document.createElement('td');
    var selectType = document.createElement('select');
    selectType.style.width = '100%';
    var types = ["Integer", "Double", "Boolean", "String"];
    var jsonEnums = getEnums(editorUi);
    jsonEnums.forEach(enumItem => {
        types.push("enum: " + enumItem.nameEnum)
    });
    types.forEach(element => {
        var newOption = new Option(element, element);
        selectType.options[selectType.options.length] = newOption;
    });
    selectType.addEventListener('change', (event) => {
        if(event.currentTarget.value == "Integer" || event.currentTarget.value == "Double") {
            if(event.currentTarget.parentElement.nextElementSibling.classList != 'range') {
                var tdRange = document.createElement('td');
                tdRange.classList = 'range';

                var startInput = document.createElement('input');
                startInput.type = "number";
                startInput.placeholder = "0";
                startInput.style.width = '45%';
                tdRange.appendChild(startInput);
                
                var dash = document.createElement('span');
                dash.innerText = "-";
                dash.style.width = '30%';
                tdRange.appendChild(dash);

                var endInput = document.createElement('input');
                endInput.type = "number";
                endInput.placeholder = "9";
                endInput.style.width = '45%';
                tdRange.appendChild(endInput);

                event.currentTarget.parentElement.parentElement.insertBefore(tdRange, event.currentTarget.parentElement.nextElementSibling);
            }
        } else {
            if(event.currentTarget.parentElement.nextElementSibling.classList == 'range') {
                event.currentTarget.parentElement.nextElementSibling.remove();
            }
        }
      })
    td2.appendChild(selectType);
    var tdRange = document.createElement('td');
    tdRange.classList = 'range';

    var startInput = document.createElement('input');
    startInput.type = "number";
    startInput.placeholder = "0";
    startInput.style.width = '45%';
    tdRange.appendChild(startInput);
                
    var dash = document.createElement('span');
    dash.innerText = "-";
    dash.style.width = '30%';
    tdRange.appendChild(dash);

    var endInput = document.createElement('input');
    endInput.type = "number";
    endInput.placeholder = "9";
    endInput.style.width = '45%';
    tdRange.appendChild(endInput);
    tr1.appendChild(td2);
    tr1.appendChild(tdRange);
    

    // Создание checkbox isStatic
    var td3 = document.createElement('td');
    var span = document.createElement('span');
    span.innerText = "is static";
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            var tdInputClass = document.createElement('td');
            var selectClass = document.createElement('select');
            selectClass.style.width = '100%';
            var jsonClasses = getClasses(editorUi);
            jsonClasses.forEach(classItem => {
                var newOption = new Option(classItem.name, classItem.name);
                selectClass.options[selectClass.options.length] = newOption;
            });
            tdInputClass.appendChild(selectClass);

            var tdAddClass = document.createElement('td');
            var btnAddClass = mxUtils.button('+', function (evt) {
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
                evt.target.parentElement.parentElement.insertBefore(newTdClass, evt.target.parentElement)
            });

            tdAddClass.appendChild(btnAddClass);

            event.currentTarget.parentElement.parentElement.insertBefore(tdAddClass, event.currentTarget.parentElement.nextElementSibling);
            event.currentTarget.parentElement.parentElement.insertBefore(tdInputClass, event.currentTarget.parentElement.nextElementSibling);
        } else {
            var currentTd = event.currentTarget.parentElement.nextElementSibling;
            while(currentTd != null && currentTd.classList != 'delete') {
                currentTd.remove();
                currentTd = event.currentTarget.parentElement.nextElementSibling;
            }
        }
      })
    td3.appendChild(span);
    td3.appendChild(checkbox);
    tr1.appendChild(td3);

    return tr1;
}

function generateStrValueForProperties(table) {
    strValue = '<b><font color="#000000">Class properties</font></b>';

    for (var i = 0; i < table.rows.length; i++) {
        var property = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;

        var typeSelect = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("select").item(0);
        var type = typeSelect.options[typeSelect.options.selectedIndex].value;

        let lastIndex = 2;
        if(type == "Integer" || type == "Double") {
            var startValue = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("input").item(0).value;
            var endValue = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("input").item(1).value;
                lastIndex++;
        }

        var isStatic = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("input").item(0).checked;
        if(isStatic) {
            lastIndex++;
            var classList = [];

            var classSelect = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("select").item(0);
            classList[0] = classSelect.options[classSelect.options.selectedIndex].value;
            lastIndex++;
            let currentSelect = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("select").item(0);
            while(currentSelect != null) {
                classList.push(currentSelect.options[currentSelect.options.selectedIndex].value);
                lastIndex++;
                currentSelect = table.rows.item(i).getElementsByTagName("td")
                    .item(lastIndex).getElementsByTagName("select").item(0);
            }
        }

        strValue += '<br><font color="#ffb366">' + property 
            + '</font>, <font color="#000000">' + type + '</font>';
        if(type == "Integer" || type == "Double") {
            strValue += '<font color="#000000">: ' + startValue + '-' + endValue + '</font>';
        }

        strValue += ' <font color="#19c3c0">isStatic:</font> ' 
            + '<font color="#000000">' + isStatic + '</font>';

        if(isStatic) {
            strValue += ' (<font color="#fc49a4">' + classList[0];
            for(let i = 1; i < classList.length; i++) {
                strValue += ', ' + classList[i];
            }
            strValue += '</font>)';
        }
    }

    return strValue;
}