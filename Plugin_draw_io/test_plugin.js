Draw.loadPlugin(function(ui) {

    ui.menubar.addMenu('Test', function() {
        alert("Hello")
    });


    ui.sidebar.addPalette('Test', 'Tst', true, function(content) {
        content.appendChild(ui.sidebar.createVertexTemplate('rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;', 66, 30, "", "True"));
        content.appendChild(ui.sidebar.createVertexTemplate('rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;', 66, 30, "", "False"));
    });


    var c = ui.sidebar.container;
    c.firstChild.click();
    c.insertBefore(c.lastChild, c.firstChild);
    c.insertBefore(c.lastChild, c.firstChild);
});