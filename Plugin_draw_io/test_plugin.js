Draw.loadPlugin(function (ui) {

    var graph = ui.editor.graph;
    var model = graph.getModel();


    // Adds custom sidebar entry
    ui.sidebar.addPalette('customElements', 'Custom elements', true, function (content) {
        content.appendChild(ui.sidebar.createVertexTemplate('rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;', 66, 30, "", "True"));
        content.appendChild(ui.sidebar.createVertexTemplate('rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;', 66, 30, "", "False"));
    });

    var c = ui.sidebar.container;
    c.firstChild.click();
    c.insertBefore(c.lastChild, c.firstChild);
    c.insertBefore(c.lastChild, c.firstChild);


    // Adds menu
    ui.menubar.addMenu('Custom elements', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'actionElement');
    });

    ui.menubar.addMenu('Dictionary constructors', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'classesConstructor');
        ui.menus.addMenuItem(menu, 'classPropertiesConstructor');
        ui.menus.addMenuItem(menu, 'relationshipsConstructor');
    });


    // Adds resource for action
    mxResources.parse('actionElement=Add action element');

    mxResources.parse('classesConstructor=Classes constructor');

    mxResources.parse('classPropertiesConstructor=Class properties constructor');

    mxResources.parse('relationshipsConstructor=Relationships constructor');


    // Adds action
    ui.actions.addAction('actionElement', function () {
        var theGraph = ui.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("",
                new mxGeometry(pos.x, pos.y, 120, 60),
                "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;");
            newElement.value = "<font color=\"#6666ff\">Find </font><font color=\"#cccc00\">X</font>'s <font color=\"#00cccc\">left closest</font>&nbsp;<font color=\"#00cc00\">unused&nbsp;</font><br><font color=\"#ff66b3\">operand</font><br><font color=\"#cccc00\">A</font>";
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });


    ui.actions.addAction('classesConstructor', function () {

        if (this.classConstructorWindow == null) {
            this.classConstructorWindow = new ClassConstructorWindow(ui, (document.body.offsetWidth - 480) / 2,
                120, 420, 340);
            this.classConstructorWindow.window.setVisible(true);
        } else {
            this.classConstructorWindow.window.setVisible(!this.classConstructorWindow.window.isVisible());
        }
    });


    ui.actions.addAction('classPropertiesConstructor', function () {

        if (this.classPropertiesConstructorWindow == null) {
            this.classPropertiesConstructorWindow = new ClassPropertiesConstructorWindow(ui, (document.body.offsetWidth - 480) / 2,
                120, 420, 340);
            this.classPropertiesConstructorWindow.window.setVisible(true);
        } else {
            this.classPropertiesConstructorWindow.window.setVisible(!this.classPropertiesConstructorWindow.window.isVisible());
        }
    });

    ui.actions.addAction('relationshipsConstructor', function () {

        if (this.relationshipsConstructorWindow == null) {
            this.relationshipsConstructorWindow = new RelationshipsConstructorWindow(ui, (document.body.offsetWidth - 880) / 2,
                120, 820, 340);
            this.relationshipsConstructorWindow.window.setVisible(true);
        } else {
            this.relationshipsConstructorWindow.window.setVisible(!this.relationshipsConstructorWindow.window.isVisible());
        }
    });


    // Declaration class constructor window
    var ClassConstructorWindow = function (editorUi, x, y, w, h) {
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

        var applyBtn = mxUtils.button('Apply', function () {
            var theGraph = editorUi.editor.graph;
            if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
                var pos = theGraph.getInsertPoint();
                var newElement = new mxCell("",
                    new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17),
                    "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#6666FF;align=center;");

                strValue = '<font color="#000000"><b>Classes</b></font>';

                for (var i = 0; i < table.rows.length; i++) {
                    var element = table.rows.item(i).getElementsByTagName("td")
                        .item(0).getElementsByTagName("input").item(0).value;

                    strValue += '<br><font color="#ff66b3">' + element + '</font>';
                }
                newElement.value = strValue;

                newElement.vertex = !0;
                theGraph.setSelectionCell(theGraph.addCell(newElement));
            }
        });

        tr1.appendChild(td1);
        tbody.appendChild(tr1);
        table.appendChild(tbody);
        div.appendChild(table);

        var addClass = mxUtils.button('Add Class', function () {
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

        this.window = new mxWindow('Classes constructor', div, x, y, w, h, true, true);
        this.window.destroyOnClose = false;
        this.window.setMaximizable(false);
        this.window.setResizable(true);
        this.window.setClosable(true);
        this.window.setVisible(true);
    };

    // Declaration class properties constructor window
    var ClassPropertiesConstructorWindow = function (editorUi, x, y, w, h) {
        var div = document.createElement('div');
        var table = document.createElement('table');
        table.style.width = '100%';
        table.style.height = '100%';
        var tbody = document.createElement('tbody');
        var tr1 = document.createElement('tr');
        var td1 = document.createElement('td');
        var text = document.createElement('input');
        text.type = "text";
        text.style.width = '32%';
        td1.appendChild(text);

        var select = document.createElement('select');
        select.style.width = '32%';

        var graph = editorUi.editor.graph;
        var cells = graph.getModel().cells;

        Object.keys(cells).forEach(function (key) {

            var cellValue = cells[key].value;

            if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
                cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
                var values = cellValue.split('<br>');
                values.forEach(element => {
                    var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                    var newOption = new Option(str, str);
                    select.options[select.options.length] = newOption;

                });

            }
        });

        td1.appendChild(select);

        var text2 = document.createElement('input');
        text2.type = "text";
        text2.style.width = '32%';
        td1.appendChild(text2);

        var applyBtn = mxUtils.button('Apply', function () {
            var theGraph = editorUi.editor.graph;
            if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
                var pos = theGraph.getInsertPoint();
                //TODO Поменять ширину объекта
                var newElement = new mxCell("",
                    new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17),
                    "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#00CCCC;align=center;");

                strValue = '<b><font color="#000000">Class properties</font></b>';

                for (var i = 0; i < table.rows.length; i++) {
                    var property = table.rows.item(i).getElementsByTagName("td")
                        .item(0).getElementsByTagName("input").item(0).value;
                    var propertyValues = table.rows.item(i).getElementsByTagName("td")
                        .item(0).getElementsByTagName("input").item(1).value;
                    var selectClass = table.rows.item(i).getElementsByTagName("td")
                        .item(0).getElementsByTagName("select").item(0);
                    var selectedIndex = selectClass.options.selectedIndex;
                    var selectedClass = selectClass.options[selectedIndex].value;

                    //TODO Добавить стили к тексту
                    strValue += '<br><font color="#ffb366">' + property + '</font> <font color="#000000"> (</font> <font color="#ff66b3">'
                        + selectedClass + '</font> <font color="#000000">) '
                        + propertyValues + '</font>';
                }
                newElement.value = strValue;

                newElement.vertex = !0;
                theGraph.setSelectionCell(theGraph.addCell(newElement));
            }
        });

        tr1.appendChild(td1);
        tbody.appendChild(tr1);
        table.appendChild(tbody);
        div.appendChild(table);

        var addClass = mxUtils.button('Add property class', function () {
            var trAdd = document.createElement('tr');
            var tdAdd = document.createElement('td');
            var text = document.createElement('input');
            text.type = "text";
            text.style.width = '32%';
            tdAdd.appendChild(text);

            var select = document.createElement('select');
            select.style.width = '32%';

            var graph = editorUi.editor.graph;
            var cells = graph.getModel().cells;

            Object.keys(cells).forEach(function (key) {

                var cellValue = cells[key].value;

                if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
                    cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
                    var values = cellValue.split('<br>');
                    values.forEach(element => {
                        var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                        var newOption = new Option(str, str);
                        select.options[select.options.length] = newOption;

                    });

                }
            });

            tdAdd.appendChild(select);

            var text2 = document.createElement('input');
            text2.type = "text";
            text2.style.width = '32%';
            tdAdd.appendChild(text2);
            trAdd.appendChild(tdAdd);
            table.appendChild(trAdd);
        });

        div.appendChild(addClass);
        div.appendChild(applyBtn);

        this.window = new mxWindow('Class properties constructor', div, x, y, w, h, true, true);
        this.window.destroyOnClose = false;
        this.window.setMaximizable(false);
        this.window.setResizable(true);
        this.window.setClosable(true);
        this.window.setVisible(true);
    };


    // Declaration class properties constructor window
    var RelationshipsConstructorWindow = function (editorUi, x, y, w, h) {
        var div = document.createElement('div');
        var table = document.createElement('table');
        table.style.width = '100%';
        table.style.height = '100%';
        var tbody = document.createElement('tbody');
        var tr1 = document.createElement('tr');
        var td1 = document.createElement('td');

        var select = document.createElement('select');
        select.style.width = '25%';

        var graph = editorUi.editor.graph;
        var cells = graph.getModel().cells;

        Object.keys(cells).forEach(function (key) {

            var cellValue = cells[key].value;

            if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
                cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
                var values = cellValue.split('<br>');
                values.forEach(element => {
                    var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                    var newOption = new Option(str, str);
                    select.options[select.options.length] = newOption;

                });

            }
        });

        td1.appendChild(select);

        var text = document.createElement('input');
        text.type = "text";
        text.style.width = '25%';
        td1.appendChild(text);


        var select2 = document.createElement('select');
        select2.style.width = '25%';

        Object.keys(cells).forEach(function (key) {

            var cellValue = cells[key].value;

            if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
                cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
                var values = cellValue.split('<br>');
                values.forEach(element => {
                    var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                    var newOption = new Option(str, str);
                    select2.options[select2.options.length] = newOption;

                });

            }
        });

        td1.appendChild(select2);

        var textArea = document.createElement('textarea');
        textArea.style.width = '23%';
        td1.appendChild(textArea);


        var applyBtn = mxUtils.button('Apply', function () {
            var theGraph = editorUi.editor.graph;
            if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
                var pos = theGraph.getInsertPoint();
                var newElement = new mxCell("",
                    new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17),
                    "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#00CCCC;align=center;");

                strValue = '<b><font color="#000000">Relationships between objects</font></b>';

                for (var i = 0; i < table.rows.length; i++) {
                    var relationship = table.rows.item(i).getElementsByTagName("td")
                        .item(0).getElementsByTagName("input").item(0).value;

                    var selectClass1 = table.rows.item(i).getElementsByTagName("td")
                        .item(0).getElementsByTagName("select").item(0);
                    var selectedIndex1 = selectClass1.options.selectedIndex;
                    var selectedClass1 = selectClass1.options[selectedIndex1].value;

                    var selectClass2 = table.rows.item(i).getElementsByTagName("td")
                        .item(0).getElementsByTagName("select").item(1);
                    var selectedIndex2 = selectClass2.options.selectedIndex;
                    var selectedClass2 = selectClass2.options[selectedIndex2].value;

                    strValue += '<br>' +
                        '<font color="#000000">&lt;</font>' +
                        '<font color="#ff66b3">' + selectedClass1 + '</font>' +
                        '<font color="#000000">&gt;</font>' +
                        '<font color="#00cccc"> ' + relationship + ' </font>' +
                        '<font color="#000000">&lt;</font>' +
                        '<font color="#ff66b3">' + selectedClass2 + '</font>' +
                        '<font color="#000000">&gt;</font>';
                }
                newElement.value = strValue;

                newElement.vertex = !0;
                theGraph.setSelectionCell(theGraph.addCell(newElement));
                for (var i = 0; i < table.rows.length; i++) {
                    var jenaCode = table.rows.item(i).getElementsByTagName("td")
                        .item(0).getElementsByTagName("textarea").item(0).value;
                    theGraph.setAttributeForCell(newElement, 'jena_code_' + i, jenaCode);
                }
            }
        });

        tr1.appendChild(td1);
        tbody.appendChild(tr1);
        table.appendChild(tbody);
        div.appendChild(table);

        var addClass = mxUtils.button('Add relationship', function () {
            var trAdd = document.createElement('tr');
            var tdAdd = document.createElement('td');
            var select = document.createElement('select');
            select.style.width = '25%';

            var graph = editorUi.editor.graph;
            var cells = graph.getModel().cells;

            Object.keys(cells).forEach(function (key) {

                var cellValue = cells[key].value;

                if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
                    cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
                    var values = cellValue.split('<br>');
                    values.forEach(element => {
                        var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                        var newOption = new Option(str, str);
                        select.options[select.options.length] = newOption;

                    });

                }
            });

            tdAdd.appendChild(select);

            var text = document.createElement('input');
            text.type = "text";
            text.style.width = '25%';
            tdAdd.appendChild(text);


            var select2 = document.createElement('select');
            select2.style.width = '25%';

            Object.keys(cells).forEach(function (key) {

                var cellValue = cells[key].value;

                if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
                    cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
                    var values = cellValue.split('<br>');
                    values.forEach(element => {
                        var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                        var newOption = new Option(str, str);
                        select2.options[select2.options.length] = newOption;

                    });

                }
            });

            tdAdd.appendChild(select2);

            var textArea = document.createElement('textarea');
            textArea.style.width = '24%';
            tdAdd.appendChild(textArea);

            trAdd.appendChild(tdAdd);
            table.appendChild(trAdd);
        });

        div.appendChild(addClass);
        div.appendChild(applyBtn);

        this.window = new mxWindow('Relationships constructor', div, x, y, w, h, true, true);
        this.window.destroyOnClose = false;
        this.window.setMaximizable(false);
        this.window.setResizable(true);
        this.window.setClosable(true);
        this.window.setVisible(true);
    };

});
