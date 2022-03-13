Draw.loadPlugin(function(ui) {

    var graph = ui.editor.graph;
    var model = graph.getModel();

    // Adds custom sidebar entry
    ui.sidebar.addPalette('customElements', 'Custom elements', true, function(content) {
        content.appendChild(ui.sidebar.createVertexTemplate('rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;', 66, 30, "", "True"));
        content.appendChild(ui.sidebar.createVertexTemplate('rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;', 66, 30, "", "False"));
    });

    var c = ui.sidebar.container;
    c.firstChild.click();
    c.insertBefore(c.lastChild, c.firstChild);
    c.insertBefore(c.lastChild, c.firstChild);


    // Adds menu
    ui.menubar.addMenu('Custom elements', function(menu, parent) {
        ui.menus.addMenuItem(menu, 'actionElement');
    });


    // Adds resource for action
    mxResources.parse('actionElement=Add action element');


    // Adds action
    ui.actions.addAction('actionElement', function() {
        var theGraph = ui.editor.graph;
        if(theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())){
          var pos=theGraph.getInsertPoint();
          var newElement=new mxCell("",
                    new mxGeometry(pos.x, pos.y, 120, 60),
                    "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;");
            newElement.value = "<font color=\"#6666ff\">Find </font><font color=\"#cccc00\">X</font>'s <font color=\"#00cccc\">left closest</font>&nbsp;<font color=\"#00cc00\">unused&nbsp;</font><br><font color=\"#ff66b3\">operand</font><br><font color=\"#cccc00\">A</font>";
          newElement.vertex=!0;
          theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });
});