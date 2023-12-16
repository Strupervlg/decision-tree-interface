var workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
function createXML() {
    let xmlOutput = Blockly.Xml.workspaceToDom(workspace);
    let xls = loadXML(xslTxt)
    let d_ = new XSLTProcessor();
    d_.importStylesheet(xls)
    let lastXML = d_.transformToFragment(xmlOutput, document);
    let output = document.getElementById('output_xml');
    var s = new XMLSerializer();
    var str = s.serializeToString(lastXML)
    str = str.replace(/(?<=>)[\s]+(?=<)/g, '');
    output.value = str; 
}

function createCode() {
    if(workspace.getTopBlocks().length > 1) {
        console.log("Error")
        return;
    }
    let code = Blockly.JavaScript.workspaceToCode(workspace);
    if(code.slice(-1) == "\n") {
        code = code.slice(0, -2);
    }
    let output = document.getElementById('output_code');
    output.value = code;
}

function loadXML(string) {
    var oParser = new DOMParser();
    return oParser.parseFromString(string, "application/xml");
}

const xslTxt = `<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="block[@type='object']">
        <Object>
        <xsl:attribute name="name">
            <xsl:value-of select="field[@name='object_name']" />
        </xsl:attribute>
        </Object>
    </xsl:template>

    <xsl:template match="block[@type='class']">
        <Class>
        <xsl:attribute name="name">
            <xsl:value-of select="field[@name='class_name']" />
        </xsl:attribute>
        </Class>
    </xsl:template>

    <xsl:template match="block[@type='property']">
        <Property>
        <xsl:attribute name="name">
            <xsl:value-of select="field[@name='property_name']" />
        </xsl:attribute>
        </Property>
    </xsl:template>

    <xsl:template match="block[@type='relationship']">
        <Relationship>
        <xsl:attribute name="name">
            <xsl:value-of select="field[@name='relationship_name']" />
        </xsl:attribute>
        </Relationship>
    </xsl:template>

    <xsl:template match="block[@type='string']">
        <String>
            <xsl:attribute name="value">
                <xsl:value-of select="field[@name='value']" />
            </xsl:attribute>
        </String>
    </xsl:template>

    <xsl:template match="block[@type='boolean']">
        <Boolean>
            <xsl:attribute name="value">
                <xsl:value-of select="field[@name='value']" />
            </xsl:attribute>
        </Boolean>
    </xsl:template>

    <xsl:template match="block[@type='integer']">
        <Integer>
            <xsl:attribute name="value">
                <xsl:value-of select="field[@name='value']" />
            </xsl:attribute>
        </Integer>
    </xsl:template>

    <xsl:template match="block[@type='double']">
        <Double>
            <xsl:attribute name="value">
                <xsl:value-of select="field[@name='value']" />
            </xsl:attribute>
        </Double>
    </xsl:template>

    <xsl:template match="block[@type='enum']">
        <Enum>
            <xsl:attribute name="owner">
                <xsl:value-of select="field[@name='owner_name']" />
            </xsl:attribute>
            <xsl:attribute name="value">
                <xsl:value-of select="field[@name='value']" />
            </xsl:attribute>
        </Enum>
    </xsl:template>

    <xsl:template match="block[@type='ref_to_decision_tree_var']">
        <DecisionTreeVar>
            <xsl:attribute name="name">
                <xsl:value-of select="field[@name='var_name']" />
            </xsl:attribute>
        </DecisionTreeVar>
    </xsl:template>

    <xsl:template match="block[@type='variable']">
        <Variable>
            <xsl:attribute name="name">
                <xsl:value-of select="field[@name='var_name']" />
            </xsl:attribute>
        </Variable>
    </xsl:template>



    <xsl:template match="block[@type='get_class']">
        <GetClass>
            <xsl:apply-templates/>
        </GetClass>
    </xsl:template>

    <xsl:template match="block[@type='get_property_value']">
        <GetPropertyValue>
            <xsl:apply-templates/>
        </GetPropertyValue>
    </xsl:template>

    <xsl:template match="block[@type='get_relationship_object']">
        <GetByRelationship>
            <xsl:attribute name="varName">
                <xsl:value-of select="field[@name='name_var']" />
            </xsl:attribute>
            <xsl:apply-templates select="value[@name='object']" />
            <xsl:apply-templates select="value[@name='relationship']" />
            <xsl:apply-templates select="value[@name='boolean']" />
        </GetByRelationship>
    </xsl:template>

    <xsl:template match="block[@type='get_condition_object']">
        <GetByCondition>
            <xsl:attribute name="varName">
                <xsl:value-of select="field[@name='name_var']" />
            </xsl:attribute>
            <xsl:apply-templates select="value[@name='condition']" />
        </GetByCondition>
    </xsl:template>

    <xsl:template match="block[@type='get_extr_object']">
        <GetExtreme>
            <xsl:attribute name="extremeVarName">
                <xsl:value-of select="field[@name='name_var1']" />
            </xsl:attribute>
            <xsl:attribute name="varName">
                <xsl:value-of select="field[@name='name_var2']" />
            </xsl:attribute>
            <xsl:apply-templates select="value[@name='extreme_condition']" />
            <xsl:apply-templates select="value[@name='general_condition']" />
        </GetExtreme>
    </xsl:template>

    <xsl:template match="block[@type='assign_value_to_property']">
        <AssignToProperty>
            <xsl:apply-templates select="value[@name='object']" />
            <xsl:apply-templates select="value[@name='property']" />
            <xsl:apply-templates select="value[@name='new_value']" />
        </AssignToProperty>
    </xsl:template>

    <xsl:template match="block[@type='assign_value_to_variable_decision_tree']">
        <AssignToDecisionTreeVar>
            <xsl:apply-templates select="value[@name='ref_to_object']" />
            <xsl:apply-templates select="value[@name='new_object']" />
        </AssignToDecisionTreeVar>
    </xsl:template>

    <xsl:template match="block[@type='check_object_class']">
        <CheckClass>
            <xsl:apply-templates select="value[@name='object']" />
            <xsl:apply-templates select="value[@name='class']" />
        </CheckClass>
    </xsl:template>

    <xsl:template match="block[@type='check_relationship']">
        <CheckRelationship>
            <xsl:apply-templates select="value" />
        </CheckRelationship>
    </xsl:template>

    <xsl:template match="block[@type='and']">
        <LogicalAnd>
            <xsl:apply-templates select="value[@name='operand1']" />
            <xsl:apply-templates select="value[@name='operand2']" />
        </LogicalAnd>
    </xsl:template>

    <xsl:template match="block[@type='or']">
        <LogicalOr>
            <xsl:apply-templates select="value[@name='operand1']" />
            <xsl:apply-templates select="value[@name='operand2']" />
        </LogicalOr>
    </xsl:template>

    <xsl:template match="block[@type='not']">
        <LogicalNot>
            <xsl:apply-templates select="value[@name='operand']" />
        </LogicalNot>
    </xsl:template>

    <xsl:template match="block[@type='comparison']">
        <Compare>
            <xsl:attribute name="operator">
                <xsl:value-of select="field[@name='operator']" />
            </xsl:attribute>
            <xsl:apply-templates select="value[@name='operand1']" />
            <xsl:apply-templates select="value[@name='operand2']" />
        </Compare>
    </xsl:template>

    <xsl:template match="block[@type='three_digit_comparison']">
        <Compare>
            <xsl:apply-templates select="value[@name='operand1']" />
            <xsl:apply-templates select="value[@name='operand2']" />
        </Compare>
    </xsl:template>

    <xsl:template match="block[@type='quantifier_of_existence']">
        <ExistenceQuantifier>
            <xsl:attribute name="varName">
                <xsl:value-of select="field[@name='name_var']" />
            </xsl:attribute>
            <xsl:apply-templates select="value[@name='definition_area']" />
            <xsl:apply-templates select="value[@name='verification_condition']" />
        </ExistenceQuantifier>
    </xsl:template>

    <xsl:template match="block[@type='quantifier_of_generality']">
        <ForAllQuantifier>
            <xsl:attribute name="varName">
                <xsl:value-of select="field[@name='name_var']" />
            </xsl:attribute>
            <xsl:apply-templates select="value[@name='definition_area']" />
            <xsl:apply-templates select="value[@name='verification_condition']" />
        </ForAllQuantifier>
    </xsl:template>

</xsl:stylesheet>`