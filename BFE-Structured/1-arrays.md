# 1 - Polyfill for Array.prototype.flat()

## Understanding the Problem

`Array.prototype.flat()` is a method that creates a new array with all sub-array elements concatenated into it recursively up to the specified depth. If no depth is provided, it defaults to 1.

### Examples:

1. `[1, [2, [3]]].flat()` → `[1, 2, [3]]` (default depth 1)
2. `[1, [2, [3]]].flat(2)` → `[1, 2, 3]` (depth 2)

## Approaches

### 1. Recursive Approach

- Base case: If depth is 0, return the array as is
- Recursive case: For each element in the array:
  - If the element is an array and depth > 0, recursively flatten it with depth-1
  - Otherwise, keep the element as is

## Recursive Implementation

```javascript
/**
 * Polyfill for Array.prototype.flat()
 * @param {number} [depth=1] - The depth level specifying how deep a nested array should be flattened.
 * @returns {Array} - A new array with the sub-array elements concatenated into it.
 */
// Check if Array.prototype.flat is not already defined
// Check if flat is not already defined
function flatRecursive(array, depth = Infinity) {
  // Initialize an empty array to store the flattened elements
  const flattenedArray = [];

  // Iterate over each element in the array
  array.forEach((element) => {
    // If the element is an array and depth is greater than 0
    if (Array.isArray(element) && depth > 0) {
      // Recursively flatten the element and add it to the flattened array
      flattenedArray.push(...flatRecursive(element, depth - 1));
    } else {
      // If the element is not an array or depth is 0, add it to the flattened array
      flattenedArray.push(element);
    }
  });

  // Return the flattened array
  return flattenedArray;
}
```

## Dry Runs

### Example 1: `[1, [2, [3]]].flat()`

**Recursive Approach:**

1. Initial call: depth = 1
   - Process 1: not array → add to result
   - Process [2, [3]]: array & depth > 0 → recursive call with depth = 0
     - Returns [2, [3]] as is (depth reached 0)
   - Spread [2, [3]] into result
   - Final result: [1, 2, [3]]

**Recursive Approach:**

1. Initial call: depth = 2
   - Process 1: not array → add to result
   - Process [2, [3, [4]]]: array & depth > 0 → recursive call with depth = 1
     - Process 2: not array → add to result
     - Process [3, [4]]: array & depth > 0 → recursive call with depth = 0
       - Returns [3, [4]] as is
     - Spread [3, [4]] into result
     - Intermediate result: [2, 3, [4]]
   - Spread [2, 3, [4]] into final result
   - Final result: [1, 2, 3, [4]]

## 2. Iterative Implementation

```javascript
/**
 * A cleaner, more readable iterative flat() implementation
 * @param {Array} arr - The source array
 * @param {number} depth - How many levels deep to flatten
 * @returns {Array}
 */
function flatIterativeSimple(arr, depth = 1) {
  // Use a copy to avoid mutating the original input array
  let result = [...arr];
  let currentDepth = depth;

  // Continue as long as there's depth left AND
  // there is at least one element that is still an array
  while (currentDepth > 0 && result.some(Array.isArray)) {
    // We use [].concat(...result) to flatten exactly one level
    result = [].concat(...result);
    currentDepth--;
  }
  return result;
}
```

### Intuition & Approach

- The logic is built on the behavior of the Spread Operator (...) and Array.prototype.concat().
- The "One-Level" Trick : In JavaScript, **[].concat(...[1, [2, 3]])** evaluates to [1, 2, 3]. The spread operator `unpacks` the top-level items. concat then takes those items; if an item is an array, it merges its contents; if it's a primitive, it adds it directly.

### The Strategy

- **Check Necessity:** Use `result.some(Array.isArray)` to see if there is actually anything left to flatten. If the array is already "flat," we stop early even if depth is high.
- **Controlled Loop:** We repeat the `one-level` flattening process exactly depth times.
- **Immutability**: We start with [...arr] to ensure we don't destroy the user's original data.

## Dry Run Analysis

Let's trace the execution of `flatIterative(arr, 2)` where `arr = [1, [2], [3, [4]]]`.

### Initial State

- **result**: `[1, [2], [3, [4]]]`
- **currentDepth**: `2`

### Iteration 1

**Condition Check**: `currentDepth > 0` ✓ AND `some(isArray)` ✓ (found `[2]`)

**Execution**: `result = [].concat(1, [2], [3, [4]])`

**New result**: `[1, 2, 3, [4]]`

**Update**: `currentDepth` becomes `1`

### Iteration 2

**Condition Check**: `currentDepth > 0` ✓ AND `some(isArray)` ✓ (found `[4]`)

**Execution**: `result = [].concat(1, 2, 3, [4])`

**New result**: `[1, 2, 3, 4]`

**Update**: `currentDepth` becomes `0`

### Termination

**Condition Check**: `currentDepth > 0` is now `False`

**Final Return**: `[1, 2, 3, 4]`

# 2 - Polyfill for Array.prototype.map()

## Understanding Array.prototype.map()

The `map()` method creates a new array populated with the results of calling a provided function on every element in the calling array.

Key characteristics:

