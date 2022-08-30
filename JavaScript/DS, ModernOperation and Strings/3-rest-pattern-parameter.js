/**
 DEFINE: It is actually used to pack items into an array.
 * The Rest parameter syntax allows a function to accept an indefinite number of arguments as an array.
 */

//  EXAMPLE 1: Destructuring Implementation

// In destructuring operation, spred is used on the Right side of assignemnt
const arr = [1, 2, ...[3, 4]];
// In destructuring opertion, rest pattern is used in left side of assignemnt operator.
// The rest syntax collects all variables after the rest syntax.
// The rest syntax must be used in the last element in the destructuring assigment
// There can be only 1 destructuring assignment
const [a, b, ...others] = [1, 2, 3, 4, 5];

// EXAMPLE 2: Function Implementation
// A function can be called with any number of arguments, no matter how it is defined.
function sum(...theArgs) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}
/**
 *  QUEST: The difference between rest parameters and the arguments object ?
 
 *  There are three main differences between rest parameters and the arguments object:
    -> The arguments object is not a real array, while rest parameters are Array instances, 
        meaning methods like sort, map, forEach or pop can be applied on it directly.
    -> The arguments object has additional functionality specific to itself (like the callee property).
    -> The ...restParam bundles all the extra parameters into a single array, therefore it does not 
        contain any named argument defined before the ...restParam. Whereas the arguments object contains
        all of the parameters — including the parameters in the ...restParam array — bundled into one array-like object.

 */

// THE "Arguments" Variable
// There is also a special array-like object named arguments that contains all arguments by their index.
function showName() {
  alert(arguments.length);
  alert(arguments[0]);
  alert(arguments[1]);

  // it's iterable
  // for(let arg of arguments) alert(arg);
}

// shows: 2, Julius, Caesar
showName("Julius", "Caesar");
/**
 * In old times, rest parameters did not exist in the language, and using arguments was the only way
     to get all arguments of the function. And it still works, we can find it in the old code.
 * But the downside is that although arguments is both array-like and iterable, it’s not an array. 
     It does not support array methods, so we can’t call arguments.map(...) for example.
 */
