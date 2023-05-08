// Окно редактирования информации для вопросов в узлах
var EditQuestionInfoInOutcomeWindow = function (cell, editorUi, x, y, w, h) {

    var graph = editorUi.editor.graph;

    let outNode = cell.source;
    if(outNode == null) {
        throw new Error("Error: Source node is missing!");
    }
    if(!cell.value || typeof cell.value != "object") {
        throw new Error("Error: Ветке не задано значение!");
    }

    // Верстка окна
    var div = document.createElement('div');
    var divText = document.createElement('div');
    divText.style.height = "500px";
    divText.style.overflow = "scroll";
    let isThoughtBranch = typeof outNode.value == "object"
    && (outNode.value.getAttribute('type') == "START" 
    || ((outNode.value.getAttribute('type') == "AND" || outNode.value.getAttribute('type') == "OR")
    && typeof cell.value == "object" && cell.value.getAttribute("type") == "Branch")
    || ((outNode.value.getAttribute('operator') == "AND" || outNode.value.getAttribute('operator') == "OR") 
    && typeof cell.value == "object" && cell.value.getAttribute("type") == "Body"));
    if(isThoughtBranch) {
        //_description
        var description = document.createElement('textarea');
        description.id = "_description";
        description.style.width = "95%";
        description.style.height = "100px";
        description.style.fontSize = "20px";
        description.style.resize = "vertical";
        if(cell.value.getAttribute("_description")) {
            description.value = cell.value.getAttribute("_description");
        }
        var divDescription = document.createElement('div');
        divDescription.innerHTML = "Шаблон описания результата ветки.";
        divDescription.style.fontSize = "20px";
        divText.appendChild(divDescription);
        divText.appendChild(description);

        //_nextStepQuestion
        var nextStepQuestion = document.createElement('textarea');
        nextStepQuestion.id = "_nextStepQuestion";
        nextStepQuestion.style.width = "95%";
        nextStepQuestion.style.height = "100px";
        nextStepQuestion.style.fontSize = "20px";
        nextStepQuestion.style.resize = "vertical";
        if(cell.value.getAttribute("_nextStepQuestion")) {
            nextStepQuestion.value = cell.value.getAttribute("_nextStepQuestion");
        }
        var divNextStepQuestion = document.createElement('div');
        divNextStepQuestion.innerHTML = "Шаблон вопроса о том, с чего надо начать в ветке.";
        divNextStepQuestion.style.fontSize = "20px";
        divText.appendChild(divNextStepQuestion);
        divText.appendChild(nextStepQuestion);

        //_nextStepExplanation
        var nextStepExplanation = document.createElement('textarea');
        nextStepExplanation.id = "_nextStepExplanation";
        nextStepExplanation.style.width = "95%";
        nextStepExplanation.style.height = "100px";
        nextStepExplanation.style.fontSize = "20px";
        nextStepExplanation.style.resize = "vertical";
        if(cell.value.getAttribute("_nextStepExplanation")) {
            nextStepExplanation.value = cell.value.getAttribute("_nextStepExplanation");
        }
        var divNextStepExplanation = document.createElement('div');
        divNextStepExplanation.innerHTML = "Шаблон объяснения того, с чего на самом деле нужно начать в ветке.";
        divNextStepExplanation.style.fontSize = "20px";
        divText.appendChild(divNextStepExplanation);
        divText.appendChild(nextStepExplanation);
    } else {
        //_text
        var text = document.createElement('textarea');
        text.id = "_text";
        text.style.width = "95%";
        text.style.height = "100px";
        text.style.fontSize = "20px";
        text.style.resize = "vertical";
        if(cell.value.getAttribute("_text")) {
            text.value = cell.value.getAttribute("_text");
        }
        var divTextO = document.createElement('div');
        divTextO.innerHTML = "Шаблон текста данного варианта ответа.";
        divTextO.style.fontSize = "20px";
        divText.appendChild(divTextO);
        divText.appendChild(text);

        //_explanation
        var explanation = document.createElement('textarea');
        explanation.id = "_explanation";
        explanation.style.width = "95%";
        explanation.style.height = "100px";
        explanation.style.fontSize = "20px";
        explanation.style.resize = "vertical";
        if(cell.value.getAttribute("_explanation")) {
            explanation.value = cell.value.getAttribute("_explanation");
        }
        var divExplanation = document.createElement('div');
        divExplanation.innerHTML = "Шаблон объяснения, почему данный ответ правильный.";
        divExplanation.style.fontSize = "20px";
        divText.appendChild(divExplanation);
        divText.appendChild(explanation);

        //_nextStepQuestion
        var nextStepQuestion = document.createElement('textarea');
        nextStepQuestion.id = "_nextStepQuestion";
        nextStepQuestion.style.width = "95%";
        nextStepQuestion.style.height = "100px";
        nextStepQuestion.style.fontSize = "20px";
        nextStepQuestion.style.resize = "vertical";
        if(cell.value.getAttribute("_nextStepQuestion")) {
            nextStepQuestion.value = cell.value.getAttribute("_nextStepQuestion");
        }
        var divNextStepQuestion = document.createElement('div');
        divNextStepQuestion.innerHTML = "Шаблон вопроса о том, что делать дальше при данном ответе.";
        divNextStepQuestion.style.fontSize = "20px";
        divText.appendChild(divNextStepQuestion);
        divText.appendChild(nextStepQuestion);

        //_nextStepBranchResult
        var nextStepBranchResult = document.createElement('textarea');
        nextStepBranchResult.id = "_nextStepBranchResult";
        nextStepBranchResult.style.width = "95%";
        nextStepBranchResult.style.height = "100px";
        nextStepBranchResult.style.fontSize = "20px";
        nextStepBranchResult.style.resize = "vertical";
        if(cell.value.getAttribute("_nextStepBranchResult")) {
            nextStepBranchResult.value = cell.value.getAttribute("_nextStepBranchResult");
        }
        var divNextStepBranchResult = document.createElement('div');
        divNextStepBranchResult.innerHTML = "Шаблон формулировок для красных/зеленых узлов при данном ответе.";
        divNextStepBranchResult.style.fontSize = "20px";
        divText.appendChild(divNextStepBranchResult);
        divText.appendChild(nextStepBranchResult);

        //_nextStepExplanation
        var nextStepExplanation = document.createElement('textarea');
        nextStepExplanation.id = "_nextStepExplanation";
        nextStepExplanation.style.width = "95%";
        nextStepExplanation.style.height = "100px";
        nextStepExplanation.style.fontSize = "20px";
        nextStepExplanation.style.resize = "vertical";
        if(cell.value.getAttribute("_nextStepExplanation")) {
            nextStepExplanation.value = cell.value.getAttribute("_nextStepExplanation");
        }
        var divNextStepExplanation = document.createElement('div');
        divNextStepExplanation.innerHTML = "Шаблон объяснения того, что на самом деле делать дальше при данном ответе.";
        divNextStepExplanation.style.fontSize = "20px";
        divText.appendChild(divNextStepExplanation);
        divText.appendChild(nextStepExplanation);
    }

    // Кнопка сохранение узла
    var btnSaveTextInNode = mxUtils.button('Save', function () {
        graph.getModel().beginUpdate();
        if(isThoughtBranch) {
            cell.value.setAttribute("_description", divText.querySelector("#_description").value);
        } else {
            cell.value.setAttribute("_text", divText.querySelector("#_text").value);
            cell.value.setAttribute("_explanation", divText.querySelector("#_explanation").value);
            cell.value.setAttribute("_nextStepBranchResult", divText.querySelector("#_nextStepBranchResult").value);
        }
        cell.value.setAttribute("_nextStepQuestion", divText.querySelector("#_nextStepQuestion").value);
        cell.value.setAttribute("_nextStepExplanation", divText.querySelector("#_nextStepExplanation").value);
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
    var win = new mxWindow('Edit question info in outcome', div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
