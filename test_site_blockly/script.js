var workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
function createXML() {
    let xmlOutput = Blockly.Xml.workspaceToDom(workspace);
    let xls = loadXML("./test.xsl")
    let d_ = new XSLTProcessor();
    d_.importStylesheet(xls)
    let lastXML = d_.transformToFragment(xmlOutput, document);
    let output = document.getElementById('output_xml');
    var s = new XMLSerializer();
    var str = s.serializeToString(lastXML)
    output.value = str; 
}

function createCode() {
    let code = Blockly.JavaScript.workspaceToCode(workspace);
    let output = document.getElementById('output_code');
    output.value = code;
}

function makeRequest(locationURL, parameters, onComplete, doSynchronous, doPost, dataPackage) {

    var http_request = false;
    try {
        http_request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e1) {
        try {
            http_request= new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e2) {
            http_request = new XMLHttpRequest();
        }
    }

    if (!http_request) {
      alert('Cannot create XMLHTTP instance');
      return false;
    }

    if (onComplete && !doSynchronous) {
        completeListener = function() {
            if (http_request.readyState == 4) {
                if (http_request.status == 200) {
                    onComplete(http_request, dataPackage)
                }
            }
        };
        http_request.onreadystatechange = completeListener;
    }

    //var salt = hex_md5(new Date().toString());
    if (doPost) {
        http_request.open('POST', locationURL, !doSynchronous);
        http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http_request.setRequestHeader("Content-length", parameters.length);
        http_request.setRequestHeader("Connection", "close");
        http_request.send(parameters);
    } else {
        http_request.open('GET', locationURL + (parameters ? ("?" + parameters) : ""), !doSynchronous);
        //http_request.open('GET', './proxy.php?' + parameters +
                    // "&salt=" + salt, true);
        http_request.send(null);
    }

    return http_request;

}

function loadXML(fileName) { // http://www.w3schools.com/xsl/xsl_client.asp
    var xmlFile = null;

    if (window.ActiveXObject) { // IE
        xmlFile = new ActiveXObject("Microsoft.XMLDOM");
    } else if (document.implementation
            && document.implementation.createDocument) { // Mozilla, Firefox, Opera, etc.
        xmlFile = document.implementation.createDocument("","",null);
        if (!xmlFile.load) { // Safari lacks on this method,
           // so we make a synchronous XMLHttpRequest
            var request = makeRequest(fileName, null, null, true);
            return request.responseXML;
        }
    } else {
        alert('Your browser cannot create XML DOM Documents');
    }
    xmlFile.async = false;
    try {
        xmlFile.load(fileName);
    } catch(e) {
        alert('an error occured while loading XML file ' + fileName);
    }
    return(xmlFile);
}