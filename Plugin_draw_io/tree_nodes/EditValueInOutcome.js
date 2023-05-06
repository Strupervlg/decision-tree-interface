// Окно редактирования значений в ветке
var EditValueInOutcomeWindow = function (cell, editorUi, x, y, w, h) {

    var graph = editorUi.editor.graph;

    // Верстка окна
    var div = document.createElement('div');
    var divText = document.createElement('div');
    var labelText = document.createElement('label');
    labelText.innerHTML = "Human-readable text";
    var text = document.createElement('input');
    text.type = "text";
    text.style.width = '100%';
    text.placeholder = "Human-readable text";
    labelText.appendChild(text);
    divText.appendChild(labelText);

    let outNode = cell.source;
    if(outNode == null) {
        throw new Error("Error: Source node is missing!");
    }
    let typeValue = "";
    if(typeof outNode.value == "object" && outNode.value.getAttribute('expression')) {
        let typeNode = getTypeFromCode(outNode.value.getAttribute('expression'), editorUi);
        if(typeNode.type == "int") {
            typeValue = "int";
            var labelType = document.createElement('label');
            labelType.innerHTML = "value";
            var numberInt = document.createElement('input');
            numberInt.id = "value_input";
            numberInt.type = "number";
            numberInt.style.width = '100%';
            let ranges = typeNode.range.split('-')
            numberInt.min = ranges[0];
            numberInt.max = ranges[1];
            labelType.appendChild(numberInt);
            divText.appendChild(labelType);
        } else if(typeNode.type == "bool" && outNode.value.getAttribute('operator') != "AND" && outNode.value.getAttribute('operator') != "OR") {
            typeValue = "bool";
            let labelValue = document.createElement('label');
            labelValue.innerHTML = "value";
            let selectValue = document.createElement('select');
            selectValue.id = "value_input";
            selectValue.style.width = '100%';
            let optionTrue = new Option("True", "True");
            selectValue.options[selectValue.options.length] = optionTrue;
            let optionFalse = new Option("False", "False");
            selectValue.options[selectValue.options.length] = optionFalse;
            labelValue.appendChild(selectValue);
            divText.appendChild(labelValue);
        } else if(typeNode.type == "class") {
            typeValue = "class";
            let labelValue = document.createElement('label');
            labelValue.innerHTML = "value";
            let selectValue = document.createElement('select');
            selectValue.id = "value_input";
            selectValue.style.width = '100%';
            let jsonClasses = getClasses(editorUi);
            jsonClasses.forEach(classItem => {
                var newOption = new Option(classItem.name, classItem.name);
                selectValue.options[selectValue.options.length] = newOption;
            });
            labelValue.appendChild(selectValue);
            divText.appendChild(labelValue);
        } else if(typeNode.type == "double") {
            typeValue = "double";
            var labelType = document.createElement('label');
            labelType.innerHTML = "value";
            var numberInt = document.createElement('input');
            numberInt.id = "value_input";
            numberInt.type = "number";
            numberInt.step = "0.01";
            let ranges = typeNode.range.split('-')
            numberInt.min = ranges[0];
            numberInt.max = ranges[1];
            numberInt.style.width = '100%';
            labelType.appendChild(numberInt);
            divText.appendChild(labelType);
        } else if(typeNode.type == "string") {
            typeValue = "string";
            var labelType = document.createElement('label');
            labelType.innerHTML = "value";
            var text = document.createElement('input');
            text.id = "value_input";
            text.type = "text";
            text.style.width = '100%';
            text.placeholder = "value string";
            labelType.appendChild(text);
            divText.appendChild(labelType);
        } else if(typeNode.type == "enum") {
            typeValue = "enum";
            let labelValue = document.createElement('label');
            labelValue.innerHTML = "value";
            let selectValue = document.createElement('select');
            selectValue.id = "value_input";
            selectValue.style.width = '100%';
            let enumsList = getEnums(editorUi);
            let findEnum = enumsList.filter(el => el.nameEnum == typeNode.enum);
            findEnum[0].values.forEach(enumValue => {
                var newOption = new Option(enumValue, enumValue);
                selectValue.options[selectValue.options.length] = newOption;
            });
            labelValue.appendChild(selectValue);
            divText.appendChild(labelValue);
        } else if(typeNode.type == "comparison") {
            typeValue = "comparison";
            let labelValue = document.createElement('label');
            labelValue.innerHTML = "value";
            let selectValue = document.createElement('select');
            selectValue.id = "value_input";
            selectValue.style.width = '100%';
            let values = ["less", "equal", "greater"];
            values.forEach(item => {
                var newOption = new Option(item, item);
                selectValue.options[selectValue.options.length] = newOption;
            });
            labelValue.appendChild(selectValue);
            divText.appendChild(labelValue);
        } else if(outNode.style == "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;editable=0;") {
            let labelValue = document.createElement('label');
            labelValue.innerHTML = "value";
            let selectValue = document.createElement('select');
            selectValue.id = "value_input";
            selectValue.style.width = '100%';
            let values = ["Found", "Not found"];
            values.forEach(item => {
                var newOption = new Option(item, item);
                selectValue.options[selectValue.options.length] = newOption;
            });
            labelValue.appendChild(selectValue);
            divText.appendChild(labelValue);
        }
    }

    if(typeof outNode.value == "object" && outNode.value.getAttribute('type') == "START") {
        let labelType = document.createElement('label');
        labelType.innerHTML = "type";
        let selectTypes = document.createElement('select');
        selectTypes.id = "type_input";
        selectTypes.style.width = '100%';
        let types = ["int", "bool", "double", "object", "enum", "comparison"];
        types.forEach(type => {
            var newOption = new Option(type, type);
            selectTypes.options[selectTypes.options.length] = newOption;
        });
        labelType.appendChild(selectTypes);
        divText.appendChild(labelType);
    } else if(typeof outNode.value == "object" && outNode.value.getAttribute('type') == "predetermining") {
        let labelType = document.createElement('label');
        labelType.innerHTML = "type";
        let selectTypes = document.createElement('select');
        selectTypes.id = "type_input";
        selectTypes.style.width = '100%';
        let types = ["predeterminingBranch", "undetermined"];
        types.forEach(type => {
            var newOption = new Option(type, type);
            selectTypes.options[selectTypes.options.length] = newOption;
        });
        labelType.appendChild(selectTypes);
        divText.appendChild(labelType);
    } else if(typeof outNode.value == "object" && (outNode.value.getAttribute('type') == "AND" || outNode.value.getAttribute('type') == "OR")) {
        let labelType = document.createElement('label');
        labelType.innerHTML = "type";
        let selectTypes = document.createElement('select');
        selectTypes.id = "type_input";
        selectTypes.style.width = '100%';
        let types = ["Branch", "True", "False"];
        types.forEach(type => {
            var newOption = new Option(type, type);
            selectTypes.options[selectTypes.options.length] = newOption;
        });
        labelType.appendChild(selectTypes);
        divText.appendChild(labelType);
    } else if(typeof outNode.value == "object" && (outNode.value.getAttribute('operator') == "AND" || outNode.value.getAttribute('operator') == "OR")) {
        let labelType = document.createElement('label');
        labelType.innerHTML = "type";
        let selectTypes = document.createElement('select');
        selectTypes.id = "type_input";
        selectTypes.style.width = '100%';
        let types = ["Body", "True", "False"];
        types.forEach(type => {
            var newOption = new Option(type, type);
            selectTypes.options[selectTypes.options.length] = newOption;
        });
        labelType.appendChild(selectTypes);
        divText.appendChild(labelType);
    }

    // Кнопка сохранения значений в ветке
    var btnSaveValueInOutcome = mxUtils.button('Save', function () {
        checkAllInputsOutcome(divText, cell.source.value);
        var textInOutcome = text.value;
        graph.getModel().beginUpdate();
        graph.setAttributeForCell(cell, 'label', textInOutcome);
        let vin = document.getElementById("value_input");
        let valInOutcome = "";
        if(vin != null && vin.tagName == "SELECT") {
            valInOutcome = vin.options[vin.options.selectedIndex].value;
            graph.setAttributeForCell(cell, 'typeValue', typeValue);
        } else if(vin != null && vin.tagName == "INPUT") {
            valInOutcome = vin.value;
            graph.setAttributeForCell(cell, 'typeValue', typeValue);
        }
        graph.setAttributeForCell(cell, 'value', valInOutcome);

        let typeOutcome = document.getElementById("type_input");
        if(typeOutcome) {
            let typeInOutcome = typeOutcome.options[typeOutcome.options.selectedIndex].value;
            graph.setAttributeForCell(cell, 'type', typeInOutcome);
        }

        if(!cell.style.includes("editable=0;")) {
            cell.style += "editable=0;";
        }
        cell.style = cell.style.replace("strokeColor=#FF0000;", "");

        graph.getModel().endUpdate();
        graph.refresh(); // update the graph
        win.destroy();
    });

    // Кнопка генерации человекочитаемого текста
    var btnGenerateTextInOutcome = mxUtils.button('Generate', function () {
        let vin = document.getElementById("value_input");
        let typeSelect = document.getElementById("type_input");
        var humanStr = "";
        if(vin != null && vin.tagName == "SELECT") {
            var valSelect = vin.options[vin.options.selectedIndex].value;
            humanStr = getTextFromValueInOutcome(valSelect);
        } else if(vin != null && vin.tagName == "INPUT") {
            humanStr = getTextFromValueInOutcome(vin.value);
        } else if(vin == null && typeof cell.source.value == "object" && cell.source.value.getAttribute('type') != "START") {
            humanStr = typeSelect.options[typeSelect.options.selectedIndex].value;
        }
        text.value = humanStr;
    });

    divText.appendChild(btnSaveValueInOutcome);
    divText.appendChild(btnGenerateTextInOutcome);
    div.appendChild(divText);

    // Настройки окна
    var win = new mxWindow('Edit value in outcome', div, x, y, w, h, true, true);
    this.window = win
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);

    if(cell.value != null && typeof cell.value == "object") {
        text.value = cell.value.getAttribute("label");
        let vin = document.getElementById("value_input");
        if(vin != null && vin.tagName == "SELECT") {
            let valInCell = cell.value.getAttribute("value");
            for(let index = 0; index < vin.options.length; ++index) {
                if(vin.options[index].value == valInCell) {
                    vin.options[index].selected = true;
                }
            }
        } else if(vin != null && vin.tagName == "INPUT") {
            vin.value = cell.value.getAttribute("value");
        }
        let type = cell.value.getAttribute("type");
        let typeInput = document.getElementById("type_input");
        if(type && typeInput) {
            for(let index = 0; index < typeInput.options.length; ++index) {
                if(typeInput.options[index].value == type) {
                    typeInput.options[index].selected = true;
                }
            }
        }
    }
};

function checkAllInputsOutcome(div, outNodeValue) {
    errors = "";
    if(div.getElementsByTagName("input").item(0).value == "" && typeof outNodeValue == "object" && outNodeValue.getAttribute('type') != "START") {
        errors += "Отсутствует человеко-читаемый текст \n";
    }
    if(document.getElementById("value_input") != null 
    && document.getElementById("value_input").value == "") {
        errors += "Отсутствует значение для ветки \n";
    }
    if(errors != "") {
        throw new Error(errors);
    }
}
