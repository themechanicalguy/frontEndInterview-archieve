'use strict';
/** 'this' Gives windows object as the value is global */
console.log(this);

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  /** 'this' Gives undefined as the code is in strict mode would give window or parent 'this' */
  console.log(this);
};
calcAge(1991);

const calcAgeArrow = (birthYear) => {
  console.log(2037 - birthYear);
  /** arrow function does not have its own 'this' keyword */
  /** 'this' will be parent object as 'this' in arrow function points to parent 'this'*/
  console.log(this);
};
calcAgeArrow(2000);

const jonas = {
  year: 1991,
  calcAge: function () {
    /** 'this' will point to the object(jonas) that is call the method. Here it is jonas object */
    console.log(this);
    /** We dont need to pass the year as the object has year and this now points to jonas object */
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};
/** Method Borrowing:
 * matilda borrows(gets) calAge method from jonas object
 */
matilda.calcAge = jonas.calcAge;
/** Will 'this' in calcAge points to jonas?
 * NO!!!, matilda is the object calling the method and this will point to matilda now.
 * this explains why this is considered dynamic
 */
matilda.calcAge();

const f = jonas.calcAge;
/** What will the 'this' keyword be for f??
 * Undefined!!!, as f is not pointing an object.
 * So f is a regular function call so 'this' will be undefined as we use strict mode
 */
f();
