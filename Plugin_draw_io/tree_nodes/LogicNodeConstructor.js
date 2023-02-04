// Окно создание логических узлов
var LogicNodeConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окнаx
    var div = document.createElement('div');
    div.style.width = '300px';
    div.style.height = '150px';

    // Кнопка создания узла "AND"
    var btnCreateANDNode = mxUtils.button('And', function () {
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 80), "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;align=center;");
            newElement.value = "AND";
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    // Кнопка создания узла "OR"
    var btnCreateORNode = mxUtils.button('Or', function () {
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 80), "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;align=center;");
            newElement.value = "OR";
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    div.appendChild(btnCreateANDNode);
    div.appendChild(btnCreateORNode);

    // Настройки окна
    this.window = new mxWindow('Logic node constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
