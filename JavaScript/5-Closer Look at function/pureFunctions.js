// What is Pure functions?
/**
 * A pure function in JavaScript is a function that returns the same result if the same arguments
    are passed in the function
 * The following characteristics make a function pure :
    * The return value of the function on the function call should only be dependent on the input
        function arguments
    * It should not modify any non-local state. It means the function should not manipulate anything
        other than the data stored in the local variable declared within the function.
    * The function should not have any side-effects, such as rearranging non-local variables, mutating the
        state of any part of code that is not inside the function or calling any non-pure fucntion isnide it.

 */

//Example : Non-pure function

let arr = [1, 2, 3];

function addElementToArray(ele) {
  arr.push(ele);
}
addElementToArray(5);
//it is not pure because it gives diff output for same input
// mutates the original array

function addElementToArray2(a, ele) {
  a.push(ele);
}

//this also mutates the original array

//Example : Pure Functions

function purePush(ar, elem) {
  return [...ar, elem];
}
