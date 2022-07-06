// Окно коструктора узлов действия
var ConditionNodeConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    var nestedDiv = document.createElement('div');
    nestedDiv.id = "blocklyDiv";
    nestedDiv.style.width = '890px';
    nestedDiv.style.height = '500px';

    // Кнопка создания узла
    var btnGenerateStrValueForNode = mxUtils.button('Generate', function () {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 60), "ellipse;whiteSpace=wrap;html=1;rounded=0;");
            
            newElement.value = code;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    div.appendChild(nestedDiv);
    div.appendChild(btnGenerateStrValueForNode);

    // Настройки окна
    this.window = new mxWindow('Condition node constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
    var workspace = Blockly.inject('blocklyDiv', { toolbox: conditionToolbox });
};