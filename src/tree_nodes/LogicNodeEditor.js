// Окно редактирования логических узлов
var LogicNodeEditorWindow = function (cell, editorUi, x, y, w, h) {

    // Верстка окнаx
    var div = document.createElement('div');
    div.style.width = '300px';
    div.style.height = '150px';
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.gap = "5px";
    div.style.justifyContent = "center";

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

    var btnCreateHYPNode = mxUtils.button('HYP', function () {
        var theGraph = editorUi.editor.graph;

        theGraph.getModel().beginUpdate();
        cell.value.setAttribute("label", "HYP");
        cell.value.setAttribute("type", "HYP");
        theGraph.getModel().endUpdate();
        theGraph.refresh(); // update the graph
        win.destroy();
    });

    btnCreateANDNode = styleBtn(btnCreateANDNode);
    btnCreateANDNode.style.minWidth = "32%";
    btnCreateORNode = styleBtn(btnCreateORNode);
    btnCreateORNode.style.minWidth = "32%";
    btnCreateHYPNode = styleBtn(btnCreateHYPNode);
    btnCreateHYPNode.style.minWidth = "32%";
    div.appendChild(btnCreateANDNode);
    div.appendChild(btnCreateORNode);
    div.appendChild(btnCreateHYPNode);

    // Настройки окна
    var win = new mxWindow(getTextByLocale("TitleLogicNodeEditorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.contentWrapper.style.height = "100%";
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
