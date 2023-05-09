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

            let valuesRels = generateStrValueForRelationships(table);

            newElement.value = valuesRels[0];

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            for (var i = 0; i < valuesRels[1].length; i++) {
                theGraph.setAttributeForCell(newElement, 'namesRels_' + i, valuesRels[1][i]);
                theGraph.setAttributeForCell(newElement, 'binFlags_' + i, valuesRels[2][i]);
            }
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

    selectScale.addEventListener('change', (event) => {
        checkFlags(event.target.parentElement.parentElement, 
            event.target.options[event.target.options.selectedIndex].value)
        if (event.target.options[event.target.options.selectedIndex].value == "Linear") {
            var tdInputNames = document.createElement('td');
            tdInputNames.classList = "names";
            tdInputNames.style.minWidth = "150px";
            var nameInput = document.createElement('input');
            nameInput.type = "text";
            nameInput.style.width = '100%';
            nameInput.placeholder = "Name";
            tdInputNames.appendChild(nameInput);

            var tdAddName = document.createElement('td');
            tdAddName.classList = "addNames";
            tdAddName.style.minWidth = "50px";
            var btnAddName = mxUtils.button('+', function (evt) {
                let newTdName = document.createElement('td');
                newTdName.style.minWidth = "200px";
                var newNameInput = document.createElement('input');
                newNameInput.type = "text";
                newNameInput.style.width = '85%';
                newNameInput.style.float = 'left';
                newNameInput.placeholder = "Name";
                var btnDelName = mxUtils.button('-', function (evt) {
                    evt.target.parentElement.remove();
                });
                btnDelName.style.float = 'left';
                btnDelName.style.width = '10%';
                newTdName.appendChild(newNameInput);
                newTdName.appendChild(btnDelName);
                evt.target.parentElement.parentElement.insertBefore(newTdName, evt.target.parentElement)
            });

            tdAddName.appendChild(btnAddName);

            event.currentTarget.parentElement.parentElement.insertBefore(tdAddName, event.currentTarget.parentElement.nextElementSibling);
            event.currentTarget.parentElement.parentElement.insertBefore(tdInputNames, event.currentTarget.parentElement.nextElementSibling);
        } else {
            if(event.currentTarget.parentElement.nextElementSibling.classList.contains("names")) {
                var currentTd = event.currentTarget.parentElement.nextElementSibling;
                while(currentTd.classList != 'addNames') {
                    currentTd.remove();
                    currentTd = event.currentTarget.parentElement.nextElementSibling;
                }
                currentTd.remove();
            }
        }
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
      });
    td6.appendChild(span);
    td6.appendChild(checkbox);
    tr1.appendChild(td6);

    var td7 = document.createElement('td');
    td7.style.minWidth = "80px";
    td7.classList = "symmetry";
    var span1 = document.createElement('span');
    span1.innerText = "symmetry";
    var checkbox1 = document.createElement('input');
    checkbox1.type = "checkbox";
    td7.appendChild(span1);
    td7.appendChild(checkbox1);
    tr1.appendChild(td7);

    var td8 = document.createElement('td');
    td8.style.minWidth = "90px";
    td8.classList = "antisymmetry";
    var span2 = document.createElement('span');
    span2.innerText = "antisymmetry";
    var checkbox2 = document.createElement('input');
    checkbox2.type = "checkbox";
    td8.appendChild(span2);
    td8.appendChild(checkbox2);
    tr1.appendChild(td8);

    var td9 = document.createElement('td');
    td9.style.minWidth = "80px";
    td9.classList = "reflexivity";
    var span3 = document.createElement('span');
    span3.innerText = "reflexivity";
    var checkbox3 = document.createElement('input');
    checkbox3.type = "checkbox";
    td9.appendChild(span3);
    td9.appendChild(checkbox3);
    tr1.appendChild(td9);

    var td10 = document.createElement('td');
    td10.style.minWidth = "100px";
    td10.classList = "antireflexivity";
    var span4 = document.createElement('span');
    span4.innerText = "anti - reflexivity";
    var checkbox4 = document.createElement('input');
    checkbox4.type = "checkbox";
    td10.appendChild(span4);
    td10.appendChild(checkbox4);
    tr1.appendChild(td10);

    var td11 = document.createElement('td');
    td11.style.minWidth = "80px";
    td11.classList = "transitivity";
    var span5 = document.createElement('span');
    span5.innerText = "transitivity";
    var checkbox5 = document.createElement('input');
    checkbox5.type = "checkbox";
    td11.appendChild(span5);
    td11.appendChild(checkbox5);
    tr1.appendChild(td11);

    var td12 = document.createElement('td');
    td12.style.minWidth = "80px";
    td12.classList = "antitransivity";
    var span6 = document.createElement('span');
    span6.innerText = "antitransivity";
    var checkbox6 = document.createElement('input');
    checkbox6.type = "checkbox";
    td12.appendChild(span6);
    td12.appendChild(checkbox6);
    tr1.appendChild(td12);

    return tr1;
}

