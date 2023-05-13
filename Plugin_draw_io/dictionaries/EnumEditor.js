// Окно редактирования блока с enum
var EnumEditorWindow = function (cell, editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    div.style.height = "100%";
    var divTable = document.createElement('div');
    var table = document.createElement('table');
    divTable.style.width = '100%';
    divTable.style.height = '80%';
    divTable.style.overflowX = "auto";
    divTable.style.overflowY = "auto";
    var tbody = document.createElement('tbody');
    tbody.style.height = "100%";
    
    fillDataEnum(tbody, cell);
    table.appendChild(tbody);
    divTable.appendChild(table);
    div.appendChild(divTable);

    // Кнопка сохранения блока
    var applyBtn = mxUtils.button(getTextByLocale("Apply"), function () {
        
        checkAllInputsEnum(tbody);

        strValue = generateStrValueForEnums(tbody);
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.geometry.height = (table.rows.length + 1) * 17;
        cell.value = strValue;
        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.destroy();
    });

    // Кнопка добавления полей для нового класса
    var addEnum = mxUtils.button(getTextByLocale("AddEnum"), function () {
        var newRow = addRowEnum();
        var tdDelRow = document.createElement('td');
        var btnDelRow = mxUtils.button(getTextByLocale("Delete"), function (evt) {
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
    var win = new mxWindow(getTextByLocale("TitleEnumEditorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function fillDataEnum(tbody, cell) {
    let cellValue = cell.value;

    cellValue = cellValue.replace('<font color="#000000"><b>Enum</b></font><br>', '');
    var values = cellValue.split('<br>');

    values.forEach((element, index) => {
        var nameEnum = element.slice(element.indexOf('<font color="#ff66b3">')+22, element.indexOf('</font>'));
                
        element = element.slice(element.indexOf('</font>')+7);
        var valuesStr = element.slice(element.indexOf('<font color="#ff6666">')+22, element.indexOf('</font>'));
        var valuesEnum = valuesStr.split(', ');

        element = element.slice(element.indexOf('</font>')+7);
        var Islinear = element.slice(element.indexOf('<font color="#123123">')+22, element.indexOf('</font>'));
        var nameRDF = "";
        if(Islinear == 'true') {
            element = element.slice(element.indexOf('</font>')+7);
            nameRDF = element.slice(element.indexOf('<font color="#fff123">')+22, element.indexOf('</font>'));
        }

        var row = addRowEnum();

        row.getElementsByTagName("td").item(0)
            .getElementsByTagName("input").item(0).value = nameEnum;

        if(index == 0) {
            row.getElementsByTagName("td").item(0)
                .getElementsByTagName("input").item(0).disabled = true;
        }

        let lastIndex = 1;
        valuesEnum.forEach(element => {
            if(lastIndex != 1) {
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
                if(index != 0) {
                    newTd.appendChild(btnDel);
                }
                row.insertBefore(newTd, row.getElementsByTagName("td").item(lastIndex));
            }
            row.getElementsByTagName("td").item(lastIndex)
                .getElementsByTagName("input").item(0).value = element;
            if(index == 0) {
                row.getElementsByTagName("td").item(lastIndex)
                    .getElementsByTagName("input").item(0).disabled = true;
                row.getElementsByTagName("td").item(lastIndex)
                    .getElementsByTagName("input").item(0).style.width = '100%';

            }
            lastIndex++;
        });
        if(index == 0) {
            row.getElementsByTagName("td").item(lastIndex).style.display = "none";
        }
        lastIndex++;

        row.getElementsByTagName("td").item(lastIndex)
            .getElementsByTagName("input").item(0).checked = Islinear == 'true';
        if(index == 0) {
            row.getElementsByTagName("td").item(lastIndex)
                .getElementsByTagName("input").item(0).disabled = true;
        }
        if(Islinear == 'true') {
            var tdNameRDF = document.createElement('td');
            tdNameRDF.style.minWidth = "100px";
            var inputNameRDF = document.createElement('input');
            inputNameRDF.type = "text";
            inputNameRDF.style.width = '90%';
            inputNameRDF.placeholder = "Name in RDF";
            tdNameRDF.appendChild(inputNameRDF);
            row.insertBefore(tdNameRDF, row.getElementsByTagName("td").item(lastIndex).nextElementSibling);

            row.getElementsByTagName("td").item(lastIndex+1)
                .getElementsByTagName("input").item(0).value = nameRDF;
        }

        if(index != 0) {
            var tdDelRow = document.createElement('td');
            var btnDelRow = mxUtils.button(getTextByLocale("Delete"), function (evt) {
                evt.target.parentElement.parentElement.remove();
            });
            tdDelRow.appendChild(btnDelRow);
            row.appendChild(tdDelRow);
        }

        tbody.appendChild(row);
    });    
}