- Returns a new array (doesn't modify original)
- Calls the callback for each element
- Passes three arguments to callback: currentValue, index, array
- Handles sparse arrays correctly (skips missing indices)

## Iterative Approach

```javascript
/**
 * Polyfill for Array.prototype.map() - Iterative approach
 * @param {Function} callback - Function to execute on each element
 * @param {Object} thisArg - Value to use as 'this' when executing callback
 * @returns {Array} New array with results of calling callback on each element
 */
Array.prototype.myMap = function (callback, thisArg) {
  // Validate that 'this' is not null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }

  // Validate that callback is a function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const originalArray = this; // The array to map over
  const len = originalArray.length; // Length of the array
  const newArray = new Array(len); // Pre-allocate array for performance

  for (let i = 0; i < len; i++) {
    // Skip if index is not present in the array (sparse arrays)
    if (i in originalArray) {
      // Call callback with thisArg as context, passing current value, index, and original array
      newArray[i] = callback.call(thisArg, originalArray[i], i, originalArray);
    }
  }

  return newArray;
};

// Simple Approach

Array.prototype.simpleMap = function (callback) {
  // 1. Create a brand new array to hold the results
  const result = [];

  // 2. Loop through the current array ('this' refers to the array)
  for (let i = 0; i < this.length; i++) {
    // 3. Run the callback function on the current item
    // Pass in: the item (this[i]), the index (i), and the whole array (this)
    const transformedItem = callback(this[i], i, this);

    // 4. Push the new item into our results array
    result.push(transformedItem);
  }

  // 5. Return the new array
  return result;
};
```

## What Did We Remove to Make It Simple?

It helps to know what this simpler version doesn't do, just so you have the complete picture:

### No Error Checking

If someone accidentally passes a string instead of a function (e.g., `[1, 2].simpleMap("hello")`), this simple version will just crash. The complex version caught that and threw a helpful error.

### No thisArg

The real `map` lets you pass a second argument to change what the keyword `this` means inside your callback. We removed that.

### Hole Ignorance

If you have an array with empty slots (like `[1, , 3]`), the real `map` skips the empty slot. This simple version will pass `undefined` to your callback.

- For 99% of interview questions or basic understanding, this simpler version is exactly what you need to demonstrate that you understand how higher-order functions work under the hood!

## Dry Run Examples

### Example 1: Simple Number Transformation

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.myMap((num) => num * 2);

// Iterative Approach Execution:
// 1. Initialize newArray = [undefined, undefined, undefined]
// 2. i=0: newArray[0] = callback(1, 0, [1,2,3]) => 2
// 3. i=1: newArray[1] = callback(2, 1, [1,2,3]) => 4
// 4. i=2: newArray[2] = callback(3, 2, [1,2,3]) => 6
// Result: [2, 4, 6]
```

### Example 2: Sparse Array with Context

```javascript
const sparseArray = [1, , 3]; // Note the empty slot
const context = { multiplier: 3 };
const tripled = sparseArray.myMap(function (num, index) {
  return num * this.multiplier;
}, context);

// Iterative Approach Execution:
// 1. Initialize newArray = [undefined, undefined, undefined]
// 2. i=0: newArray[0] = callback(1, 0, [1,,3]) => 3
// 3. i=1: empty slot, skip
// 4. i=2: newArray[2] = callback(3, 2, [1,,3]) => 9
// Result: [3, empty, 9]
```

## Key Insights

1. **Handling Sparse Arrays**: Both implementations check `i in originalArray` to skip missing indices, maintaining the same behavior as native `map()`.
2. **Context Binding**: Using `callback.call(thisArg, ...)` allows the callback to be called with a specific `this` context.
3. **Performance**: The iterative approach is generally more performant for large arrays as it avoids the overhead of recursive function calls.
4. **Array Length Preservation**: Both approaches preserve the original array's length, including empty slots.
5. **Error Handling**: Both implementations validate the input array and callback function, throwing appropriate TypeError exceptions.

# 3- Polyfill for Array.prototype.reduce()

## Understanding Array.prototype.reduce()

The `reduce()` method executes a reducer function on each element of the array, resulting in a single output value.

- It takes two main parameters, a callback function (the "reducer") and an optional initial value.
- The reducer function receives four arguments: `accumulator`, `currentValue`, `currentIndex`, and `array`.
- The accumulator holds the intermediate result, updated after each iteration, and becomes the final result.

### Intuition and Approach

**Iterative Approach:**

1. Check if the callback is a function
2. Handle empty array with no initial value case (should throw error)
3. Initialize accumulator with initialValue or first element of array
4. Start iteration from appropriate index (0 if initialValue provided, 1 otherwise)
5. For each element, call the reducer with accumulator, current value, index, and array
6. Update accumulator with the return value from reducer
7. Return final accumulator value

**Recursive Approach:**

1. Base case: if array is empty, return accumulator
2. For first call, handle initialValue vs first element logic
3. For subsequent calls, process current element and recurse with remaining array
4. Update accumulator in each recursive call

## Iterative Polyfill

```javascript
Array.prototype.myReduce = function (callback, initialValue) {
  // Throw TypeError if callback is not a function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = this;
  const length = array.length;

  // Handle empty array without initial value
  if (length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator;
  let startIndex;

  // Set initial accumulator and start index
  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    accumulator = array[0];
    startIndex = 1;
  }

  // Iterate through array elements
  for (let currentIndex = startIndex; currentIndex < length; currentIndex++) {
    const currentElement = array[currentIndex];
    // Call reducer function with accumulator, current element, index, and array
    accumulator = callback(accumulator, currentElement, currentIndex, array);
  }

  return accumulator;
};
```

## Dry Run Examples

### Example 1: Sum of array elements

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.myReduce((acc, num) => acc + num, 0);
```

**Execution:**

1. accumulator = 0 (initialValue), startIndex = 0
2. Iteration 0: acc = 0 + 1 = 1
3. Iteration 1: acc = 1 + 2 = 3
4. Iteration 2: acc = 3 + 3 = 6
5. Iteration 3: acc = 6 + 4 = 10
6. Return 10

### Example 2: Flatten array of arrays

```javascript
const arrays = [
  [0, 1],
  [2, 3],
  [4, 5],
];
const flattened = arrays.myReduce((acc, arr) => acc.concat(arr), []);
```

**Iterative Execution:**

1. accumulator = [] (initialValue), startIndex = 0
2. Iteration 0: acc = [].concat([0,1]) = [0,1]
3. Iteration 1: acc = [0,1].concat([2,3]) = [0,1,2,3]
4. Iteration 2: acc = [0,1,2,3].concat([4,5]) = [0,1,2,3,4,5]
5. Return [0,1,2,3,4,5]

### why the iterative polyfill for Array.prototype.reduce() doesn’t use callback.call() ?

The callback function in the reduce() polyfill doesn’t require callback.call() because:

- The this context inside the reducer callback is rarely used in practice and defaults to the global object (window in browsers, global in Node.js) or undefined in strict mode, which matches the native reduce() behavior in most cases.

- The native Array.prototype.reduce() does not explicitly bind a specific this context to the callback unless a thisArg is provided (which is not part of the standard reduce() signature).

- Directly calling the callback with the correct arguments (accumulator, currentValue, index, array) is sufficient to mimic the native behavior, and using call() would unnecessarily complicate the code without providing additional benefits in this context.

# 4- Polyfill for Array.prototype.filter()

## Understanding Array.prototype.filter()

The `filter()` method creates a new array with all elements that pass the test implemented by the provided function. It doesn't mutate the original array.

### Intuition and Approach

To create a polyfill, we need to:

1. Accept a callback function that tests each element
2. Create a new array to store filtered elements
3. Iterate through each element of the original array
4. Apply the callback to each element
5. If the callback returns true, add the element to the new array
6. Return the new array with filtered elements

## Iterative Approach

```javascript
/**
 * Polyfill for Array.prototype.filter() - Iterative approach
 * @param {function} callback - Function to test each element
 * @param {object} thisArg - Value to use as 'this' when executing callback
 * @returns {array} New array with elements that pass the test
 */
Array.prototype.myFilter = function (callback, thisArg) {
  const result = []; // Array to store filtered elements

  // Iterate through each element of the array
  for (let i = 0; i < this.length; i++) {
    // Check if the element exists (handles sparse arrays)
    if (i in this) {
      // Call the callback with current element, index, and the array
      // Use call() to set the thisArg if provided
      if (callback.call(thisArg, this[i], i, this)) {
        result.push(this[i]); // Add to result if callback returns true
      }
    }
  }

  return result;
};
```

## Dry Run Examples

### Example 1: Filter even numbers

**Original array:** [1, 2, 3, 4, 5]
**Callback:** (num) => num % 2 === 0

**Iterative Approach:**

1. Initialize result = []
2. i=0: 1 → false → skip
3. i=1: 2 → true → result = [2]
4. i=2: 3 → false → skip
5. i=3: 4 → true → result = [2, 4]
6. i=4: 5 → false → skip
7. Return [2, 4]

### Example 2: Filter strings longer than 3 characters

**Original array:** ['a', 'bb', 'ccc', 'dddd', 'eeeee']
**Callback:** (str) => str.length > 3

**Iterative Approach:**

1. Initialize result = []
2. i=0: 'a' → false → skip
3. i=1: 'bb' → false → skip
4. i=2: 'ccc' → false → skip
5. i=3: 'dddd' → true → result = ['dddd']
6. i=4: 'eeeee' → true → result = ['dddd', 'eeeee']
7. Return ['dddd', 'eeeee']

# 5- Implementing the `call()` Method in JavaScript

The call() method in JavaScript is used to invoke a function with a specified this context and arguments passed individually. It allows you to "borrow" a function from one object and execute it in the context of another object, controlling what this refers to inside the function.

```javascript
const obj1 = { name: "Alice" };
const obj2 = { name: "Bob" };
function greet(greeting) {
  return `${greeting}, ${this.name}!`;
}
console.log(greet.call(obj1, "Hello")); // "Hello, Alice!"
console.log(greet.call(obj2, "Hi")); // "Hi, Bob!"
```

## Understanding the Problem

The `call()` method:

1. Sets the `this` context for the function
2. Accepts individual arguments after the `this` context
3. Immediately invokes the function

## Intuition and Approach

The call() method in JavaScript is used to invoke a function with a specified this context and arguments. To implement this method, we need to:

- Set the this context of the function to the given object.
- Pass the arguments to the function.
- Return the result of the function call.
  Our approach involves:
- Creating a unique property on the context object to store the function.
- Calling the function with the given context and arguments using the stored property.
- Deleting the temporary property after the function call.

### 1. Iterative Approach

```javascript
// Implementing the call() method in JavaScript
Function.prototype.myCall = function (context, ...args) {
  // Check if the context is null or undefined, if so set it to the global object
  if (context === null || context === undefined) {
    context = globalThis; // globalThis refers to the global object
  }

  // Create a unique property on the context object to store the function
  const funcKey = Symbol("funcKey"); // Using Symbol to avoid overriding existing properties
  context[funcKey] = this; // 'this' refers to the function being called

  // Call the function with the given context and arguments
  const result = context[funcKey](...args);

  // Delete the temporary property
  delete context[funcKey];

  // Return the result of the function call
  return result;
};

// Example 1:
function greet(name) {
  console.log(`Hello, ${name}! My name is ${this.name}.`);
}

const person = {
  name: "John",
};

greet.myCall(person, "Alice"); // Output: Hello, Alice! My name is John.

// Example 2:
function sum(a, b) {
  return this.prefix + (a + b);
}

const obj = {
  prefix: "The sum is: ",
};

const result = sum.myCall(obj, 2, 3);
console.log(result); // Output: The sum is: 5
```

## Key Points

1. **Context Handling**: We need to properly handle primitive values by wrapping them in objects.
2. **Symbol for Safety**: Using `Symbol` ensures we don't accidentally overwrite existing properties.
3. **Immediate Invocation**: Unlike `bind()`, `call()` invokes the function immediately.
4. **Arguments Handling**: The rest parameter `...args` collects all arguments after the context.

# 6- Implementing JavaScript's `apply()` Method

The apply() method in JavaScript is used to invoke a function with a specified this context and an array (or array-like object) of arguments. It’s similar to call(), but instead of passing arguments individually, apply() takes them as an array. The key tasks are:

## Intuition and Approach

The apply() method is a part of the Function prototype in JavaScript. It allows a function to be called with a specified this value and arguments provided as an array. To implement this method manually, we need to:
**Set the context**: Determine the this value for the function call. If null or undefined is provided, we default to the global object.
**Store the function**: Temporarily add the function to the context object so that it can be called with the specified this value.
**Call the function**: Invoke the function with the given context and arguments.
**Clean up: Remove** the function from the context object to avoid any unintended side effects.
**Return the result**: Pass on the result of the function call.

We can approach this in two ways:

1. **Iterative approach**: Use a loop to handle the arguments
2. **Recursive approach**: Process arguments recursively

## Solution Code

### Iterative Approach

```javascript
// Implementing the apply() method in JavaScript
// The apply() method calls a function with a given this value and arguments provided as an array.

Function.prototype.myApply = function (context, args) {
  // Check if the context is null or undefined, if so set it to global object (window in browser, global in node.js)
  if (context === null || context === undefined) {
    context = globalThis; // globalThis refers to the global object in both browser and node.js environments
  }

  // Create a unique property on the context object to store the function
  const funcKey = Symbol("funcKey"); // Using Symbol to avoid overriding any existing property
  context[funcKey] = this; // 'this' refers to the function on which myApply is called

  // Call the function with the given context and arguments
  const result = context[funcKey](...args);

  // Delete the property from the context object
  delete context[funcKey];

  // Return the result of the function call
  return result;
};

// Example 1:
function greet(greeting, punctuation) {
  console.log(`${greeting} ${this.name}${punctuation}`);
}

const person = { name: "John" };
greet.myApply(person, ["Hello", "!"]); // Output: Hello John!

// Example 2:
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
const result = sum.myApply(null, numbers);
console.log(result); // Output: 6
```

## Key Notes

1. We use `Symbol` to create a unique property name to avoid overwriting any existing properties on the context object.
2. The iterative approach is generally more straightforward and efficient for this use case.
3. The recursive approach demonstrates how we could build up the arguments recursively, though it's less practical for this particular problem.
4. We handle edge cases where context or argsArray might be null/undefined.
5. The actual implementation in JavaScript engines is more complex and optimized, but this demonstrates the core concept.

# 7 Implementing JavaScript's `bind()` Method

The `bind()` method in JavaScript creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called. It’s commonly used to ensure a function is executed in a specific context (e.g., preserving `this` in callbacks).

### Key Features of bind():

**Context Binding:** Sets the this value for the function.
**Partial Application:** Allows pre-specifying some arguments.
**Returns a New Function:** The new function retains the bound context and arguments.

## Intuition and Approach

The intuition behind implementing `bind()` is to create a new function that wraps the original function with a specified context and arguments. We'll use the `Function.prototype` to add our custom `bind()` method.
Our approach will be to:

- Check if the function is callable.
- Create a new function that wraps the original function.
- Set the this context of the new function to the provided value.
- Prepend the provided arguments to the new function's arguments.

### Iterative Approach

We'll create a new function that uses `apply()` to call the original function with the bound context and combined arguments.

### Recursive Approach

We'll use a similar approach but implement argument combining recursively.

## Implementation

### Iterative Implementation

```javascript
Function.prototype.bindIterative = function (context, ...args) {
  // Check if the function is callable
  if (typeof this !== "function") {
    throw new TypeError("Bind must be called on a function");
  }

  // Store the original function
  const originalFunction = this;

  // Create a new function that wraps the original function
  return function (...newArgs) {
    // Call the original function with the specified context and arguments
    return originalFunction.apply(context, [...args, ...newArgs]);
  };
};

const obj = { name: "John" };

function greet(age) {
  console.log(`Hello, my name is ${this.name} and I am ${age} years old.`);
}

const boundGreet = greet.bindIterative(obj, 30);
boundGreet(); // Output: Hello, my name is John and I am 30 years old.

const obj = { name: "Jane" };

function greet(greeting, age) {
  console.log(
    `${greeting}, my name is ${this.name} and I am ${age} years old.`,
  );
}

const boundGreet = greet.bindIterative(obj, "Hello");
boundGreet(25); // Output: Hello, my name is Jane and I am 25 years old.
```

## Key Points

1. The implementation handles both regular calls and constructor calls (with `new`)
2. Arguments are properly combined (bound args first, then call args)
3. The recursive implementation shows an alternative way to combine arguments
4. Type checking ensures only functions can be bound

Both implementations achieve the same result, with the iterative version being more straightforward and the recursive version demonstrating an alternative approach to argument combining.

# 8 Shuffling an Array

Shuffling an array means randomly reordering its elements so that each possible permutation is equally likely. This is a common problem in computer science with applications in gaming, statistics, and machine learning.

## Fisher-Yates (Knuth) Shuffle (Optimal Approach)

This is the most efficient and correct way to shuffle an array.

**Intuition**:

- Iterate through the array from the last element to the first
- For each position, select a random element from the remaining unshuffled portion
- Swap it with the current element

**Approach**:

```javascript
function fisherYatesShuffle(originalArray) {
  // Create a copy to avoid modifying the original array
  const shuffledArray = [...originalArray];

  // Start from the last element and move backwards
  for (
    let currentIndex = shuffledArray.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    // Generate a random index between 0 and currentIndex (inclusive)
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    // Swap elements at currentIndex and randomIndex
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
}
```

### Time Complexity:

- O(n) - We make exactly n-1 iterations, each doing a constant amount of work

### Space Complexity:

- O(n) - We create a copy of the original array
- Could be O(1) if we modify the original array in-place

### Correctness:

- Produces a uniformly random permutation - every permutation is equally likely
- Each element has an equal probability of ending up in any position

## Dry Run Examples

### Example 1: Normal Case

Original array: [1, 2, 3]

Iteration 1 (i=2):

- randomIndex between 0 and 2, say 1
- Swap arr[2] and arr[1]: [1, 3, 2]

Iteration 2 (i=1):

- randomIndex between 0 and 1, say 0
- Swap arr[1] and arr[0]: [3, 1, 2]

Final shuffled array: [3, 1, 2]

### Example 2: Single Element

Original array: [5]

No iterations (i starts at 0 and condition is i > 0)
Final shuffled array: [5] (unchanged)

### Example 3: Empty Array

Original array: []

Loop condition fails immediately (i starts at -1)
Final shuffled array: [] (unchanged)

## Edge Cases Handled:

1. Single element array - remains unchanged
2. Empty array - remains unchanged
3. Already shuffled array - gets reshuffled
4. Array with duplicate values - shuffles correctly

The Fisher-Yates algorithm is the optimal solution as it's efficient, correct, and handles all edge cases properly. The other approaches, while simpler, don't produce truly random results and should be avoided for serious applications.

# 9 Reordering an Array with New Indexes

This problem involves rearranging an array's elements according to a specified set of new indexes.
Each element should be moved to the position indicated by the corresponding index in the indexes array.

### 1. Using Extra Space (Simple Approach)

**Intuition**: Create a new array and place elements at their specified positions.

**Approach**:

```javascript
function reorderWithExtraSpace(originalArray, newIndexes) {
  // Create a new array filled with null or undefined
  const reorderedArray = new Array(originalArray.length);

  // Place each element at its new position
  for (let i = 0; i < originalArray.length; i++) {
    reorderedArray[newIndexes[i]] = originalArray[i];
  }

  return reorderedArray;
}

// Time Complexity: O(n)
// Space Complexity: O(n) - Creates a new array
```

### 2. In-Place Reordering (Optimal Approach)

**Intuition**: Swap elements to their correct positions while marking processed elements to avoid cycles.

**Approach**:

```javascript
function reorderInPlace(originalArray, newIndexes) {
  for (let i = 0; i < originalArray.length; i++) {
    // While the current element hasn't been placed in its correct position
    while (newIndexes[i] !== i) {
      // Swap the current element with the element at its target position
      const targetIndex = newIndexes[i];

      // Swap elements in the array
      [originalArray[i], originalArray[targetIndex]] = [
        originalArray[targetIndex],
        originalArray[i],
      ];

      // Swap corresponding indexes
      [newIndexes[i], newIndexes[targetIndex]] = [
        newIndexes[targetIndex],
        newIndexes[i],
      ];
    }
  }

  return originalArray;
}

// Time Complexity: O(n) - Each element is placed in its correct position exactly once
// Space Complexity: O(1) - Modifies the array in-place
```

### 3. Using Array Map (Functional Approach)

**Intuition**: Create a new array by mapping indexes to their new positions.

**Approach**:

```javascript
function reorderWithMap(originalArray, newIndexes) {
  return newIndexes.map((newIndex, i) => originalArray[newIndex]);
}

// Note: This is different - it reorders based on the values in newIndexes
// rather than using newIndexes as destination indexes for original elements

// Time Complexity: O(n)
// Space Complexity: O(n)
```

## Optimal Approach Analysis (In-Place)

### Time Complexity:

- O(n) - Each element is moved to its correct position exactly once

### Space Complexity:

- O(1) - Modifies the array in-place without using additional storage

### Correctness:

- Handles all permutations correctly by following cycles of swaps
- Preserves all elements while rearranging them

## Dry Run Examples

### Example 1: Normal Case

Original array: ['A', 'B', 'C', 'D']
New indexes: [3, 1, 0, 2]

Iteration 0:

- i=0, target=3
- Swap elements: ['D', 'B', 'C', 'A']
- Swap indexes: [2, 1, 0, 3]
- Now newIndexes[0] = 2 ≠ 0, continue

- i=0, target=2
- Swap elements: ['C', 'B', 'D', 'A']
- Swap indexes: [0, 1, 2, 3]
- Now newIndexes[0] = 0, move to i=1

Iteration 1:

- i=1, target=1 (already correct)
- No swap needed

Iteration 2:

- i=2, target=2 (already correct)
- No swap needed

Iteration 3:

- i=3, target=3 (already correct)
- No swap needed

Final array: ['C', 'B', 'D', 'A']

### Example 2: Already Ordered

Original array: [10, 20, 30]
New indexes: [0, 1, 2]

No swaps needed as all elements are already in correct positions.
Final array: [10, 20, 30]

### Example 3: Complete Reversal

Original array: [1, 2, 3, 4]
New indexes: [3, 2, 1, 0]

Iteration 0:

- i=0, target=3
- Swap elements: [4, 2, 3, 1]
- Swap indexes: [0, 2, 1, 3]
- Now newIndexes[0] = 0, move to i=1

Iteration 1:

- i=1, target=2
- Swap elements: [4, 3, 2, 1]
- Swap indexes: [0, 1, 2, 3]
- Now newIndexes[1] = 1, move to i=2

Iteration 2:

- i=2, target=2 (already correct)
- No swap needed

Final array: [4, 3, 2, 1]

## Edge Cases Handled:

1. Already ordered array - no swaps needed
2. Complete reversal - works correctly
3. Single element array - remains unchanged
4. Empty array - returns empty array
5. Duplicate values - handles correctly

The in-place approach is optimal as it requires no additional space while maintaining O(n) time complexity. The simple approach using extra space is easier to understand but uses O(n) space. The functional approach has a different semantic meaning and should be used only when appropriate.

# 10 remove duplicates from an array in-place

## Array Deduplication - Problem Understanding

We need to implement a function `deduplicate()` that removes duplicate elements from an array in place (modifying the original array) without worrying about order preservation.

## Approaches

### 1. Using a Set (Optimal for primitive values)

**Intuition**: Sets automatically handle uniqueness, making them perfect for deduplication.

```javascript
function deduplicate(arr) {
  // Create a Set from the array to automatically remove duplicates
  const uniqueSet = new Set(arr);

  // Clear the original array
  arr.length = 0;

  // Push all unique values back into the original array
  uniqueSet.forEach((value) => arr.push(value));
}

// Time Complexity: O(n) - Creating set and pushing elements are both O(n)
// Space Complexity: O(n) - Set stores all unique elements
```

**Limitation**: Doesn't work well for object references since each object is unique even if contents are same.

### 2. Using Object/Hash Map (Works for objects if serialized)

**Intuition**: Use object properties to track seen elements.

```javascript
function deduplicate(arr) {
  const seen = {};
  let writeIndex = 0;

  for (let readIndex = 0; readIndex < arr.length; readIndex++) {
    const currentItem = arr[readIndex];
    // Serialize objects for comparison, use primitive values directly
    const key =
      typeof currentItem === "object"
        ? JSON.stringify(currentItem)
        : currentItem;

    if (!seen.hasOwnProperty(key)) {
      seen[key] = true;
      arr[writeIndex] = arr[readIndex];
      writeIndex++;
    }
  }

  // Truncate the remaining elements
  arr.length = writeIndex;
}

// Time Complexity: O(n) - single pass through array
// Space Complexity: O(n) - storage for seen keys
```

## Optimal Approach Analysis

The Set approach is generally optimal for primitive values:

- Simple and clean implementation
- O(n) time complexity
- Works well for most use cases

## Dry Run Examples

### Example 1: Primitive values

```javascript
const arr1 = [1, 2, 3, 2, 1];
deduplicate(arr1);
// Step 1: new Set([1,2,3,2,1]) → {1,2,3}
// Step 2: arr.length = 0
// Step 3: push 1,2,3
// Result: [1, 2, 3]
```

### Example 2: Mixed types

```javascript
const arr2 = [1, "1", true, false, true, 1];
deduplicate(arr2);
// Step 1: new Set([1,'1',true,false,true,1]) → {1,'1',true,false}
// Step 2: arr.length = 0
// Step 3: push 1,'1',true,false
// Result: [1, '1', true, false]
```

### Example 3: Objects (using hash map approach)

```javascript
const arr3 = [{ x: 1 }, { x: 1 }, { x: 2 }];
// Using hash map approach:
// Step 1: seen = {}, writeIndex = 0
// Step 2: key1 = '{"x":1}' → not in seen → keep, writeIndex=1
// Step 3: key2 = '{"x":1}' → in seen → skip
// Step 4: key3 = '{"x":2}' → not in seen → keep, writeIndex=2
// Result: [{x:1}, {x:2}]
```

## Final Recommendation

For most cases with primitive values, the Set approach is best. For objects, use the hash map approach with serialization. Choose based on your specific data types and requirements.

# 11 Implementing `chunk()` Function

The `chunk()` function splits an array into smaller arrays (chunks) of a specified size. This is similar to Lodash's `_.chunk()` helper function.

## Intuition and Approaches

### 1. Using a For Loop

**Intuition**: Iterate through the array in steps equal to the chunk size and slice subarrays.

```javascript
function chunk(arr, size = 1) {
  // Handle edge cases
  if (!Array.isArray(arr) || size < 1) return [];

  const chunkedArray = [];
  const arrLength = arr.length;

  for (let i = 0; i < arrLength; i += size) {
    chunkedArray.push(arr.slice(i, i + size));
  }

  return chunkedArray;
}
// Time Complexity: O(n) - single pass through the array
// Space Complexity: O(n) - new array storage
```

### 2. Using Reduce (Functional Approach)

**Intuition**: Build chunks by accumulating elements into temporary arrays.

```javascript
function chunk(arr, size) {
  return arr.reduce((chunkedArray, currentItem) => {
    // Get the last chunk
    const lastChunk = chunkedArray[chunkedArray.length - 1];

    // If last chunk doesn't exist or is full, create new chunk
    if (!lastChunk || lastChunk.length === size) {
      chunkedArray.push([currentItem]);
    } else {
      // Otherwise add to current chunk
      lastChunk.push(currentItem);
    }

    return chunkedArray;
  }, []);
}

// Time Complexity: O(n) - single pass through array
// Space Complexity: O(n) - new array storage
```

## Dry Run Examples

### Example 1: Normal Case

**Input**: `chunk([1, 2, 3, 4, 5, 6, 7], 3)`

**Execution Steps**:

1. **Initial Check**: `arr` is an array and `size` (3) > 0 → proceed
2. Initialize `chunkedArray = []`
3. `arrLength = 7`
4. **Loop**:
   - Iteration 1 (i=0):
     - `slice(0, 3)` → `[1, 2, 3]`
     - `chunkedArray = [[1, 2, 3]]`
   - Iteration 2 (i=3):
     - `slice(3, 6)` → `[4, 5, 6]`
     - `chunkedArray = [[1, 2, 3], [4, 5, 6]]`
   - Iteration 3 (i=6):
     - `slice(6, 9)` → `[7]` (end index exceeds array length)
     - `chunkedArray = [[1, 2, 3], [4, 5, 6], [7]]`
5. **Result**: `[[1, 2, 3], [4, 5, 6], [7]]`

### Example 2: Edge Case - Empty Array

**Input**: `chunk([], 2)`

**Execution Steps**:

1. **Initial Check**: `arr` is an array and `size` (2) > 0 → proceed
2. Initialize `chunkedArray = []`
3. `arrLength = 0`
4. **Loop**: Condition `i < arrLength` (0 < 0) is false → skip loop
5. **Result**: `[]`

### Example 3: Edge Case - Chunk Size Larger Than Array

**Input**: `chunk(['a', 'b', 'c'], 5)`

**Execution Steps**:

1. **Initial Check**: `arr` is an array and `size` (5) > 0 → proceed
2. Initialize `chunkedArray = []`
3. `arrLength = 3`
4. **Loop**:
   - Iteration 1 (i=0):
     - `slice(0, 5)` → `['a', 'b', 'c']` (end index exceeds array length)
     - `chunkedArray = [['a', 'b', 'c']]`
5. **Result**: `[['a', 'b', 'c']]`

### Example 4: Edge Case - Default Size

**Input**: `chunk([true, false, null, undefined])`

**Execution Steps**:

1. **Initial Check**: `arr` is an array and `size` defaults to 1 > 0 → proceed
2. Initialize `chunkedArray = []`
3. `arrLength = 4`
4. **Loop**:
   - Iteration 1 (i=0):
     - `slice(0, 1)` → `[true]`
     - `chunkedArray = [[true]]`
   - Iteration 2 (i=1):
     - `slice(1, 2)` → `[false]`
     - `chunkedArray = [[true], [false]]`
   - Iteration 3 (i=2):
     - `slice(2, 3)` → `[null]`
     - `chunkedArray = [[true], [false], [null]]`
   - Iteration 4 (i=3):
     - `slice(3, 4)` → `[undefined]`
     - `chunkedArray = [[true], [false], [null], [undefined]]`
5. **Result**: `[[true], [false], [null], [undefined]]`

## Visual Representation

### Example 1 Visualization:

```
Original: [1, 2, 3, 4, 5, 6, 7]
Chunk size: 3

Processing:
[1, 2, 3, 4, 5, 6, 7]
 ↑______↑   → [1, 2, 3]
         ↑______↑ → [4, 5, 6]
                ↑______↑ → [7]

Result: [[1,2,3], [4,5,6], [7]]
```

### Example 3 Visualization:

```
Original: ['a', 'b', 'c']
Chunk size: 5

Processing:
['a', 'b', 'c']
 ↑_________↑ → ['a', 'b', 'c'] (stops at end)

Result: [['a','b','c']]
```

# 12 Finding the Median of Two Sorted Arrays

This is a classic problem that requires finding the median of two sorted arrays efficiently.
The median is the middle value in a sorted list of numbers. If the list has an even number of elements, the median is the average of the two middle numbers.

## Problem Statement

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.

## Approaches

### 1. Brute Force Approach (Merge and Find Median)

**Intuition**: Merge both arrays into one sorted array and then find the median.

**Approach**:

1. Create a new array by merging both input arrays.
2. Sort the merged array.
3. Find the median based on the length of the merged array.

```javascript
function findMedianSortedArraysBruteForce(nums1, nums2) {
  // Merge both arrays
  const mergedArray = [...nums1, ...nums2];

  // Sort the merged array
  mergedArray.sort((a, b) => a - b);

  const length = mergedArray.length;

  // If length is odd, return middle element
  if (length % 2 === 1) {
    return mergedArray[Math.floor(length / 2)];
  }
  // If length is even, return average of two middle elements
  else {
    const mid1 = mergedArray[length / 2 - 1];
    const mid2 = mergedArray[length / 2];
    return (mid1 + mid2) / 2;
  }
}
```

**Time Complexity**: O((m+n) log(m+n)) due to sorting
**Space Complexity**: O(m+n) for storing the merged array

### 2. Optimized Merge Approach (Two Pointers)

**Intuition**: Since both arrays are already sorted, we can merge them in O(m+n) time without full sorting.

**Approach**:

1. Use two pointers to traverse both arrays.
2. Compare elements at pointers and merge them in order.
3. Find the median from the merged array.

```javascript
function findMedianSortedArraysTwoPointers(nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const mergedArray = [];
  let i = 0,
    j = 0;

  // Merge the arrays using two pointers
  while (i < m && j < n) {
    if (nums1[i] < nums2[j]) {
      mergedArray.push(nums1[i++]);
    } else {
      mergedArray.push(nums2[j++]);
    }
  }

  // Add remaining elements from nums1
  while (i < m) {
    mergedArray.push(nums1[i++]);
  }

  // Add remaining elements from nums2
  while (j < n) {
    mergedArray.push(nums2[j++]);
  }

  const length = mergedArray.length;

  // Calculate median
  if (length % 2 === 1) {
    return mergedArray[Math.floor(length / 2)];
  } else {
    const mid1 = mergedArray[length / 2 - 1];
    const mid2 = mergedArray[length / 2];
    return (mid1 + mid2) / 2;
  }
}
```

**Time Complexity**: O(m+n) for merging
**Space Complexity**: O(m+n) for storing the merged array

### 3. Optimal Approach (Binary Search)

**Intuition**: We can find the median without merging by using binary search to partition both arrays such that elements on left are less than elements on right.

**Approach**:

1. Ensure nums1 is the smaller array to reduce search space.
2. Perform binary search on the smaller array to find the correct partition.
3. Calculate the partition in the larger array based on the smaller array's partition.
4. Check if the partition is correct (all left elements ≤ all right elements).
5. Calculate median based on partition.

```javascript
function findMedianSortedArraysOptimal(nums1, nums2) {
  // Ensure nums1 is the smaller array to reduce binary search steps
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  const totalLength = m + n;
  const halfLength = Math.floor((m + n + 1) / 2);

  let left = 0;
  let right = m;

  while (left <= right) {
    // Partition position in nums1
    const partition1 = Math.floor((left + right) / 2);
    // Corresponding partition position in nums2
    const partition2 = halfLength - partition1;

    // Get the four elements around the partition
    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
    const minRight1 = partition1 === m ? Infinity : nums1[partition1];

    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
    const minRight2 = partition2 === n ? Infinity : nums2[partition2];

    // Check if partition is correct
    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // Calculate median based on total length
      if (totalLength % 2 === 1) {
        return Math.max(maxLeft1, maxLeft2);
      } else {
        return (
          (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
        );
      }
    }
    // If partition1 is too far right, move left
    else if (maxLeft1 > minRight2) {
      right = partition1 - 1;
    }
    // If partition1 is too far left, move right
    else {
      left = partition1 + 1;
    }
  }

  // Should never reach here for valid inputs
  throw new Error("Input arrays are not sorted or invalid");
}
```

**Time Complexity**: O(log(min(m, n))) - binary search on the smaller array
**Space Complexity**: O(1) - constant extra space

## Dry Run of Optimal Approach

### Example 1: Normal Case

nums1 = [1, 3], nums2 = [2]

Initial:

- nums1 is smaller (m=2), nums2 (n=1)
- totalLength = 3, halfLength = 2
- left = 0, right = 2

Iteration 1:

- partition1 = (0+2)/2 = 1
- partition2 = 2-1 = 1
- maxLeft1 = nums1[0] = 1
- minRight1 = nums1[1] = 3
- maxLeft2 = nums2[0] = 2
- minRight2 = Infinity
- Check: 1 <= Infinity && 2 <= 3 → true
- totalLength is odd → return max(1, 2) = 2

### Example 2: Even Length Case

nums1 = [1, 2], nums2 = [3, 4]

Initial:

- nums1 is smaller (m=2), nums2 (n=2)
- totalLength = 4, halfLength = 2
- left = 0, right = 2

Iteration 1:

- partition1 = (0+2)/2 = 1
- partition2 = 2-1 = 1
- maxLeft1 = nums1[0] = 1
- minRight1 = nums1[1] = 2
- maxLeft2 = nums2[0] = 3
- minRight2 = nums2[1] = 4
- Check: 1 <= 4 && 3 <= 2 → false (3 not <= 2)
- Since maxLeft2 > minRight1, need to move partition1 right

Iteration 2:

- left = 2, right = 2
- partition1 = (2+2)/2 = 2
- partition2 = 2-2 = 0
- maxLeft1 = nums1[1] = 2
- minRight1 = Infinity
- maxLeft2 = -Infinity
- minRight2 = nums2[0] = 3
- Check: 2 <= 3 && -Infinity <= Infinity → true
- totalLength is even → return (max(2, -Infinity) + min(Infinity, 3))/2 = (2 + 3)/2 = 2.5

### Example 3: Edge Case (One Empty Array)

nums1 = [], nums2 = [1]

Initial:

- nums1 is empty (m=0), nums2 (n=1)
- totalLength = 1, halfLength = 1
- left = 0, right = 0

Iteration 1:

- partition1 = (0+0)/2 = 0
- partition2 = 1-0 = 1
- maxLeft1 = -Infinity
- minRight1 = Infinity
- maxLeft2 = nums2[0] = 1
- minRight2 = Infinity
- Check: -Infinity <= Infinity && 1 <= Infinity → true
- totalLength is odd → return max(-Infinity, 1) = 1

# 13 Intersection of Two Sorted Arrays

## Problem Statement

Given two sorted arrays, find their intersection (common elements). Each element in the result should appear as many times as it shows in both arrays.

Example:

- Input: `nums1 = [1,2,2,3]`, `nums2 = [2,2,3,4]`
- Output: `[2,2,3]`

## Approaches

### 1. Brute Force Approach (Nested Loops)

**Intuition**: Compare each element of the first array with each element of the second array.

**Approach**:

1. Iterate through each element in the first array.
2. For each element, check if it exists in the second array.
3. If found, add to result and mark the element in the second array as visited to avoid duplicates.

```javascript
function intersectionBruteForce(nums1, nums2) {
  const result = [];
  const visited = new Array(nums2.length).fill(false);

  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      // If elements match and not visited
      if (nums1[i] === nums2[j] && !visited[j]) {
        result.push(nums1[i]);
        visited[j] = true; // Mark as visited
        break; // Move to next element in nums1
      }
    }
  }

  return result;
}
```

**Time Complexity**: O(m\*n) - Nested loops
**Space Complexity**: O(n) - For visited array

### 2. Hash Map Approach

**Intuition**: Use a hash map to count frequencies of elements in the smaller array, then check against the second array.

**Approach**:

1. Store frequency counts of elements from the smaller array in a hash map.
2. Iterate through the second array and for each element, if it exists in the map with count > 0, add to result and decrement count.

```javascript
function intersectionHashMap(nums1, nums2) {
  const result = [];
  const frequencyMap = new Map();

  // Store frequencies of nums1 (assuming nums1 is smaller)
  for (const num of nums1) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Check against nums2
  for (const num of nums2) {
    if (frequencyMap.get(num) > 0) {
      result.push(num);
      frequencyMap.set(num, frequencyMap.get(num) - 1);
    }
  }

  return result;
}
```

**Time Complexity**: O(m + n) - Two passes
**Space Complexity**: O(min(m, n)) - For hash map

### 3. Two Pointers Approach (Optimal for Sorted Arrays)

**Intuition**: Since arrays are sorted, use two pointers to traverse both arrays simultaneously and find matches.

**Approach**:

1. Initialize two pointers at the start of both arrays.
2. Compare elements at pointers:
   - If equal, add to result and move both pointers.
   - If nums1[i] < nums2[j], move i forward.
   - Else move j forward.

```javascript
function intersectionTwoPointers(nums1, nums2) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      result.push(nums1[i]);
      i++;
      j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}
```

**Time Complexity**: O(m + n) - Single pass through both arrays
**Space Complexity**: O(1) - No extra space (excluding result)

### 4. Binary Search Approach (Optimal when one array is much larger)

**Intuition**: For each element in the smaller array, perform binary search in the larger array.

**Approach**:

1. Iterate through the smaller array.
2. For each element, perform binary search in the larger array.
3. If found, add to result and remove the element from the larger array to avoid duplicates.

```javascript
function intersectionBinarySearch(nums1, nums2) {
  const result = [];
  // Assuming nums2 is the larger array
  let nums2Copy = [...nums2];

  for (const num of nums1) {
    const index = binarySearch(nums2Copy, num);
    if (index !== -1) {
      result.push(num);
      nums2Copy.splice(index, 1); // Remove the found element
    }
  }

  return result;
}

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

**Time Complexity**: O(m log n) - Where m is size of smaller array
**Space Complexity**: O(n) - For copy of larger array

## Dry Run of Optimal Two Pointers Approach

### Example 1: Normal Case

nums1 = [1,2,2,3], nums2 = [2,2,3,4]

Initial:
i = 0, j = 0, result = []

Step 1: nums1[0]=1 < nums2[0]=2 → i++ (i=1)
Step 2: nums1[1]=2 == nums2[0]=2 → result=[2], i=2, j=1
Step 3: nums1[2]=2 == nums2[1]=2 → result=[2,2], i=3, j=2
Step 4: nums1[3]=3 == nums2[2]=3 → result=[2,2,3], i=4, j=3
Step 5: i=4 (end) → exit

Result: [2,2,3]

### Example 2: One Array is Subset

nums1 = [2,3,4], nums2 = [3,4,5]

Initial:
i = 0, j = 0, result = []

Step 1: nums1[0]=2 < nums2[0]=3 → i++ (i=1)
Step 2: nums1[1]=3 == nums2[0]=3 → result=[3], i=2, j=1
Step 3: nums1[2]=4 == nums2[1]=4 → result=[3,4], i=3, j=2
Step 4: i=3 (end) → exit

Result: [3,4]

### Example 3: No Intersection

nums1 = [1,2,3], nums2 = [4,5,6]

Initial:
i = 0, j = 0, result = []

Step 1: nums1[0]=1 < nums2[0]=4 → i++ (i=1)
Step 2: nums1[1]=2 < nums2[0]=4 → i++ (i=2)
Step 3: nums1[2]=3 < nums2[0]=4 → i++ (i=3)
Step 4: i=3 (end) → exit

Result: []

## Conclusion

For sorted arrays, the two pointers approach is optimal with O(m+n) time and O(1) space. The binary search approach is better when one array is much larger than the other (O(m log n)). The hash map approach works well for unsorted arrays, while the brute force method should only be used for small inputs.

Choose based on:

- Sorted arrays: Two pointers
- One array much larger: Binary search
- Unsorted arrays: Hash map
- Small inputs: Brute force

# 14 Intersection of Unsorted Arrays

The problem of finding the intersection of two unsorted arrays involves identifying all elements that are common to both arrays, with each element appearing in the result as many times as it appears in both arrays.

## Approach 1: Brute Force

**Intuition**: Compare each element of the first array with every element of the second array.

```javascript
/**
 * Finds intersection of two unsorted arrays using brute force approach
 * @param {number[]} array1 - First input array
 * @param {number[]} array2 - Second input array
 * @return {number[]} Array containing common elements
 */
function intersectBruteForce(array1, array2) {
  const result = [];

  // Iterate through each element of the first array
  for (let i = 0; i < array1.length; i++) {
    // Check if the element exists in the second array
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        result.push(array1[i]);
        // Mark the element in array2 as used by setting it to null
        array2[j] = null;
        break; // Move to next element in array1
      }
    }
  }

  return result;
}