function checkAllInputsRelationship(table) {
    errors = "";
    for (var i = 0; i < table.rows.length; i++) {
        let checkValue = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        let checkValueExtend = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("input").item(0).value;
        if(checkValue == "") {
            errors += "В строке №" + (i+1) + " отсутствует название; ";
        } else if(!checkValidID(checkValue)) {
            errors += "В строке №" + (i+1) + " название некорректно; ";
        }
        if(checkValueExtend != "" && !checkValidID(checkValueExtend)) {
            errors += "В строке №" + (i+1) + " название наследуемого отношения некорректно; ";
        }

        let lastIndex = 2;
        let currentSelect = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("select").item(0);
        let hasntClass = false;
        while(currentSelect != null) {
            if(typeof (currentSelect.options[currentSelect.options.selectedIndex]) == "undefined" && !hasntClass) {
                errors += "В строке №" + (i+1) + " отсутствуют классы; ";
                hasntClass = true;
            }
            lastIndex++;
            currentSelect = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("select").item(0);
        }
        lastIndex++;
        currentSelect = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("select").item(0);
        if(currentSelect.options[currentSelect.options.selectedIndex].value == "Linear") {
            lastIndex++;
            let currentInputName = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("input").item(0);
            while(currentInputName != null) {
                if(currentInputName.value == "") {
                    errors += "В строке №" + (i+1) + " отсутствуют имена отношений; ";
                    break;
                } else if(!checkValidID(currentInputName.value)) {
                    errors += "В строке №" + (i+1) + " имя отношения некорректно; ";
                    break;
                }
                lastIndex++;
                currentInputName = table.rows.item(i).getElementsByTagName("td")
                    .item(lastIndex).getElementsByTagName("input").item(0);
            }
        }
    }
    if(errors != "") {
        throw new Error(errors);
    }
}

function generateStrValueForRelationships(table) {
    strValue = '<b><font color="#000000">Relationships between objects</font></b>';
    let listNames = [];
    let binFlags = [];

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
        let namesRels = [];
        if(scale == "Linear") {
            lastIndex++;
            let currentInputName = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex).getElementsByTagName("input").item(0);
            while(currentInputName != null) {
                namesRels.push(currentInputName.value);
                lastIndex++;
                currentInputName = table.rows.item(i).getElementsByTagName("td")
                    .item(lastIndex).getElementsByTagName("input").item(0);
            }
        }
        listNames.push(namesRels.join(";"))
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
        binFlags.push(getMarkedFlags(table.rows.item(i)));

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

    return [strValue, listNames, binFlags];
}

function checkExistRelationshipsDictionary(graph) {
    var cells = graph.getModel().cells;
    Object.keys(cells).forEach(function (key) {
        var cellValue = cells[key].value;
        if (cellValue && typeof cellValue == "object" && cellValue.getAttribute('label').startsWith('<b><font color="#000000">Relationships between objects</font></b>')) {
            throw new Error("Relationships dictionary already exists");
        }
    });
}

