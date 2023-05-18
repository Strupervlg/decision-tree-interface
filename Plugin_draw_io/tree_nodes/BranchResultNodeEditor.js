// Окно редактирования узлов условий
var BranchResultNodeEditorWindow = function (cell, editorUi, x, y, w, h) {

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
    text.value = cell.value.getAttribute('expression');

    // Кнопка создания узла
    var btnCreateNodeInText = mxUtils.button(getTextByLocale("Apply"), function () {

        var expression = divText.getElementsByTagName("textarea").item(0).value;
        var pattern = patternVarInText.value;
        if(expression) {
            //TODO: Возможно сделать обработку ошибок и выводить свои ошибки
            parser.parse(expression)
        }
        
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("expression", expression);
        cell.value.setAttribute("pattern", pattern);

        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
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
        workspace = Blockly.inject('branchResultUpdateBlocklyDiv', { toolbox: toolbox });
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
    if(cell.value.getAttribute('pattern')) {
        patternVarInText.value = cell.value.getAttribute('pattern');
    }
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
    nestedDiv.id = "branchResultUpdateBlocklyDiv";
    nestedDiv = styleBlocklyAreaExp(nestedDiv, w, h)
    nestedDiv.style.height = h*0.83+'px';

    // Кнопка создания узла
    var btnCreateNodeInBlockly = mxUtils.button(getTextByLocale("Apply"), function () {
        var code = generateCode(workspace);
        var pattern = patternVarInBlockly.value;
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("expression", code);
        cell.value.setAttribute("pattern", pattern);

        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
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
    var win = new mxWindow(getTextByLocale("TitleBranchResultNodeEditorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.contentWrapper.style.height = "100%";
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
