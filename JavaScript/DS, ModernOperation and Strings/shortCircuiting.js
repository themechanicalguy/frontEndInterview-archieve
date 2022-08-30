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

// EXAMPLE: Short-circuit evaluation
/**
 * Another feature of OR || operator is the so-called “short-circuit” evaluation.
    It means that || processes its arguments until the first truthy value is reached,
        and then the value is returned immediately, without even touching the other argument.
 * The importance of this feature becomes obvious if an operand isn’t just a value, 
        but an expression with a side effect, such as a variable assignment or a function call.
 */
true || alert("not printed");
false || alert("printed");
