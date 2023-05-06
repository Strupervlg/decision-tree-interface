// Окно редактирования узлов действия
var ActionNodeEditorWindow = function (cell, editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    var divText = document.createElement('div');
    var divBlockly = document.createElement('div');

    divBlockly.style.display = "none";

    //Экран с текстом
    var text = document.createElement('textarea');
    text.style.width = "100%";
    text.style.height = "480px";
    text.value = cell.value.getAttribute('expression');

    // Кнопка создания узла
    var btnCreateNodeInText = mxUtils.button('Apply', function () {

        var expression = divText.getElementsByTagName("textarea").item(0).value;
        if(expression) {
            //TODO: Возможно сделать обработку ошибок и выводить свои ошибки
            parser.parse(expression)
        }

        var typeInText = selectClassInText.options[selectClassInText.options.selectedIndex].value;
        
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("expression", expression);
        cell.value.setAttribute("typeVar", typeInText);
        cell.value.setAttribute("nameVar", nameVarInText.value);

        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.destroy();
    });

    var workspace;

    // Кнопка переключение на Blockly
    var btnSwitchToBlockly = mxUtils.button('Switch to blockly', function () {
        var expression = divText.getElementsByTagName("textarea").item(0).value;
        if(expression) {
            parser.parse(expression)
        }
        divText.style.display = "none";
        divBlockly.style.display = "block";
        nestedDiv.innerHTML = "";
        workspace = Blockly.inject('actionUpdateBlocklyDiv', { toolbox: toolbox });
        workspace.clear();
        if(expression) {
            parser.parse(expression)
            toBlock(root, workspace);
        }
        nameVarInBlockly.value = nameVarInText.value;
        selectClassInBlockly.options.selectedIndex = selectClassInText.options.selectedIndex;
    });

    var nameVarInText = document.createElement('input');
    nameVarInText.type = "text";
    nameVarInText.style.width = '100%';
    nameVarInText.placeholder = "New variable";
    nameVarInText.value = cell.value.getAttribute('nameVar');

    var jsonClasses = getClasses(editorUi);

    var selectClassInText = document.createElement('select');
    selectClassInText.style.width = '100%';
    jsonClasses.forEach(classItem => {
        var newOption = new Option(classItem.name, classItem.name);
        selectClassInText.options[selectClassInText.options.length] = newOption;
    });
    let type = cell.value.getAttribute('typeVar');
    for(let index = 0; index < selectClassInText.options.length; ++index) {
        if(selectClassInText.options[index].value == type) {
            selectClassInText.options[index].selected = true;
        }
    }

    divText.appendChild(text);
    divText.appendChild(nameVarInText);
    divText.appendChild(selectClassInText);
    divText.appendChild(btnCreateNodeInText);
    divText.appendChild(btnSwitchToBlockly);
    div.appendChild(divText);


    //Экран с blockly
    var nestedDiv = document.createElement('div');
    nestedDiv.id = "actionUpdateBlocklyDiv";
    nestedDiv.style.width = '890px';
    nestedDiv.style.height = '500px';

    // Кнопка создания узла
    var btnCreateNodeInBlockly = mxUtils.button('Apply', function () {
        var code = generateCode(workspace);
        var typeInBlockly = selectClassInBlockly.options[selectClassInBlockly.options.selectedIndex].value;

        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("expression", code);
        cell.value.setAttribute("typeVar", typeInBlockly);
        cell.value.setAttribute("nameVar", nameVarInBlockly.value);

        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.destroy();
    });

    //кнопка переключения на текстовый вариант
    var btnSwitchToText = mxUtils.button('Switch to text', function () {
        var code = generateCode(workspace);
        divBlockly.style.display = "none";
        divText.style.display = "block";
        divText.getElementsByTagName("textarea").item(0).value = code;
        nameVarInText.value = nameVarInBlockly.value;
        selectClassInText.options.selectedIndex = selectClassInBlockly.options.selectedIndex;
    });

    var nameVarInBlockly = document.createElement('input');
    nameVarInBlockly.type = "text";
    nameVarInBlockly.style.width = '100%';
    nameVarInBlockly.placeholder = "New variable";

    var selectClassInBlockly = document.createElement('select');
    selectClassInBlockly.style.width = '100%';
    jsonClasses.forEach(classItem => {
        var newOption = new Option(classItem.name, classItem.name);
        selectClassInBlockly.options[selectClassInBlockly.options.length] = newOption;
    });

    divBlockly.appendChild(nestedDiv);
    divBlockly.appendChild(nameVarInBlockly);
    divBlockly.appendChild(selectClassInBlockly);
    divBlockly.appendChild(btnCreateNodeInBlockly);
    divBlockly.appendChild(btnSwitchToText);
    div.appendChild(divBlockly);


    // Настройки окна
    var win = new mxWindow('Action node editor', div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