// Time Complexity: O(n*m) where n and m are lengths of array1 and array2
// Space Complexity: O(min(n,m)) for the result array
```

---

## Approach 2: Using Hash Map (Optimal)

**Intuition**: Count occurrences of elements in one array and compare with the second array.

```javascript
/**
 * Finds intersection of two unsorted arrays using hash map
 * @param {number[]} array1 - First input array
 * @param {number[]} array2 - Second input array
 * @return {number[]} Array containing common elements
 */
function intersectWithHashMap(array1, array2) {
  const result = [];
  const elementCountMap = new Map();

  // Count occurrences of elements in array1
  for (const num of array1) {
    elementCountMap.set(num, (elementCountMap.get(num) || 0) + 1);
  }

  // Check against array2
  for (const num of array2) {
    if (elementCountMap.get(num) > 0) {
      result.push(num);
      elementCountMap.set(num, elementCountMap.get(num) - 1);
    }
  }

  return result;
}

// Time Complexity: O(n + m) where n and m are lengths of array1 and array2
// Space Complexity: O(min(n,m)) for the hash map and result
```

## Approach 3: Sorting and Two Pointers

Refer to sorted intersection Problem Soln

---

## Optimal Approach Dry Run (Hash Map Approach)

Let's test the hash map approach with 3 examples covering edge cases.

### Example 1: Normal Case

```javascript
const arr1 = [4, 9, 5, 4];
const arr2 = [9, 4, 9, 8, 4];

