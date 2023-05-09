// Окно коструктора узлов действия
var ActionNodeConstructorWindow = function (editorUi, x, y, w, h) {

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
    text.style.height = "80%";

    // Кнопка создания узла
    var btnCreateNodeInText = mxUtils.button('Create', function () {

        var expression = divText.getElementsByTagName("textarea").item(0).value;
        if(expression) {
            //TODO: Возможно сделать обработку ошибок и выводить свои ошибки
            parser.parse(expression)
        } else {
            throw new Error('Отсутствует выражение');
        }
        error = "";
        if(!nameVarInText.value) {
            error += "Отсутствует имя переменной!\n";
        } else if(!checkValidID(nameVarInText.value)) {
            error += "Имя переменной некорректно!\n";
        }
        if(typeof (selectClassInText.options[selectClassInText.options.selectedIndex]) == "undefined" || !selectClassInText.options[selectClassInText.options.selectedIndex].value) {
            error += "Отсутствует тип переменной!\n";
        }
        if(error) {
            throw new Error(error);
        }
        
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 60), "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;editable=0;");
            
            //TODO: Возможно сделать подсветку в самом узле 

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            var typeInText = selectClassInText.options[selectClassInText.options.selectedIndex].value;
            theGraph.setAttributeForCell(newElement, 'expression', expression);
            theGraph.setAttributeForCell(newElement, 'typeVar', typeInText);
            theGraph.setAttributeForCell(newElement, 'nameVar', nameVarInText.value);
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
        workspace = Blockly.inject('actionCreateBlocklyDiv', { toolbox: toolbox });
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
    nameVarInText.style.height = '5%';
    nameVarInText.style.fontSize = '20px';
    nameVarInText.placeholder = "New variable";

    var jsonClasses = getClasses(editorUi);

    var selectClassInText = document.createElement('select');
    selectClassInText.style.width = '100%';
    selectClassInText.style.height = '5%';
    selectClassInText.style.fontSize = '20px';
    jsonClasses.forEach(classItem => {
        var newOption = new Option(classItem.name, classItem.name);
        selectClassInText.options[selectClassInText.options.length] = newOption;
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
    divText.appendChild(nameVarInText);
    divText.appendChild(selectClassInText);
    btnTextDiv.appendChild(btnCreateNodeInText);
    btnTextDiv.appendChild(btnSwitchToBlockly);
    divText.appendChild(btnTextDiv);
    div.appendChild(divText);


    //Экран с blockly
    var nestedDiv = document.createElement('div');
    nestedDiv.id = "actionCreateBlocklyDiv";
    nestedDiv.style.width = w+'px';
    nestedDiv.style.height = h*0.80+'px';

    // Кнопка создания узла
    var btnCreateNodeInBlockly = mxUtils.button('Create', function () {
        var code = generateCode(workspace);
        if(!code) {
            throw new Error('Отсутствует выражение');
        }
        error = "";
        if(!nameVarInBlockly.value) {
            error += "Отсутствует имя переменной!\n";
        } else if(!checkValidID(nameVarInBlockly.value)) {
            error += "Имя переменной некорректно!\n";
        }
        if(typeof (selectClassInBlockly.options[selectClassInBlockly.options.selectedIndex]) == "undefined" || !selectClassInBlockly.options[selectClassInBlockly.options.selectedIndex].value) {
            error += "Отсутствует тип переменной!\n";
        }
        if(error) {
            throw new Error(error);
        }
        
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 60), "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;editable=0;");
            

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            var typeInBlockly = selectClassInBlockly.options[selectClassInBlockly.options.selectedIndex].value;
            theGraph.setAttributeForCell(newElement, 'expression', code);
            theGraph.setAttributeForCell(newElement, 'typeVar', typeInBlockly);
            theGraph.setAttributeForCell(newElement, 'nameVar', nameVarInBlockly.value);
        }
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
    nameVarInBlockly.style.height = '5%';
    nameVarInBlockly.style.fontSize = '20px';
    nameVarInBlockly.placeholder = "New variable";

    var selectClassInBlockly = document.createElement('select');
    selectClassInBlockly.style.width = '100%';
    selectClassInBlockly.style.height = '5%';
    selectClassInBlockly.style.fontSize = '20px';
    jsonClasses.forEach(classItem => {
        var newOption = new Option(classItem.name, classItem.name);
        selectClassInBlockly.options[selectClassInBlockly.options.length] = newOption;
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
    divBlockly.appendChild(nameVarInBlockly);
    divBlockly.appendChild(selectClassInBlockly);
    btnBlockDiv.appendChild(btnCreateNodeInBlockly);
    btnBlockDiv.appendChild(btnSwitchToText);
    divBlockly.appendChild(btnBlockDiv);
    div.appendChild(divBlockly);


    // Настройки окна
    var win = new mxWindow('Action node constructor', div, x, y, w, h, true, true);
    this.window = win;
    this.window.contentWrapper.style.height = "100%";
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
