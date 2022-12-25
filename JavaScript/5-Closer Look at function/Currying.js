/**
 * What is Currying?
 * Currying is an advanced technique of working with functions.
 * Currying is a transformation of functions that translates a function from a 
    callable as f(a)(b)(c).
 * Currying doesn't call a function. It just transforms it.
 */

// Example
function curry(f) {
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert(curriedSum(1)(2));

//currying using
// let multiply = function (x, y) {
//   alert(x + y);
// };

// let multiplyByTwo = multiply.bind(this, 2);
// multiplyByTwo(5);

//currying using closure

let multiply = function (x) {
  return function (y) {
    alert(x * y);
  };
};

let multiplyByTwo = multiply(2);
multiplyByTwo(5);
