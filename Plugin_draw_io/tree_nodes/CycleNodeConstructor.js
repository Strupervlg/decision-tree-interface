// Окно коструктора узлов действия
var CycleNodeConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    var divText = document.createElement('div');
    var divBlockly = document.createElement('div');

    divBlockly.style.display = "none";

    var operators = [ "And", "Or" ];

    //Экран с текстом
    var text = document.createElement('textarea');
    text.style.width = "100%";
    text.style.height = "480px";

    // Кнопка создания узла
    var btnCreateNodeInText = mxUtils.button('Create', function () {

        var expression = divText.getElementsByTagName("textarea").item(0).value;
        if(expression) {
            //TODO: Возможно сделать обработку ошибок и выводить свои ошибки
            parser.parse(expression)
        }

        var selectedOperatorInText = selectOperatorInText.options[selectOperatorInText.options.selectedIndex].value;

        
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 80), "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;align=center;");
            
            //TODO: Возможно сделать подсветку в самом узле 
            newElement.value = expression + "<br>" + selectedOperatorInText + "<br>" + nameVarInText.value;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            var typeInText = selectClassInText.options[selectClassInText.options.selectedIndex].value;
            theGraph.setAttributeForCell(newElement, 'typeVar', typeInText);
        }
    });

    var workspace;

    // Кнопка переключение на Blockly
    var btnSwitchToBlockly = mxUtils.button('Switch to blockly', function () {
        var expression = divText.getElementsByTagName("textarea").item(0).value;
        divText.style.display = "none";
        divBlockly.style.display = "block";
        nestedDiv.innerHTML = "";
        workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
        workspace.clear();
        if(expression) {
            parser.parse(expression)
            toBlock(root, workspace);
        }
        nameVarInBlockly.value = nameVarInText.value;
        selectOperatorInBlockly.options.selectedIndex = selectOperatorInText.options.selectedIndex;
        selectClassInBlockly.options.selectedIndex = selectClassInText.options.selectedIndex;
    });

    var nameVarInText = document.createElement('input');
    nameVarInText.type = "text";
    nameVarInText.style.width = '100%';
    nameVarInText.placeholder = "New variable";

    var jsonClasses = getClasses(editorUi);

    var selectClassInText = document.createElement('select');
    selectClassInText.style.width = '100%';
    jsonClasses.forEach(classItem => {
        var newOption = new Option(classItem.name, classItem.name);
        selectClassInText.options[selectClassInText.options.length] = newOption;
    });

    var selectOperatorInText = document.createElement('select');
    selectOperatorInText.style.width = '30%';
    selectOperatorInText.style.display = 'block';
    operators.forEach(item => {
        var newOption = new Option(item, item.toUpperCase());
        selectOperatorInText.options[selectOperatorInText.options.length] = newOption;
    });

    divText.appendChild(text);
    divText.appendChild(nameVarInText);
    divText.appendChild(selectClassInText);
    divText.appendChild(selectOperatorInText);
    divText.appendChild(btnCreateNodeInText);
    divText.appendChild(btnSwitchToBlockly);
    div.appendChild(divText);


    //Экран с blockly
    var nestedDiv = document.createElement('div');
    nestedDiv.id = "blocklyDiv";
    nestedDiv.style.width = '890px';
    nestedDiv.style.height = '500px';

    // Кнопка создания узла
    var btnCreateNodeInBlockly = mxUtils.button('Create', function () {
        var code = Blockly.JavaScript.workspaceToCode(workspace);

        var selectedOperatorInBlockly = selectOperatorInBlockly.options[selectOperatorInBlockly.options.selectedIndex].value;
        
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 80), "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;align=center;");
            
            newElement.value = code + "\n" + selectedOperatorInBlockly + "\n" + nameVarInBlockly.value;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            var typeInBlockly = selectClassInBlockly.options[selectClassInBlockly.options.selectedIndex].value;
            theGraph.setAttributeForCell(newElement, 'typeVar', typeInBlockly);
        }
    });

    //кнопка переключения на текстовый вариант
    var btnSwitchToText = mxUtils.button('Switch to text', function () {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        divBlockly.style.display = "none";
        divText.style.display = "block";
        divText.getElementsByTagName("textarea").item(0).value = code;
        nameVarInText.value = nameVarInBlockly.value;
        selectOperatorInText.options.selectedIndex = selectOperatorInBlockly.options.selectedIndex;
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

    var selectOperatorInBlockly = document.createElement('select');
    selectOperatorInBlockly.style.width = '30%';
    selectOperatorInBlockly.style.display = 'block';
    operators.forEach(item => {
        var newOption = new Option(item, item.toUpperCase());
        selectOperatorInBlockly.options[selectOperatorInBlockly.options.length] = newOption;
    });

    divBlockly.appendChild(nestedDiv);
    divBlockly.appendChild(nameVarInBlockly);
    divBlockly.appendChild(selectClassInBlockly);
    divBlockly.appendChild(selectOperatorInBlockly);
    divBlockly.appendChild(btnCreateNodeInBlockly);
    divBlockly.appendChild(btnSwitchToText);
    div.appendChild(divBlockly);


    // Настройки окна
    this.window = new mxWindow('Cycle node constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
