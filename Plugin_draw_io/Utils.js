function getEnums(editorUi) {

    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;

    let enums = [];

    Object.keys(cells).forEach(function (key) {

        var cellValue = cells[key].value;

        if (typeof cellValue == "string" && cellValue.startsWith('<font color="#000000"><b>Enum</b></font>')) {
            cellValue = cellValue.replace('<font color="#000000"><b>Enum</b></font><br>', '');
            var values = cellValue.split('<br>');

            values.forEach(element => {
                var nameEnum = element.slice(element.indexOf('<font color="#ff66b3">')+22, element.indexOf('</font>'));
                
                element = element.slice(element.indexOf('</font>')+7);
                var valuesStr = element.slice(element.indexOf('<font color="#ff6666">')+22, element.indexOf('</font>'));
                var valuesEnum = valuesStr.split(', ');

                element = element.slice(element.indexOf('</font>')+7);
                var Islinear = element.slice(element.indexOf('<font color="#123123">')+22, element.indexOf('</font>'));
                var nameRDF = "";
                if(Islinear == 'true') {
                    element = element.slice(element.indexOf('</font>')+7);
                    nameRDF = element.slice(element.indexOf('<font color="#fff123">')+22, element.indexOf('</font>'));
                }
                
                var ItemEnum = {
                    "nameEnum": nameEnum,
                    "values": valuesEnum,
                    "isLinear": Islinear,
                    "nameRDF": nameRDF,
                };
                enums.push(ItemEnum);
            });
        }
    });
    return enums;
}