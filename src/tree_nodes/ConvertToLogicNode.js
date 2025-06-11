// Окно редактирования значений в ветке
var ConvertToLogicNode = function (cell, editorUi, x, y, w, h) {
    var theGraph = editorUi.editor.graph;

    if (typeof cell.value == "object") {
        var text = cell.value.getAttribute("label");
    } else {
        var text = cell.value;
    }

    if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
        var pos = theGraph.getInsertPoint();
        var newElement = new mxCell("", new mxGeometry(cell.geometry.x, cell.geometry.y, cell.geometry.width, cell.geometry.height), "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fontColor=#000000;align=center;editable=0;");

        newElement.vertex = !0;
        theGraph.setSelectionCell(theGraph.addCell(newElement));
        if (text == "OR") {
            theGraph.setAttributeForCell(newElement, 'type', "OR");
            theGraph.setAttributeForCell(newElement, 'label', "OR");
        } else {
            theGraph.setAttributeForCell(newElement, 'type', "AND");
            theGraph.setAttributeForCell(newElement, 'label', "AND");
        }

        theGraph.getModel().beginUpdate();
        var edgesNode = cell.edges;
        if (edgesNode) {
            edgesNode.forEach((element, index) => {
                var trgt = null;
                var src = null;
                if (element.source == cell) {
                    element.source = newElement;
                    trgt = element.target;
                } else {
                    element.target = newElement;
                    src = element.source;
                }
                if (!newElement.edges) {
                    newElement.edges = [element];
                } else {
                    newElement.edges.push(element);
                }
                if (trgt) {
                    newElement.edges[index].target = trgt;
                } else {
                    newElement.edges[index].source = src;
                }
            });
        }
        cell.edges = null;
        theGraph.removeCells([cell]);
        theGraph.getModel().endUpdate();
        theGraph.refresh();
    }
};