// Step 1: Create count map from arr1
// {4: 2, 9: 1, 5: 1}

// Step 2: Check arr2 against map
// 9: found (count 1) → add to result, count→0
// 4: found (count 2) → add to result, count→1
// 9: found (count 0) → skip
// 8: not found → skip
// 4: found (count 1) → add to result, count→0

// Result: [9, 4, 4]
```

### Example 2: No Intersection

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Count map: {1:1, 2:1, 3:1}
// No matches found in arr2
// Result: []
```

### Example 3: One Empty Array

```javascript
const arr1 = [];
const arr2 = [1, 2, 3];

// Count map: {}
// No processing needed
// Result: []
```

### Example 4: Duplicate Elements

```javascript
const arr1 = [1, 2, 2, 1];
const arr2 = [2, 2];

// Count map: {1:2, 2:2}
// First 2: found (count 2) → add, count→1
// Second 2: found (count 1) → add, count→0
// Result: [2, 2]
```

---

## Final Recommendations

1. **Hash Map Approach** is generally the best for unsorted arrays when you need to preserve the count of elements.
   - Time: O(n + m)
   - Space: O(min(n, m))

2. **Sorting Approach** is good if the arrays are already sorted or if you need the result sorted.
   - Time: O(n log n + m log m)
   - Space: O(1) or O(n + m) depending on sorting implementation

