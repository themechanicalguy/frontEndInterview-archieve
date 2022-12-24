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

// Currying from BFE

function curry(func) {
  return (...args) => {
    // 1. if enough args, call func
    // 2. if not enough, bind thae args and wait for the new one
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return curried.bind(null, ...args);
    }
  };
}

// function sum(...args){
//   // console.log(args);
//   return args.reduce((acc,curr)=> acc+curr,0);
// }

function sum(a, b, c) {
  return a + b + c;
}

// sum(1,2,3);
let curried = curry(sum);
// let sum5and10 = curry(5,10);
// sum5and10(15)

console.log(curried(1)(2)(3));
// console.log(curried(1,2,3,4,5,6)(7)(8));
