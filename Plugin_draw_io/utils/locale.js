function getTextByLocale(type) {
    if (mxClient.language == "ru") {
        return RU_TEXT[type];
    } else {
        return EN_TEXT[type];
    }
}

const RU_TEXT = {
    //Разделы меню
    "menuItemDictionaryConstructors": "Конструкторы словарей",
    "menuItemNodeConstructors": "Конструкторы узлов",
    "menuItemExport": "Экспорт",
    "menuItemEdit": "Изменить",
    "menuItemConverNode": "Конвертация узлов",

    //Элементы меню
    "classesConstructor": "Конструктор классов",
    "classPropertiesConstructor": "Конструктор свойств для классов и объектов",
    "relationshipsConstructor": "Конструктор отношений",
    "enumConstructor": "Конструктор enum",
    "startNodeConstructor": "Создать начальный узел",
    "TrueNodeCreate": 'Создать узел "Истина"',
    "FalseNodeCreate": 'Создать узел "Ложь"',
    "LogicNodeCreate": "Создать логический узел",
    "PredeterminingFactorsNodeCreate": 'Создать узел "Независимое ветвление"',
    "UncertaintyNodeCreate": 'Создать узел "Неопределенность"',
    "actionNodeConstructor": "Создать узел действия",
    "cycleNodeConstructor": 'Создать узел "Цикл"',
    "whileNodeConstructor": 'Создать узел "While"',
    "conditionNodeConstructor": "Создать узел вопроса",
    "switchCaseNodeConstructor": 'Создать узел "Switch case"',
    "exportClass": "Экспорт словаря классов",
    "exportProperty": "Экспорт словаря свойств",
    "exportRelationship": "Экспорт словаря отношений",
    "exportEnum": "Экспорт словаря enum",
    "exportTree": "Экспорт дерева",
    "editValue": "Изменить значение",
    "editTextInNode": "Изменить текстовое значение узла",
    "editQuestionInfo": "Изменить информацию для вопросов",
    "convertStartNode": "Конвертировать в стартовый узел",
    "convertTrueNode": "Конвертировать в узел Истина",
    "convertFalseNode": "Конвертировать в узел Ложь",
    "convertLogicNode": "Конвертировать в логический узел",
    "convertPredeterminingFactorsNode": 'Конвертировать в узел "Независимое ветвление"',
    "convertUncertaintyNode": 'Конвертировать в узел "Неопределенность"',
    "convertActionNode": "Конвертировать в узел действия",
    "convertCycleNode": 'Конвертировать в узел "Цикл"',
    "convertConditionNode": "Конвертировать в вопросительный узел",
    "convertSwitchCaseNode": 'Конвертировать в узел "Switch case"',

    //Текст окон (названия, кнопки)
    //Словари
    "TitleClassConstructorWindow": "Конструктор классов",
    "TitleClassEditorWindow": "Редактор классов",
    "TitleClassPropertiesConstructorWindow": "Конструктор свойств для классов и объектов",
    "TitleClassPropertiesEditorWindow": "Редактор свойств для классов и объектов",
    "TitleEnumConstructorWindow": "Конструктор enum",
    "TitleEnumEditorWindow": "Редактор enum",
    "TitleRelationshipsConstructorWindow": "Конструктор отношений",
    "TitleRelationshipsEditorWindow": "Редактор отношений",
    //Узлы
    "TitleActionNodeConstructorWindow": "Конструктор узла действия",
    "TitleActionNodeEditorWindow": "Редактор узла действия",
    "TitleBranchResultNodeConstructorWindow": 'Конструктор узлов "Истина"/"Ложь"',
    "TitleBranchResultNodeEditorWindow": 'Редактор узлов "Истина"/"Ложь"',
    "TitleConditionNodeConstructorWindow": "Конструктор узла вопроса",
    "TitleConditionNodeEditorWindow": "Редактор узла вопроса",
    "TitleCycleNodeConstructorWindow": 'Конструктор узла "Цикл"',
    "TitleCycleNodeEditorWindow": 'Редактор узла "Цикл"',
    "TitleWhileNodeConstructorWindow": 'Конструктор узла "Пока"',
    "TitleWhileNodeEditorWindow": 'Редактор узла "Пока"',
    "TitleEditTextInNodeWindow": "Редактор текста в узле",
    "TitleEditValueInOutcomeWindow": "Редактор значений в ветке",
    "TitleLogicNodeConstructorWindow": "Конструктор логическего узла",
    "TitleLogicNodeEditorWindow": "Редактор логическего узла",
    "TitlePredeterminingFactorsNodeConstructorWindow": 'Конструктор узла "Независимое ветвление"',
    "TitlePredeterminingFactorsNodeEditorWindow": 'Редактор узла "Независимое ветвление"',
    "TitleEditQuestionInfoInNodeWindow": "Редактор информации для вопросов в узле",
    "TitleEditQuestionInfoInOutcomeWindow": "Редактор информации для вопросов в ветке",
    "TitleStartConstructorWindow": "Конструктор начального узла",
    "TitleStartEditorWindow": "Редактор начального узла",
    "TitleSwitchCaseNodeConstructorWindow": 'Конструктор узла "Switch case"',
    "TitleSwitchCaseNodeEditorWindow": 'Редактор узла "Switch case"',

    //Кнопки
    "Create": "Создать",
    "Apply": "Принять",
    "Delete": "Удалить",
    "AddClass": "Добавить класс",
    "OpenBlockly": "Открыть Blockly",
    "toСode": "Перевод в код",
    "AddPropertyClass": "Добавить свойство",
    "AddEnum": "Добавить enum",
    "AddRelationship": "Добавить отношение",
    "SwitchBlockly": "Переключиться на Blockly",
    "SwitchText": "Переключиться на текст",
    "Save": "Сохранить",
    "Generate": "Сгенерировать текст",
    "AddVariable": 'Добавить переменную',

    //Текст в окне
    "ExpressionInNode": "Выражение в узле: ",
    "HumanReadableText": "Человекочитаемый текст",
    "value": "Значение",
    "type": "Тип",
    "asNextStep": "Шаблон формулировки данного узла как следующего шага.",
    "descriptionQuestion": "Шаблон описания результата данного узла.",
    "questionQuestion": "Шаблон вопроса про данный узел.",
    "endingCause": "Шаблон формулировки конечности данного узла.",
    "descriptionOutcome": "Шаблон описания результата ветки.",
    "nextStepQuestion": "Шаблон вопроса о том, с чего надо начать в ветке.",
    "nextStepExplanation": "Шаблон объяснения того, с чего на самом деле нужно начать в ветке.",
    "textQuestion": "Шаблон текста данного варианта ответа.",
    "explanation": "Шаблон объяснения, почему данный ответ правильный.",
    "nextStepQuestionOutcome": "Шаблон вопроса о том, что делать дальше при данном ответе.",
    "nextStepBranchResult": "Шаблон формулировок для красных/зеленых узлов при данном ответе.",
    "nextStepExplanationOutcome": "Шаблон объяснения того, что на самом деле делать дальше при данном ответе.",

    //Текста ошибок
    "nameIsMissing": "В строке №%i отсутствует название; ",
    "nameIsIncorrect": "В строке №%i название некорректно; ",
    "extendClassIsIncorrect": "В строке №%i название наследуемого класса некорректно; ",
    "nonUniqueClassName": "В словаре содержатся неуникальные названия классов!",
    "ClassExists": "Словарь классов уже существует!",
    "startValueIsMissing": "В строке №%i отсутствует начальное значение; ",
    "endValueIsMissing": "В строке №%i отсутствует конечное значение; ",
    "classesIsMissing": "В строке №%i отсутствуют классы; ",
    "nonUniquePropertyName": "В словаре содержатся неуникальные названия свойств!",
    "PropertyExists": "Словарь свойств уже существует",
    "valueIsMissing": "В строке №%i отсутствует значение; ",
    "valueIsIncorrect": "В строке №%i значение некорректно; ",
    "nameRDFIsMissing": "В строке №%i отсутствует название в RDF; ",
    "nameRDFIsIncorrect": "В строке №%i название в RDF некорректно; ",
    "nonUniqueEnumName": "В словаре содержатся неуникальные названия enum!",
    "EnumExists": "Словарь enum уже существует",
    "extendRelationshipIsIncorrect": "В строке №%i название наследуемого отношения некорректно; ",
    "nameRelationshipsIsMissing": "В строке №%i отсутствуют имена отношений; ",
    "nameRelationshipsIsIncorrect": "В строке №%i имя отношения некорректно; ",
    "nonUniqueRelationshipName": "В словаре содержатся неуникальные названия отношений!",
    "RelationshipExists": "Словарь отношений уже существует",
    "ExpressionIsMissing": "Отсутствует выражение",
    "NameVariableIsMissing": "Отсутствует имя переменной!\n",
    "NameVariableIsIncorrect": "Имя переменной некорректно!\n",
    "TypeVariableIsMissing": "Отсутствует тип переменной!\n",
    "sourceNodeIsMissing": "Исходный узел отсутствует!",
    "EnumIsMissing": "Отсутствует enum в словаре",
    "HumanReadableTextIsMissing": "Отсутствует человеко-читаемый текст \n",
    "ValueOutcomeIsMissing": "Отсутствует значение для ветки \n",
    "ValueInOutcomeIsMissing": "Ветке не задано значение!",
    "invalidAssign": 'Недопустимый тип в ASSIGN: слева от "=" ожидается TREE VAR или GET PROPERTY',
    "InvalidType": "Недопустимый тип в %type: ожидается %inputCheck; актуальный %outputCheck",
    "StartNodeOnlyOne": "Начальный узел должен быть один!",
    "typeOutcomeStartNodeIsMissing": 'Отсутствует тип у ветки после начального узла',
    "typeOutcomeCycleIsMissing": 'Отсутствует тип у ветки после узла цикла',
    "bodyOnlyOne": "Ветка тела для узла цикла должна быть одна!\n",
    "trueCycleOnlyOne": "Истинная ветка для узла цикла должна быть одна!\n",
    "falseCycleOnlyOne": "Ложная ветка для узла цикла должна быть одна!\n",
    "typeOutcomeLogicNodeIsMissing": 'Отсутствует тип у ветки после логического узла',
    "OutcomeLogicNodeOnlyTwo": "Веток для логического узла должно быть 2 и более!\n",
    "trueLogicNodeOnlyOne": "Истинная ветка для логического узла должна быть одна!\n",
    "falseLogicNodeOnlyOne": "Ложная ветка для логического узла должна быть одна!\n",
    "typeOutcomePredIsMissing": 'Отсутствует тип у ветки после независимого ветвления',
    "predOutcomeIsMissing": "Отсутствует предрешающая ветка для узла независимое ветвление!\n",
    "undeterminedOnlyOne": "Ветка undetermined для узла независимое ветвление должна быть одна!\n",
    "valueInOutcomeIsMissing": 'Отсутствует значение у ветки',
    "valueEnumIsMissing": 'Значение enum отсутствует в словаре',
    "ClassInDictIsMissing": 'Класс отсутствует в словаре',
    "TypesDontMatch": 'Тип ветки не совпадает с типом возвращаемого значения выражения узла',
    "OutcomesHasSameValues": 'Ветка имеет повторяющееся значение',
    "ResultOutcomeForPredNode": "Результативный узел (Ложь/Истина) для предрешающей ветки должен быть один!",
    "moreBlocksInWorkspace": 'В рабочей области имеется более одного блока',
    "propertyIsMissingInDict": 'Свойство %propertyName не существует в словаре',
    "hasCycleInTree": "В графе присутствуют циклы!",
    "AssignInNode": "В исходном узле не может содержаться присвоение!",
    "EmptyConnection": "Имеются пустые отверстия!",
    "StartNodeIsTarget": "В начальный узел входит ветка!",
    "TargetNodeIsMissing": "Отсутствует конечный узел!",
};

