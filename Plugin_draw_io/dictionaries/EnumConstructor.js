// Окно коструктора блока с enum
var EnumConstructorWindow = function (editorUi, x, y, w, h) {

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
    
    var row = addRowEnum();
    addComparisonResult(row);
    tbody.appendChild(row);

    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button('Apply', function () {
        
        checkAllInputsEnum(tbody);

        var theGraph = editorUi.editor.graph;

        checkExistEnumDictionary(theGraph);

        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17), "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#6666FF;align=center;editable=0;");

            strValue = generateStrValueForEnums(tbody);

            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
        win.destroy();
    });

    // Кнопка добавления полей для нового класса
    var addEnum = mxUtils.button('Add Enum', function () {
        var newRow = addRowEnum();
        var tdDelRow = document.createElement('td');
        var btnDelRow = mxUtils.button('Delete', function (evt) {
            evt.target.parentElement.parentElement.remove();
        });
        tdDelRow.appendChild(btnDelRow);
        newRow.appendChild(tdDelRow);
        tbody.appendChild(newRow);
    });

    // Добавление кнопок в окно
    var btnDiv = document.createElement('div');
    btnDiv.style.display = "flex";
    btnDiv.style.height = "20%";
    btnDiv.style.alignItems = "center";
    btnDiv.appendChild(addEnum);
    btnDiv.appendChild(applyBtn);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow('Enum constructor', div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function addRowEnum() {
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.style.minWidth = "150px";
    var text = document.createElement('input');
    text.type = "text";
    text.style.width = '100%';
    text.placeholder = "Name enum";
    td1.appendChild(text);
    tr1.appendChild(td1);

    var td2 = document.createElement('td');
    td2.style.minWidth = "150px";
    var text2 = document.createElement('input');
    text2.type = "text";
    text2.style.width = '100%';
    text2.placeholder = "Value";
    td2.appendChild(text2);
    tr1.appendChild(td2);

    var tdAdd = document.createElement('td');
    tdAdd.style.minWidth = "50px";
    var btnAdd = mxUtils.button('+', function (evt) {
        let newTd = document.createElement('td');
        newTd.style.minWidth = "200px";
        let newInput = document.createElement('input');
        newInput.type = "text";
        newInput.style.width = '85%';
        newInput.style.float = 'left';
        newInput.placeholder = "Value";
        var btnDel = mxUtils.button('-', function (evt) {
            evt.target.parentElement.remove();
        });
        btnDel.style.float = 'left';
        btnDel.style.width = '10%';
        newTd.appendChild(newInput);
        newTd.appendChild(btnDel);
        evt.target.parentElement.parentElement.insertBefore(newTd, evt.target.parentElement)
        
    });

    tdAdd.appendChild(btnAdd);
    tr1.appendChild(tdAdd);

    var td3 = document.createElement('td');
    td3.style.minWidth = "100px";
    var span = document.createElement('span');
    span.innerText = "is linear";
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            var tdNameRDF = document.createElement('td');
            tdNameRDF.style.minWidth = "100px";
            var inputNameRDF = document.createElement('input');
            inputNameRDF.type = "text";
            inputNameRDF.style.width = '90%';
            inputNameRDF.placeholder = "Name in RDF";
            tdNameRDF.appendChild(inputNameRDF);
            event.currentTarget.parentElement.parentElement.insertBefore(tdNameRDF, event.currentTarget.parentElement.nextElementSibling);
        } else {
            event.currentTarget.parentElement.nextElementSibling.remove();
        }
      })
    
    td3.appendChild(span);
    td3.appendChild(checkbox);
    tr1.appendChild(td3);
    return tr1;
}

