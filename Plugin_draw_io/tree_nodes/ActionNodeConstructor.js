// Окно коструктора узлов действия
var ActionNodeConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    var divText = document.createElement('div');
    var divBlockly = document.createElement('div');

    divBlockly.style.display = "none";


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
        
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 60), "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;");
            
            //TODO: Возможно сделать подсветку в самом узле 
            newElement.value = expression + "\n" + nameVarInText.value;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
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
    });

    var nameVarInText = document.createElement('input');
    nameVarInText.type = "text";
    nameVarInText.style.width = '100%';
    nameVarInText.placeholder = "New variable";

    divText.appendChild(text);
    divText.appendChild(nameVarInText);
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
        
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 60), "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;");
            
            newElement.value = code + "\n" + nameVarInBlockly.value;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    //кнопка переключения на текстовый вариант
    var btnSwitchToText = mxUtils.button('Switch to text', function () {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        divBlockly.style.display = "none";
        divText.style.display = "block";
        divText.getElementsByTagName("textarea").item(0).value = code;
        nameVarInText.value = nameVarInBlockly.value;
    });

    var nameVarInBlockly = document.createElement('input');
    nameVarInBlockly.type = "text";
    nameVarInBlockly.style.width = '100%';
    nameVarInBlockly.placeholder = "New variable";

    divBlockly.appendChild(nestedDiv);
    divBlockly.appendChild(nameVarInBlockly);
    divBlockly.appendChild(btnCreateNodeInBlockly);
    divBlockly.appendChild(btnSwitchToText);
    div.appendChild(divBlockly);


    // Настройки окна
    this.window = new mxWindow('Action node constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