const EN_TEXT = {
    //Разделы меню
    "menuItemDictionaryConstructors": "Dictionary constructors",
    "menuItemNodeConstructors": "Node constructors",
    "menuItemExport": "Export",
    "menuItemEdit": "Edit",
    "menuItemConverNode": "Convert Node",

    //Элементы меню
    "classesConstructor": "Classes constructor",
    "classPropertiesConstructor": "Class and Object properties constructor",
    "relationshipsConstructor": "Relationships constructor",
    "enumConstructor": "Enum constructor",
    "startNodeConstructor": "Create start node",
    "TrueNodeCreate": "Create true node",
    "FalseNodeCreate": "Create false node",
    "LogicNodeCreate": "Create logic node",
    "PredeterminingFactorsNodeCreate": "Create predetermining factors node",
    "UncertaintyNodeCreate": "Create node uncertainty",
    "actionNodeConstructor": "Action Node Constructor",
    "cycleNodeConstructor": "Cycle Node Constructor",
    "whileNodeConstructor": "While Node Constructor",
    "conditionNodeConstructor": "Condition Node Constructor",
    "switchCaseNodeConstructor": "Switch case Node Constructor",
    "exportClass": "Export class",
    "exportProperty": "Export property",
    "exportRelationship": "Export relationship",
    "exportEnum": "Export enum",
    "exportTree": "Export tree",
    "editValue": "Edit value",
    "editTextInNode": "Edit text in node",
    "editQuestionInfo": "Edit question info",
    "convertStartNode": "Convert to a Start node",
    "convertTrueNode": "Convert to True Node",
    "convertFalseNode": "Convert to Node False",
    "convertLogicNode": "Convert to a logical node",
    "convertPredeterminingFactorsNode": 'Convert to an "Independent Branching" node',
    "convertUncertaintyNode": 'Convert to node "Uncertainty"',
    "convertActionNode": "Convert to Action Node",
    "convertCycleNode": 'Convert to a "Cycle" node',
    "convertConditionNode": "Convert node in condition node",
    "convertSwitchCaseNode": 'Convert to a "Switch case" node',

    //Текст окон (названия, кнопки)
    //Словари
    "TitleClassConstructorWindow": "Classes constructor",
    "TitleClassEditorWindow": "Classes editor",
    "TitleClassPropertiesConstructorWindow": "Class and Object properties constructor",
    "TitleClassPropertiesEditorWindow": "Class and Object properties editor",
    "TitleEnumConstructorWindow": "Enum constructor",
    "TitleEnumEditorWindow": "Enum editor",
    "TitleRelationshipsConstructorWindow": "Relationships constructor",
    "TitleRelationshipsEditorWindow": "Relationships editor",
    //Узлы
    "TitleActionNodeConstructorWindow": "Action node constructor",
    "TitleActionNodeEditorWindow": "Action node editor",
    "TitleBranchResultNodeConstructorWindow": "Branch result node constructor",
    "TitleBranchResultNodeEditorWindow": "Branch result node editor",
    "TitleConditionNodeConstructorWindow": "Condition node constructor",
    "TitleConditionNodeEditorWindow": "Condition node editor",
    "TitleCycleNodeConstructorWindow": "Cycle node constructor",
    "TitleCycleNodeEditorWindow": "Cycle node editor",
    "TitleWhileNodeConstructorWindow": "While node constructor",
    "TitleWhileNodeEditorWindow": "While node editor",
    "TitleEditTextInNodeWindow": "Edit text in node",
    "TitleEditValueInOutcomeWindow": "Edit value in outcome",
    "TitleLogicNodeConstructorWindow": "Logic node constructor",
    "TitleLogicNodeEditorWindow": "Logic node editor",
    "TitlePredeterminingFactorsNodeConstructorWindow": "Predetermining factors node constructor",
    "TitlePredeterminingFactorsNodeEditorWindow": "Predetermining factors node editor",
    "TitleEditQuestionInfoInNodeWindow": "Edit question info in node",
    "TitleEditQuestionInfoInOutcomeWindow": "Edit question info in outcome",
    "TitleStartConstructorWindow": "Start node constructor",
    "TitleStartEditorWindow": "Start node editor",
    "TitleSwitchCaseNodeConstructorWindow": "Switch case node constructor",
    "TitleSwitchCaseNodeEditorWindow": "Switch case node editor",

    //Кнопки
    "Create": "Create",
    "Apply": "Apply",
    "Delete": "Delete",
    "AddClass": "Add Class",
    "OpenBlockly": "Open Blockly",
    "toСode": "Translation into code",
    "AddPropertyClass": "Add property",
    "AddEnum": "Add Enum",
    "AddRelationship": "Add relationship",
    "SwitchBlockly": "Switch to blockly",
    "SwitchText": "Switch to text",
    "Save": "Save",
    "Generate": "Generate",
    "AddVariable": 'Add Variable',

    //Текст в окне
    "ExpressionInNode": "Expression in node: ",
    "HumanReadableText": "Human-readable text",
    "value": "Value",
    "type": "Type",
    "asNextStep": "Template formulation of this node as the next step.",
    "descriptionQuestion": "Template for describing the result of this node.",
    "questionQuestion": "Template question about this node.",
    "endingCause": "Template formulation of the end of a particular node.",
    "descriptionOutcome": "Template for describing the result of a branch.",
    "nextStepQuestion": "Template question about where to start in a branch.",
    "nextStepExplanation": "Template for explaining where you really need to start in a branch.",
    "textQuestion": "Template the text of this answer choice.",
    "explanation": "Template an explanation of why this answer is correct.",
    "nextStepQuestionOutcome": "Template a question about what to do next for a given answer.",
    "nextStepBranchResult": "Template wording for red/green nodes in this answer.",
    "nextStepExplanationOutcome": "Template an explanation of what to actually do next for a given answer.",

    //Текста ошибок
    "nameIsMissing": "In line №%i there is no name; ",
    "nameIsIncorrect": "In line №%i the name is incorrect; ",
    "extendClassIsIncorrect": "In line №%i the name of the extended class is incorrect; ",
    "nonUniqueClassName": "The dictionary contains non-unique class names!",
    "ClassExists": "Class dictionary already exists",
    "startValueIsMissing": "In line №%i there is no start value; ",
    "endValueIsMissing": "In line №%i there is no end value; ",
    "classesIsMissing": "In line №%i there are no classes; ",
    "nonUniquePropertyName": "The dictionary contains non-unique property names!",
    "PropertyExists": "Class and Object properties dictionary already exists",
    "valueIsMissing": "In line №%i there is no value; ",
    "valueIsIncorrect": "In line №%i the value is incorrect; ",
    "nameRDFIsMissing": "In line №%i there is no name in RDF; ",
    "nameRDFIsIncorrect": "In line №%i the name in RDF is incorrect; ",
    "nonUniqueEnumName": "The dictionary contains non-unique names of enum!",
    "EnumExists": "Enum dictionary already exists",
    "extendRelationshipIsIncorrect": "In line №%i the name of the inherited relationship is incorrect; ",
    "nameRelationshipsIsMissing": "In line №%i there are no relationship names; ",
    "nameRelationshipsIsIncorrect": "In line №%i the name of the relationship is incorrect; ",
    "nonUniqueRelationshipName": "The dictionary contains non-unique relationship names!",
    "RelationshipExists": "Relationships dictionary already exists",
    "ExpressionIsMissing": "There is no expression",
    "NameVariableIsMissing": "No variable name!\n",
    "NameVariableIsIncorrect": "The variable name is incorrect!\n",
    "TypeVariableIsMissing": "No variable type!\n",
    "sourceNodeIsMissing": "Source node is missing!",
    "EnumIsMissing": "No enum in the dictionary",
    "HumanReadableTextIsMissing": "No human-readable text \n",
    "ValueOutcomeIsMissing": "No value for the branch \n",
    "ValueInOutcomeIsMissing": "The branch has no value!",
    "invalidAssign": 'Invalid type in ASSIGN: to the left of "=" is expected TREE VAR or GET PROPERTY',
    "InvalidType": "Invalid type in %type: expected %inputCheck; actual %outputCheck",
    "StartNodeOnlyOne": "The starting node must be one!",
    "typeOutcomeStartNodeIsMissing": 'There is no branch type after the start node',
    "typeOutcomeCycleIsMissing": 'A branch after a cycle node has no type',
    "bodyOnlyOne": "The true branch for a cycle node must be one!\n",
    "trueCycleOnlyOne": "There must be only one true branch for the cycle node!\n",
    "falseCycleOnlyOne": "There must be only one false branch for the cycle node!\n",
    "typeOutcomeLogicNodeIsMissing": 'The branch after the logical node has no type',
    "OutcomeLogicNodeOnlyTwo": "There must be 2 or more branches for the logical node!\n",
    "trueLogicNodeOnlyOne": "The true branch for a logical node must be one!\n",
    "falseLogicNodeOnlyOne": "The false branch for a logical node must be one!\n",
    "typeOutcomePredIsMissing": 'No branch type after an independent branch',
    "predOutcomeIsMissing": "There is no predetermined branch for the independent branch node!\n",
    "undeterminedOnlyOne": "The undetermined branch for an independent branch node must be one!\n",
    "valueInOutcomeIsMissing": 'The branch has no value',
    "valueEnumIsMissing": 'The value of enum is not in the dictionary',
    "ClassInDictIsMissing": 'The class is not in the dictionary',
    "TypesDontMatch": 'The branch type does not match the type of the return value of the node expression',
    "OutcomesHasSameValues": 'The branch has a repeating value',
    "ResultOutcomeForPredNode": "The result node (False/True) for the predetermined branch must be one!",
    "moreBlocksInWorkspace": 'There is more than one block in the workspace',
    "propertyIsMissingInDict": 'Property %propertyName does not exist in the dictionary',
    "hasCycleInTree": "There are cycles in the graph!",
    "AssignInNode": "The source node cannot contain an assignment!",
    "EmptyConnection": "There are empty connection!",
    "StartNodeIsTarget": "The starting node consists of a branch!",
    "TargetNodeIsMissing": "There is no target node!",
};
