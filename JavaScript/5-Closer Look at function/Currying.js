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

// let curriedSum = curry(sum);

// alert(curriedSum(1)(2));

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

// let multiplyByTwo = multiply(2);
// multiplyByTwo(5);

// Example 2

let curry = () => {
  let total = 0;
  return function (num = 0) {
    total += num;
    return total;
  };
};

let sum = curry();

sum(5); //5
sum(3); //8
sum(4); //12
sum(0); //12
