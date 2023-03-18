// Окно редактирования блока с классами
var ClassEditorWindow = function (cell, editorUi, x, y, w, h) {

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
    
    fillData(tbody, cell);
    table.appendChild(tbody);
    div.appendChild(table);

    // Кнопка сохранения блока
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

        strValue = generateStrValueForClasses(table);
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.geometry.height = (table.rows.length + 1) * 17;
        cell.value.setAttribute("label", strValue);

        for (var i = 0; i < table.rows.length; i++) {
            var expression = table.rows.item(i).getElementsByTagName("td")
                .item(2).getElementsByTagName("textarea").item(0).value;
            cell.value.setAttribute('expression_' + i, expression);
        }
        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.setVisible(false);
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
        divBlockly.id = 'blocklyDiv'
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
        var workspaceInWindow = Blockly.inject('blocklyDiv', { toolbox: toolbox });
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

function fillData(tbody, cell) {
    let cellValue = cell.value;
    var cellLabel = cellValue.getAttribute('label');
    cellLabel = cellLabel.replace('<font color="#000000"><b>Classes</b></font><br>', '');
    var values = cellLabel.split('<br>');
        
    values.forEach((element, index) => {
        var nameClass = element.slice(element.indexOf('<font color="#ff66b3">')+22, element.indexOf('</font>'));
        element = element.slice(element.indexOf('</font>')+7);

        var classExtend = ""
        if(element.indexOf('(<font color="#ff66b3">') != -1) {
            classExtend = element.slice(element.indexOf('(<font color="#ff66b3">')+23, element.indexOf('</font>)'));
            element = element.slice(element.indexOf('</font>)')+8);
        }

        var expression = cellValue.getAttribute('expression_'+index)

        var row = addRowClass();

        row.getElementsByTagName("td").item(0)
            .getElementsByTagName("input").item(0).value = nameClass;
        row.getElementsByTagName("td").item(1)
            .getElementsByTagName("input").item(0).value = classExtend;

        row.getElementsByTagName("td").item(2)
            .getElementsByTagName("textarea").item(0).value = expression;
        
        if(index != 0) {
            var tdDelRow = document.createElement('td');
            var btnDelRow = mxUtils.button('Delete', function (evt) {
                evt.target.parentElement.parentElement.remove();
            });
            tdDelRow.appendChild(btnDelRow);
            row.appendChild(tdDelRow);
        }

        tbody.appendChild(row);
    });
}
