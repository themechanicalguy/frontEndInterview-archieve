'use strict';
var firstName = 'Matilda';
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    /** USE OF 'this' in a FUNCTION INSIDE A METHOD
     * functions generally have this as undefined(strict mode) and window(non strict)
     * So In order to use this the below Solution is considered.
     */
    // const isMillenial = function () {
    //   console.log(this);
    //   console.log(this.year >= 1981 && this.year <= 1996);
    // };

    /** SOLUTION 1:
     * define a new variable self(reffered as 'that') and use it inside function as lexical scope
     */
    // const self = this; //self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    /**SOLUTION 2:
     * Here as Arrow Function does not have their own this keyword the parent(surround) this is use
     * So it is appropriate to use Arrow function inside a method.
     */
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  },
  greet: () => console.log(`Hey ${this.firstName}`),
};
/** what will 'this' in greet do???
 * As greet is an arrow function and arrow function dont get 'this'
 * So this will point to parents this which is window in our case
 * If there is a var is used to define 'firstName' in global scope then firstName in greet will point to global
 * NOTE: var will create the variable in window object which will be used. This is one of many reason why var is not used.
 */
jonas.greet(); // will console ' Hey Matilda' as Window object will have firstName key set to 'Matilda'
jonas.calcAge();
/**
 * So as a good practice it is good to avoid arrow function as a method(Object)
 */

/** ARGUMENTS KEYWORD */
// Regular Function have arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12); //argumets will have 4 values however the parameter has 2 only.

// ArrowFunction does not have an aruguments keyword
var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);
