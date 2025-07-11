import { styleBtn, styleDivBtn, styleTextAreaExp, styleBlocklyAreaExp } from '../utils/style.js';
import { getTextByLocale } from '../utils/locale.js';
import { toolbox } from '../utils/blocks.js';
import { parser, root } from '../utils/parser.js';
import { toBlock } from '../utils/code_to_block.js';
import { generateCode } from '../utils/utils.js';
import * as Blockly from 'blockly';

// Окно коструктора узлов условий
export var SwitchCaseNodeConstructorWindow = function (editorUi, x, y, w, h) {

    // Верстка окна
    var div = document.createElement('div');
    div.style.height = "100%";
    var divText = document.createElement('div');
    divText.style.height = "100%";
    var divBlockly = document.createElement('div');
    divBlockly.style.height = "100%";
    divBlockly.style.display = "none";


    //Экран с текстом
    var text = document.createElement('textarea');
    text = styleTextAreaExp(text);
    text.style.height = "90%";

    // Кнопка создания узла
    var btnCreateNodeInText = mxUtils.button(getTextByLocale("Create"), function () {

        var expression = divText.getElementsByTagName("textarea").item(0).value;
        if (expression) {
            //TODO: Возможно сделать обработку ошибок и выводить свои ошибки
            parser.parse(expression)
        } else {
            throw new Error(getTextByLocale("ExpressionIsMissing"));
        }

        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 80, 80), "rhombus;whiteSpace=wrap;html=1;editable=0;");

            //TODO: Возможно сделать подсветку в самом узле 

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'expression', expression);
        }
        win.destroy();
    });

    var workspace;

    // Кнопка переключение на Blockly
    var btnSwitchToBlockly = mxUtils.button(getTextByLocale("SwitchBlockly"), function () {
        var expression = divText.getElementsByTagName("textarea").item(0).value;
        if (expression) {
            parser.parse(expression)
        }
        divText.style.display = "none";
        divBlockly.style.display = "block";
        nestedDiv.innerHTML = "";
        workspace = Blockly.inject('switchCaseCreateBlocklyDiv', { toolbox: toolbox });
        workspace.clear();
        if (expression) {
            parser.parse(expression)
            toBlock(root, workspace);
        }
    });

    divText.appendChild(text);
    var btnTextDiv = document.createElement('div');
    btnTextDiv = styleDivBtn(btnTextDiv);
    btnTextDiv.style.height = "10%";
    btnCreateNodeInText = styleBtn(btnCreateNodeInText);
    btnSwitchToBlockly = styleBtn(btnSwitchToBlockly);
    btnTextDiv.appendChild(btnCreateNodeInText);
    btnTextDiv.appendChild(btnSwitchToBlockly);
    divText.appendChild(btnTextDiv);
    div.appendChild(divText);


    //Экран с blockly
    var nestedDiv = document.createElement('div');
    nestedDiv.id = "switchCaseCreateBlocklyDiv";
    nestedDiv = styleBlocklyAreaExp(nestedDiv, w, h)
    nestedDiv.style.height = h * 0.88 + 'px';

    // Кнопка создания узла
    var btnCreateNodeInBlockly = mxUtils.button(getTextByLocale("Create"), function () {
        var code = generateCode(workspace);
        if (!code) {
            throw new Error(getTextByLocale("ExpressionIsMissing"));
        } else {
            try {
                parser.parse(code);
            } catch (e) {
                throw new Error(getTextByLocale("EmptyConnection"));
            }
        }

        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 80, 80), "rhombus;whiteSpace=wrap;html=1;editable=0;");


            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            theGraph.setAttributeForCell(newElement, 'expression', code);
        }
        win.destroy();
    });

    //кнопка переключения на текстовый вариант
    var btnSwitchToText = mxUtils.button(getTextByLocale("SwitchText"), function () {
        var code = generateCode(workspace);
        divBlockly.style.display = "none";
        divText.style.display = "block";
        divText.getElementsByTagName("textarea").item(0).value = code;
    });

    divBlockly.appendChild(nestedDiv);
    var btnBlockDiv = document.createElement('div');
    btnBlockDiv = styleDivBtn(btnBlockDiv);
    btnBlockDiv.style.height = "8%";
    btnCreateNodeInBlockly = styleBtn(btnCreateNodeInBlockly);
    btnSwitchToText = styleBtn(btnSwitchToText);
    btnBlockDiv.appendChild(btnCreateNodeInBlockly);
    btnBlockDiv.appendChild(btnSwitchToText);
    divBlockly.appendChild(btnBlockDiv);
    div.appendChild(divBlockly);


    // Настройки окна
    var win = new mxWindow(getTextByLocale("TitleSwitchCaseNodeConstructorWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.contentWrapper.style.height = "100%";
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
