function exportEnums(jsonEnums) {
    var result = "";
    jsonEnums.forEach(enumItem => {
        result += enumItem.nameEnum + "|" + enumItem.values[0];
        for(var i = 1; i < enumItem.values.length; i++) {
            result += ";" + enumItem.values[i];
        }
        
        if(enumItem.isLinear == 'trueq') {
            result += "|TRUE|" + enumItem.nameRDF + "\n";
        } else {
            result += "||" + enumItem.nameRDF + "\n";
        }
    });
    return result;
}