// Окно редактирования узлов условий
var BranchResultNodeEditorWindow = function (cell, editorUi, x, y, w, h) {

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
        
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("expression", expression);

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
        workspace = Blockly.inject('branchResultUpdateBlocklyDiv', { toolbox: toolbox });
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
    nestedDiv.id = "branchResultUpdateBlocklyDiv";
    nestedDiv.style.width = '890px';
    nestedDiv.style.height = '500px';

    // Кнопка создания узла
    var btnCreateNodeInBlockly = mxUtils.button('Apply', function () {
        var code = generateCode(workspace);
        
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("expression", code);

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
    });

    divBlockly.appendChild(nestedDiv);
    divBlockly.appendChild(btnCreateNodeInBlockly);
    divBlockly.appendChild(btnSwitchToText);
    div.appendChild(divBlockly);


    // Настройки окна
    var win = new mxWindow('Branch result node editor', div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
