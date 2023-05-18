// Окно коструктора узлов условий
var BranchResultNodeConstructorWindow = function (editorUi, result, x, y, w, h) {

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
    text = styleTextAreaExp(text);
    text.style.height = "85%";

    // Кнопка создания узла
    var btnCreateNodeInText = mxUtils.button(getTextByLocale("Create"), function () {

        var expression = divText.getElementsByTagName("textarea").item(0).value;
        var pattern = patternVarInText.value;
        if(expression) {
            //TODO: Возможно сделать обработку ошибок и выводить свои ошибки
            parser.parse(expression)
        }
        
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement;
            if(result) {
                newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 66, 30), "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;editable=0;");
            } else {
                newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 66, 30), "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;editable=0;");
            }
            
            //TODO: Возможно сделать подсветку в самом узле 

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'expression', expression);
            theGraph.setAttributeForCell(newElement, 'pattern', pattern);
        }
        win.destroy();
    });

    var workspace;

    // Кнопка переключение на Blockly
    var btnSwitchToBlockly = mxUtils.button(getTextByLocale("SwitchBlockly"), function () {
        var expression = divText.getElementsByTagName("textarea").item(0).value;
        if(expression) {
            parser.parse(expression)
        }
        patternVarInBlockly.value = patternVarInText.value;
        divText.style.display = "none";
        divBlockly.style.display = "block";
        nestedDiv.innerHTML = "";
        workspace = Blockly.inject('branchResultCreateBlocklyDiv', { toolbox: toolbox });
        workspace.clear();
        if(expression) {
            parser.parse(expression)
            toBlock(root, workspace);
        }
    });

    var patternVarInText = document.createElement('input');
    patternVarInText.type = "text";
    patternVarInText = styleInput(patternVarInText);
    patternVarInText.style.height = '5%';
    patternVarInText.placeholder = "Pattern";

    divText.appendChild(text);
    var btnTextDiv = document.createElement('div');
    btnTextDiv = styleDivBtn(btnTextDiv);
    btnTextDiv.style.height = "10%";
    btnCreateNodeInText = styleBtn(btnCreateNodeInText);
    btnSwitchToBlockly = styleBtn(btnSwitchToBlockly);
    btnTextDiv.appendChild(btnCreateNodeInText);
    btnTextDiv.appendChild(btnSwitchToBlockly);
    divText.appendChild(patternVarInText);
    divText.appendChild(btnTextDiv);
    div.appendChild(divText);


    //Экран с blockly
    var nestedDiv = document.createElement('div');
    nestedDiv.id = "branchResultCreateBlocklyDiv";
    nestedDiv = styleBlocklyAreaExp(nestedDiv, w, h);
    nestedDiv.style.height = h*0.83+'px';

    // Кнопка создания узла
    var btnCreateNodeInBlockly = mxUtils.button(getTextByLocale("Create"), function () {
        var code = generateCode(workspace);
        var pattern = patternVarInBlockly.value;
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement;
            if(result) {
                newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 66, 30), "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;editable=0;");
            } else {
                newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 66, 30), "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;editable=0;");
            }
            

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'expression', code);
            theGraph.setAttributeForCell(newElement, 'pattern', pattern);
        }
        win.destroy();
    });

    //кнопка переключения на текстовый вариант
    var btnSwitchToText = mxUtils.button(getTextByLocale("SwitchText"), function () {
        var code = generateCode(workspace);
        patternVarInText.value = patternVarInBlockly.value;
        divBlockly.style.display = "none";
        divText.style.display = "block";
        divText.getElementsByTagName("textarea").item(0).value = code;
    });

    var patternVarInBlockly = document.createElement('input');
    patternVarInBlockly.type = "text";
    patternVarInBlockly = styleInput(patternVarInBlockly);
    patternVarInBlockly.style.height = '5%';
    patternVarInBlockly.placeholder = "Pattern";

    divBlockly.appendChild(nestedDiv);
    var btnBlockDiv = document.createElement('div');
    btnBlockDiv = styleDivBtn(btnBlockDiv);
    btnBlockDiv.style.height = "8%";
    btnCreateNodeInBlockly = styleBtn(btnCreateNodeInBlockly);
    btnSwitchToText = styleBtn(btnSwitchToText);
    btnBlockDiv.appendChild(btnCreateNodeInBlockly);
    btnBlockDiv.appendChild(btnSwitchToText);
    divBlockly.appendChild(patternVarInBlockly);
    divBlockly.appendChild(btnBlockDiv);
    div.appendChild(divBlockly);


    // Настройки окна
    var win = new mxWindow(getTextByLocale("TitleBranchResultNodeConstructorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.contentWrapper.style.height = "100%";
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
