// A "symbol" represents a unique identifier. You can make use of Symbol() to generate a value of this type.
// EXAMPLE:
let empid = Symbol();

// Also, a description of the symbol generated can be provided which can be mostly used as a name during debugging.
// EXAMPLE:
// empid is a symbol with the description "empno"
let empid = Symbol("empno");
// Even if various symbols are created with the same description, they are different values. Thus, symbols ensures uniqueness.
// So the description provided can be considered as just a label.

let empid1 = Symbol("empno");
let empid2 = Symbol("empno");
alert(empid1 == empid2); // false
// Here both the symbols have the same description but are never considered equal.
// Unlike other values, a symbol value doesn't follow auto-convert.

// EXAMPLE:

let empid = Symbol("empno");
alert(empid); // TypeError: Cannot convert a Symbol value to a string
// This is a rule because strings and symbols are basically different and should not accidentally get converted to the other one.
// But if it is a must to display the Symbol, then the following can be done:

// EXAMPLE:
let empid = Symbol("empno");
alert(empid.toString()); // Symbol(empno), now it works
OR;
//use description
let empid = Symbol("empno");
alert(empid.description); // empno
