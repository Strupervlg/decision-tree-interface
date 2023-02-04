Blockly.Blocks['object'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("object"), "object_name");
    this.setOutput(true, "Object");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['class'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("class"), "class_name");
    this.setOutput(true, "Class");
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['property'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("property"), "property_name");
    this.setOutput(true, "Property");
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['relationship'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("relationship"), "relationship_name");
    this.setOutput(true, "Relationship");
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("string"), "value");
    this.setOutput(true, "String");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['boolean'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "value");
    this.setOutput(true, "Boolean");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['integer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 1), "value");
    this.setOutput(true, "Integer");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['double'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "value");
    this.setOutput(true, "Double");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['comparison_result'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["greater","GREATER"], ["less","LESS"], ["equal","EQUAL"], ["undetermined","UNDETERMINED"]]), "value");
    this.setOutput(true, "ComparisonResult");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['get_class'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("Object")
        .appendField("get class");
    this.setOutput(true, "Class");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['get_property_value'] = {
  init: function() {
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

Blockly.Blocks['get_relationship_object'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get relationship object");
    this.appendValueInput("object")
        .setCheck("Object")
        .appendField("object");
    this.appendValueInput("relationship")
        .setCheck("Relationship")
        .appendField("relationship");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("var"), "name_var");
    this.appendValueInput("boolean")
        .setCheck("Boolean")
        .appendField("boolean");
    this.setInputsInline(false);
    this.setOutput(true, ["Object", "Boolean"]);
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['get_condition_object'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get object by condition");
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField("condition");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("var"), "name_var");
    this.setInputsInline(false);
    this.setOutput(true, ["Object", "Boolean"]);
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['get_extr_object'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get extreme object");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("var1"), "name_var1");
    this.appendValueInput("extreme_condition")
        .setCheck("Boolean")
        .appendField("extreme condition");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("var2"), "name_var2");
    this.appendValueInput("general_condition")
        .setCheck("Boolean")
        .appendField("general condition");
    this.setInputsInline(false);
    this.setOutput(true, ["Object", "Boolean"]);
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['assign_value_to_property'] = {
  init: function() {
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
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['assign_value_to_variable_decision_tree'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Assign a value to a variable decision tree");
    this.appendValueInput("ref_to_object")
        .setCheck("VarObject")
        .appendField("reference to object");
    this.appendValueInput("new_object")
        .setCheck("Object")
        .appendField("new object");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['check_object_class'] = {
  init: function() {
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

Blockly.Blocks['check_value_of_property'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Check the value of an object property");
    this.appendValueInput("object")
        .setCheck("Object")
        .appendField("object");
    this.appendValueInput("property")
        .setCheck("Property")
        .appendField("property");
    this.appendValueInput("property_value")
        .setCheck(["Boolean", "String", "Integer", "Double", "Enum"])
        .appendField("property value");
    this.setOutput(true, "Boolean");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['check_relationship'] = {
  init: function() {
    this.itemCount_ = 2;
    this.appendDummyInput()
        .appendField("Check for a relationship");
    this.appendValueInput("object")
        .setCheck("Object")
        .appendField("object");
    this.appendValueInput("relationship")
        .setCheck("Relationship")
        .appendField("relationship");
    this.setInputsInline(false);
    this.setOutput(true, "Boolean");
    this.setMutator(new Blockly.Mutator(['check_relationship_item']));
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },

  saveExtraState: function() {
    return {
      'itemCount': this.itemCount_,
    };
  },
  
  loadExtraState: function(state) {
    this.itemCount_ = state['itemCount'];
    this.updateShape_();
  },
  
  decompose: function(workspace) {
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
  
  compose: function(containerBlock) {
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
  
  saveConnections: function(containerBlock) {
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
  
  updateShape_: function() {
    //TODO: сделать рефакторинг
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput("EMPTY").appendField("objects");
    }
    // Add new inputs.
    for (let i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("object" + i)) {
        const input = this.appendValueInput("object" + i).setCheck("Object").appendField("object"+i);
      }
    }
    // Remove deleted inputs.
    for (let i = this.itemCount_; this.getInput("object" + i); i++) {
      this.removeInput("object" + i);
    }
  },

};

Blockly.Blocks['check_relationship_item'] = {
  init: function() {
    this.setColour(240);
    this.appendDummyInput().appendField("Object");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
    this.contextMenu = false;
  },
};

Blockly.Blocks['check_relationship_container'] = {
  init: function() {
    this.setColour(240);
    this.appendDummyInput().appendField("list objects");
    this.appendStatementInput('STACK');
    this.setTooltip("");
    this.contextMenu = false;
  },
};

Blockly.Blocks['and'] = {
  init: function() {
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

Blockly.Blocks['or'] = {
  init: function() {
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

Blockly.Blocks['not'] = {
  init: function() {
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

Blockly.Blocks['comparison'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("comparison");
    this.appendValueInput("operand1")
        .setCheck(["String", "Integer", "Double", "Enum"])
        .appendField("operand1");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["greater","GREATER"], ["less","LESS"], ["equal","EQUAL"], ["not equal","NOT_EQUAL"], ["greater or equal","GE"], ["less or equal","LE"]]), "operator");
    this.appendValueInput("operand2")
        .setCheck(["String", "Integer", "Double", "Enum"])
        .appendField("operand1");
    this.setInputsInline(false);
    this.setOutput(true, "Boolean");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['three_digit_comparison'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("three-digit comparison");
    this.appendValueInput("operand1")
        .setCheck(["String", "Integer", "Double", "Enum"])
        .appendField("operand1");
    this.appendValueInput("operand2")
        .setCheck(["String", "Integer", "Double", "Enum"])
        .appendField("operand2");
    this.setOutput(true, "ComparisonResult");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['quantifier_of_existence'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("∃");
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField("condition");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("var"), "name_var");
    this.setInputsInline(false);
    this.setOutput(true, "Boolean");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['quantifier_of_generality'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("∀");
    this.appendValueInput("definition_area")
        .setCheck("Boolean")
        .appendField("definition area");
    this.appendValueInput("verification_condition")
        .setCheck("Boolean")
        .appendField("verification condition");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("var"), "name_var");
    this.setInputsInline(false);
    this.setOutput(true, "Boolean");
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ref_to_decision_tree_var'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("decision_tree_var"), "var_name");
    this.setOutput(true, ["Object", "VarObject"]);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("variable"), "var_name");
    this.setOutput(true, "Object");
    this.setColour(45);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['enum'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("owner"), "owner_name");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("value"), "value");
    this.setOutput(true, "Enum");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};