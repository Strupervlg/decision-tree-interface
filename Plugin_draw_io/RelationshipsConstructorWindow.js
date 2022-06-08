var RelationshipsConstructorWindow = function (editorUi, x, y, w, h) {
    var div = document.createElement('div');
    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.height = '100%';
    var tbody = document.createElement('tbody');
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');

    var select = document.createElement('select');
    select.style.width = '25%';

    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;

    Object.keys(cells).forEach(function (key) {

        var cellValue = cells[key].value;

        if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
            cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
            var values = cellValue.split('<br>');
            values.forEach(element => {
                var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                var newOption = new Option(str, str);
                select.options[select.options.length] = newOption;

            });

        }
    });

    td1.appendChild(select);

    var text = document.createElement('input');
    text.type = "text";
    text.style.width = '25%';
    td1.appendChild(text);


    var select2 = document.createElement('select');
    select2.style.width = '25%';

    Object.keys(cells).forEach(function (key) {

        var cellValue = cells[key].value;

        if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
            cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
            var values = cellValue.split('<br>');
            values.forEach(element => {
                var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                var newOption = new Option(str, str);
                select2.options[select2.options.length] = newOption;

            });

        }
    });

    td1.appendChild(select2);

    var textArea = document.createElement('textarea');
    textArea.style.width = '23%';
    td1.appendChild(textArea);


    var applyBtn = mxUtils.button('Apply', function () {
        var theGraph = editorUi.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("", new mxGeometry(pos.x, pos.y, 267, (table.rows.length + 1) * 17), "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fontColor=#00CCCC;align=center;");

            strValue = '<b><font color="#000000">Relationships between objects</font></b>';

            for (var i = 0; i < table.rows.length; i++) {
                var relationship = table.rows.item(i).getElementsByTagName("td")
                    .item(0).getElementsByTagName("input").item(0).value;

                var selectClass1 = table.rows.item(i).getElementsByTagName("td")
                    .item(0).getElementsByTagName("select").item(0);
                var selectedIndex1 = selectClass1.options.selectedIndex;
                var selectedClass1 = selectClass1.options[selectedIndex1].value;

                var selectClass2 = table.rows.item(i).getElementsByTagName("td")
                    .item(0).getElementsByTagName("select").item(1);
                var selectedIndex2 = selectClass2.options.selectedIndex;
                var selectedClass2 = selectClass2.options[selectedIndex2].value;

                strValue += '<br>' + '<font color="#000000">&lt;</font>' + '<font color="#ff66b3">' + selectedClass1 + '</font>' + '<font color="#000000">&gt;</font>' + '<font color="#00cccc"> ' + relationship + ' </font>' + '<font color="#000000">&lt;</font>' + '<font color="#ff66b3">' + selectedClass2 + '</font>' + '<font color="#000000">&gt;</font>';
            }
            newElement.value = strValue;

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement));
            for (var i = 0; i < table.rows.length; i++) {
                var jenaCode = table.rows.item(i).getElementsByTagName("td")
                    .item(0).getElementsByTagName("textarea").item(0).value;
                theGraph.setAttributeForCell(newElement, 'jena_code_' + i, jenaCode);
            }
        }
    });

    tr1.appendChild(td1);
    tbody.appendChild(tr1);
    table.appendChild(tbody);
    div.appendChild(table);

    var addClass = mxUtils.button('Add relationship', function () {
        var trAdd = document.createElement('tr');
        var tdAdd = document.createElement('td');
        var select = document.createElement('select');
        select.style.width = '25%';

        var graph = editorUi.editor.graph;
        var cells = graph.getModel().cells;

        Object.keys(cells).forEach(function (key) {

            var cellValue = cells[key].value;

            if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
                cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
                var values = cellValue.split('<br>');
                values.forEach(element => {
                    var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                    var newOption = new Option(str, str);
                    select.options[select.options.length] = newOption;

                });

            }
        });

        tdAdd.appendChild(select);

        var text = document.createElement('input');
        text.type = "text";
        text.style.width = '25%';
        tdAdd.appendChild(text);


        var select2 = document.createElement('select');
        select2.style.width = '25%';

        Object.keys(cells).forEach(function (key) {

            var cellValue = cells[key].value;

            if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Classes</b></font>')) {
                cellValue = cellValue.replace('<font color="#000000"><b>Classes</b></font><br>', '');
                var values = cellValue.split('<br>');
                values.forEach(element => {
                    var str = element.replace('<font color="#ff66b3">', '').replace('</font>', '');
                    var newOption = new Option(str, str);
                    select2.options[select2.options.length] = newOption;

                });

            }
        });

        tdAdd.appendChild(select2);

        var textArea = document.createElement('textarea');
        textArea.style.width = '24%';
        tdAdd.appendChild(textArea);

        trAdd.appendChild(tdAdd);
        table.appendChild(trAdd);
    });

    div.appendChild(addClass);
    div.appendChild(applyBtn);

    this.window = new mxWindow('Relationships constructor', div, x, y, w, h, true, true);
    this.window.destroyOnClose = false;
    this.window.setMaximizable(false);
    this.window.setResizable(true);
    this.window.setClosable(true);
    this.window.setVisible(true);
};