3. **Brute Force** should only be used for very small arrays due to its O(n\*m) complexity.

4. **Filter Approach** is simple but inefficient for large arrays due to O(n\*m) complexity.

Choose the approach based on your specific constraints and requirements.

# 15 Finding Top K Integers in an Unsorted Array

## Problem Understanding

We need to find the top K largest integers from an unsorted array that may contain duplicates, and return them in non-ascending order.

## Possible Approaches

### 1. Sorting Approach

- Sort the array in descending order
- Take the first K elements
- Time: O(n log n) for sorting
- Space: O(1) or O(n) depending on sorting implementation

### 2. Max Heap Approach

- Build a max heap from the array
- Extract the max element K times
- Time: O(n + k log n) (heap construction + extraction)
- Space: O(n) for heap

### 3. Quickselect Approach

- Use quickselect to find the Kth largest element
- Partition the array around this element
- Take all elements >= Kth largest
- Time: O(n) average case, O(n^2) worst case
- Space: O(1)

### 4. Counting Sort Approach (for limited range)

- If numbers have limited range, use counting sort
- Time: O(n + m) where m is range size
- Space: O(m)

## Optimal Approach Discussion

For general cases where we don't know the range, the sorting approach is simplest and has acceptable performance for most practical cases. The heap approach is better when K is much smaller than n.

