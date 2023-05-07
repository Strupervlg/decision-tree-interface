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

function getClasses(editorUi) {
    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;

    let classes = [];

    Object.keys(cells).forEach(function (key) {

        var cellValue = cells[key].value;

        if (cellValue && typeof cellValue == "object" && cellValue.getAttribute('label').startsWith('<font color="#000000"><b>Classes</b></font>')) { //TODO: Возможно это кал способ надо протестировать
            var cellLabel = cellValue.getAttribute('label');
            cellLabel = cellLabel.replace('<font color="#000000"><b>Classes</b></font><br>', '');
            var values = cellLabel.split('<br>');
        
            values.forEach((element, index) => {
                var nameClass = element.slice(element.indexOf('<font color="#ff66b3">')+22, element.indexOf('</font>'));
                element = element.slice(element.indexOf('</font>')+7);

                var classExtend = ""
                if(element.indexOf('(<font color="#ff66b3">') != -1) {
                    classExtend = element.slice(element.indexOf('(<font color="#ff66b3">')+23, element.indexOf('</font>)'));
                    element = element.slice(element.indexOf('</font>)')+8);
                }

                var expression = cellValue.getAttribute('expression_'+index)
                
                var ItemClass = {
                    "name": nameClass,
                    "extend": classExtend,
                    "expression": expression,
                };
                classes.push(ItemClass);
            });
        }
    });
    return classes;
}

function getProperties(editorUi) {

    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;

    let properties = [];

    Object.keys(cells).forEach(function (key) {

        var cellValue = cells[key].value;

        if (typeof cellValue == "string" && cellValue.startsWith('<b><font color="#000000">Class properties</font></b>')) {
            cellValue = cellValue.replace('<b><font color="#000000">Class properties</font></b><br>', '');
            var values = cellValue.split('<br>');

            values.forEach(element => {
                var nameProperty = element.slice(element.indexOf('<font color="#ffb366">')+22, element.indexOf('</font>'));
                element = element.slice(element.indexOf('</font>,')+8);

                var type = element.slice(element.indexOf('<font color="#000000">')+22, element.indexOf('</font>'));
                element = element.slice(element.indexOf('</font>')+7);

                var range = "";
                if(type == "Integer" || type == "Double") {
                    range = element.slice(element.indexOf('<font color="#000000">: ')+24, element.indexOf('</font>'));
                    element = element.slice(element.indexOf('</font>')+7);
                }
                element = element.slice(element.indexOf('<font color="#19c3c0">isStatic:</font>')+38);
                
                isStatic = element.slice(element.indexOf('<font color="#000000">')+22, element.indexOf('</font>'));
                element = element.slice(element.indexOf('</font>')+7);

                classes = [];
                if(isStatic) {
                    var valuesStr = element.slice(element.indexOf('(<font color="#fc49a4">')+23, element.indexOf('</font>'));
                    classes = valuesStr.split(', ');
                }
                
                var ItemProperty = {
                    "name": nameProperty,
                    "type": type,
                    "range": range,
                    "isStatic": isStatic,
                    "classes": classes,
                };
                properties.push(ItemProperty);
            });
        }
    });
    return properties;
}

function getRelationships(editorUi) {

    var graph = editorUi.editor.graph;
    var cells = graph.getModel().cells;

    let relationships = [];

    Object.keys(cells).forEach(function (key) {

        var cellValue = cells[key].value;

        if (cellValue && typeof cellValue == "object" && cellValue.getAttribute('label').startsWith('<b><font color="#000000">Relationships between objects</font></b>')) {
            var cellLabel = cellValue.getAttribute('label');
            cellLabel = cellLabel.replace('<b><font color="#000000">Relationships between objects</font></b><br>', '');
            var values = cellLabel.split('<br>');

            values.forEach((element, index) => {
                var nameRelationship = element.slice(element.indexOf('<font color="#00cccc">')+22, element.indexOf('</font>'));
                element = element.slice(element.indexOf('</font>')+7);

                var extendRelationship = ""
                if(element.indexOf(' (<font color="#00cccc">') != -1) {
                    extendRelationship = element.slice(element.indexOf('(<font color="#00cccc">')+23, element.indexOf('</font>)'));
                    element = element.slice(element.indexOf('</font>)')+8);
                }

                element = element.slice(element.indexOf('classes:</font>')+15);
                var valuesStr = element.slice(element.indexOf('<font color="#ff66b3">')+22, element.indexOf('</font>'));
                var classes = valuesStr.split(', ');
                element = element.slice(element.indexOf('</font>')+7);

                var scale = "";
                if(element.indexOf('<font color="#6666FF">scale:</font>') != -1) {
                    element = element.slice(element.indexOf('scale:</font>')+13);
                    scale = element.slice(element.indexOf('<font color="#000000">')+22, element.indexOf('</font>'));
                    scale = scale.toUpperCase();
                    element = element.slice(element.indexOf('</font>')+7);
                }

                element = element.slice(element.indexOf('classes:</font>')+15);
                isBetween = element.slice(element.indexOf('<font color="#000000">')+22, element.indexOf('</font>'));
                element = element.slice(element.indexOf('</font>')+7);
                var type = "";
                if(isBetween == "true") {
                    element = element.slice(element.indexOf('type:</font>')+12);
                    type = element.slice(element.indexOf('<font color="#000000">')+22, element.indexOf('</font>'));
                    type = type.toUpperCase().replaceAll(" ", "_");
                }

                let namesRels = cellValue.getAttribute('namesRels_'+index)
                let binFlags = cellValue.getAttribute('binFlags_'+index)
                
                var ItemRelationship = {
                    "name": nameRelationship,
                    "extend": extendRelationship,
                    "classes": classes,
                    "scale": scale,
                    "isBetween": isBetween,
                    "type": type,
                    "namesRels": namesRels,
                    "binFlags": binFlags,
                    "decFlags": parseInt( binFlags.split('').reverse().join(''), 2),
                };
                relationships.push(ItemRelationship);
            });
        }
    });
    return relationships;
}
