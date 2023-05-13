// Окно редактирования информации для вопросов в узлах
var EditQuestionInfoInOutcomeWindow = function (cell, editorUi, x, y, w, h) {

    var graph = editorUi.editor.graph;

    let outNode = cell.source;
    if(outNode == null) {
        throw new Error(getTextByLocale("sourceNodeIsMissing"));
    }
    if(!cell.value || typeof cell.value != "object") {
        throw new Error(getTextByLocale("ValueInOutcomeIsMissing"));
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
    let isPredeterminingBranch = typeof cell.value == "object" 
        && cell.value.getAttribute('type') == "predeterminingBranch";
    if(isThoughtBranch && !isPredeterminingBranch) {
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
        divDescription.innerHTML = getTextByLocale("descriptionOutcome");
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
        divNextStepQuestion.innerHTML = getTextByLocale("nextStepQuestion");
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
        divNextStepExplanation.innerHTML = getTextByLocale("nextStepExplanation");
        divNextStepExplanation.style.fontSize = "20px";
        divText.appendChild(divNextStepExplanation);
        divText.appendChild(nextStepExplanation);
    } else if(!isThoughtBranch && isPredeterminingBranch) {
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
        divTextO.innerHTML = getTextByLocale("textQuestion");
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
        divExplanation.innerHTML = getTextByLocale("explanation");
        divExplanation.style.fontSize = "20px";
        divText.appendChild(divExplanation);
        divText.appendChild(explanation);

        //_nextStepQuestionOutcome
        var nextStepQuestionOutcome = document.createElement('textarea');
        nextStepQuestionOutcome.id = "_nextStepQuestionOutcome";
        nextStepQuestionOutcome.style.width = "95%";
        nextStepQuestionOutcome.style.height = "100px";
        nextStepQuestionOutcome.style.fontSize = "20px";
        nextStepQuestionOutcome.style.resize = "vertical";
        if(cell.value.getAttribute("_nextStepQuestionOutcome")) {
            nextStepQuestionOutcome.value = cell.value.getAttribute("_nextStepQuestionOutcome");
        }
        var divNextStepQuestionOutcome = document.createElement('div');
        divNextStepQuestionOutcome.innerHTML = getTextByLocale("nextStepQuestionOutcome");
        divNextStepQuestionOutcome.style.fontSize = "20px";
        divText.appendChild(divNextStepQuestionOutcome);
        divText.appendChild(nextStepQuestionOutcome);

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
        divNextStepBranchResult.innerHTML = getTextByLocale("nextStepBranchResult");
        divNextStepBranchResult.style.fontSize = "20px";
        divText.appendChild(divNextStepBranchResult);
        divText.appendChild(nextStepBranchResult);

        //_nextStepExplanationOutcome
        var nextStepExplanationOutcome = document.createElement('textarea');
        nextStepExplanationOutcome.id = "_nextStepExplanationOutcome";
        nextStepExplanationOutcome.style.width = "95%";
        nextStepExplanationOutcome.style.height = "100px";
        nextStepExplanationOutcome.style.fontSize = "20px";
        nextStepExplanationOutcome.style.resize = "vertical";
        if(cell.value.getAttribute("_nextStepExplanationOutcome")) {
            nextStepExplanationOutcome.value = cell.value.getAttribute("_nextStepExplanationOutcome");
        }
        var divNextStepExplanationOutcome = document.createElement('div');
        divNextStepExplanationOutcome.innerHTML = getTextByLocale("nextStepExplanationOutcome");
        divNextStepExplanationOutcome.style.fontSize = "20px";
        divText.appendChild(divNextStepExplanationOutcome);
        divText.appendChild(nextStepExplanationOutcome);

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
        divDescription.innerHTML = getTextByLocale("descriptionOutcome");
        divDescription.style.fontSize = "20px";
        divText.appendChild(divDescription);
        divText.appendChild(description);

        //_nextStepQuestionThoughtBranch
        var nextStepQuestionThoughtBranch = document.createElement('textarea');
        nextStepQuestionThoughtBranch.id = "_nextStepQuestionThoughtBranch";
        nextStepQuestionThoughtBranch.style.width = "95%";
        nextStepQuestionThoughtBranch.style.height = "100px";
        nextStepQuestionThoughtBranch.style.fontSize = "20px";
        nextStepQuestionThoughtBranch.style.resize = "vertical";
        if(cell.value.getAttribute("_nextStepQuestionThoughtBranch")) {
            nextStepQuestionThoughtBranch.value = cell.value.getAttribute("_nextStepQuestionThoughtBranch");
        }
        var divNextStepQuestionThoughtBranch = document.createElement('div');
        divNextStepQuestionThoughtBranch.innerHTML = getTextByLocale("nextStepQuestion");
        divNextStepQuestionThoughtBranch.style.fontSize = "20px";
        divText.appendChild(divNextStepQuestionThoughtBranch);
        divText.appendChild(nextStepQuestionThoughtBranch);

        //_nextStepExplanationThoughtBranch
        var nextStepExplanationThoughtBranch = document.createElement('textarea');
        nextStepExplanationThoughtBranch.id = "_nextStepExplanationThoughtBranch";
        nextStepExplanationThoughtBranch.style.width = "95%";
        nextStepExplanationThoughtBranch.style.height = "100px";
        nextStepExplanationThoughtBranch.style.fontSize = "20px";
        nextStepExplanationThoughtBranch.style.resize = "vertical";
        if(cell.value.getAttribute("_nextStepExplanationThoughtBranch")) {
            nextStepExplanationThoughtBranch.value = cell.value.getAttribute("_nextStepExplanationThoughtBranch");
        }
        var divNextStepExplanationThoughtBranch = document.createElement('div');
        divNextStepExplanationThoughtBranch.innerHTML = getTextByLocale("nextStepExplanation");
        divNextStepExplanationThoughtBranch.style.fontSize = "20px";
        divText.appendChild(divNextStepExplanationThoughtBranch);
        divText.appendChild(nextStepExplanationThoughtBranch);
    } else if(!isThoughtBranch && !isPredeterminingBranch) {
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
        divTextO.innerHTML = getTextByLocale("textQuestion");
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
        divExplanation.innerHTML = getTextByLocale("explanation");
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
        divNextStepQuestion.innerHTML = getTextByLocale("nextStepQuestionOutcome");
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
        divNextStepBranchResult.innerHTML = getTextByLocale("nextStepBranchResult");
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
        divNextStepExplanation.innerHTML = getTextByLocale("nextStepExplanationOutcome");
        divNextStepExplanation.style.fontSize = "20px";
        divText.appendChild(divNextStepExplanation);
        divText.appendChild(nextStepExplanation);
    }

    // Кнопка сохранение узла
    var btnSaveTextInNode = mxUtils.button(getTextByLocale("Save"), function () {
        graph.getModel().beginUpdate();
        if(isThoughtBranch && !isPredeterminingBranch) {
            cell.value.setAttribute("_description", divText.querySelector("#_description").value);
            cell.value.setAttribute("_nextStepQuestion", divText.querySelector("#_nextStepQuestion").value);
            cell.value.setAttribute("_nextStepExplanation", divText.querySelector("#_nextStepExplanation").value);
        } else if(!isThoughtBranch && isPredeterminingBranch) {
            cell.value.setAttribute("_text", divText.querySelector("#_text").value);
            cell.value.setAttribute("_explanation", divText.querySelector("#_explanation").value);
            cell.value.setAttribute("_nextStepBranchResult", divText.querySelector("#_nextStepBranchResult").value);
            cell.value.setAttribute("_nextStepQuestionOutcome", divText.querySelector("#_nextStepQuestionOutcome").value);
            cell.value.setAttribute("_nextStepExplanationOutcome", divText.querySelector("#_nextStepExplanationOutcome").value);

            cell.value.setAttribute("_description", divText.querySelector("#_description").value);
            cell.value.setAttribute("_nextStepQuestionThoughtBranch", divText.querySelector("#_nextStepQuestionThoughtBranch").value);
            cell.value.setAttribute("_nextStepExplanationThoughtBranch", divText.querySelector("#_nextStepExplanationThoughtBranch").value);
        } else if(!isThoughtBranch && !isPredeterminingBranch) {
            cell.value.setAttribute("_text", divText.querySelector("#_text").value);
            cell.value.setAttribute("_explanation", divText.querySelector("#_explanation").value);
            cell.value.setAttribute("_nextStepBranchResult", divText.querySelector("#_nextStepBranchResult").value);
            cell.value.setAttribute("_nextStepQuestion", divText.querySelector("#_nextStepQuestion").value);
            cell.value.setAttribute("_nextStepExplanation", divText.querySelector("#_nextStepExplanation").value);
        }
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
    var win = new mxWindow(getTextByLocale("TitleEditQuestionInfoInOutcomeWindow"), div, x, y, w, h, true, true);
    this.window = win;
    this.window.destroyOnClose = true;
    this.window.setMaximizable(false);
    this.window.setResizable(false);
    this.window.setClosable(true);
    this.window.setVisible(true);
};
