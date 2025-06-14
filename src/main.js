import { getTextByLocale } from './utils/locale.js';
import { toolbox } from './utils/blocks.js';
import { ClassConstructorWindow } from './dictionaries/ClassConstructor.js';
import { ClassEditorWindow } from './dictionaries/ClassEditor.js';
import { ClassPropertiesConstructorWindow } from './dictionaries/ClassPropertiesConstructor.js';
import { ClassPropertiesEditorWindow } from './dictionaries/ClassPropertiesEditor.js';
import { EnumConstructorWindow } from './dictionaries/EnumConstructor.js';
import { EnumEditorWindow } from './dictionaries/EnumEditor.js';
import { RelationshipsConstructorWindow } from './dictionaries/RelationshipsConstructor.js';
import { RelationshipsEditorWindow } from './dictionaries/RelationshipsEditor.js';
import { StartConstructorWindow } from './tree_nodes/StartNodeConstructor.js';
import { StartEditorWindow } from './tree_nodes/StartNodeEditor.js';
import { ActionNodeConstructorWindow } from './tree_nodes/ActionNodeConstructor.js';
import { ActionNodeEditorWindow } from './tree_nodes/ActionNodeEditor.js';
import { BranchResultNodeConstructorWindow } from './tree_nodes/BranchResultNodeContructor.js';
import { BranchResultNodeEditorWindow } from './tree_nodes/BranchResultNodeEditor.js';
import { ConditionNodeConstructorWindow } from './tree_nodes/ConditionNodeConstructor.js';
import { ConditionNodeEditorWindow } from './tree_nodes/ConditionNodeEditor.js';
import { ConvertToActionNode } from './tree_nodes/ConvertToActionNode.js';
import { ConvertToCycleNode } from './tree_nodes/ConvertToCycleNode.js';
import { ConvertToFalseNode } from './tree_nodes/ConvertToFalseNode.js';
import { ConvertToLogicNode } from './tree_nodes/ConvertToLogicNode.js';
import { ConvertToPredeterminingFactorsNode } from './tree_nodes/ConvertToPredeterminingFactorsNode.js';
import { ConvertToQuestionNode } from './tree_nodes/ConvertToQuestionNode.js';
import { ConvertToStartNode } from './tree_nodes/ConvertToStartNode.js';
import { ConvertToSwitchCaseNode } from './tree_nodes/ConvertToSwitchCaseNode.js';
import { ConvertToTrueNode } from './tree_nodes/ConvertToTrueNode.js';
import { ConvertToUncertaintyNode } from './tree_nodes/ConvertToUncertaintyNode.js';
import { CycleNodeConstructorWindow } from './tree_nodes/CycleNodeConstructor.js';
import { CycleNodeEditorWindow } from './tree_nodes/CycleNodeEditor.js';
import { EditTextInNodeWindow } from './tree_nodes/EditTextInNode.js';
import { EditValueInOutcomeWindow } from './tree_nodes/EditValueInOutcome.js';
import { LogicNodeConstructorWindow } from './tree_nodes/LogicNodeConstructor.js';
import { LogicNodeEditorWindow } from './tree_nodes/LogicNodeEditor.js';
import { PredeterminingFactorsNodeConstructorWindow } from './tree_nodes/PredeterminingFactorsNodeConstructor.js';
import { PredeterminingFactorsNodeEditorWindow } from './tree_nodes/PredeterminingFactorsNodeEditor.js';
import { EditQuestionInfoInNodeWindow } from './tree_nodes/QuestionInfoInNodeEditor.js';
import { EditQuestionInfoInOutcomeWindow } from './tree_nodes/QuestionInfoInOutcome.js';
import { SwitchCaseNodeConstructorWindow } from './tree_nodes/SwitchCaseNodeConstructor.js';
import { SwitchCaseNodeEditorWindow } from './tree_nodes/SwitchCaseNodeEditor.js';
import { WhileNodeConstructorWindow } from './tree_nodes/WhileNodeConstructor.js';
import { WhileNodeEditorWindow } from './tree_nodes/WhileNodeEditor.js';
import { getEnums, getClasses, getProperties, getRelationships } from './dictionaries/Utils.js';
import { exportEnums, exportClasses, exportProperties, exportRelastionships } from './export/Export.js';
import { treeToXml } from './utils/tree_to_xml.js';

