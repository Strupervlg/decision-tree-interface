// Плагин
Draw.loadPlugin(function (ui) {

    var graph = ui.editor.graph;
    var model = graph.getModel();


    var c = ui.sidebar.container;
    c.firstChild.click();
    c.insertBefore(c.lastChild, c.firstChild);
    c.insertBefore(c.lastChild, c.firstChild);


    // Добавление нового раздела меню с подразделами
    ui.menubar.addMenu('Dictionary constructors', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'classesConstructor');
        ui.menus.addMenuItem(menu, 'classPropertiesConstructor');
        ui.menus.addMenuItem(menu, 'relationshipsConstructor');
        ui.menus.addMenuItem(menu, 'enumConstructor');
    });

    ui.menubar.addMenu('Node constructors', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'startNodeConstructor');
        ui.menus.addMenuItem(menu, 'TrueNodeCreate');
        ui.menus.addMenuItem(menu, 'FalseNodeCreate');
        ui.menus.addMenuItem(menu, 'LogicNodeCreate');
        ui.menus.addMenuItem(menu, 'PredeterminingFactorsNodeCreate');
        ui.menus.addMenuItem(menu, 'UncertaintyNodeCreate');
        ui.menus.addMenuItem(menu, 'actionNodeConstructor');
        ui.menus.addMenuItem(menu, 'cycleNodeConstructor');
        ui.menus.addMenuItem(menu, 'conditionNodeConstructor');
        ui.menus.addMenuItem(menu, 'switchCaseNodeConstructor');
    });

    ui.menubar.addMenu('Exporting dictionaries', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'exportClass');
        ui.menus.addMenuItem(menu, 'exportProperty');
        ui.menus.addMenuItem(menu, 'exportRelationship');
        ui.menus.addMenuItem(menu, 'exportEnum');
    });

    ui.menubar.addMenu('Export tree', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'exportTree');
    });

    ui.menubar.addMenu('Edit', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'editDictionary');
        ui.menus.addMenuItem(menu, 'editNode');
        ui.menus.addMenuItem(menu, 'editTextInNode');
        ui.menus.addMenuItem(menu, 'editValueInOutcome');
    });


    // Привязывание действий к разделам меню
    mxResources.parse('classesConstructor=Classes constructor');

    mxResources.parse('classPropertiesConstructor=Class properties constructor');

    mxResources.parse('relationshipsConstructor=Relationships constructor');

    mxResources.parse('enumConstructor=Enum constructor');

    mxResources.parse('actionNodeConstructor=Action Node Constructor');

    mxResources.parse('cycleNodeConstructor=Cycle Node Constructor');

    mxResources.parse('conditionNodeConstructor=Condition Node Constructor');

    mxResources.parse('switchCaseNodeConstructor=Switch case Node Constructor');

    mxResources.parse('exportEnum=Export enum');

    mxResources.parse('exportClass=Export class');

    mxResources.parse('exportProperty=Export property');

    mxResources.parse('exportRelationship=Export relationship');

    mxResources.parse('TrueNodeCreate=Create true node');

    mxResources.parse('FalseNodeCreate=Create false node');

    mxResources.parse('LogicNodeCreate=Create logic node');

    mxResources.parse('PredeterminingFactorsNodeCreate=Create predetermining factors node');

    mxResources.parse('UncertaintyNodeCreate=Create node uncertainty');

    mxResources.parse('startNodeConstructor=Create start node');

    mxResources.parse('exportTree=Export');

    mxResources.parse('editNode=Edit node');

    mxResources.parse('editDictionary=Edit dictionary');

    mxResources.parse('editTextInNode=Edit text in node');

    mxResources.parse('editValueInOutcome=Edit value in outcome');

    // Создание действий для меню
    // Действие на отоброжение конструктора блока с классами
    ui.actions.addAction('classesConstructor', function () {
        if(!this.classConstructorWindow || !this.classConstructorWindow.window.content) {
            this.classConstructorWindow = new ClassConstructorWindow(ui, (document.body.offsetWidth - 480) / 2, 120, 420, 340);
            this.classConstructorWindow.window.setVisible(true);
        }
    });

    // Действие на отоброжение конструктора блока со свойствами классов
    ui.actions.addAction('classPropertiesConstructor', function () {
        if(!this.classPropertiesConstructorWindow || !this.classPropertiesConstructorWindow.window.content) {
            this.classPropertiesConstructorWindow = new ClassPropertiesConstructorWindow(ui, (document.body.offsetWidth - 480) / 2, 120, 420, 340);
            this.classPropertiesConstructorWindow.window.setVisible(true);
        }
    });

    // Действие на отоброжение конструктора enum
    ui.actions.addAction('enumConstructor', function () {
        if(!this.enumConstructorWindow || !this.enumConstructorWindow.window.content) {
            this.enumConstructorWindow = new EnumConstructorWindow(ui, (document.body.offsetWidth - 480) / 2, 120, 420, 340);
            this.enumConstructorWindow.window.setVisible(true);
        }
    });

    // Действие на отоброжение конструктора блока с отношениями для классов
    ui.actions.addAction('relationshipsConstructor', function () {
        if(!this.relationshipsConstructorWindow || !this.relationshipsConstructorWindow.window.content) {
            this.relationshipsConstructorWindow = new RelationshipsConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 820, 340);
            this.relationshipsConstructorWindow.window.setVisible(true);
        }
    });

    // Действие на отоброжение конструктора начального узла
    ui.actions.addAction('startNodeConstructor', function () {
        if(!this.startConstructorWindow || !this.startConstructorWindow.window.content) {
            this.startConstructorWindow = new StartConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            this.startConstructorWindow.window.setVisible(true);
        }
    });

    // Действие на создание узла ИСТИНА
    ui.actions.addAction('TrueNodeCreate', function () {
        var theGraph = ui.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 66, 30), "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;editable=0;");
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    // Действие на создание узла ЛОЖЬ
    ui.actions.addAction('FalseNodeCreate', function () {
        var theGraph = ui.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 66, 30), "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;editable=0;");
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    // Действие на создание логического узла 
    ui.actions.addAction('LogicNodeCreate', function () {
        if(!this.logicNodeConstructorWindow || !this.logicNodeConstructorWindow.window.content) {
            this.logicNodeConstructorWindow = new LogicNodeConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 300, 150);
            this.logicNodeConstructorWindow.window.setVisible(true);
        }
    });

    // Действие на создание узла "Предрешающий фактор"
    ui.actions.addAction('PredeterminingFactorsNodeCreate', function () {
        if(!this.predeterminingFactorsNodeConstructorWindow || !this.predeterminingFactorsNodeConstructorWindow.window.content) {
            this.predeterminingFactorsNodeConstructorWindow = new PredeterminingFactorsNodeConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 600, 300);
            this.predeterminingFactorsNodeConstructorWindow.window.setVisible(true);
        }
    });

    // Действие на создание узла неопределеноость предрешающего фактора
    ui.actions.addAction('UncertaintyNodeCreate', function () {
        var theGraph = ui.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 66, 30), "rounded=1;whiteSpace=wrap;html=1;fillColor=#e6e6e6;strokeColor=#666666;editable=0;");
            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
        }
    });

    // Действие на отоброжение конструктора узлов действия
    ui.actions.addAction('actionNodeConstructor', function () {
        if(!this.actionNodeConstructorWindow || !this.actionNodeConstructorWindow.window.content) {
            this.actionNodeConstructorWindow = new ActionNodeConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 900, 570);
            this.actionNodeConstructorWindow.window.setVisible(true);
        }
    });

    // Действие на отоброжение конструктора узлов цикла
    ui.actions.addAction('cycleNodeConstructor', function () {
        if(!this.cycleNodeConstructorWindow || !this.cycleNodeConstructorWindow.window.content) {
            this.cycleNodeConstructorWindow = new CycleNodeConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 900, 590);
            this.cycleNodeConstructorWindow.window.setVisible(true);
        }
    });

    // Действие на отоброжение конструктора узлов условия
    ui.actions.addAction('conditionNodeConstructor', function () {
        if(!this.conditionNodeConstructorWindow || !this.conditionNodeConstructorWindow.window.content) {
            this.conditionNodeConstructorWindow = new ConditionNodeConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            this.conditionNodeConstructorWindow.window.setVisible(true);
        }
    });

    // Действие на отоброжение конструктора узлов "switch case"
    ui.actions.addAction('switchCaseNodeConstructor', function () {
        if(!this.switchCaseNodeConstructorWindow || !this.switchCaseNodeConstructorWindow.window.content) {
            this.switchCaseNodeConstructorWindow = new SwitchCaseNodeConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            this.switchCaseNodeConstructorWindow.window.setVisible(true);
        }
    });

    ui.actions.addAction('exportEnum', function () {
        let text = exportEnums(getEnums(ui));
        downloadAsFile(text);

        function downloadAsFile(data) {
            let a = document.createElement("a");
            let file = new Blob([data], {type: 'text/csv'});
            a.href = URL.createObjectURL(file);
            a.download = "enums.csv";
            a.click();
        }
    });

    ui.actions.addAction('exportClass', function () {
        
        let text = exportClasses(getClasses(ui), globalWS);
        downloadAsFile(text);

        function downloadAsFile(data) {
            let a = document.createElement("a");
            let file = new Blob([data], {type: 'text/csv'});
            a.href = URL.createObjectURL(file);
            a.download = "classes.csv";
            a.click();
        }
    });

    ui.actions.addAction('exportProperty', function () {
        
        let text = exportProperties(getProperties(ui));
        downloadAsFile(text);

        function downloadAsFile(data) {
            let a = document.createElement("a");
            let file = new Blob([data], {type: 'text/csv'});
            a.href = URL.createObjectURL(file);
            a.download = "properties.csv";
            a.click();
        }
    });

    ui.actions.addAction('exportRelationship', function () {
        
        let text = exportRelastionships(getRelationships(ui));
        downloadAsFile(text);

        function downloadAsFile(data) {
            let a = document.createElement("a");
            let file = new Blob([data], {type: 'text/csv'});
            a.href = URL.createObjectURL(file);
            a.download = "relationships.csv";
            a.click();
        }
    });

    ui.actions.addAction('exportTree', function () {
        
        let text = treeToXml(ui);
        downloadAsFile(text);

        function downloadAsFile(data) {
            let a = document.createElement("a");
            let file = new Blob([data], {type: 'application/xml'});
            a.href = URL.createObjectURL(file);
            a.download = "tree.xml";
            a.click();
        }
    });

    ui.actions.addAction('editNode', function () {
        if (graph.isEnabled() && graph.getSelectionCount() == 1) {
            var selectedcell = graph.getSelectionCell();
            if(typeof selectedcell.value == "object" 
            && selectedcell.style == "ellipse;whiteSpace=wrap;html=1;rounded=0;editable=0;"
            && (!this.conditionNodeEditorWindow || !this.conditionNodeEditorWindow.window.content)) {
                this.conditionNodeEditorWindow = new ConditionNodeEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.conditionNodeEditorWindow.window.setVisible(true);
            } else if(typeof selectedcell.value == "object" 
            && selectedcell.style == "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;editable=0;"
            && (!this.actionNodeEditorWindow || !this.actionNodeEditorWindow.window.content)) {
                this.actionNodeEditorWindow = new ActionNodeEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 570);
                this.actionNodeEditorWindow.window.setVisible(true);
            } else if(typeof selectedcell.value == "object" 
            && selectedcell.value.getAttribute('operator')
            && (!this.cycleNodeEditorWindow || !this.cycleNodeEditorWindow.window.content)) {
                this.cycleNodeEditorWindow = new CycleNodeEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 590);
                this.cycleNodeEditorWindow.window.setVisible(true);
            } else if(typeof selectedcell.value == "object" 
            && selectedcell.style == "rhombus;whiteSpace=wrap;html=1;editable=0;"
            && (!this.switchCaseNodeEditorWindow || !this.switchCaseNodeEditorWindow.window.content)) {
                this.switchCaseNodeEditorWindow = new SwitchCaseNodeEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.switchCaseNodeEditorWindow.window.setVisible(true);
            } else if(typeof selectedcell.value == "object" 
            && selectedcell.value.getAttribute('type') == "START"
            && (!this.startEditorWindow || !this.startEditorWindow.window.content)) {
                this.startEditorWindow = new StartEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.startEditorWindow.window.setVisible(true);
            } else if(typeof selectedcell.value == "object" 
            && selectedcell.value.getAttribute('type') == "predetermining"
            && (!this.predeterminingFactorsNodeEditorWindow || !this.predeterminingFactorsNodeEditorWindow.window.content)) {
                this.predeterminingFactorsNodeEditorWindow = new PredeterminingFactorsNodeEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.predeterminingFactorsNodeEditorWindow.window.setVisible(true);
            } else if(typeof selectedcell.value == "object" 
            && (selectedcell.value.getAttribute('type') == "AND" || selectedcell.value.getAttribute('type') == "OR")
            && (!this.logicNodeEditorWindow || !this.logicNodeEditorWindow.window.content)) {
                this.logicNodeEditorWindow = new LogicNodeEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.logicNodeEditorWindow.window.setVisible(true);
            }
        }
    });

    ui.actions.addAction('editTextInNode', function () {
        //FIXME: проверка на стрелки еще надо добавить
        if (graph.isEnabled() && graph.getSelectionCount() == 1) {
            var selectedcell = graph.getSelectionCell();
            if(typeof selectedcell.value != "object" && !selectedcell.edge || 
            typeof selectedcell.value == "object" && selectedcell.value.getAttribute("type") != "START" && !selectedcell.edge) {
                this.editTextInNodeWindow = new EditTextInNodeWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.editTextInNodeWindow.window.setVisible(true);
            }
        }
    });

    ui.actions.addAction('editValueInOutcome', function () {
        if (graph.isEnabled() && graph.getSelectionCount() == 1) {
            var selectedcell = graph.getSelectionCell();
            if(selectedcell.edge) {
                this.editValueInOutcomeWindow = new EditValueInOutcomeWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.editValueInOutcomeWindow.window.setVisible(true);
            }
        }
    });

    ui.actions.addAction('editDictionary', function () {
        if (graph.isEnabled() && graph.getSelectionCount() == 1) {
            var selectedcell = graph.getSelectionCell();
            if(typeof selectedcell.value == "object" 
            && selectedcell.value.getAttribute('label').startsWith('<font color="#000000"><b>Classes</b></font>')
            && (!this.classEditorWindow || !this.classEditorWindow.window.content)) {
                this.classEditorWindow = new ClassEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.classEditorWindow.window.setVisible(true);
            } else if(typeof selectedcell.value == "string"
            && selectedcell.value.startsWith('<font color="#000000"><b>Enum</b></font>')
            && (!this.enumEditorWindow || !this.enumEditorWindow.window.content)) {
                this.enumEditorWindow = new EnumEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.enumEditorWindow.window.setVisible(true);
            } else if(typeof selectedcell.value == "string"
            && selectedcell.value.startsWith('<b><font color="#000000">Class properties</font></b>')
            && (!this.classPropertiesEditorWindow || !this.classPropertiesEditorWindow.window.content)) {
                this.classPropertiesEditorWindow = new ClassPropertiesEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.classPropertiesEditorWindow.window.setVisible(true);
            } else if(typeof selectedcell.value == "string"
            && selectedcell.value.startsWith('<b><font color="#000000">Relationships between objects</font></b>')
            && (!this.relationshipsEditorWindow || !this.relationshipsEditorWindow.window.content)) {
                this.relationshipsEditorWindow = new RelationshipsEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.relationshipsEditorWindow.window.setVisible(true);
            }
        }
    });
});

var divForGlobalWS = document.createElement('div');
divForGlobalWS.id = "globalWS";
document.body.appendChild(divForGlobalWS);
var globalWS = Blockly.inject('globalWS', { toolbox: toolbox });