// X.countOfTokens


// exist X {
//     X->isBetween(X1, X2) and
//         X.state == unevaluated and
//         X is @operator
//     }


// C = find C {
//     C is @operand
//     C->isBetween(X1, X2)
//     C.state == unused
// }


// X.needLeftOperand


// A = find A {
//     A is @operand and
//         A.state == unused and
//         A -> leftOf(X) and
// }
// _A {
//     not exist _A {
//         _A is @operand and
//             _A.state == unused and
//             _A -> leftOf(X) and
//             _A -> isBetween(A, X)
//     }
// }


// Y = extrem Y {
//     Y is @operator and
//         Y.state == unevaluated and
//         Y.leftOf(A) and
// } 
// _Y {
//     not exist _Y {
//         _Y is @operator and
//             _Y.state == unevaluated and
//             _Y.leftOf(A) and
//             _Y -> isBetween(Y, A)
//     }
// }