## JavaScript Implementations

### 1. Sorting Approach

```javascript
function topKWithSorting(numbers, k) {
  // Sort the array in descending order
  const sorted = [...numbers].sort((a, b) => b - a);

  // Slice first k elements and remove duplicates if needed
  const topK = [];
  for (let i = 0; i < sorted.length && topK.length < k; i++) {
    // Skip duplicates unless we want to count them as separate entries
    if (i === 0 || sorted[i] !== sorted[i - 1]) {
      topK.push(sorted[i]);
    }
  }

  return topK;
}

// Time: O(n log n) for sorting
// Space: O(n) for the sorted copy
```

## Dry Run of Optimal Approach (Sorting)

### Example 1: Normal case

Input: [1,10,8,9,10,2,3,4,8,8,6], k=4

1. Sort in descending order: [10,10,9,8,8,8,6,4,3,2,1]
2. Take first 4 unique elements: [10,9,8,6]

### Example 2: All duplicates

Input: [5,5,5,5,5], k=2

1. Sorted: [5,5,5,5,5]
2. First 2 unique elements: [5] (only one unique element)

### Example 3: k larger than unique elements

Input: [1,2,3,4,5], k=10

1. Sorted: [5,4,3,2,1]
2. Take all elements (only 5 available): [5,4,3,2,1]

