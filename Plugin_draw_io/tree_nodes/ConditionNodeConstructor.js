// Окно коструктора узлов условий
var ConditionNodeConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    div.style.height = "100%";
    var divText = document.createElement('div');
    divText.style.height = "100%";
    var divBlockly = document.createElement('div');
    divBlockly.style.height = "100%";

    divBlockly.style.display = "none";


    //Экран с текстом
    var text = document.createElement('textarea');
    text.style.fontSize = "30px";
    text.style.width = "100%";
    text.style.resize = "none";
    text.style.height = "90%";

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
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 60), "ellipse;whiteSpace=wrap;html=1;rounded=0;editable=0;");
            
            //TODO: Возможно сделать подсветку в самом узле 

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'expression', expression);
        }
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
        workspace = Blockly.inject('conditionCreateBlocklyDiv', { toolbox: toolbox });
        workspace.clear();
        if(expression) {
            parser.parse(expression)
            toBlock(root, workspace);
        }
    });

    divText.appendChild(text);
    var btnTextDiv = document.createElement('div');
    btnTextDiv.style.display = "flex";
    btnTextDiv.style.gap = "5px";
    btnTextDiv.style.height = "10%";
    btnTextDiv.style.alignItems = "center";
    btnTextDiv.style.justifyContent = "center";
    btnCreateNodeInText.style.height = "50%";
    btnCreateNodeInText.style.width = "50px";
    btnSwitchToBlockly.style.height = "50%";
    btnSwitchToBlockly.style.width = "150px";
    btnTextDiv.appendChild(btnCreateNodeInText);
    btnTextDiv.appendChild(btnSwitchToBlockly);
    divText.appendChild(btnTextDiv);
    div.appendChild(divText);


    //Экран с blockly
    var nestedDiv = document.createElement('div');
    nestedDiv.id = "conditionCreateBlocklyDiv";
    nestedDiv.style.width = w+'px';
    nestedDiv.style.height = h*0.90+'px';

    // Кнопка создания узла
    var btnCreateNodeInBlockly = mxUtils.button('Create', function () {
        var code = generateCode(workspace);
        
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 60), "ellipse;whiteSpace=wrap;html=1;rounded=0;editable=0;");
            

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'expression', code);
        }
        win.destroy();
    });

    //кнопка переключения на текстовый вариант
    var btnSwitchToText = mxUtils.button('Switch to text', function () {
        var code = generateCode(workspace);
        divBlockly.style.display = "none";
        divText.style.display = "block";
        divText.getElementsByTagName("textarea").item(0).value = code;
    });

    divBlockly.appendChild(nestedDiv);
    var btnBlockDiv = document.createElement('div');
    btnBlockDiv.style.display = "flex";
    btnBlockDiv.style.gap = "5px";
    btnBlockDiv.style.height = "8%";
    btnBlockDiv.style.alignItems = "center";
    btnBlockDiv.style.justifyContent = "center";
    btnCreateNodeInBlockly.style.height = "50%";
    btnCreateNodeInBlockly.style.width = "50px";
    btnSwitchToText.style.height = "50%";
    btnSwitchToText.style.width = "150px";
    btnBlockDiv.appendChild(btnCreateNodeInBlockly);
    btnBlockDiv.appendChild(btnSwitchToText);
    divBlockly.appendChild(btnBlockDiv);
    div.appendChild(divBlockly);


    // Настройки окна
    var win = new mxWindow('Condition node constructor', div, x, y, w, h, true, true);
    this.window = win;
    this.window.contentWrapper.style.height = "100%";
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
