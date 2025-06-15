//write a function that dynamically creates a calculator function using new Function.
// The function should take a string as an argument and return a function that takes three arguments (a, b, c).
// The function should evaluate the expression using the three arguments and return the result.

function createCalculator(expression) {
  return new Function("a", "b", "c", `return ${expression}`);
}