## Final Recommendation

The sorting approach is most straightforward for JavaScript implementations, with O(n log n) time complexity which is optimal for comparison-based sorting. For very large n and small k, the heap approach might be better, but JavaScript's built-in sort is highly optimized.

# 16 Moving Zeros to the End of an Array

This problem requires us to move all zeros in an array to the end while maintaining the relative order of non-zero elements. We need to do this in-place (without creating a new array).

## Approaches

### 1. Two-Pointer Approach (Optimal)

**Intuition**: We can maintain two pointers - one for the current position to place the next non-zero element, and another to scan through the array. As we find non-zero elements, we place them at the current position and increment the pointer.

**Approach**:

1. Initialize a pointer `nonZeroIndex` to track where the next non-zero element should go.
2. Iterate through the array with another pointer `i`.
3. When we encounter a non-zero element, place it at `nonZeroIndex` and increment `nonZeroIndex`.
4. After processing all elements, fill the remaining positions from `nonZeroIndex` to end with zeros.

**Time Complexity**: O(n) - We pass through the array twice (once for non-zeros, once for zeros)
**Space Complexity**: O(1) - We're doing this in-place with constant extra space

```javascript
function moveZeros(nums) {
  let nonZeroIndex = 0;

  // Move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nonZeroIndex] = nums[i];
      nonZeroIndex++;
    }
  }

  // Fill the remaining positions with zeros
  for (let i = nonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
}

// Example usage:
const list1 = [1, 0, 0, 2, 3];
moveZeros(list1);
console.log(list1); // [1, 2, 3, 0, 0]
```

