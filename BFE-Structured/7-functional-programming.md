# 3.Composition (`pipe()`)

## Understanding `Composition` and the `pipe()` Function

- Composition is a fundamental concept in functional programming where you combine multiple functions to create a new function.
- The output of one function becomes the input of the next.

## What is `pipe()`?

`pipe()` is a utility function that:

1. Takes an array of functions as input
2. Returns a new function that applies these functions in sequence
3. Each function's output is passed as input to the next function

### Approach

1. **Check for Empty Array**: If the input array of functions is empty, return the identity function, which simply returns its input.
2. **Compose Functions**: For a non-empty array, compose the functions by applying each function in reverse order. This means the last function in the array is the first to be applied to the input, the second last function is applied next, and so on until the first function in the array is applied last.
3. **Compose Functions Using `reduceRight`**: For a non-empty array, use `reduceRight` to apply each function in reverse order. The accumulator starts with the input value `x`, and each function in the array is applied to this accumulator in turn, from right to left.
4. **Return the Composed Function**: The composed function should take an input, pass it through each function in the array from right to left, and return the final result.

## Implementation of `pipe()`

Here's how you can implement the `pipe()` function:

```javascript
// Approach 1:
function pipe(functions) {
  return function (input) {
    return functions.reduce((value, func) => func(value), input);
  };
}

//Approach 2- using reduceRight()
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    return functions.reduceRight((acc, fn) => fn(acc), x);
  };
};

/**
 * const fn = compose([x => x + 1, x => x * x, x => 2 * x])
 * fn(4) // 65
 */
```

## How It Works

1. The `pipe()` function accepts an array of functions
2. It returns a new function that expects an input value
3. When called, it uses `reduce()` to pass the value through each function in sequence

## Examples in Action

Using your provided examples:

```javascript
const times = (y) => (x) => x * y;
const plus = (y) => (x) => x + y;
const subtract = (y) => (x) => x - y;
const divide = (y) => (x) => x / y;

// Example 1: x * 2 * 3
const doubleAndTriple = pipe([times(2), times(3)]);
doubleAndTriple(5); // 5 * 2 * 3 = 30

// Example 2: (x * 2 + 3) * 4
const complexCalc = pipe([times(2), plus(3), times(4)]);
complexCalc(5); // (5 * 2 + 3) * 4 = 52

// Example 3: (x * 2 - 3) / 4
const anotherCalc = pipe([times(2), subtract(3), divide(4)]);
anotherCalc(5); // (5 * 2 - 3) / 4 = 1.75
```

## Key Points

- Composition creates complex operations from simple, reusable functions
- `pipe()` executes functions left-to-right (unlike `compose()` which typically goes right-to-left)
- Each function in the pipeline must accept a single argument
- The result is a new function that's ready to accept its initial input

### Solution Code

```javascript
// Approach 2:
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    if (functions.length === 0) {
      return x;
    }
    let result = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      result = functions[i](result);
    }
    return result;
  };
};

/**
 * const fn = compose([x => x + 1, x => x * x, x => 2 * x])
 * fn(4) // 65
 */
```
