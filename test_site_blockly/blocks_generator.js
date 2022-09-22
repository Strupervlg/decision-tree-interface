Blockly.JavaScript['object'] = function(block) {
  var text_object_name = block.getFieldValue('object_name');
  var code = text_object_name;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['class'] = function(block) {
  var text_class_name = block.getFieldValue('class_name');
  var code = text_class_name;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['property'] = function(block) {
  var text_property_name = block.getFieldValue('property_name');
  var code = text_property_name;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['relationship'] = function(block) {
  var text_relationship_name = block.getFieldValue('relationship_name');
  var code = text_relationship_name;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['string'] = function(block) {
  var text_value = block.getFieldValue('value');
  var code = "\"" + text_value + "\"";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['boolean'] = function(block) {
  var checkbox_value = block.getFieldValue('value') === 'TRUE';
  var code = checkbox_value;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['integer'] = function(block) {
  var number_value = block.getFieldValue('value');
  var code = number_value;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['double'] = function(block) {
  var number_value = block.getFieldValue('value');
  var code = number_value;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['comparison_result'] = function(block) {
  var dropdown_value = block.getFieldValue('value');
  var code = dropdown_value;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['get_class'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_NONE);
  var code = value_object + ".getClass()";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['get_property_value'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_NONE);
  var value_property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_NONE);
  var code = value_object + "." + value_property;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['get_relationship_object'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_NONE);
  var value_relationship = Blockly.JavaScript.valueToCode(block, 'relationship', Blockly.JavaScript.ORDER_NONE);
  var code = value_object + "->" + value_relationship;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['get_condition_object'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_NONE);
  var text_name_var = block.getFieldValue('name_var');
  var code = "get " + text_name_var + " { " + value_condition + " } ";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['get_extr_object_condition_and_relation'] = function(block) {
  var value_relationship = Blockly.JavaScript.valueToCode(block, 'relationship', Blockly.JavaScript.ORDER_NONE);
  var value_object1 = Blockly.JavaScript.valueToCode(block, 'object1', Blockly.JavaScript.ORDER_NONE);
  var value_object2 = Blockly.JavaScript.valueToCode(block, 'object2', Blockly.JavaScript.ORDER_NONE);
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_NONE);
  var text_name_var = block.getFieldValue('name_var');
  // TODO: Исправить когда решится
  var code = "getExtrem " + text_name_var + " { ";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['assign_value_to_property'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_NONE);
  var value_property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_NONE);
  var value_new_value = Blockly.JavaScript.valueToCode(block, 'new_value', Blockly.JavaScript.ORDER_NONE);
  var code = value_object + "." + value_property + " = " + value_new_value;
  return code;
};

Blockly.JavaScript['assign_value_to_variable_decision_tree'] = function(block) {
  var value_ref_to_object = Blockly.JavaScript.valueToCode(block, 'ref_to_object', Blockly.JavaScript.ORDER_NONE);
  var value_new_object = Blockly.JavaScript.valueToCode(block, 'new_object', Blockly.JavaScript.ORDER_NONE);
  var code = value_ref_to_object + " = " + value_new_object;
  return code;
};

Blockly.JavaScript['check_object_class'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_NONE);
  var value_class = Blockly.JavaScript.valueToCode(block, 'class', Blockly.JavaScript.ORDER_NONE);
  var code = value_object + " is " + value_class;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['check_value_of_property'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_NONE);
  var value_property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_NONE);
  var value_property_value = Blockly.JavaScript.valueToCode(block, 'property_value', Blockly.JavaScript.ORDER_NONE);
  var code = value_object + "." + value_property + ".checkVal(" + value_property_value + ")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['check_relationship'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_NONE);
  var value_relationship = Blockly.JavaScript.valueToCode(block, 'relationship', Blockly.JavaScript.ORDER_NONE);
  var code = value_object + "." + value_relationship + ".checkRel("; 
  let values = [];
  for (var i = 0; i < block.itemCount_; i++) {
    let valueCode = Blockly.JavaScript.valueToCode(block, 'object' + i, Blockly.JavaScript.ORDER_NONE);
    if(valueCode) {
      values.push(valueCode);
    }
  }
  let valueString = values.join(", ");
  code += valueString + ")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['and'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'operand1', Blockly.JavaScript.ORDER_NONE);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'operand2', Blockly.JavaScript.ORDER_NONE);
  var code = value_operand1 + " and " + value_operand2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['or'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'operand1', Blockly.JavaScript.ORDER_NONE);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'operand2', Blockly.JavaScript.ORDER_NONE);
  var code = value_operand1 + " or " + value_operand2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['not'] = function(block) {
  var value_operand = Blockly.JavaScript.valueToCode(block, 'operand', Blockly.JavaScript.ORDER_NONE);
  var code = "not " + value_operand;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['comparison'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'operand1', Blockly.JavaScript.ORDER_NONE);
  var dropdown_operator = block.getFieldValue('operator');
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'operand2', Blockly.JavaScript.ORDER_NONE);
  var code = value_operand1 + " " + dropdown_operator + " " + value_operand2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['three_digit_comparison'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'operand1', Blockly.JavaScript.ORDER_NONE);
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'operand2', Blockly.JavaScript.ORDER_NONE);
  var code = value_operand1 + ".compare(" + value_operand2 + ")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['quantifier_of_existence'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_NONE);
  var dropdown_type = block.getFieldValue('type');
  var text_name_var = block.getFieldValue('name_var');
  // TODO: Как тут указать тип переменной??
  var code = "exist " + text_name_var + " { " + value_condition + " }";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['quantifier_of_generality'] = function(block) {
  var value_definition_area = Blockly.JavaScript.valueToCode(block, 'definition_area', Blockly.JavaScript.ORDER_NONE);
  var value_verification_condition = Blockly.JavaScript.valueToCode(block, 'verification_condition', Blockly.JavaScript.ORDER_NONE);
  var dropdown_type = block.getFieldValue('type');
  var text_name_var = block.getFieldValue('name_var');
  // TODO: Как тут указать тип переменной??
  var code = "forall " + text_name_var + " { " + value_definition_area + " } { " + value_verification_condition + " }";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['ref_to_decision_tree_var'] = function(block) {
  var text_var_name = block.getFieldValue('var_name');
  var code = 'var:' + text_var_name;
  return [code, Blockly.JavaScript.ORDER_NONE];
};