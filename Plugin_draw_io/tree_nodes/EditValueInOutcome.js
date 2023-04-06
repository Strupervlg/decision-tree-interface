// Окно редактирования значений в ветке
var EditValueInOutcomeWindow = function (cell, editorUi, x, y, w, h) {

    var graph = editorUi.editor.graph;

    // Верстка окна
    var div = document.createElement('div');
    var divText = document.createElement('div');
    var labelText = document.createElement('label');
    labelText.innerHTML = "Human-readable text";
    var text = document.createElement('input'); //TODO: мб добавить лейбл обозначующий для чего этот инпут
    text.type = "text";
    text.style.width = '100%';
    text.placeholder = "Human-readable text";
    labelText.appendChild(text);
    divText.appendChild(labelText);
    // if(typeof cell.value == "object") {
    //     text.value = cell.value.getAttribute("label");
    // } else {
    //     text.value = cell.value;
    // }

    //TODO: Добавить поле с значением: значения определяются из узла из которого исходит стрелка
    let outNode = cell.source;
    let typeNode = getTypeFromCode(outNode.value.getAttribute('expression'), editorUi);
    if(typeNode == "int") { //Нужно знать какое свойство
        var labelType = document.createElement('label');
        labelType.innerHTML = "value";
        var numberInt = document.createElement('input'); //TODO: мб добавить лейбл обозначующий для чего этот инпут
        numberInt.id = "value_input";
        numberInt.type = "number";
        numberInt.style.width = '100%';
        // numberInt.min = ""; Добавить из словаря
        // numberInt.max = "";
        labelType.appendChild(numberInt);
        divText.appendChild(labelType);
    } else if(typeNode == "bool") {
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
    } else if(typeNode == "class") {
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
    } else if(typeNode == "double") { //Нужно знать какое свойство
        var labelType = document.createElement('label');
        labelType.innerHTML = "value";
        var numberInt = document.createElement('input');
        numberInt.id = "value_input";
        numberInt.type = "number";
        numberInt.step = "0.01";
        // numberInt.min = ""; Добавить из словаря
        // numberInt.max = "";
        numberInt.style.width = '100%';
        labelType.appendChild(numberInt);
        divText.appendChild(labelType);
    } else if(typeNode == "string") {
        var labelType = document.createElement('label');
        labelType.innerHTML = "value";
        var text = document.createElement('input');
        text.id = "value_input";
        text.type = "text";
        text.style.width = '100%';
        text.placeholder = "value string";
        labelType.appendChild(text);
        divText.appendChild(labelType);
    } else if(typeNode == "enum") { //Нужно знать какой енам нужен
        //значения enum
    } else if(typeNode == "comparison") {
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
    }

    // Добавить поле с типом (но наверно только для стрелок которые исходят из определенных узлов) (у логических узлов и циклов (и мб еще где-то) надо выбрать что ветка является резалтом тип)

    // Где-то добавить выбор, что стрелка является undertermined если она исходит их предрешающего узла


    //TODO: делать удаление всего ненужного, что находятся в стрелке (ВОЗМОЖНО ЭТО НЕ НУЖНО)

    // Кнопка сохранения значений в ветке
    var btnSaveValueInOutcome = mxUtils.button('Save', function () {
        var textInOutcome = text.value;
        //TODO: Проверка на поля значений (Если возвращается объект или assign то value может быть пустым)
        graph.getModel().beginUpdate();
        graph.setAttributeForCell(cell, 'label', textInOutcome);
        // graph.setAttributeForCell(cell, 'label', textInOutcome);

        // graph.setAttributeForCell(cell, 'label', textInOutcome);
        // graph.setAttributeForCell(cell, 'label', textInOutcome);
        if(!cell.style.includes("editable=0;")) {
            cell.style += "editable=0;";
        }

        // textElement.value = "asd";
        // textElement.vertex = !0;
        // textElement.setParent(cell);
        // if(typeof cell.value == "object") {
        //     cell.value.setAttribute("label", textInNode);
        // } else {
        //     cell.setValue(textInNode);
        // }
        graph.getModel().endUpdate();
        graph.refresh(); // update the graph
        win.destroy();
    });

    // Кнопка генерации человекочитаемого текста
    var btnGenerateTextInOutcome = mxUtils.button('Generate', function () {
        let vin = document.getElementById("value_input");
        if(vin.tagName == "SELECT") {
            alert(123)
        } else if(vin.tagName == "INPUT") {
            var humanStr = getTextFromValueInOutcome(vin.value);
            alert(humanStr);
        }
        // alert(vin.tagName);
        // let code = "";
        // if(typeof cell.value == "object") {
        //     code = cell.value.getAttribute("expression");
        // }
        // let textInNode = getTextFromCode(code, editorUi)
        // if(textInNode != "") {
        //     text.value = textInNode;
        // }
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
};
