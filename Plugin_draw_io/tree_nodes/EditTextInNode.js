// Окно редактирования человекочитаемого текста узлов
var EditTextInNodeWindow = function (cell, editorUi, x, y, w, h) {

    var graph = editorUi.editor.graph;

    // Верстка окна
    var div = document.createElement('div');
    var divText = document.createElement('div');
    var text = document.createElement('textarea');
    text.style.width = "100%";
    text.style.height = "480px";
    if(typeof cell.value == "object") {
        text.value = cell.value.getAttribute("label");
    } else {
        text.value = cell.value;
    }

    // Кнопка создания узла
    var btnSaveTextInNode = mxUtils.button('Save', function () {
        var textInNode = divText.getElementsByTagName("textarea").item(0).value;
        graph.getModel().beginUpdate();
        if(typeof cell.value == "object") {
            cell.value.setAttribute("label", textInNode);
        } else {
            cell.setValue(textInNode);
        }
        graph.getModel().endUpdate();
        graph.refresh(); // update the graph
        win.setVisible(false);
    });

    // Кнопка генерации человекочитаемого текста
    var btnGenerateTextInNode = mxUtils.button('Generate', function () {
        let code = "";
        if(typeof cell.value == "object") {
            code = cell.value.getAttribute("expression");
        }
        let textInNode = getTextFromCode(code, editorUi)
        if(textInNode != "") {
            text.value = textInNode;
        }
    });

    divText.appendChild(text);
    divText.appendChild(btnSaveTextInNode);
    divText.appendChild(btnGenerateTextInNode);
    div.appendChild(divText);

    // Настройки окна
    var win = new mxWindow('Edit text in node', div, x, y, w, h, true, true);
    this.window = win
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};