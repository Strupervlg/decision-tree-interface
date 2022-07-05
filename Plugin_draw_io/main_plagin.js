// Плагин
Draw.loadPlugin(function (ui) {

    var graph = ui.editor.graph;
    var model = graph.getModel();


    // Добавление в боковую панель кастомных геометрических элементов
    ui.sidebar.addPalette('customElements', 'Custom elements', true, function (content) {
        content.appendChild(ui.sidebar.createVertexTemplate('rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;', 66, 30, "", "True"));
        content.appendChild(ui.sidebar.createVertexTemplate('rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;', 66, 30, "", "False"));
    });


    var c = ui.sidebar.container;
    c.firstChild.click();
    c.insertBefore(c.lastChild, c.firstChild);
    c.insertBefore(c.lastChild, c.firstChild);


    // Добавление нового раздела меню с подразделами
    ui.menubar.addMenu('Custom elements', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'actionElement');
    });

    ui.menubar.addMenu('Dictionary constructors', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'classesConstructor');
        ui.menus.addMenuItem(menu, 'classPropertiesConstructor');
        ui.menus.addMenuItem(menu, 'relationshipsConstructor');
    });


    // Привязывание действий к разделам меню
    mxResources.parse('actionElement=Add action element');

    mxResources.parse('classesConstructor=Classes constructor');

    mxResources.parse('classPropertiesConstructor=Class properties constructor');

    mxResources.parse('relationshipsConstructor=Relationships constructor');


    // Создание действий для меню
    // Тестовое дейтсвие
    ui.actions.addAction('actionElement', function () {
        var theGraph = ui.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 120, 60), "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;");
            newElement.value = "<font color=\"#6666ff\">Find </font><font color=\"#cccc00\">X</font>'s <font color=\"#00cccc\">left closest</font>&nbsp;<font color=\"#00cc00\">unused&nbsp;</font><br><font color=\"#ff66b3\">operand</font><br><font color=\"#cccc00\">A</font>";
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    // Действие на отоброжение конструктора блока с классами
    ui.actions.addAction('classesConstructor', function () {

        //FIXME: сделать при каждом нажатии создание нового окна с обновленными характеристиками
        if (this.classConstructorWindow == null) {
            this.classConstructorWindow = new ClassConstructorWindow(ui, (document.body.offsetWidth - 480) / 2, 120, 420, 340);
            this.classConstructorWindow.window.setVisible(true);
        } else {
            this.classConstructorWindow.window.setVisible(!this.classConstructorWindow.window.isVisible());
        }
    });

    // Действие на отоброжение конструктора блока со свойствами классов
    ui.actions.addAction('classPropertiesConstructor', function () {

        //FIXME: сделать при каждом нажатии создание нового окна с обновленными характеристиками
        if (this.classPropertiesConstructorWindow == null) {
            this.classPropertiesConstructorWindow = new ClassPropertiesConstructorWindow(ui, (document.body.offsetWidth - 480) / 2, 120, 420, 340);
            this.classPropertiesConstructorWindow.window.setVisible(true);
        } else {
            this.classPropertiesConstructorWindow.window.setVisible(!this.classPropertiesConstructorWindow.window.isVisible());
        }
    });

    // Действие на отоброжение конструктора блока с отношениями для классов
    ui.actions.addAction('relationshipsConstructor', function () {

        //FIXME: сделать при каждом нажатии создание нового окна с обновленными характеристиками
        if (this.relationshipsConstructorWindow == null) {
            this.relationshipsConstructorWindow = new RelationshipsConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 820, 340);
            this.relationshipsConstructorWindow.window.setVisible(true);
        } else {
            this.relationshipsConstructorWindow.window.setVisible(!this.relationshipsConstructorWindow.window.isVisible());
        }
    });
});
