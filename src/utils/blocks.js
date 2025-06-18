//Файл с toolbox (Правая менюшка в окне с Blockly)
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

export var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Types",
            "colour": "300",
            "contents": [
                {
                    "kind": "block",
                    "type": "object"
                },
                {
                    "kind": "block",
                    "type": "class"
                },
                {
                    "kind": "block",
                    "type": "property"
                },
                {
                    "kind": "block",
                    "type": "relationship"
                },
                {
                    "kind": "block",
                    "type": "string"
                },
                {
                    "kind": "block",
                    "type": "boolean"
                },
                {
                    "kind": "block",
                    "type": "integer"
                },
                {
                    "kind": "block",
                    "type": "double"
                },
                {
                    "kind": "block",
                    "type": "enum"
                },
                {
                    "kind": "block",
                    "type": "ref_to_decision_tree_var"
                },
                {
                    "kind": "block",
                    "type": "variable"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Operators 'get'",
            "colour": "60",
            "contents": [
                {
                    "kind": "block",
                    "type": "get_class"
                },
                {
                    "kind": "block",
                    "type": "get_property_value"
                },
                {
                    "kind": "block",
                    "type": "get_relationship_object"
                },
                {
                    "kind": "block",
                    "type": "get_condition_object"
                },
                {
                    "kind": "block",
                    "type": "get_extr_object"
                },

            ]
        },
        {
            "kind": "category",
            "name": "Operators 'set'",
            "colour": "120",
            "contents": [
                {
                    "kind": "block",
                    "type": "assign_value_to_property"
                },
                {
                    "kind": "block",
                    "type": "assign_value_to_variable_decision_tree"
                },
                {
                    "kind": "block",
                    "type": "cast_object_to_class"
                },
                {
                    "kind": "block",
                    "type": "add_relationship_to_object"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Operators 'check'",
            "colour": "195",
            "contents": [
                {
                    "kind": "block",
                    "type": "check_object_class"
                },
                {
                    "kind": "block",
                    "type": "check_relationship"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Logical operators",
            "colour": "230",
            "contents": [
                {
                    "kind": "block",
                    "type": "and"
                },

                {
                    "kind": "block",
                    "type": "or"
                },
                {
                    "kind": "block",
                    "type": "not"
                },
                {
                    "kind": "block",
                    "type": "comparison"
                },
                {
                    "kind": "block",
                    "type": "three_digit_comparison"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Quantifiers",
            "colour": "75",
            "contents": [
                {
                    "kind": "block",
                    "type": "quantifier_of_existence"
                },
                {
                    "kind": "block",
                    "type": "quantifier_of_generality"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Block",
            "colour": "75",
            "contents": [
                {
                    "kind": "block",
                    "type": "block"
                },
                {
                    "kind": "block",
                    "type": "if_then_stmt"
                },
                {
                    "kind": "block",
                    "type": "with_stmt"
                },
            ]
        },

    ]
}


var validator = function (newValue) {
    if (!/^[a-zA-Z_][A-Za-z0-9_]*$/.test(newValue)) {
        return null;
    }
    return newValue;
};

Blockly.Blocks['object'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("object", validator), "object_name");
        this.setOutput(true, "Object");
        this.setColour(120);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['object'] = function (block) {
    var text_object_name = block.getFieldValue('object_name');
    var code = "obj:" + text_object_name;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['class'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("className", validator), "class_name");
        this.setOutput(true, "Class");
        this.setColour(315);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['class'] = function (block) {
    var text_class_name = block.getFieldValue('class_name');
    var code = "class:" + text_class_name;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['property'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("property", validator), "property_name");
        this.setOutput(true, "Property");
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['property'] = function (block) {
    var text_property_name = block.getFieldValue('property_name');
    var code = text_property_name;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['relationship'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("relationship", validator), "relationship_name");
        this.setOutput(true, "Relationship");
        this.setColour(180);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['relationship'] = function (block) {
    var text_relationship_name = block.getFieldValue('relationship_name');
    var code = text_relationship_name;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("string"), "value");
        this.setOutput(true, "String");
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['string'] = function (block) {
    var text_value = block.getFieldValue('value');
    var newTextValue = text_value
        .replaceAll("\\", '\\\\')
        .replaceAll("\"", '\\"')
        .replaceAll("\n", '\\n')
        .replaceAll("\t", '\\t');
    var code = "\"" + newTextValue + "\"";
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['boolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("TRUE"), "value");
        this.setOutput(true, "Boolean");
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['boolean'] = function (block) {
    var checkbox_value = block.getFieldValue('value') === 'TRUE';
    var code = checkbox_value;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['integer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 1), "value");
        this.setOutput(true, "Integer");
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['integer'] = function (block) {
    var number_value = block.getFieldValue('value');
    var code = number_value;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['double'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0), "value");
        this.setOutput(true, "Double");
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['double'] = function (block) {
    var number_value = block.getFieldValue('value');
    var code = number_value;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['get_class'] = {
    init: function () {
        this.appendValueInput("object")
            .setCheck("Object")
            .appendField("get class");
        this.setOutput(true, "Class");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['get_class'] = function (block) {
    var value_object = javascriptGenerator.valueToCode(block, 'object', javascriptGenerator.ORDER_NONE);
    var code = value_object + ".getClass()";
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['get_property_value'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get property value");
        this.appendValueInput("object")
            .setCheck("Object")
            .appendField("object");
        this.appendValueInput("property")
            .setCheck("Property")
            .appendField("property");
        this.setOutput(true, ["Boolean", "String", "Integer", "Double", "Enum"]);
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['get_property_value'] = function (block) {
    var value_object = javascriptGenerator.valueToCode(block, 'object', javascriptGenerator.ORDER_NONE);
    var value_property = javascriptGenerator.valueToCode(block, 'property', javascriptGenerator.ORDER_NONE);
    var code = value_object + "." + value_property;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['if_then_stmt'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("If Then");
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("condition");
        this.appendValueInput("body")
            .setCheck(["Object", "Class", "Relationship", "Property", "Boolean", "String", "Integer", "Double", "Enum", "Statement"])
            .appendField("body");
        this.setInputsInline(false);
        this.setOutput(true, "Statement");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['if_then_stmt'] = function (block) {
    var value_condition = javascriptGenerator.valueToCode(block, 'condition', javascriptGenerator.ORDER_NONE);
    var value_body = javascriptGenerator.valueToCode(block, 'body', javascriptGenerator.ORDER_NONE);
    var code = "if ( " + value_condition + " ) " + value_body;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['with_stmt'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("With");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("var", validator), "name_var");
        this.appendValueInput("expression")
            .setCheck("Object")
            .appendField("expression");
        this.appendValueInput("body")
            .setCheck(["Object", "Class", "Relationship", "Property", "Boolean", "String", "Integer", "Double", "Enum", "Statement"])
            .appendField("body");
        this.setInputsInline(false);
        this.setOutput(true, "Statement");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['with_stmt'] = function (block) {
    var text_name_var = block.getFieldValue('name_var');
    var value_expression = javascriptGenerator.valueToCode(block, 'expression', javascriptGenerator.ORDER_NONE);
    var value_body = javascriptGenerator.valueToCode(block, 'body', javascriptGenerator.ORDER_NONE);
    var code = "with ( " + text_name_var + " = " + value_expression + " ) " + value_body;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['get_relationship_object'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get relationship object");
        this.appendValueInput("object")
            .setCheck("Object")
            .appendField("subject");
        this.appendValueInput("relationship")
            .setCheck("Relationship")
            .appendField("relationship");
        this.setInputsInline(false);
        this.setOutput(true, ["Object"]);
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['get_relationship_object'] = function (block) {
    var value_object = javascriptGenerator.valueToCode(block, 'object', javascriptGenerator.ORDER_NONE);
    var value_relationship = javascriptGenerator.valueToCode(block, 'relationship', javascriptGenerator.ORDER_NONE);
    var code = value_object + "->" + value_relationship;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['get_condition_object'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get object by condition");
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("condition");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("type", validator), "type_var");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("var", validator), "name_var");
        this.setInputsInline(false);
        this.setOutput(true, ["Object"]);
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['get_condition_object'] = function (block) {
    var value_condition = javascriptGenerator.valueToCode(block, 'condition', javascriptGenerator.ORDER_NONE);
    var text_name_var = block.getFieldValue('name_var');
    var text_type_var = block.getFieldValue('type_var');
    var code = "find " + text_type_var + " " + text_name_var + " { " + value_condition + " } ";
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['get_extr_object'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get extreme object");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("var1", validator), "name_var1");
        this.appendValueInput("extreme_condition")
            .setCheck("Boolean")
            .appendField("extreme condition");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("type2", validator), "type_var2");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("var2", validator), "name_var2");
        this.appendValueInput("general_condition")
            .setCheck("Boolean")
            .appendField("general condition");
        this.setInputsInline(false);
        this.setOutput(true, ["Object"]);
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['get_extr_object'] = function (block) {
    var text_name_var1 = block.getFieldValue('name_var1');
    var value_extreme_condition = javascriptGenerator.valueToCode(block, 'extreme_condition', javascriptGenerator.ORDER_NONE);
    var text_type_var2 = block.getFieldValue('type_var2');
    var text_name_var2 = block.getFieldValue('name_var2');
    var value_general_condition = javascriptGenerator.valueToCode(block, 'general_condition', javascriptGenerator.ORDER_NONE);
    var code = "findExtreme " + text_name_var1 + " [ " + value_extreme_condition + " ] among " + text_type_var2 + " " + text_name_var2 + " { " + value_general_condition + " } ";
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['assign_value_to_property'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Assign a value to a property");
        this.appendValueInput("object")
            .setCheck("Object")
            .appendField("object");
        this.appendValueInput("property")
            .setCheck("Property")
            .appendField("property");
        this.appendValueInput("new_value")
            .setCheck(["Boolean", "String", "Integer", "Double", "Enum"])
            .appendField("new value");
        this.setOutput(true, "Statement");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['assign_value_to_property'] = function (block) {
    var value_object = javascriptGenerator.valueToCode(block, 'object', javascriptGenerator.ORDER_ASSIGNMENT);
    var value_property = javascriptGenerator.valueToCode(block, 'property', javascriptGenerator.ORDER_ASSIGNMENT);
    var value_new_value = javascriptGenerator.valueToCode(block, 'new_value', javascriptGenerator.ORDER_ASSIGNMENT);
    var code = value_object + "." + value_property + " = " + value_new_value;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['assign_value_to_variable_decision_tree'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Assign a value to a variable decision tree");
        this.appendValueInput("ref_to_object")
            .setCheck("VarObject")
            .appendField("reference to object");
        this.appendValueInput("new_object")
            .setCheck("Object")
            .appendField("new object");
        this.setOutput(true, "Statement");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['assign_value_to_variable_decision_tree'] = function (block) {
    var value_ref_to_object = javascriptGenerator.valueToCode(block, 'ref_to_object', javascriptGenerator.ORDER_ASSIGNMENT);
    var value_new_object = javascriptGenerator.valueToCode(block, 'new_object', javascriptGenerator.ORDER_ASSIGNMENT);
    var code = value_ref_to_object + " = " + value_new_object;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['add_relationship_to_object'] = {
    init: function () {
        this.itemCount_ = 2;
        this.appendDummyInput()
            .appendField("Add relationship to object");
        this.appendValueInput("relationship")
            .setCheck("Relationship")
            .appendField("relationship");
        this.appendValueInput("object")
            .setCheck("Object")
            .appendField("subject");
        this.setInputsInline(false);
        this.setOutput(true, "Statement");
        this.setMutator(new Blockly.Mutator(['check_relationship_item']));
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },

    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },

    saveExtraState: function () {
        return {
            'itemCount': this.itemCount_,
        };
    },

    loadExtraState: function (state) {
        this.itemCount_ = state['itemCount'];
        this.updateShape_();
    },

    decompose: function (workspace) {
        //TODO: сделать рефакторинг
        const containerBlock = workspace.newBlock('check_relationship_container');
        containerBlock.initSvg();
        let connection = containerBlock.getInput('STACK').connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock('check_relationship_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },

    compose: function (containerBlock) {
        //TODO: сделать рефакторинг
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        const connections = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            connections.push(itemBlock.valueConnection_);
            itemBlock =
                itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (let i = 0; i < this.itemCount_; i++) {
            const connection = this.getInput("object" + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) === -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (let i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, "object" + i);
        }
    },

    saveConnections: function (containerBlock) {
        //TODO: сделать рефакторинг
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        let i = 0;
        while (itemBlock) {
            const input = this.getInput("object" + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            itemBlock =
                itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
            i++;
        }
    },

    updateShape_: function () {
        //TODO: сделать рефакторинг
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput("EMPTY").appendField("objects");
        }
        // Add new inputs.
        for (let i = 0; i < this.itemCount_; i++) {
            if (!this.getInput("object" + i)) {
                const input = this.appendValueInput("object" + i).setCheck("Object").appendField("object" + i);
            }
        }
        // Remove deleted inputs.
        for (let i = this.itemCount_; this.getInput("object" + i); i++) {
            this.removeInput("object" + i);
        }
    },
};

javascriptGenerator.forBlock['add_relationship_to_object'] = function (block) {
    var value_object = javascriptGenerator.valueToCode(block, 'object', javascriptGenerator.ORDER_NONE);
    var value_relationship = javascriptGenerator.valueToCode(block, 'relationship', javascriptGenerator.ORDER_NONE);

    var code = value_object + " +=> " + value_relationship + " (";
    let values = [];
    for (var i = 0; i < block.itemCount_; i++) {
        let valueCode = javascriptGenerator.valueToCode(block, 'object' + i, javascriptGenerator.ORDER_NONE);
        if (valueCode) {
            values.push(valueCode);
        }
    }
    let valueString = values.join(", ");
    code += valueString + ")";
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['cast_object_to_class'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Cast the object to class");
        this.appendValueInput("class")
            .setCheck("Class")
            .appendField("class");
        this.appendValueInput("object")
            .setCheck("Object")
            .appendField("object");
        this.setOutput(true, "Object");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['cast_object_to_class'] = function (block) {
    var value_object = javascriptGenerator.valueToCode(block, 'object', javascriptGenerator.ORDER_INSTANCEOF);
    var value_class = javascriptGenerator.valueToCode(block, 'class', javascriptGenerator.ORDER_INSTANCEOF);
    var code = value_object + " as " + value_class;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['check_object_class'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Check the object class");
        this.appendValueInput("object")
            .setCheck("Object")
            .appendField("object");
        this.appendValueInput("class")
            .setCheck("Class")
            .appendField("class");
        this.setOutput(true, "Boolean");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['check_object_class'] = function (block) {
    var value_object = javascriptGenerator.valueToCode(block, 'object', javascriptGenerator.ORDER_INSTANCEOF);
    var value_class = javascriptGenerator.valueToCode(block, 'class', javascriptGenerator.ORDER_INSTANCEOF);
    var code = value_object + " is " + value_class;
    return [code, javascriptGenerator.ORDER_INSTANCEOF];
};


Blockly.Blocks['check_relationship'] = {
    init: function () {
        this.itemCount_ = 2;
        this.appendDummyInput()
            .appendField("Check for a relationship");
        this.appendValueInput("relationship")
            .setCheck("Relationship")
            .appendField("relationship");
        this.appendValueInput("object")
            .setCheck("Object")
            .appendField("subject");
        this.setInputsInline(false);
        this.setOutput(true, "Boolean");
        this.setMutator(new Blockly.Mutator(['check_relationship_item']));
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },

    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },

    saveExtraState: function () {
        return {
            'itemCount': this.itemCount_,
        };
    },

    loadExtraState: function (state) {
        this.itemCount_ = state['itemCount'];
        this.updateShape_();
    },

    decompose: function (workspace) {
        //TODO: сделать рефакторинг
        const containerBlock = workspace.newBlock('check_relationship_container');
        containerBlock.initSvg();
        let connection = containerBlock.getInput('STACK').connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock('check_relationship_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },

    compose: function (containerBlock) {
        //TODO: сделать рефакторинг
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        const connections = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            connections.push(itemBlock.valueConnection_);
            itemBlock =
                itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (let i = 0; i < this.itemCount_; i++) {
            const connection = this.getInput("object" + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) === -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (let i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, "object" + i);
        }
    },

    saveConnections: function (containerBlock) {
        //TODO: сделать рефакторинг
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        let i = 0;
        while (itemBlock) {
            const input = this.getInput("object" + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            itemBlock =
                itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
            i++;
        }
    },

    updateShape_: function () {
        //TODO: сделать рефакторинг
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput("EMPTY").appendField("objects");
        }
        // Add new inputs.
        for (let i = 0; i < this.itemCount_; i++) {
            if (!this.getInput("object" + i)) {
                const input = this.appendValueInput("object" + i).setCheck("Object").appendField("object" + i);
            }
        }
        // Remove deleted inputs.
        for (let i = this.itemCount_; this.getInput("object" + i); i++) {
            this.removeInput("object" + i);
        }
    },

};

javascriptGenerator.forBlock['check_relationship'] = function (block) {
    var value_object = javascriptGenerator.valueToCode(block, 'object', javascriptGenerator.ORDER_NONE);
    var value_relationship = javascriptGenerator.valueToCode(block, 'relationship', javascriptGenerator.ORDER_NONE);

    var code = value_object + "->" + value_relationship + "(";
    let values = [];
    for (var i = 0; i < block.itemCount_; i++) {
        let valueCode = javascriptGenerator.valueToCode(block, 'object' + i, javascriptGenerator.ORDER_NONE);
        if (valueCode) {
            values.push(valueCode);
        }
    }
    let valueString = values.join(", ");
    code += valueString + ")";
    return [code, javascriptGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['check_relationship_item'] = {
    init: function () {
        this.setColour(240);
        this.appendDummyInput().appendField("Object");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    },
};

Blockly.Blocks['check_relationship_container'] = {
    init: function () {
        this.setColour(240);
        this.appendDummyInput().appendField("list objects");
        this.appendStatementInput('STACK');
        this.setTooltip("");
        this.contextMenu = false;
    },
};

Blockly.Blocks['and'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("And");
        this.appendValueInput("operand1")
            .setCheck("Boolean")
            .appendField("operand1");
        this.appendValueInput("operand2")
            .setCheck("Boolean")
            .appendField("operand2");
        this.setOutput(true, "Boolean");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['and'] = function (block) {
    var value_operand1 = javascriptGenerator.valueToCode(block, 'operand1', javascriptGenerator.ORDER_LOGICAL_AND);
    var value_operand2 = javascriptGenerator.valueToCode(block, 'operand2', javascriptGenerator.ORDER_LOGICAL_AND);
    var code = value_operand1 + " and " + value_operand2;
    return [code, javascriptGenerator.ORDER_LOGICAL_AND];
};


Blockly.Blocks['or'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Or");
        this.appendValueInput("operand1")
            .setCheck("Boolean")
            .appendField("operand1");
        this.appendValueInput("operand2")
            .setCheck("Boolean")
            .appendField("operand2");
        this.setOutput(true, "Boolean");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['or'] = function (block) {
    var value_operand1 = javascriptGenerator.valueToCode(block, 'operand1', javascriptGenerator.ORDER_LOGICAL_OR);
    var value_operand2 = javascriptGenerator.valueToCode(block, 'operand2', javascriptGenerator.ORDER_LOGICAL_OR);
    var code = value_operand1 + " or " + value_operand2;
    return [code, javascriptGenerator.ORDER_LOGICAL_OR];
};


Blockly.Blocks['not'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Not");
        this.appendValueInput("operand")
            .setCheck("Boolean")
            .appendField("operand");
        this.setOutput(true, "Boolean");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['not'] = function (block) {
    var value_operand = javascriptGenerator.valueToCode(block, 'operand', javascriptGenerator.ORDER_LOGICAL_NOT);
    var code = "not " + value_operand;
    return [code, javascriptGenerator.ORDER_LOGICAL_NOT];
};


Blockly.Blocks['comparison'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("comparison");
        this.appendValueInput("operand1")
            .setCheck(["String", "Integer", "Double", "Enum", "Object", "Boolean", "Class"])
            .appendField("operand1");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["greater", "GREATER"], ["less", "LESS"], ["equal", "EQUAL"], ["not equal", "NOT_EQUAL"], ["greater or equal", "GE"], ["less or equal", "LE"]]), "operator");
        this.appendValueInput("operand2")
            .setCheck(["String", "Integer", "Double", "Enum", "Object", "Boolean", "Class"])
            .appendField("operand2");
        this.setInputsInline(false);
        this.setOutput(true, "Boolean");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['comparison'] = function (block) {
    var value_operand1 = javascriptGenerator.valueToCode(block, 'operand1', javascriptGenerator.ORDER_RELATIONAL);
    var dropdown_operator = block.getFieldValue('operator');
    var operators = { GREATER: ">", LESS: "<", EQUAL: "==", NOT_EQUAL: "!=", GE: ">=", LE: "<=" };
    var value_operand2 = javascriptGenerator.valueToCode(block, 'operand2', javascriptGenerator.ORDER_RELATIONAL);
    var code = value_operand1 + " " + operators[dropdown_operator] + " " + value_operand2;
    return [code, javascriptGenerator.ORDER_RELATIONAL];
};


Blockly.Blocks['three_digit_comparison'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("three-digit comparison");
        this.appendValueInput("operand1")
            .setCheck(["String", "Integer", "Double", "Enum", "Object", "Boolean", "Class"])
            .appendField("operand1");
        this.appendValueInput("operand2")
            .setCheck(["String", "Integer", "Double", "Enum", "Object", "Boolean", "Class"])
            .appendField("operand2");
        this.setOutput(true, "Enum");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['three_digit_comparison'] = function (block) {
    var value_operand1 = javascriptGenerator.valueToCode(block, 'operand1', javascriptGenerator.ORDER_NONE);
    var value_operand2 = javascriptGenerator.valueToCode(block, 'operand2', javascriptGenerator.ORDER_NONE);
    var code = value_operand1 + ".compare(" + value_operand2 + ")";
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['quantifier_of_existence'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("∃");
        this.appendValueInput("definition_area")
            .setCheck("Boolean")
            .appendField("definition area");
        this.appendValueInput("verification_condition")
            .setCheck("Boolean")
            .appendField("verification condition");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("type", validator), "type_var");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("var", validator), "name_var");
        this.setInputsInline(false);
        this.setOutput(true, "Boolean");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['quantifier_of_existence'] = function (block) {
    var value_definition_area = javascriptGenerator.valueToCode(block, 'definition_area', javascriptGenerator.ORDER_NONE);
    var value_verification_condition = javascriptGenerator.valueToCode(block, 'verification_condition', javascriptGenerator.ORDER_NONE);
    var text_type_var = block.getFieldValue('type_var');
    var text_name_var = block.getFieldValue('name_var');
    var code = "exist " + text_type_var + " " + text_name_var + " [ " + value_definition_area + " ] { " + value_verification_condition + " }";
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['quantifier_of_generality'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("∀");
        this.appendValueInput("definition_area")
            .setCheck("Boolean")
            .appendField("definition area");
        this.appendValueInput("verification_condition")
            .setCheck("Boolean")
            .appendField("verification condition");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("type", validator), "type_var");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("var", validator), "name_var");
        this.setInputsInline(false);
        this.setOutput(true, "Boolean");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['quantifier_of_generality'] = function (block) {
    var value_definition_area = javascriptGenerator.valueToCode(block, 'definition_area', javascriptGenerator.ORDER_NONE);
    var value_verification_condition = javascriptGenerator.valueToCode(block, 'verification_condition', javascriptGenerator.ORDER_NONE);
    var text_type_var = block.getFieldValue('type_var');
    var text_name_var = block.getFieldValue('name_var');
    var code = "forall " + text_type_var + " " + text_name_var + " [ " + value_definition_area + " ] { " + value_verification_condition + " } ";
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['ref_to_decision_tree_var'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("decision_tree_var", validator), "var_name");
        this.setOutput(true, ["Object", "VarObject"]);
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['ref_to_decision_tree_var'] = function (block) {
    var text_var_name = block.getFieldValue('var_name');
    var code = text_var_name;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['variable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("variable", validator), "var_name");
        this.setOutput(true, "Object");
        this.setColour(45);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['variable'] = function (block) {
    var text_name_variable = block.getFieldValue('var_name');
    var code = "$" + text_name_variable;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['enum'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("owner", validator), "owner_name");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("value", validator), "value");
        this.setOutput(true, "Enum");
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['enum'] = function (block) {
    var text_owner_name = block.getFieldValue('owner_name');
    var text_value = block.getFieldValue('value');
    var code = text_owner_name + "::" + text_value;
    return [code, javascriptGenerator.ORDER_ATOMIC];
};


Blockly.Blocks['block'] = {
    init: function () {
        this.itemCount_ = 2;
        this.appendDummyInput()
            .appendField("Block");
        this.appendValueInput("statement0")
            .setCheck(["String", "Integer", "Double", "Enum", "Object", "Boolean", "Statement"])
            .appendField("statement0");
        this.setInputsInline(false);
        this.setMutator(new Blockly.Mutator(['check_statement_item']));
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },

    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },

    saveExtraState: function () {
        return {
            'itemCount': this.itemCount_,
        };
    },

    loadExtraState: function (state) {
        this.itemCount_ = state['itemCount'];
        this.updateShape_();
    },

    decompose: function (workspace) {
        //TODO: сделать рефакторинг
        const containerBlock = workspace.newBlock('check_statement_container');
        containerBlock.initSvg();
        let connection = containerBlock.getInput('STACK').connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = workspace.newBlock('check_statement_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },

    compose: function (containerBlock) {
        //TODO: сделать рефакторинг
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        const connections = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            connections.push(itemBlock.valueConnection_);
            itemBlock =
                itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (let i = 0; i < this.itemCount_; i++) {
            const connection = this.getInput("statement" + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) === -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (let i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, "statement" + i);
        }
    },

    saveConnections: function (containerBlock) {
        //TODO: сделать рефакторинг
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        let i = 0;
        while (itemBlock) {
            const input = this.getInput("statement" + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            itemBlock =
                itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
            i++;
        }
    },

    updateShape_: function () {
        //TODO: сделать рефакторинг
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput("EMPTY").appendField("statements");
        }
        // Add new inputs.
        for (let i = 0; i < this.itemCount_; i++) {
            if (!this.getInput("statement" + i)) {
                const input = this.appendValueInput("statement" + i).setCheck(["String", "Integer", "Double", "Enum", "Object", "Boolean", "Statement"]).appendField("statement" + i);
            }
        }
        // Remove deleted inputs.
        for (let i = this.itemCount_; this.getInput("statement" + i); i++) {
            this.removeInput("statement" + i);
        }
    },

};

javascriptGenerator.forBlock['block'] = function (block) {
    var code = "{\n";
    for (var i = 0; i < block.itemCount_; i++) {
        let valueCode = javascriptGenerator.valueToCode(block, 'statement' + i, javascriptGenerator.ORDER_NONE);
        if (valueCode) {
            code += valueCode + ";\n";
        }
    }
    code += "}";
    return code;
};

Blockly.Blocks['check_statement_item'] = {
    init: function () {
        this.setColour(240);
        this.appendDummyInput().appendField("Statement");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
        this.contextMenu = false;
    },
};

Blockly.Blocks['check_statement_container'] = {
    init: function () {
        this.setColour(240);
        this.appendDummyInput().appendField("list statements");
        this.appendStatementInput('STACK');
        this.setTooltip("");
        this.contextMenu = false;
    },
};