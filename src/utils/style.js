//Файл со стилями
export function styleTable(table) {
    table.style.width = '100%';
    table.style.height = '80%';
    table.style.overflow = "scroll";
    table.style.display = "block";
    table.style.borderCollapse = "separate";
    table.style.borderSpacing = "10px 0";
    return table;
}

export function styleDivBtn(divBtn) {
    divBtn.style.display = "flex";
    divBtn.style.height = "20%";
    divBtn.style.alignItems = "center";
    divBtn.style.gap = "5px";
    divBtn.style.justifyContent = "center";
    return divBtn;
}

export function styleBtn(btn) {
    btn.style.minHeight = "50%";
    btn.style.fontSize = "18px";
    return btn;
}

export function styleInput(input) {
    input.style.width = '100%';
    input.style.fontSize = '20px';
    return input;
}

export function styleSelect(select) {
    select.style.width = '100%';
    select.style.fontSize = '20px';
    return select;
}

export function styleSpan(span) {
    span.style.fontSize = '20px';
    return span;
}

export function styleTextAreaExp(textarea) {
    textarea.style.fontSize = "30px";
    textarea.style.width = "100%";
    textarea.style.resize = "none";
    textarea.style.height = "80%";
    return textarea;
}

export function styleBlocklyAreaExp(blocklyDiv, w, h) {
    blocklyDiv.style.width = w + 'px';
    blocklyDiv.style.height = h * 0.78 + 'px';
    return blocklyDiv;
}
