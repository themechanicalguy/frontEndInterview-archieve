// CLOSURE
/**
 * => Function along with its lexical scope forms a closure
 * Function will have the reference of the parents lexical scope
 */

/*
function x() {
  const a = 10;
  // here y is the inner function and it will have access to the variables in x
  // These variables in x will be stored in y's lexical scope. This lexical scope will always hold the value even when the function x returns y and it is not present in the execution context
  // Now the returned function y will have a reference of lexical scope of x function. This combination of lexical scope with the function is called closure.
  function y() {
    console.log(a);
  }
  return y;
}

const z = x();
z(); // logs 10
*/

// 3 Level hierarchy
function x() {
  let a = 10;
  // Function 'y' will have the closure of 'x', i.e) will have the lexical scope reference to x's variable a;
  function y() {
    let b = 25;
    // returned Function will have the closure of 'y', i.e) will have the lexical scope reference to y's variable b, and also the closure of 'x', i.e) will have the lexical scope reference to x's variable a, which make this function not lose the reference to variable a, b and it doesn't lose where it is originated from.
    return function () {
      // a and b are lexical scopes and closure of x and y respectively. a's value is changed in 'line 1' and after that only y is getting called so a will be 29 in this case and not 10
      console.log(a + b);
    };
  }
  a = 29;
  return y();
}

/*
const z = x();
z();

let z = () => {
  console.log('I am the dummy');
};

function x() {
  let a = 10;
  function y() {
    let b = 25;
    return function () {
      console.log(a + b);
    };
  }
  // HERE however the value of a is changed after the z variable setting the lexical scope will be changed to final assignation of the variable and this will be in z's lexical scope. In this case a will be 'I am the unexpected result'.
  // It seems in closure the lexical scopes are stored in object which ensures the change.
  z = y();
  a = 29;
  a = 'I am the unexpected result';
  // return y();
}

x();
z();
*/
