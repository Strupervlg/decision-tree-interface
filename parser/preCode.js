import {
	ProgramNode,
	BlockNode,
	createStmtSeqNode,
	addStmtToStmtSeqNode,
	StatementNode,
	StmtType,
	createAddRelationshipStmtNode,
	createLiteral,
	ExprType,
	createEnum,
	createGetObjectByRel,
	createBinExprNode,
	createCastExprNode,
	createUnaryExprNode,
	createCheckRelExprNode,
	createGetExprNode,
	createFindExtremeExprNode,
	createQuantifierExprNode,
	createIfExprNode,
	createWithExprNode,
	createObjectSeqNode,
	addObjectToObjectSeqNode,
} from './create_nodes.js';

export var root;
var string;
