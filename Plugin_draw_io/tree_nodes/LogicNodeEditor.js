// Окно редактирования логических узлов
var LogicNodeEditorWindow = function (cell, editorUi, x, y, w, h) {

    // Верстка окнаx
    var div = document.createElement('div');
    div.style.width = '300px';
    div.style.height = '150px';

    // Кнопка создания узла "AND"
    var btnCreateANDNode = mxUtils.button('And', function () {
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("label", "AND");
        cell.value.setAttribute("type", "AND");
        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.destroy();
    });

    // Кнопка создания узла "OR"
    var btnCreateORNode = mxUtils.button('Or', function () {
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("label", "OR");
        cell.value.setAttribute("type", "OR");
        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.destroy();
    });

    div.appendChild(btnCreateANDNode);
    div.appendChild(btnCreateORNode);

    // Настройки окна
    var win = new mxWindow('Logic node editor', div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
