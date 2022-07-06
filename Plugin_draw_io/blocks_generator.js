//Классы
Blockly.JavaScript['token'] = function(block) {
  var text_number = block.getFieldValue('number');
  var code = "<font color=\"#ff66b3\">"+ text_number +"</font>";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['element'] = function(block) {
  var text_number = block.getFieldValue('number');
  var code = "<font color=\"#ff66b3\">"+ text_number +"</font>";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['operand'] = function(block) {
  var text_number = block.getFieldValue('number');
  var code = "<font color=\"#ff66b3\">"+ text_number +"</font>";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['operator'] = function(block) {
  var text_number = block.getFieldValue('number');
  var code = "<font color=\"#ff66b3\">"+ text_number +"</font>";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


//Свойства классов
Blockly.JavaScript['count_of_tokens'] = function(block) {
  var code = "count of tokens";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['need_left_operand'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
  var code = value_name + " need a left operand";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['precedence'] = function(block) {
  var code = "precedence";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['associativity'] = function(block) {
  var code = "associativity";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


//Свойства объектов
Blockly.JavaScript['unevulated'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
  var code = "<font color=\"#00cc00\">unevulated</font> " + value_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['unused'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
  var code = "<font color=\"#00cc00\">unused</font> " + value_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


//Отношения
Blockly.JavaScript['is_between'] = function(block) {
  var value_token1 = Blockly.JavaScript.valueToCode(block, 'token1', Blockly.JavaScript.ORDER_NONE);
  var value_token2 = Blockly.JavaScript.valueToCode(block, 'token2', Blockly.JavaScript.ORDER_NONE);
  var value_token3 = Blockly.JavaScript.valueToCode(block, 'token3', Blockly.JavaScript.ORDER_NONE);
  var code = value_token1 + " <font color=\"#00cccc\">is between</font> " + value_token2 + " and " + value_token3;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['to_the_right'] = function(block) {
  var value_token1 = Blockly.JavaScript.valueToCode(block, 'token1', Blockly.JavaScript.ORDER_NONE);
  var value_token2 = Blockly.JavaScript.valueToCode(block, 'token2', Blockly.JavaScript.ORDER_NONE);
  var code = value_token1 + " <font color=\"#00cccc\">is to the right</font> " + value_token2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['left_closest'] = function(block) {
  var value_token1 = Blockly.JavaScript.valueToCode(block, 'token1', Blockly.JavaScript.ORDER_NONE);
  var value_token2 = Blockly.JavaScript.valueToCode(block, 'token2', Blockly.JavaScript.ORDER_NONE);
  var code = value_token1 + " <font color=\"#00cccc\">left closest</font> " + value_token2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['has'] = function(block) {
  var value_element = Blockly.JavaScript.valueToCode(block, 'element', Blockly.JavaScript.ORDER_NONE);
  var value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_NONE);
  var code = value_element + " <font color=\"#00cccc\">has</font> " + value_token;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['to_the_left'] = function(block) {
  var value_token1 = Blockly.JavaScript.valueToCode(block, 'token1', Blockly.JavaScript.ORDER_NONE);
  var value_token2 = Blockly.JavaScript.valueToCode(block, 'token2', Blockly.JavaScript.ORDER_NONE);
  var code = value_token1 + " <font color=\"#00cccc\">is to the left</font> " + value_token2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['right_closest'] = function(block) {
  var value_token1 = Blockly.JavaScript.valueToCode(block, 'token1', Blockly.JavaScript.ORDER_NONE);
  var value_token2 = Blockly.JavaScript.valueToCode(block, 'token2', Blockly.JavaScript.ORDER_NONE);
  var code = value_token1 + " <font color=\"#00cccc\">right closest</font> " + value_token2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['is_closer_to'] = function(block) {
  var value_token1 = Blockly.JavaScript.valueToCode(block, 'token1', Blockly.JavaScript.ORDER_NONE);
  var value_token2 = Blockly.JavaScript.valueToCode(block, 'token2', Blockly.JavaScript.ORDER_NONE);
  var value_token3 = Blockly.JavaScript.valueToCode(block, 'token3', Blockly.JavaScript.ORDER_NONE);
  var code = value_token1 + " <font color=\"#00cccc\">is closer to</font> " + value_token2 + " <font color=\"#00cccc\">than</font> " + value_token3;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['is_closest'] = function(block) {
  var value_token1 = Blockly.JavaScript.valueToCode(block, 'token1', Blockly.JavaScript.ORDER_NONE);
  var value_token2 = Blockly.JavaScript.valueToCode(block, 'token2', Blockly.JavaScript.ORDER_NONE);
  var code = value_token1 + " <font color=\"#00cccc\">is closest</font> " + value_token2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['in_parenthesis'] = function(block) {
  var value_token1 = Blockly.JavaScript.valueToCode(block, 'token1', Blockly.JavaScript.ORDER_NONE);
  var value_element = Blockly.JavaScript.valueToCode(block, 'element', Blockly.JavaScript.ORDER_NONE);
  var code = value_token1 + " <font color=\"#00cccc\">in parenthesis</font> " + value_element;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['is_operand'] = function(block) {
  var value_element = Blockly.JavaScript.valueToCode(block, 'element', Blockly.JavaScript.ORDER_NONE);
  var value_operator = Blockly.JavaScript.valueToCode(block, 'operator', Blockly.JavaScript.ORDER_NONE);
  var code = value_element + " <font color=\"#00cccc\">is</font> " + value_operator + "'s <font color=\"#00cccc\">operand</font>";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


//Действия
Blockly.JavaScript['find'] = function(block) {
  var value_restrictions = Blockly.JavaScript.valueToCode(block, 'restrictions', Blockly.JavaScript.ORDER_NONE);
  var value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_NONE);
  var code = "<font color=\"#6666ff\">Find</font> " + value_restrictions + "<br>" + value_token;
  return code;
};


//Вопросы
Blockly.JavaScript['is_question'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
  var code = "Is " + value_name + "?";
  return code;
};

Blockly.JavaScript['how_many'] = function(block) {
  var value_property_name = Blockly.JavaScript.valueToCode(block, 'property_name', Blockly.JavaScript.ORDER_NONE);
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_NONE);
  var code = "How many " + value_property_name + " " + value_object + " has?";
  return code;
};

Blockly.JavaScript['does'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_NONE);
  var code = "Does " + value_name + "?";
  return code;
};

Blockly.JavaScript['compare'] = function(block) {
  var value_property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_NONE);
  var value_object1 = Blockly.JavaScript.valueToCode(block, 'object1', Blockly.JavaScript.ORDER_NONE);
  var value_object2 = Blockly.JavaScript.valueToCode(block, 'object2', Blockly.JavaScript.ORDER_NONE);
  var code = "Compare " + value_property + " of " + value_object1 + " and " + value_object2 + "?";
  return code;
};

Blockly.JavaScript['what_is'] = function(block) {
  var value_property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_NONE);
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_NONE);
  var code = "What is " + value_property + " of " + value_object + "?";
  return code;
};


//Общее
Blockly.JavaScript['object'] = function(block) {
  var text_nameobject = block.getFieldValue('nameObject');
  var code = "<font color=\"#cccc00\">"+ text_nameobject +"</font>";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};