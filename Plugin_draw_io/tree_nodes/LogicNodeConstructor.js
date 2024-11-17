// Окно создание логических узлов
var LogicNodeConstructorWindow = function (editorUi, x, y, w, h) {

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
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 80), "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;align=center;editable=0;");
            newElement.value = "AND";
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'type', "AND");
        }
        win.destroy();
    });

    // Кнопка создания узла "OR"
    var btnCreateORNode = mxUtils.button('Or', function () {
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 80), "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;align=center;editable=0;");
            newElement.value = "OR";
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'type', "OR");
        }
        win.destroy();
    });

    var btnCreateHYPNode = mxUtils.button('HYP', function () {
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 80), "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;align=center;editable=0;");
            newElement.value = "HYP";
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'type', "HYP");
        }
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
    var win = new mxWindow(getTextByLocale("TitleLogicNodeConstructorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.contentWrapper.style.height = "100%";
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
