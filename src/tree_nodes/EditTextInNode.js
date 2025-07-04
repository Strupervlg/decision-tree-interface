import { styleBtn, styleDivBtn } from '../utils/style.js';
import { getTextByLocale } from '../utils/locale.js';
import { getTextFromCode } from '../utils/utils.js';

// Окно редактирования человекочитаемого текста узлов
export var EditTextInNodeWindow = function (cell, editorUi, x, y, w, h) {

    var graph = editorUi.editor.graph;

    // Верстка окна
    var div = document.createElement('div');
    var divText = document.createElement('div');
    var text = document.createElement('textarea');
    text.style.width = "100%";
    text.style.resize = "none";
    text.style.height = "400px";
    text.style.fontSize = "30px";
    if (typeof cell.value == "object") {
        text.value = cell.value.getAttribute("label");
    } else {
        text.value = cell.value;
    }
    var expr = cell.value.getAttribute("expression");

    // Кнопка создания узла
    var btnSaveTextInNode = mxUtils.button(getTextByLocale("Save"), function () {
        var textInNode = divText.getElementsByTagName("textarea").item(0).value;
        graph.getModel().beginUpdate();
        if (typeof cell.value == "object") {
            cell.value.setAttribute("label", textInNode);
        } else {
            cell.setValue(textInNode);
        }
        graph.getModel().endUpdate();
        graph.refresh(); // update the graph
        win.destroy();
    });

    // Кнопка генерации человекочитаемого текста
    var btnGenerateTextInNode = mxUtils.button(getTextByLocale("Generate"), function () {
        let code = "";
        if (typeof cell.value == "object") {
            code = cell.value.getAttribute("expression");
        }
        let textInNode = getTextFromCode(code, editorUi)
        if (textInNode != "") {
            text.value = textInNode;
        }
    });

    var divExprText = document.createElement('div');
    divExprText.innerHTML = getTextByLocale("ExpressionInNode") + expr;
    divExprText.style.height = "60px";
    divExprText.style.overflow = "scroll";
    divExprText.style.fontSize = "20px";
    divText.appendChild(divExprText);
    divText.appendChild(text);
    var btnDiv = document.createElement('div');
    btnDiv = styleDivBtn(btnDiv);
    btnDiv.style.marginTop = "10px";
    btnSaveTextInNode = styleBtn(btnSaveTextInNode);
    btnGenerateTextInNode = styleBtn(btnGenerateTextInNode);
    btnDiv.appendChild(btnSaveTextInNode);
    btnDiv.appendChild(btnGenerateTextInNode);
    div.appendChild(divText);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow(getTextByLocale("TitleEditTextInNodeWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
