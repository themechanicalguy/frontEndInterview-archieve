'use strict';
/**
 * Scopes are the region in the code where a variable is accessible

	1. Global Scope
	2. Function Scope (local scope) - is the only block like before
	3. Block Scope(ES6)
		a. Variables are accessible only inside block
		b. However this only applies to let and const variables!
    c. Functions are also block scoped only in strict mode, it becomes function scope without strict mode.
 */
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  // console.log(firstName); //uses lookup to find the value
  function printAge() {
    /**Variable lookup happens */
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);
    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      /** not possible to reassign as the outer scope value as output is already defined in this block */
      // output = 'who are you;
      const output =
        'It is the same variable name, ouput inside this function, but it is in block scope so no redefined issue comes';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str, output);
      function add(a, b) {
        return a + b;
      }
    }
    /**str is a const and it has block scope */
    // console.log(str);
    /** millenial is var and so it has functional scope */
    console.log(millenial);
    /** functions are block scope in strict mode and they are function scope in non strict mode */
    // console.log(add(2,3))
    console.log(output);
  }
  printAge();
  return age;
}
const firstName = 'Jonas';
calcAge(1991);
// console.log(age); // not in global scope
// printAge
