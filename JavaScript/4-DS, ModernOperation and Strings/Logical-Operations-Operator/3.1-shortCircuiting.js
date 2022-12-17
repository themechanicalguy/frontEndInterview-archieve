/**
 *      &&  ||
 * Traditionally &&, || were only used with boolean operands. Modern &&, || can take any data type and return any data type.
    This is what we call Short-Circuiting
 * Modern '&&' '||' works on non-boolean operands as well.

 * OR : OR finds the first truthy value
 * The OR || operator does the following:
    -> Evaluates operands from left to right.
    -> For each operand, converts it to boolean. If the result is true, stops and returns the original value of that operand.
    -> If all operands have been evaluated (i.e. all were false), returns the last operand.
 */

alert(3 || "Jonas"); //3
alert("" || "Jonas"); //Jonas
alert(true || 0);
alert(undefined || null);
alert(undefined || 0 || "" || "Hello" || 23 || null); //Hello

// EXAMPLE: Getting the first truthy value from a list of variables or expressions.
let firstName = "";
let lastName = "";
let nickName = "SuperCoder";

alert(firstName || lastName || nickName || "Anonymous"); //SuperCoder

/* QUEST: What is short-circuit evaluation? With respect to OR operator
 * It is a feature of OR || operator, so-called as “short-circuit” evaluation.
    It means that || processes its arguments until the first truthy value is reached,
        and then the value is returned immediately, without even touching the other argument.
 * The importance of this feature becomes obvious if an operand isn’t just a value, 
        but an expression with a side effect, such as a variable assignment or a function call.
 */
true || alert("not printed");
false || alert("printed");

// AND '&&'

// Classsical EXAMPLE
alert(true && true); // true
alert(false && true); // false
alert(true && false); // false
alert(false && false); // false

/**
 * 
 * AND “&&” finds the first falsy value

 * The AND && operator does the following:

    -> Evaluates operands from left to right.
    -> For each operand, converts it to a boolean. If the result is false, stops and returns the original value of that operand.
    -> If all operands have been evaluated (i.e. all were truthy), returns the last operand.

 * Summary: In other words, AND returns the first falsy value or the last value if none were found.

The rules above are similar to OR. The difference is that AND returns the first falsy value while OR returns the first truthy one.

 */

// if the first operand is truthy, AND returns the second operand:
EXAMPLE: alert(1 && 0); // 0
alert(1 && 5); // 5

// if the first operand is falsy, AND returns it. The second operand is ignored.
// This is why nullish coalescing operator was introduced
alert(null && 5); // null
alert(null ?? 5); //5
alert(0 && "no matter what"); // 0

// Not Operator !
/**
 * The boolean NOT operator is represented with an exclamation sign !.
 * The syntax is pretty simple: result = !value;
 * The operator accepts a single argument and does the following:

    * Converts the operand to boolean type: true/false.
    * Returns the inverse value.

*/

alert(!true); // false
alert(!0); // true
//IMP: A double NOT !! is sometimes used for converting a value to boolean type:
alert(!!"non-empty string"); // true
alert(!!null); // false

// IMP:That is, the first NOT converts the value to boolean and returns the inverse,
// and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

alert(Boolean("non-empty string")); // true
alert(Boolean(null)); // false

// IMP: The precedence of NOT ! is the highest of all logical operators, so it always executes first, before && or ||.

/**
 * QUEST: Difference between || and ?? 

The OR || operator can be used in the same way as ??, as it was described in the previous chapter.

For example, in the code above we could replace ?? with || and still get the same result:
*/

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first truthy value:
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
/**
 * Historically, the OR || operator was there first. It exists since the beginning of JavaScript, 
   so developers were using it for such purposes for a long time.
 * On the other hand, the nullish coalescing operator ?? was added to JavaScript only recently, 
   and the reason for that was that people weren’t quite happy with ||.

 * The important difference between them is that:

    || returns the first truthy value.
    ?? returns the first defined value.

 IMP: In other words, || doesn’t distinguish between false, 0, an empty string "" and null/undefined. 

 * They are all the same – falsy values. If any of these is the first argument of ||, 
   then we’ll get the second argument as the result.
 * In practice though, we may want to use default value only when the variable is null/undefined. 
    That is, when the value is really unknown/not set.
 */
// IMP:
let height = 0;
alert(height || 100); // 100
alert(height ?? 100); // 0

/** QUEST: About Precedence of all logical operator ?
 * 
 * The precedence of the ?? operator is the same as ||. They both equal 3 in the MDN table.
 * That means that, just like ||, the nullish coalescing operator ?? is evaluated before = and ?, 
      but after most other operations, such as +, *.
 * So we may need to add parentheses in expressions like this:
*/
let height = null;
let width = null;

// important: use parentheses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000

/*
 * Otherwise, if we omit parentheses, then as * has the higher precedence than ??, 
   it would execute first, leading to incorrect results.
*/
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works this way (not what we want):
let area = height ?? (100 * width) ?? 50;

/**
 * Using ?? with && or ||
 * Due to safety reasons, JavaScript forbids using ?? together with && and || operators, 
   unless the precedence is explicitly specified with parentheses.
 */

// The code below triggers a syntax error:

let x = 1 && 2 ?? 3; // Syntax error

/**
 * The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, 
      when people start to switch from || to ??.

 IMP: Use explicit parentheses to work around it:
*/

let x = (1 && 2) ?? 3; // Works
alert(x); // 2
/**
 * Summary :

   -> The nullish coalescing operator ?? provides a short way to choose the first “defined” value from a list.
   -> It’s used to assign default values to variables:
*/
// set height=100, if height is null or undefined
height = height ?? 100;

/**
 * The operator ?? has a very low precedence, only a bit higher than ? and =, 
   so consider adding parentheses when using it in an expression.
 IMP: It’s forbidden to use it with || or && without explicit parentheses.

 */
