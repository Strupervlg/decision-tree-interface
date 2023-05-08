// Окно редактирования информации для вопросов в узлах
var EditQuestionInfoInNodeWindow = function (cell, editorUi, x, y, w, h) {

    var graph = editorUi.editor.graph;

    let isLogicAggreg = cell.value.getAttribute("type") == "AND" || cell.value.getAttribute("type") == "OR";

    // Верстка окна
    var div = document.createElement('div');
    var divText = document.createElement('div');
    divText.style.height = "500px";
    divText.style.overflow = "scroll";

    //_asNextStep
    var asNextStep = document.createElement('textarea');
    asNextStep.style.width = "95%";
    asNextStep.style.height = "100px";
    asNextStep.style.fontSize = "20px";
    asNextStep.style.resize = "vertical";
    if(cell.value.getAttribute("_asNextStep")) {
        asNextStep.value = cell.value.getAttribute("_asNextStep");
    }
    var divAsNextStep = document.createElement('div');
    divAsNextStep.innerHTML = "Шаблон формулировки данного узла как следующего шага.";
    divAsNextStep.style.fontSize = "20px";
    divText.appendChild(divAsNextStep);
    divText.appendChild(asNextStep);

    //_question / _description
    var question = document.createElement('textarea');
    question.style.width = "95%";
    question.style.height = "100px";
    question.style.fontSize = "20px";
    question.style.resize = "vertical";
    if(isLogicAggreg && cell.value.getAttribute("_description")) {
        question.value = cell.value.getAttribute("_description");
    } else if(!isLogicAggreg && cell.value.getAttribute("_question")) {
        question.value = cell.value.getAttribute("_question");
    }
    var divQuestion = document.createElement('div');
    if(isLogicAggreg) {
        divQuestion.innerHTML = "Шаблон описания результата данного узла.";
    } else {
        divQuestion.innerHTML = "Шаблон вопроса про данный узел.";
    }
    divQuestion.style.fontSize = "20px";
    divText.appendChild(divQuestion);
    divText.appendChild(question);

    //_endingCause
    var endingCause = document.createElement('textarea');
    endingCause.style.width = "95%";
    endingCause.style.height = "100px";
    endingCause.style.fontSize = "20px";
    endingCause.style.resize = "vertical";
    if(cell.value.getAttribute("_endingCause")) {
        endingCause.value = cell.value.getAttribute("_endingCause");
    }
    var divEndingCause = document.createElement('div');
    divEndingCause.innerHTML = "Шаблон формулировки конечности данного узла.";
    divEndingCause.style.fontSize = "20px";
    divText.appendChild(divEndingCause);
    divText.appendChild(endingCause);

    // Кнопка сохранение узла
    var btnSaveTextInNode = mxUtils.button('Save', function () {
        graph.getModel().beginUpdate();
        cell.value.setAttribute("_asNextStep", asNextStep.value);
        if(isLogicAggreg) {
            cell.value.setAttribute("_description", question.value);
        } else {
            cell.value.setAttribute("_question", question.value);
        }
        cell.value.setAttribute("_endingCause", endingCause.value);
        graph.getModel().endUpdate();
        graph.refresh(); // update the graph
        win.destroy();
    });

    var btnDiv = document.createElement('div');
    btnDiv.style.display = "flex";
    btnDiv.style.gap = "5px";
    btnDiv.style.height = "10%";
    btnDiv.style.alignItems = "center";
    btnDiv.style.justifyContent = "center";

    btnSaveTextInNode.style.height = "50%";
    btnSaveTextInNode.style.width = "50px";
    btnDiv.appendChild(btnSaveTextInNode);

    div.appendChild(divText);
    div.appendChild(btnDiv);

    // Настройки окна
    var win = new mxWindow('Edit question info in node', div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
