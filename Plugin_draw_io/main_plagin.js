// Плагин
Draw.loadPlugin(function (ui) {

    var graph = ui.editor.graph;
    var model = graph.getModel();


    // Добавление в боковую панель кастомных геометрических элементов
    ui.sidebar.addPalette('customElements', 'Custom elements', true, function (content) {
        content.appendChild(ui.sidebar.createVertexTemplate('rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;', 66, 30, "", "True"));
        content.appendChild(ui.sidebar.createVertexTemplate('rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;', 66, 30, "", "False"));
        content.appendChild(ui.sidebar.createVertexTemplate('shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;', 120, 80, "AND", "AND"));
        content.appendChild(ui.sidebar.createVertexTemplate('shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;', 120, 80, "OR", "OR"));
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
        ui.menus.addMenuItem(menu, 'enumConstructor');
    });

    ui.menubar.addMenu('Node constructors', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'actionNodeConstructor');
        ui.menus.addMenuItem(menu, 'conditionNodeConstructor');
    });

    ui.menubar.addMenu('Exporting dictionaries', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'exportClass');
        ui.menus.addMenuItem(menu, 'exportProperty');
        ui.menus.addMenuItem(menu, 'exportRelationship');
        ui.menus.addMenuItem(menu, 'exportEnum');
    });


    // Привязывание действий к разделам меню
    mxResources.parse('actionElement=Add action element');

    mxResources.parse('classesConstructor=Classes constructor');

    mxResources.parse('classPropertiesConstructor=Class properties constructor');

    mxResources.parse('relationshipsConstructor=Relationships constructor');

    mxResources.parse('enumConstructor=Enum constructor');

    mxResources.parse('actionNodeConstructor=Action Node Constructor');

    mxResources.parse('conditionNodeConstructor=Condition Node Constructor');

    mxResources.parse('exportEnum=Export enum');

    mxResources.parse('exportClass=Export class');

    mxResources.parse('exportProperty=Export property');

    mxResources.parse('exportRelationship=Export relationship');

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
        this.classConstructorWindow = new ClassConstructorWindow(ui, (document.body.offsetWidth - 480) / 2, 120, 420, 340);
        this.classConstructorWindow.window.setVisible(true);
    });

    // Действие на отоброжение конструктора блока со свойствами классов
    ui.actions.addAction('classPropertiesConstructor', function () {
        this.classPropertiesConstructorWindow = new ClassPropertiesConstructorWindow(ui, (document.body.offsetWidth - 480) / 2, 120, 420, 340);
        this.classPropertiesConstructorWindow.window.setVisible(true);
    });

    // Действие на отоброжение конструктора enum
    ui.actions.addAction('enumConstructor', function () {
        this.enumConstructorWindow = new EnumConstructorWindow(ui, (document.body.offsetWidth - 480) / 2, 120, 420, 340);
        this.enumConstructorWindow.window.setVisible(true);
    });

    // Действие на отоброжение конструктора блока с отношениями для классов
    ui.actions.addAction('relationshipsConstructor', function () {
        this.relationshipsConstructorWindow = new RelationshipsConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 820, 340);
        this.relationshipsConstructorWindow.window.setVisible(true);
    });

    // Действие на отоброжение конструктора узлов действия
    ui.actions.addAction('actionNodeConstructor', function () {
        this.actionNodeConstructorWindow = new ActionNodeConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
        this.actionNodeConstructorWindow.window.setVisible(true);
    });

    // Действие на отоброжение конструктора узлов условия
    ui.actions.addAction('conditionNodeConstructor', function () {
        this.conditionNodeConstructorWindow = new ConditionNodeConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
        this.conditionNodeConstructorWindow.window.setVisible(true);
    });

    ui.actions.addAction('exportEnum', function () {
        let text = exportEnums(getEnums(ui));
        downloadAsFile(text);

        function downloadAsFile(data) {
            let a = document.createElement("a");
            let file = new Blob([data], {type: 'application/json'});
            a.href = URL.createObjectURL(file);
            a.download = "enums.txt";
            a.click();
        }
    });

    var divForGlobalWS = document.createElement('div');
    divForGlobalWS.id = "globalWS";
    document.body.appendChild(divForGlobalWS);
    var globalWS = Blockly.inject('globalWS', { toolbox: toolbox });

    ui.actions.addAction('exportClass', function () {
        
        let text = exportClasses(getClasses(ui), globalWS);
        downloadAsFile(text);

        function downloadAsFile(data) {
            let a = document.createElement("a");
            let file = new Blob([data], {type: 'application/json'});
            a.href = URL.createObjectURL(file);
            a.download = "classes.txt";
            a.click();
        }
    });

    ui.actions.addAction('exportProperty', function () {
        
        let text = exportProperties(getProperties(ui));
        downloadAsFile(text);

        function downloadAsFile(data) {
            let a = document.createElement("a");
            let file = new Blob([data], {type: 'application/json'});
            a.href = URL.createObjectURL(file);
            a.download = "properties.txt";
            a.click();
        }
    });

    ui.actions.addAction('exportRelationship', function () {
        
        let text = exportRelastionships(getRelationships(ui));
        downloadAsFile(text);

        function downloadAsFile(data) {
            let a = document.createElement("a");
            let file = new Blob([data], {type: 'application/json'});
            a.href = URL.createObjectURL(file);
            a.download = "relationships.txt";
            a.click();
        }
    });
});
