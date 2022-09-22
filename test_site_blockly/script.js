var workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
function createXML() {
    let xmlOutput = Blockly.Xml.workspaceToDom(workspace);
    let output = document.getElementById('output_xml');
    var s = new XMLSerializer();
    var str = s.serializeToString(xmlOutput)
    output.value = str; 
}

function createCode() {
    let code = Blockly.JavaScript.workspaceToCode(workspace);
    let output = document.getElementById('output_code');
    output.value = code;
}