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

    ui.menubar.addMenu('Constructors bIbIbIbI', function(menu, parent) {
      ui.menus.addMenuItem(menu, 'classesConstructor');
  });


    // Adds resource for action
    mxResources.parse('actionElement=Add action element');

    mxResources.parse('classesConstructor=Classes constructor');


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


    ui.actions.addAction('classesConstructor', function() {

      if (this.classConstructorWindow == null)
      {
        this.classConstructorWindow = new ClassConstructorWindow(ui, (document.body.offsetWidth - 480) / 2,
          120, 420, 340);
        this.classConstructorWindow.window.setVisible(true);
      }
      else
      {
        this.classConstructorWindow.window.setVisible(!this.classConstructorWindow.window.isVisible());
      }
    });



    // Declaration class constructor window
    var ClassConstructorWindow = function(editorUi, x, y, w, h)
	{
    var div = document.createElement('div');
		var table = document.createElement('table');
		table.style.width = '100%';
		table.style.height = '100%';
		var tbody = document.createElement('tbody');
		var tr1 = document.createElement('tr');
		var td1 = document.createElement('td');
		var text = document.createElement('input');
    text.type = "text";
		text.style.width = '100%';
		td1.appendChild(text);

		var applyBtn = mxUtils.button('Apply', function()
		{
			var theGraph = editorUi.editor.graph;
        if(theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())){
          var pos=theGraph.getInsertPoint();
          var newElement=new mxCell("",
                    new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1)*17),
                    "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#6666FF;align=center;");

            strValue = '<font color="#000000"><b>Classes</b></font>';

            for (var i = 0; i < table.rows.length; i++) {
              var element = table.rows.item(i).getElementsByTagName("td")
              .item(0).getElementsByTagName("input").item(0).value;

              strValue += '<br><font color="#ff66b3">' + element + '</font>';
            }
            newElement.value = strValue;

          newElement.vertex=!0;
          theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
		});
		
		tr1.appendChild(td1);
		tbody.appendChild(tr1);
		table.appendChild(tbody);
    div.appendChild(table);

    var addClass = mxUtils.button('Add Class', function()
		{
			var trAdd = document.createElement('tr');
		  var tdAdd = document.createElement('td');
      var text = document.createElement('input');
      text.type = "text";
		  text.style.width = '100%';
		  tdAdd.appendChild(text);
      trAdd.appendChild(tdAdd);
      table.appendChild(trAdd);
		});

    div.appendChild(addClass);
    div.appendChild(applyBtn);

		this.window = new mxWindow('Constructor Classes', div, x, y, w, h, true, true);
		this.window.destroyOnClose = false;
		this.window.setMaximizable(false);
		this.window.setResizable(true);
		this.window.setClosable(true);
		this.window.setVisible(true);
	};

});