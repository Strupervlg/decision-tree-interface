// Окно коструктора узлов условий
var SwitchCaseNodeConstructorWindow = function (editorUi, x, y, w, h) {

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
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 80, 80), "rhombus;whiteSpace=wrap;html=1;");
            
            //TODO: Возможно сделать подсветку в самом узле 
            newElement.value = expression;

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
    });

    divText.appendChild(text);
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
        var code = generateCode(workspace);
        
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 80, 80), "rhombus;whiteSpace=wrap;html=1;");
            
            newElement.value = code;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    //кнопка переключения на текстовый вариант
    var btnSwitchToText = mxUtils.button('Switch to text', function () {
        var code = generateCode(workspace);
        divBlockly.style.display = "none";
        divText.style.display = "block";
        divText.getElementsByTagName("textarea").item(0).value = code;
    });

    divBlockly.appendChild(nestedDiv);
    divBlockly.appendChild(btnCreateNodeInBlockly);
    divBlockly.appendChild(btnSwitchToText);
    div.appendChild(divBlockly);


    // Настройки окна
    this.window = new mxWindow('Switch case node constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