function checkFlags(row, scale) {
    let tdSym = row.getElementsByClassName("symmetry")[0];
    let tdAntiSym = row.getElementsByClassName("antisymmetry")[0];
    let tdRelf = row.getElementsByClassName("reflexivity")[0];
    let tdAntiRelf = row.getElementsByClassName("antireflexivity")[0];
    let tdTrans = row.getElementsByClassName("transitivity")[0];
    let tdAntiTrans = row.getElementsByClassName("antitransivity")[0];
    if(scale == "Linear") {
        tdSym.getElementsByTagName("input").item(0).checked = false;
        tdSym.getElementsByTagName("input").item(0).disabled = true;
        tdAntiSym.getElementsByTagName("input").item(0).checked = true;
        tdAntiSym.getElementsByTagName("input").item(0).disabled = true;
        tdRelf.getElementsByTagName("input").item(0).checked = true;
        tdRelf.getElementsByTagName("input").item(0).disabled = true;
        tdAntiRelf.getElementsByTagName("input").item(0).checked = false;
        tdAntiRelf.getElementsByTagName("input").item(0).disabled = true;
        tdTrans.getElementsByTagName("input").item(0).checked = false;
        tdTrans.getElementsByTagName("input").item(0).disabled = true;
        tdAntiTrans.getElementsByTagName("input").item(0).checked = false;
        tdAntiTrans.getElementsByTagName("input").item(0).disabled = true;
    } else if(scale == "Partially linear") {
        tdSym.getElementsByTagName("input").item(0).checked = false;
        tdSym.getElementsByTagName("input").item(0).disabled = true;
        tdAntiSym.getElementsByTagName("input").item(0).checked = true;
        tdAntiSym.getElementsByTagName("input").item(0).disabled = true;
        tdRelf.getElementsByTagName("input").item(0).checked = true;
        tdRelf.getElementsByTagName("input").item(0).disabled = true;
        tdAntiRelf.getElementsByTagName("input").item(0).checked = false;
        tdAntiRelf.getElementsByTagName("input").item(0).disabled = true;
        tdTrans.getElementsByTagName("input").item(0).checked = true;
        tdTrans.getElementsByTagName("input").item(0).disabled = true;
        tdAntiTrans.getElementsByTagName("input").item(0).checked = false;
        tdAntiTrans.getElementsByTagName("input").item(0).disabled = true;
    } else if(scale == "None") {
        tdSym.getElementsByTagName("input").item(0).checked = false;
        tdSym.getElementsByTagName("input").item(0).disabled = false;
        tdAntiSym.getElementsByTagName("input").item(0).checked = false;
        tdAntiSym.getElementsByTagName("input").item(0).disabled = false;
        tdRelf.getElementsByTagName("input").item(0).checked = false;
        tdRelf.getElementsByTagName("input").item(0).disabled = false;
        tdAntiRelf.getElementsByTagName("input").item(0).checked = false;
        tdAntiRelf.getElementsByTagName("input").item(0).disabled = false;
        tdTrans.getElementsByTagName("input").item(0).checked = false;
        tdTrans.getElementsByTagName("input").item(0).disabled = false;
        tdAntiTrans.getElementsByTagName("input").item(0).checked = false;
        tdAntiTrans.getElementsByTagName("input").item(0).disabled = false;
    }
}

function getMarkedFlags(row) {
    let sym = row.getElementsByClassName("symmetry")[0].getElementsByTagName("input").item(0).checked;
    let antiSym = row.getElementsByClassName("antisymmetry")[0].getElementsByTagName("input").item(0).checked;;
    let relf = row.getElementsByClassName("reflexivity")[0].getElementsByTagName("input").item(0).checked;;
    let AntiRelf = row.getElementsByClassName("antireflexivity")[0].getElementsByTagName("input").item(0).checked;;
    let trans = row.getElementsByClassName("transitivity")[0].getElementsByTagName("input").item(0).checked;;
    let antiTrans = row.getElementsByClassName("antitransivity")[0].getElementsByTagName("input").item(0).checked;;
    return String(Number(sym)) + String(Number(antiSym)) + String(Number(relf)) + String(Number(AntiRelf)) 
        + String(Number(trans)) + String(Number(antiTrans));
}