// Плагин
export function loadPlugin() {
    Draw.loadPlugin(function (ui) {

        var graph = ui.editor.graph; //Полотно Draw io
        var model = graph.getModel();


        var c = ui.sidebar.container;
        c.firstChild.click();
        c.insertBefore(c.lastChild, c.firstChild);
        c.insertBefore(c.lastChild, c.firstChild);


        // Добавление нового раздела меню с подразделами
        ui.menubar.addMenu(getTextByLocale("menuItemDictionaryConstructors"), function (menu, parent) {
            ui.menus.addMenuItem(menu, 'classesConstructor');
            ui.menus.addMenuItem(menu, 'classPropertiesConstructor');
            ui.menus.addMenuItem(menu, 'relationshipsConstructor');
            ui.menus.addMenuItem(menu, 'enumConstructor');
        }, ui.menubar.editorUi.statusContainer);

        ui.menubar.addMenu(getTextByLocale("menuItemNodeConstructors"), function (menu, parent) {
            ui.menus.addMenuItem(menu, 'startNodeConstructor');
            ui.menus.addMenuItem(menu, 'TrueNodeCreate');
            ui.menus.addMenuItem(menu, 'FalseNodeCreate');
            ui.menus.addMenuItem(menu, 'LogicNodeCreate');
            ui.menus.addMenuItem(menu, 'PredeterminingFactorsNodeCreate');
            ui.menus.addMenuItem(menu, 'UncertaintyNodeCreate');
            ui.menus.addMenuItem(menu, 'actionNodeConstructor');
            ui.menus.addMenuItem(menu, 'cycleNodeConstructor');
            ui.menus.addMenuItem(menu, 'whileNodeConstructor');
            ui.menus.addMenuItem(menu, 'conditionNodeConstructor');
            ui.menus.addMenuItem(menu, 'switchCaseNodeConstructor');
        }, ui.menubar.editorUi.statusContainer);

        ui.menubar.addMenu(getTextByLocale("menuItemExport"), function (menu, parent) {
            ui.menus.addMenuItem(menu, 'exportClass');
            ui.menus.addMenuItem(menu, 'exportProperty');
            ui.menus.addMenuItem(menu, 'exportRelationship');
            ui.menus.addMenuItem(menu, 'exportEnum');
            ui.menus.addMenuItem(menu, 'exportTree');
        }, ui.menubar.editorUi.statusContainer);

        ui.menubar.addMenu(getTextByLocale("menuItemEdit"), function (menu, parent) {
            ui.menus.addMenuItem(menu, 'editValue');
            ui.menus.addMenuItem(menu, 'editTextInNode');
            ui.menus.addMenuItem(menu, 'editQuestionInfo');
        }, ui.menubar.editorUi.statusContainer);

        ui.menubar.addMenu(getTextByLocale("menuItemConverNode"), function (menu, parent) {
            ui.menus.addMenuItem(menu, 'convertStartNode');
            ui.menus.addMenuItem(menu, 'convertTrueNode');
            ui.menus.addMenuItem(menu, 'convertFalseNode');
            ui.menus.addMenuItem(menu, 'convertLogicNode');
            ui.menus.addMenuItem(menu, 'convertPredeterminingFactorsNode');
            ui.menus.addMenuItem(menu, 'convertUncertaintyNode');
            ui.menus.addMenuItem(menu, 'convertActionNode');
            ui.menus.addMenuItem(menu, 'convertCycleNode');
            ui.menus.addMenuItem(menu, 'convertConditionNode');
            ui.menus.addMenuItem(menu, 'convertSwitchCaseNode');
        }, ui.menubar.editorUi.statusContainer);


        // Привязывание действий к разделам меню
        mxResources.parse('classesConstructor=' + getTextByLocale("classesConstructor"));

        mxResources.parse('classPropertiesConstructor=' + getTextByLocale("classPropertiesConstructor"));

        mxResources.parse('relationshipsConstructor=' + getTextByLocale("relationshipsConstructor"));

        mxResources.parse('enumConstructor=' + getTextByLocale("enumConstructor"));

        mxResources.parse('actionNodeConstructor=' + getTextByLocale("actionNodeConstructor"));

        mxResources.parse('cycleNodeConstructor=' + getTextByLocale("cycleNodeConstructor"));

        mxResources.parse('whileNodeConstructor=' + getTextByLocale("whileNodeConstructor"));

        mxResources.parse('conditionNodeConstructor=' + getTextByLocale("conditionNodeConstructor"));

        mxResources.parse('switchCaseNodeConstructor=' + getTextByLocale("switchCaseNodeConstructor"));

        mxResources.parse('exportEnum=' + getTextByLocale("exportEnum"));

        mxResources.parse('exportClass=' + getTextByLocale("exportClass"));

        mxResources.parse('exportProperty=' + getTextByLocale("exportProperty"));

        mxResources.parse('exportRelationship=' + getTextByLocale("exportRelationship"));

        mxResources.parse('TrueNodeCreate=' + getTextByLocale("TrueNodeCreate"));

        mxResources.parse('FalseNodeCreate=' + getTextByLocale("FalseNodeCreate"));

        mxResources.parse('LogicNodeCreate=' + getTextByLocale("LogicNodeCreate"));

        mxResources.parse('PredeterminingFactorsNodeCreate=' + getTextByLocale("PredeterminingFactorsNodeCreate"));

        mxResources.parse('UncertaintyNodeCreate=' + getTextByLocale("UncertaintyNodeCreate"));

        mxResources.parse('startNodeConstructor=' + getTextByLocale("startNodeConstructor"));

        mxResources.parse('exportTree=' + getTextByLocale("exportTree"));

        mxResources.parse('editValue=' + getTextByLocale("editValue"));

        mxResources.parse('editTextInNode=' + getTextByLocale("editTextInNode"));

        mxResources.parse('editQuestionInfo=' + getTextByLocale("editQuestionInfo"));

        mxResources.parse('convertStartNode=' + getTextByLocale("convertStartNode"));

        mxResources.parse('convertTrueNode=' + getTextByLocale("convertTrueNode"));

        mxResources.parse('convertFalseNode=' + getTextByLocale("convertFalseNode"));

        mxResources.parse('convertLogicNode=' + getTextByLocale("convertLogicNode"));

        mxResources.parse('convertPredeterminingFactorsNode=' + getTextByLocale("convertPredeterminingFactorsNode"));

        mxResources.parse('convertUncertaintyNode=' + getTextByLocale("convertUncertaintyNode"));

        mxResources.parse('convertActionNode=' + getTextByLocale("convertActionNode"));

        mxResources.parse('convertCycleNode=' + getTextByLocale("convertCycleNode"));

        mxResources.parse('convertConditionNode=' + getTextByLocale("convertConditionNode"));

        mxResources.parse('convertSwitchCaseNode=' + getTextByLocale("convertSwitchCaseNode"));

        // Создание действий для меню
        // Действие на отоброжение конструктора блока с классами
        ui.actions.addAction('classesConstructor', function () {
            if (!this.classConstructorWindow || !this.classConstructorWindow.window.content) {
                this.classConstructorWindow = new ClassConstructorWindow(ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.classConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на отоброжение конструктора блока со свойствами классов
        ui.actions.addAction('classPropertiesConstructor', function () {
            if (!this.classPropertiesConstructorWindow || !this.classPropertiesConstructorWindow.window.content) {
                this.classPropertiesConstructorWindow = new ClassPropertiesConstructorWindow(ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.classPropertiesConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на отоброжение конструктора enum
        ui.actions.addAction('enumConstructor', function () {
            if (!this.enumConstructorWindow || !this.enumConstructorWindow.window.content) {
                this.enumConstructorWindow = new EnumConstructorWindow(ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.enumConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на отоброжение конструктора блока с отношениями для классов
        ui.actions.addAction('relationshipsConstructor', function () {
            if (!this.relationshipsConstructorWindow || !this.relationshipsConstructorWindow.window.content) {
                this.relationshipsConstructorWindow = new RelationshipsConstructorWindow(ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.relationshipsConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на отоброжение конструктора начального узла
        ui.actions.addAction('startNodeConstructor', function () {
            if (!this.startConstructorWindow || !this.startConstructorWindow.window.content) {
                this.startConstructorWindow = new StartConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                this.startConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на создание узла ИСТИНА
        ui.actions.addAction('TrueNodeCreate', function () {
            if (!this.branchResultNodeConstructorWindow || !this.branchResultNodeConstructorWindow.window.content) {
                this.branchResultNodeConstructorWindow = new BranchResultNodeConstructorWindow(ui, true, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.branchResultNodeConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на создание узла ЛОЖЬ
        ui.actions.addAction('FalseNodeCreate', function () {
            if (!this.branchResultNodeConstructorWindow || !this.branchResultNodeConstructorWindow.window.content) {
                this.branchResultNodeConstructorWindow = new BranchResultNodeConstructorWindow(ui, false, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.branchResultNodeConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на создание логического узла 
        ui.actions.addAction('LogicNodeCreate', function () {
            if (!this.logicNodeConstructorWindow || !this.logicNodeConstructorWindow.window.content) {
                this.logicNodeConstructorWindow = new LogicNodeConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 300, 150);
                this.logicNodeConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на создание узла "Предрешающий фактор"
        ui.actions.addAction('PredeterminingFactorsNodeCreate', function () {
            if (!this.predeterminingFactorsNodeConstructorWindow || !this.predeterminingFactorsNodeConstructorWindow.window.content) {
                this.predeterminingFactorsNodeConstructorWindow = new PredeterminingFactorsNodeConstructorWindow(ui, (document.body.offsetWidth - 880) / 2, 120, 600, 150);
                this.predeterminingFactorsNodeConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на создание узла неопределеноость предрешающего фактора
        ui.actions.addAction('UncertaintyNodeCreate', function () {
            if (!this.branchResultNodeConstructorWindow || !this.branchResultNodeConstructorWindow.window.content) {
                this.branchResultNodeConstructorWindow = new BranchResultNodeConstructorWindow(ui, null, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.branchResultNodeConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на отоброжение конструктора узлов действия
        ui.actions.addAction('actionNodeConstructor', function () {
            if (!this.actionNodeConstructorWindow || !this.actionNodeConstructorWindow.window.content) {
                this.actionNodeConstructorWindow = new ActionNodeConstructorWindow(ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.actionNodeConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на отоброжение конструктора узлов цикла
        ui.actions.addAction('cycleNodeConstructor', function () {
            if (!this.cycleNodeConstructorWindow || !this.cycleNodeConstructorWindow.window.content) {
                this.cycleNodeConstructorWindow = new CycleNodeConstructorWindow(ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.cycleNodeConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на отоброжение конструктора узлов while
        ui.actions.addAction('whileNodeConstructor', function () {
            if (!this.whileNodeConstructorWindow || !this.whileNodeConstructorWindow.window.content) {
                this.whileNodeConstructorWindow = new WhileNodeConstructorWindow(ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.whileNodeConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на отоброжение конструктора узлов условия
        ui.actions.addAction('conditionNodeConstructor', function () {
            if (!this.conditionNodeConstructorWindow || !this.conditionNodeConstructorWindow.window.content) {
                this.conditionNodeConstructorWindow = new ConditionNodeConstructorWindow(ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.conditionNodeConstructorWindow.window.setVisible(true);
            }
        });

        // Действие на отоброжение конструктора узлов "switch case"
        ui.actions.addAction('switchCaseNodeConstructor', function () {
            if (!this.switchCaseNodeConstructorWindow || !this.switchCaseNodeConstructorWindow.window.content) {
                this.switchCaseNodeConstructorWindow = new SwitchCaseNodeConstructorWindow(ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                this.switchCaseNodeConstructorWindow.window.setVisible(true);
            }
        });

        ui.actions.addAction('exportEnum', function () {
            let text = exportEnums(getEnums(ui));
            downloadAsFile(text);

            function downloadAsFile(data) {
                let a = document.createElement("a");
                let file = new Blob([data], { type: 'text/csv' });
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
                let file = new Blob([data], { type: 'text/csv' });
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
                let file = new Blob([data], { type: 'text/csv' });
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
                let file = new Blob([data], { type: 'text/csv' });
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
                let file = new Blob([data], { type: 'application/xml' });
                a.href = URL.createObjectURL(file);
                a.download = "tree.xml";
                a.click();
            }
        });

        ui.actions.addAction('editValue', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.style == "ellipse;whiteSpace=wrap;html=1;rounded=0;editable=0;"
                    && (!this.conditionNodeEditorWindow || !this.conditionNodeEditorWindow.window.content)) {
                    this.conditionNodeEditorWindow = new ConditionNodeEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.conditionNodeEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.style == "rounded=1;whiteSpace=wrap;html=1;fontFamily=Helvetica;fontSize=12;editable=0;"
                    && (!this.actionNodeEditorWindow || !this.actionNodeEditorWindow.window.content)) {
                    this.actionNodeEditorWindow = new ActionNodeEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.actionNodeEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.value.getAttribute('operator')
                    && selectedcell.value.getAttribute('typeCycle')
                    && (!this.whileNodeEditorWindow || !this.whileNodeEditorWindow.window.content)) {
                    this.whileNodeEditorWindow = new WhileNodeEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.whileNodeEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.value.getAttribute('operator')
                    && (!this.cycleNodeEditorWindow || !this.cycleNodeEditorWindow.window.content)) {
                    this.cycleNodeEditorWindow = new CycleNodeEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.cycleNodeEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.style == "rhombus;whiteSpace=wrap;html=1;editable=0;"
                    && (!this.switchCaseNodeEditorWindow || !this.switchCaseNodeEditorWindow.window.content)) {
                    this.switchCaseNodeEditorWindow = new SwitchCaseNodeEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.switchCaseNodeEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.value.getAttribute('type') == "START"
                    && (!this.startEditorWindow || !this.startEditorWindow.window.content)) {
                    this.startEditorWindow = new StartEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                    this.startEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.value.getAttribute('type') == "predetermining"
                    && (!this.predeterminingFactorsNodeEditorWindow || !this.predeterminingFactorsNodeEditorWindow.window.content)) {
                    this.predeterminingFactorsNodeEditorWindow = new PredeterminingFactorsNodeEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 600, 150);
                    this.predeterminingFactorsNodeEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && (selectedcell.value.getAttribute('type') == "AND" || selectedcell.value.getAttribute('type') == "OR")
                    && (!this.logicNodeEditorWindow || !this.logicNodeEditorWindow.window.content)) {
                    this.logicNodeEditorWindow = new LogicNodeEditorWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 300, 150);
                    this.logicNodeEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;editable=0;"
                    && (!this.branchResultNodeEditorWindow || !this.branchResultNodeEditorWindow.window.content)) {
                    this.branchResultNodeEditorWindow = new BranchResultNodeEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.branchResultNodeEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;editable=0;"
                    && (!this.branchResultNodeEditorWindow || !this.branchResultNodeEditorWindow.window.content)) {
                    this.branchResultNodeEditorWindow = new BranchResultNodeEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.branchResultNodeEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.style == "rounded=1;whiteSpace=wrap;html=1;fillColor=#e6e6e6;strokeColor=#666666;editable=0;"
                    && (!this.branchResultNodeEditorWindow || !this.branchResultNodeEditorWindow.window.content)) {
                    this.branchResultNodeEditorWindow = new BranchResultNodeEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.branchResultNodeEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.value.getAttribute('label').startsWith('<font color="#000000"><b>Classes</b></font>')
                    && (!this.classEditorWindow || !this.classEditorWindow.window.content)) {
                    this.classEditorWindow = new ClassEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.classEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "string"
                    && selectedcell.value.startsWith('<font color="#000000"><b>Enum</b></font>')
                    && (!this.enumEditorWindow || !this.enumEditorWindow.window.content)) {
                    this.enumEditorWindow = new EnumEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.enumEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "string"
                    && selectedcell.value.startsWith('<b><font color="#000000">Class and Object properties</font></b>')
                    && (!this.classPropertiesEditorWindow || !this.classPropertiesEditorWindow.window.content)) {
                    this.classPropertiesEditorWindow = new ClassPropertiesEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.classPropertiesEditorWindow.window.setVisible(true);
                } else if (selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.value.getAttribute('label').startsWith('<b><font color="#000000">Relationships between objects</font></b>')
                    && (!this.relationshipsEditorWindow || !this.relationshipsEditorWindow.window.content)) {
                    this.relationshipsEditorWindow = new RelationshipsEditorWindow(selectedcell, ui, document.body.offsetLeft + 100, document.body.offsetTop + 100, window.screen.width - 200, window.screen.height - 300);
                    this.relationshipsEditorWindow.window.setVisible(true);
                } else if (selectedcell.edge) {
                    this.editValueInOutcomeWindow = new EditValueInOutcomeWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 200);
                    this.editValueInOutcomeWindow.window.setVisible(true);
                }
            }
        });

        ui.actions.addAction('editTextInNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                if (selectedcell.value != null && selectedcell.value != "" && typeof selectedcell.value != "object"
                    && !selectedcell.value.startsWith('<font color="#000000"><b>Enum</b></font>')
                    && !selectedcell.value.startsWith('<b><font color="#000000">Class and Object properties</font></b>')
                    && selectedcell.style != "rounded=1;whiteSpace=wrap;html=1;fillColor=#e6e6e6;strokeColor=#666666;editable=0;" && !selectedcell.edge
                    || selectedcell.value != null && typeof selectedcell.value == "object"
                    && !selectedcell.value.getAttribute('label').startsWith('<font color="#000000"><b>Classes</b></font>')
                    && !selectedcell.value.getAttribute('label').startsWith('<b><font color="#000000">Relationships between objects</font></b>')
                    && selectedcell.value.getAttribute('type') != "AND"
                    && selectedcell.value.getAttribute('type') != "OR"
                    && selectedcell.value.getAttribute('type') != "predetermining"
                    && selectedcell.value.getAttribute("type") != "START" && !selectedcell.edge) {
                    this.editTextInNodeWindow = new EditTextInNodeWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                    this.editTextInNodeWindow.window.setVisible(true);
                }
            }
        });

        ui.actions.addAction('editQuestionInfo', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                if (selectedcell.value != null && selectedcell.value != "" && typeof selectedcell.value != "object"
                    && !selectedcell.value.startsWith('<font color="#000000"><b>Enum</b></font>')
                    && !selectedcell.value.startsWith('<b><font color="#000000">Class and Object properties</font></b>')
                    && selectedcell.style != "rounded=1;whiteSpace=wrap;html=1;fillColor=#e6e6e6;strokeColor=#666666;editable=0;" && !selectedcell.edge
                    || selectedcell.value != null && typeof selectedcell.value == "object"
                    && selectedcell.style != "rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;editable=0;"
                    && selectedcell.style != "rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;editable=0;"
                    && !selectedcell.value.getAttribute('label').startsWith('<font color="#000000"><b>Classes</b></font>')
                    && !selectedcell.value.getAttribute('label').startsWith('<b><font color="#000000">Relationships between objects</font></b>')
                    && selectedcell.value.getAttribute("type") != "START" && !selectedcell.edge) {
                    this.editQuestionInfoInNodeWindow = new EditQuestionInfoInNodeWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                    this.editQuestionInfoInNodeWindow.window.setVisible(true);
                } else if (selectedcell.edge) {
                    this.editQuestionInfoInOutcomeWindow = new EditQuestionInfoInOutcomeWindow(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
                    this.editQuestionInfoInOutcomeWindow.window.setVisible(true);
                }
            }
        });


        //--------------------------Convert-----------------------------

        ui.actions.addAction('convertStartNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                this.convertToQuestionNode = new ConvertToStartNode(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            }
        });

        ui.actions.addAction('convertTrueNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                this.convertToQuestionNode = new ConvertToTrueNode(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            }
        });

        ui.actions.addAction('convertFalseNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                this.convertToQuestionNode = new ConvertToFalseNode(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            }
        });

        ui.actions.addAction('convertLogicNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                this.convertToQuestionNode = new ConvertToLogicNode(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            }
        });

        ui.actions.addAction('convertPredeterminingFactorsNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                this.convertToQuestionNode = new ConvertToPredeterminingFactorsNode(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            }
        });

        ui.actions.addAction('convertUncertaintyNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                this.convertToQuestionNode = new ConvertToUncertaintyNode(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            }
        });

        ui.actions.addAction('convertActionNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                this.convertToQuestionNode = new ConvertToActionNode(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            }
        });

        ui.actions.addAction('convertCycleNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                this.convertToQuestionNode = new ConvertToCycleNode(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            }
        });

        ui.actions.addAction('convertConditionNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                this.convertToQuestionNode = new ConvertToQuestionNode(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            }
        });

        ui.actions.addAction('convertSwitchCaseNode', function () {
            if (graph.isEnabled() && graph.getSelectionCount() == 1) {
                var selectedcell = graph.getSelectionCell();
                this.convertToQuestionNode = new ConvertToSwitchCaseNode(selectedcell, ui, (document.body.offsetWidth - 880) / 2, 120, 900, 550);
            }
        });
    });
}
//Создание области для блоков в Blockly, для конвертации кода в блоки, чтобы потом получить xml выражений
var divForGlobalWS = document.createElement('div');
divForGlobalWS.id = "globalWS";
document.body.appendChild(divForGlobalWS);
export var globalWS = Blockly.inject('globalWS', { toolbox: toolbox });

loadPlugin();