function checkAllInputsEnum(table) {
    errors = "";
    for (var i = 0; i < table.rows.length; i++) {
        let checkValue = table.rows.item(i).getElementsByTagName("td")
        .item(0).getElementsByTagName("input").item(0).value;
        if(checkValue == "") {
                errors += "В строке №" + (i+1) + " отсутствует название; ";
        } else if(!checkValidID(checkValue)) {
            errors += "В строке №" + (i+1) + " название некорректно; ";
        }

        let lastIndex = 1;
        let currentInput = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("input").item(0);
        let isErrorValue = false;
        while(currentInput != null) {
            if(currentInput.value == "" && !isErrorValue) {
                errors += "В строке №" + (i+1) + " отсутствует значение; ";
                isErrorValue = true;
            } else if(!checkValidID(currentInput.value) && !isErrorValue) {
                errors += "В строке №" + (i+1) + " значение некорректно; ";
                isErrorValue = true;
            }
            lastIndex++;
            currentInput = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("input").item(0);
        }
        lastIndex++;

        var Islinear = table.rows.item(i).getElementsByTagName("td")
        .item(lastIndex).getElementsByTagName("input").item(0).checked;
        let checkRdfName;
        if(Islinear) {
            checkRdfName = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex+1).getElementsByTagName("input").item(0).value;
        }
        if(Islinear && checkRdfName == "") {
                errors += "В строке №" + (i+1) + " отсутствует название в RDF; ";
        } else if(Islinear && !checkValidID(checkRdfName)) {
            errors += "В строке №" + (i+1) + " название в RDF некорректно; ";
        }
    }
    if(errors != "") {
        throw new Error(errors);
    }
}

function generateStrValueForEnums(table) {
    strValue = '<font color="#000000"><b>Enum</b></font>';

    for (var i = 0; i < table.rows.length; i++) {
        var nameEnum = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        var valuesEnum = [];
        valuesEnum[0] = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("input").item(0).value;
        
        let lastIndex = 2;
        let currentInput = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("input").item(0);
        while(currentInput != null) {
            valuesEnum.push(currentInput.value);
            lastIndex++;
            currentInput = table.rows.item(i).getElementsByTagName("td")
            .item(lastIndex).getElementsByTagName("input").item(0);
        }
        lastIndex++;
        var Islinear = table.rows.item(i).getElementsByTagName("td")
        .item(lastIndex).getElementsByTagName("input").item(0).checked;
        if(Islinear) {
            var nameRDF = table.rows.item(i).getElementsByTagName("td")
                .item(lastIndex+1).getElementsByTagName("input").item(0).value;
        }
        
        strValue += '<br><font color="#ff66b3">' + nameEnum + '</font> values:(<font color="#ff6666">' + valuesEnum[0];
        for(let i = 1; i < valuesEnum.length; i++) {
            strValue += ', ' + valuesEnum[i];
        }
        strValue += '</font>) isLinear: <font color="#123123">'
        strValue +=  Islinear + '</font>'
        if(Islinear) {
            strValue += ' nameRDF: <font color="#fff123">' + nameRDF + '</font>'
        }
    }

    return strValue;
}

function checkExistEnumDictionary(graph) {
    var cells = graph.getModel().cells;
    Object.keys(cells).forEach(function (key) {
        var cellValue = cells[key].value;
        if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Enum</b></font>')) {
            throw new Error("Enum dictionary already exists");
        }
    });
}

function addComparisonResult(row) {
    var nameEnum = "comparisonResult";
    var valuesEnum = ["greater", "less", "equal", "undetermined"];
    var Islinear = false;
    var nameRDF = "";

    row.getElementsByTagName("td").item(0)
        .getElementsByTagName("input").item(0).value = nameEnum;
    row.getElementsByTagName("td").item(0)
        .getElementsByTagName("input").item(0).disabled = true;

    let lastIndex = 1;
    valuesEnum.forEach(element => {
        if(lastIndex != 1) {
            let newTd = document.createElement('td');
            newTd.style.minWidth = "200px";
            let newInput = document.createElement('input');
            newInput.type = "text";
            newInput.style.width = '100%';
            newInput.style.float = 'left';
            newInput.placeholder = "Value";
            newTd.appendChild(newInput);
            row.insertBefore(newTd, row.getElementsByTagName("td").item(lastIndex));
        }
        row.getElementsByTagName("td").item(lastIndex)
            .getElementsByTagName("input").item(0).value = element;
        row.getElementsByTagName("td").item(lastIndex)
            .getElementsByTagName("input").item(0).disabled = true;
        lastIndex++;
    });
    row.getElementsByTagName("td").item(lastIndex).style.display = "none";

    row.getElementsByTagName("td").item(lastIndex+1)
        .getElementsByTagName("input").item(0).checked = Islinear;
    row.getElementsByTagName("td").item(lastIndex+1)
        .getElementsByTagName("input").item(0).disabled = true;
}
