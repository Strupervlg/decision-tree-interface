Blockly.Blocks['is_between'] = {
  init: function () {
    this.appendValueInput("token1")
      .setCheck(null);
    this.appendValueInput("token2")
      .setCheck(null)
      .appendField("is between");
    this.appendValueInput("token3")
      .setCheck(null)
      .appendField("and");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['token'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("token"), "number");
    this.setOutput(true, "class");
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['element'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("element"), "number");
    this.setOutput(true, "class");
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['unevulated'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck("class")
      .appendField("unevulated");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['unused'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck("class")
      .appendField("unused");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['find'] = {
  init: function () {
    this.appendValueInput("restrictions")
      .setCheck(null)
      .appendField("Find");
    this.appendValueInput("token")
      .setCheck("object");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['operand'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("operand"), "number");
    this.setOutput(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['object'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("X"), "nameObject");
    this.setOutput(true, null);
    this.setColour(75);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['to_the_right'] = {
  init: function () {
    this.appendValueInput("token1")
      .setCheck(null);
    this.appendValueInput("token2")
      .setCheck(null)
      .appendField("is to the right of");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['left_closest'] = {
  init: function () {
    this.appendValueInput("token1")
      .setCheck(null);
    this.appendValueInput("token2")
      .setCheck(null)
      .appendField("is left closest");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['operator'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("operator"), "number");
    this.setOutput(true, "class");
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['is_question'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck(null)
      .appendField("Is");
    this.appendDummyInput()
      .appendField("?");
    this.setInputsInline(true);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['has'] = {
  init: function () {
    this.appendValueInput("element")
      .setCheck("class");
    this.appendValueInput("token")
      .setCheck("class")
      .appendField("has");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['to_the_left'] = {
  init: function () {
    this.appendValueInput("token1")
      .setCheck(null);
    this.appendValueInput("token2")
      .setCheck(null)
      .appendField("is to the left of");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['right_closest'] = {
  init: function () {
    this.appendValueInput("token1")
      .setCheck(null);
    this.appendValueInput("token2")
      .setCheck(null)
      .appendField("is right closest");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['is_closer_to'] = {
  init: function () {
    this.appendValueInput("token1")
      .setCheck(null);
    this.appendValueInput("token2")
      .setCheck(null)
      .appendField("is closer to");
    this.appendValueInput("token3")
      .setCheck(null)
      .appendField("than");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['is_closest'] = {
  init: function () {
    this.appendValueInput("token1")
      .setCheck(null);
    this.appendValueInput("token2")
      .setCheck(null)
      .appendField("is closest");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['in_parenthesis'] = {
  init: function () {
    this.appendValueInput("token1")
      .setCheck(null);
    this.appendValueInput("element")
      .setCheck(null)
      .appendField("in parenthesis");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['is_operand'] = {
  init: function () {
    this.appendValueInput("element")
      .setCheck(null);
    this.appendValueInput("operator")
      .setCheck(null)
      .appendField("is");
    this.appendDummyInput()
      .appendField("is operand");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['how_many'] = {
  init: function () {
    this.appendValueInput("property_name")
      .setCheck(null)
      .appendField("How many");
    this.appendValueInput("object")
      .setCheck(null);
    this.appendDummyInput()
      .appendField("has?");
    this.setInputsInline(true);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['count_of_tokens'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("count of tokens");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['does'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck(null)
      .appendField("Does");
    this.appendDummyInput()
      .appendField("?");
    this.setInputsInline(true);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['need_left_operand'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck(null);
    this.appendDummyInput()
      .appendField("need left operand");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['compare'] = {
  init: function () {
    this.appendValueInput("property")
      .setCheck(null)
      .appendField("Compare");
    this.appendValueInput("object1")
      .setCheck(null)
      .appendField("of");
    this.appendValueInput("object2")
      .setCheck(null)
      .appendField("and");
    this.setInputsInline(true);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['precedence'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("precedence");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['what_is'] = {
  init: function () {
    this.appendValueInput("property")
      .setCheck(null)
      .appendField("What is");
    this.appendValueInput("object")
      .setCheck(null)
      .appendField("of");
    this.appendDummyInput()
      .appendField("?");
    this.setInputsInline(true);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['associativity'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("associativity");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['and'] = {
  init: function() {
    this.appendValueInput("operand1")
        .setCheck(null);
    this.appendValueInput("operand2")
        .setCheck(null)
        .appendField("and");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(75);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['for_all'] = {
  init: function() {
    this.appendValueInput("restrictions")
        .setCheck(null)
        .appendField("∀");
    this.setOutput(true, null);
    this.setColour(75);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['there_exists'] = {
  init: function() {
    this.appendValueInput("restrictions")
        .setCheck(null)
        .appendField("∃");
    this.setOutput(true, null);
    this.setColour(75);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};