// Окно коструктора блока с классами
var ClassConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    div.style.height = "100%";
    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.height = '80%';
    table.style.overflow = "scroll";
    table.style.display = "block";
    var tbody = document.createElement('tbody');
    tbody.style.height = "100%";
    
    var row = addRowClass();
    tbody.appendChild(row);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка создания блока
    var applyBtn = mxUtils.button('Apply', function () {

        checkAllInputsClass(table);

        for (var i = 0; i < table.rows.length; i++) {
            var expression = table.rows.item(i).getElementsByTagName("td")
                .item(2).getElementsByTagName("textarea").item(0).value;
            if(expression) {
                //TODO: Возможно сделать обработку ошибок и выводить свои ошибки
                parser.parse(expression)
            }
        }

        var theGraph = editorUi.editor.graph;

        checkExistClassDictionary(theGraph);
        
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17), "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#6666FF;align=center;editable=0;");

            strValue = generateStrValueForClasses(table);

            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            for (var i = 0; i < table.rows.length; i++) {
                var expression = table.rows.item(i).getElementsByTagName("td")
                    .item(2).getElementsByTagName("textarea").item(0).value;
                theGraph.setAttributeForCell(newElement, 'expression_' + i, expression);
            }
        }
        win.destroy();
    });

    // Кнопка добавления полей для нового класса
    var addClass = mxUtils.button('Add Class', function () {
        var newRow = addRowClass();
        var tdDelRow = document.createElement('td');
        var btnDelRow = mxUtils.button('Delete', function (evt) {
            evt.target.parentElement.parentElement.remove();
        });
        tdDelRow.appendChild(btnDelRow);
        newRow.appendChild(tdDelRow);
        tbody.appendChild(newRow);
    });

    // Кнопка открытия окна с блокли для выражений
    var openBlockly = mxUtils.button('Open blockly', function () {
        var mainDivBlockly = document.createElement('div');
        var divBlockly = document.createElement('div');
        divBlockly.id = 'classCreateBlocklyDiv'
        divBlockly.style.width = '850px';
        divBlockly.style.height = '500px';
        mainDivBlockly.appendChild(divBlockly);
        
        var divInput = document.createElement('div');
        divInput.style.width = '850px';
        var codeInput = document.createElement('input');
        codeInput.style.width = '100%';
        codeInput.id = 'outputCode';

        divInput.appendChild(codeInput);
        mainDivBlockly.appendChild(divInput);

        var toCodeBtn = mxUtils.button('to code', function () {
            let code = Blockly.JavaScript.workspaceToCode(workspaceInWindow);
            codeInput.value = code;
        });

        mainDivBlockly.appendChild(toCodeBtn);  

        this.window2 = new mxWindow('Blockly', mainDivBlockly, (document.body.offsetWidth - 880) / 2, 120, 900, 580, true, true);
        this.window2.destroyOnClose = true;
        this.window2.setMaximizable(false);
        this.window2.setResizable(false);
        this.window2.setClosable(true);
        this.window2.setVisible(true);
        var workspaceInWindow = Blockly.inject('classCreateBlocklyDiv', { toolbox: toolbox });
    });

    // Добавление кнопок в окно
    var btnDiv = document.createElement('div');
    btnDiv.style.display = "flex";
    btnDiv.style.height = "20%";
    btnDiv.style.alignItems = "center";
    btnDiv.appendChild(addClass);
    btnDiv.appendChild(applyBtn);
    btnDiv.appendChild(openBlockly);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow('Classes constructor', div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};

function addRowClass() {
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var name = document.createElement('input');
    name.type = "text";
    name.style.width = '100%';
    name.placeholder = "Class name";
    td1.appendChild(name);
    var td2 = document.createElement('td');
    var extend = document.createElement('input');
    extend.type = "text";
    extend.style.width = '100%';
    extend.placeholder = "Extend";
    td2.appendChild(extend);
    var td3 = document.createElement('td');
    var expression = document.createElement('textarea');
    expression.style.width = '250px';
    expression.style.maxWidth = '250px';
    expression.placeholder = "Expression";
    td3.appendChild(expression);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    return tr1;
}

function checkAllInputsClass(table) {
    errors = "";
    for (var i = 0; i < table.rows.length; i++) {
        if(table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value == "") {
            errors += "В строке №" + (i+1) + " отсутствует название; ";
        }
    }
    if(errors != "") {
        throw new Error(errors);
    }
}

function generateStrValueForClasses(table) {
    strValue = '<font color="#000000"><b>Classes</b></font>';

    for (var i = 0; i < table.rows.length; i++) {
        var nameClass = table.rows.item(i).getElementsByTagName("td")
            .item(0).getElementsByTagName("input").item(0).value;
        var classExtend = table.rows.item(i).getElementsByTagName("td")
            .item(1).getElementsByTagName("input").item(0).value;
        
        strValue += '<br><font color="#ff66b3">' + nameClass + '</font>';
        if(classExtend != "") {
            strValue += ' (<font color="#ff66b3">' + classExtend + '</font>)';
        }
    }

    return strValue;
}

function checkExistClassDictionary(graph) {
    var cells = graph.getModel().cells;
    Object.keys(cells).forEach(function (key) {
        var cellValue = cells[key].value;
        if (cellValue && typeof cellValue == "object" && cellValue.getAttribute('label').startsWith('<font color="#000000"><b>Classes</b></font>')) { //TODO: Возможно это кал способ надо протестировать
            throw new Error("Class dictionary already exists");
        }
    });
}