### 2. Swap Approach

**Intuition**: Similar to the two-pointer approach but we swap non-zero elements with zeros as we find them.

**Approach**:

1. Initialize `nonZeroIndex` to track the position for the next non-zero element.
2. Iterate through the array.
3. When we find a non-zero element, swap it with the element at `nonZeroIndex` and increment `nonZeroIndex`.

**Time Complexity**: O(n) - Single pass through the array
**Space Complexity**: O(1) - In-place with constant space

```javascript
function moveZerosSwap(nums) {
  let nonZeroIndex = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      // Swap current element with nonZeroIndex element
      [nums[nonZeroIndex], nums[i]] = [nums[i], nums[nonZeroIndex]];
      nonZeroIndex++;
    }
  }
}

// Example usage:
const list2 = [1, 0, 0, 2, 3];
moveZerosSwap(list2);
console.log(list2); // [1, 2, 3, 0, 0]
```

## Dry Run of Optimal Approach (Two-Pointer)

### Example 1: [1, 0, 0, 2, 3]

Initial: [1, 0, 0, 2, 3], nonZeroIndex = 0

- i=0: nums[0]=1 ≠ 0 → nums[0]=1, nonZeroIndex=1
- i=1: nums[1]=0 → skip
- i=2: nums[2]=0 → skip
- i=3: nums[3]=2 ≠ 0 → nums[1]=2, nonZeroIndex=2
- i=4: nums[4]=3 ≠ 0 → nums[2]=3, nonZeroIndex=3

Now fill from index 3 to end with zeros:
nums[3]=0, nums[4]=0

Result: [1, 2, 3, 0, 0]

### Example 2: [0, 1, 0, 3, 12]

Initial: [0, 1, 0, 3, 12], nonZeroIndex = 0

- i=0: nums[0]=0 → skip
- i=1: nums[1]=1 ≠ 0 → nums[0]=1, nonZeroIndex=1
- i=2: nums[2]=0 → skip
- i=3: nums[3]=3 ≠ 0 → nums[1]=3, nonZeroIndex=2
- i=4: nums[4]=12 ≠ 0 → nums[2]=12, nonZeroIndex=3

Fill remaining with zeros:
nums[3]=0, nums[4]=0

Result: [1, 3, 12, 0, 0]

### Example 3: [0, 0, 0, 0] (All zeros)

Initial: [0, 0, 0, 0], nonZeroIndex = 0

All elements are zero, so nonZeroIndex remains 0.
Fill from index 0 to end with zeros (no change).

Result: [0, 0, 0, 0]

### Example 4: [1, 2, 3, 4] (No zeros)

Initial: [1, 2, 3, 4], nonZeroIndex = 0

- i=0: nums[0]=1 → nums[0]=1, nonZeroIndex=1
- i=1: nums[1]=2 → nums[1]=2, nonZeroIndex=2
- i=2: nums[2]=3 → nums[2]=3, nonZeroIndex=3
- i=3: nums[3]=4 → nums[3]=4, nonZeroIndex=4

Fill from index 4 to end (none needed)

Result: [1, 2, 3, 4] (unchanged)
