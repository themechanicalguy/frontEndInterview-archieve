# 1. `curry()`

- **Currying** is a concept in functional programming.
- It transforms functions with multiple arguments into a **sequence of functions** with a single argument.
- Currying doesn't call a function. It just transforms it.
- Currying in JavaScript fundamentally relies on closures to work.

  **Advantages**

- By using currying we can avoid passing multiple variables many times.
- It can be used to make higher order functions.
- We can create partial functions without binding values.

### Simple Example

```javascript
// Normal function — all args at once
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6

// Curried version — one arg at a time
function curriedAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

// We can call it in below ways

const addOne = curriedAdd(1);
const addOneTwo = addOne(2);
console.log(addOneTwo(3));

// Explaination - When you call curriedAdd(1), it returns a function that "remembers" the value a = 1 through a closure. Then calling that returned function with (2) creates another closure that remembers both a = 1 and b = 2:

// 2
curriedAdd(1)(2)(3); // 6 ✅
```

## Currying Basic Implementation

```javascript
function curry(fn) {
  // your code here
  return function curried(...args) {
    let context = this;
    // If enough args received — call original function
    // fn.length is the key — it tells you how many arguments the original function expects.
    if (args.length >= fn.length) {
      return fn(...args);
      // Otherwise — return function waiting for more args
    } else {
      return curried.bind(context, ...args);
    }
  };
}
```

### Using it

```javascript
function add(a, b, c) {
  return a + b + c;
}

// Curry function taken a function as argument and returns a function.
// We can call it a Higher Order function.
const curriedAdd = curry(add);

// All ways to call — all valid ✅
console.log(curriedAdd(1)(2)(3)); // 6 — one at a time
console.log(curriedAdd(1, 2)(3)); // 6 — two then one
console.log(curriedAdd(1)(2, 3)); // 6 — one then two
console.log(curriedAdd(1, 2, 3)); // 6 — all at once
```

### How it Works Step by Step

```javascript
const curriedAdd = curry(add); // add.length = 3

curriedAdd(1);
// args = [1], length 1 < 3 — return new function

curriedAdd(1)(2);
// args = [1, 2], length 2 < 3 — return new function

curriedAdd(1)(2)(3);
// args = [1, 2, 3], length 3 >= 3 — call add(1, 2, 3) ✅
// returns 6
```

# 2. implement curry() with placeholder support

**What is Placeholder Support?**

```javascript
// Without placeholder — must provide args in order
const result = curriedAdd(1)(2)(3);

// With placeholder — skip an argument, fill it later
const _ = curry.placeholder;

const addToFive = curriedAdd(_, 5); // skip first arg
addToFive(3); // fill skipped arg later → 3 + 5 = 8
```

- `_` acts as a reserved slot — "I'll fill this in later."

**Real Need — Why Placeholders?**

```javascript
const divide = curry((a, b) => a / b);

// Want to create "divide something by 2"
const half = divide(_, 2); // fix SECOND arg, leave first open
half(10); // 10 / 2 = 5 ✅
half(20); // 20 / 2 = 10 ✅

// Without placeholder — impossible cleanly
// You'd have to write: const half = (n) => divide(n, 2); // extra wrapper
```

## Implementation

```javascript
function curry(fn) {
  const _ = curry.placeholder;

  function curried(...args) {
    // Check if all placeholders are filled AND enough args received
    const isComplete =
      args.length >= fn.length && !args.slice(0, fn.length).includes(_); // no _ in expected positions

    if (isComplete) {
      return fn(...args);
    }

    // Return function waiting for more args
    return function (...newArgs) {
      // Merge old args with new args — fill placeholders left to right
      const merged = args.map((arg) =>
        arg === _ && newArgs.length > 0
          ? newArgs.shift() // fill placeholder with next new arg
          : arg,
      );

      // Append any remaining new args
      return curried(...merged, ...newArgs);
    };
  }

  return curried;
}

// Define the placeholder
curry.placeholder = Symbol("_");
const _ = curry.placeholder;
```

## Step by Step — How Merging Works

```javascript
const add = curry((a, b, c) => a + b + c);

add(_, 2, _)(1)(3);

// Step 1 — args = [_, 2, _]
// newArgs = [1]
// merge: _ → 1, 2 stays, _ stays (newArgs exhausted)
// merged = [1, 2, _]  + remaining newArgs [] = [1, 2, _]

// Step 2 — args = [1, 2, _]
// newArgs = [3]
// merge: 1 stays, 2 stays, _ → 3
// merged = [1, 2, 3] — all filled!

// fn.length = 3, no placeholders → execute ✅
// returns 1 + 2 + 3 = 6
```

## Running on all Test Cases

```javascript
const add = curry((a, b, c) => a + b + c);
const _ = curry.placeholder;

// Normal currying — still works ✅
console.log(add(1)(2)(3)); // 6
console.log(add(1, 2)(3)); // 6
console.log(add(1, 2, 3)); // 6

// Skip first arg
const addTo5and6 = add(_, 5, 6);
console.log(addTo5and6(1)); // 12 ✅ (1 + 5 + 6)
console.log(addTo5and6(10)); // 21 ✅ (10 + 5 + 6)

// Skip middle arg
const add1and3 = add(1, _, 3);
console.log(add1and3(2)); // 6  ✅ (1 + 2 + 3)
console.log(add1and3(10)); // 14 ✅ (1 + 10 + 3)

// Skip last arg
const add1and2 = add(1, 2, _);
console.log(add1and2(3)); // 6  ✅ (1 + 2 + 3)

// Multiple placeholders filled one at a time
console.log(add(_, _, _)(1)(2)(3)); // 6 ✅
console.log(add(_, _, 3)(1)(2)); // 6 ✅
console.log(add(_, 2, _)(1)(3)); // 6 ✅
```

# 3.`_.partial( )`

- Partial in JS means Pre-fill some arguments of a function — without binding this.

## partial() vs bind() vs curry()

```javascript
// bind() — pre-fills args BUT locks 'this'
const bound = fn.bind(thisContext, 1, 2);

// curry() — transforms function to take ONE arg at a time, repeatedly
const curried = curry(fn)(1)(2)(3);

// partial() — pre-fills SOME args, call rest later, 'this' stays free
const prefilled = partial(fn, 1, 2);
prefilled(3); // this = whatever calls it
```

## Implementation

```javascript
function partial(fn, ...presetArgs) {
  const _ = partial.placeholder;

  return function (...laterArgs) {
    const laterCopy = [...laterArgs]; // consume copy left to right

    // Merge preset args — fill placeholders with later args
    const finalArgs = presetArgs.map((arg) =>
      arg === _ && laterCopy.length > 0
        ? laterCopy.shift() // fill placeholder with next later arg
        : arg,
    );

    // Append any remaining later args at the end
    return fn.apply(this, [...finalArgs, ...laterCopy]);
  };
}

partial.placeholder = Symbol("_");
```

- Key difference from curry — `fn.apply(this, ...)` preserves whatever `this` is at call time, not locked at definition time.

## Basic Usage — from the question

```javascript
const func = (...args) => args;
const _ = partial.placeholder;

// Pre-fill 1, 2, 3
const func123 = partial(func, 1, 2, 3);
console.log(func123(4)); // [1, 2, 3, 4] ✅
console.log(func123(4, 5, 6)); // [1, 2, 3, 4, 5, 6] ✅

// With placeholder — skip second arg
const func1_3 = partial(func, 1, _, 3);
console.log(func1_3(2)); // [1, 2, 3]    ✅
console.log(func1_3(2, 4)); // [1, 2, 3, 4] ✅ — 4 appended at end
```

## Step by Step — How Merging Works

```javascript
const func1_3 = partial(func, 1, _, 3);
func1_3(2, 4);

// presetArgs = [1, _, 3]
// laterArgs  = [2, 4]
// laterCopy  = [2, 4]  ← working copy

// map over presetArgs:
//   1  → not placeholder → keep 1        laterCopy = [2, 4]
//   _  → placeholder     → shift() → 2   laterCopy = [4]
//   3  → not placeholder → keep 3        laterCopy = [4]

// finalArgs = [1, 2, 3]
// remaining laterCopy = [4]

// fn.apply(this, [1, 2, 3, 4])
// → [1, 2, 3, 4] ✅
```

- Real World Use Case 2 — Event Handlers with this preserved

# 4.Composition (`pipe()`)

## Understanding `Composition` and the `pipe()` Function

- Composition is a fundamental concept in functional programming where you combine multiple functions to create a new function.
- The output of one function becomes the input of the next.
- Combining multiple functions where the output of one becomes the input of the next.

### The Problem it Solves

```javascript
// Without composition — nested and unreadable
const result = divide(4)(subtract(3)(times(3)(times(2)(x))));
// read right to left — confusing ❌

// With pipe — left to right, readable like a sentence
const transform = pipe([times(2), times(3), subtract(3), divide(4)]);
transform(x); // x → *2 → *3 → -3 → /4  ✅
```

## Implementation

```javascript
function pipe(fns) {
  return function (x) {
    return fns.reduce((result, fn) => fn(result), x);
  };
}
```

- That's it. reduce threads the value through each function — output of one becomes input of next.

## What is `pipe()`?

`pipe()` is a utility function that:

1. Takes an array of functions as input
2. Returns a new function that applies these functions in sequence
3. Each function's output is passed as input to the next function

## Step by Step — How it Works

```javascript
pipe([times(2), plus(3), times(4)])(5);

// reduce starts with x = 5

// Step 1 — times(2)(5)  = 10   result so far: 10
// Step 2 — plus(3)(10)  = 13   result so far: 13
// Step 3 — times(4)(13) = 52   result so far: 52

// → 52 ✅
```

## Running All Examples from the Question

```javascript
const times = (y) => (x) => x * y;
const plus = (y) => (x) => x + y;
const subtract = (y) => (x) => x - y;
const divide = (y) => (x) => x / y;

// x * 2 * 3
const double_triple = pipe([times(2), times(3)]);
console.log(double_triple(5)); // 5*2=10, 10*3=30  → 30 ✅

// (x * 2 + 3) * 4
const transform1 = pipe([times(2), plus(3), times(4)]);
console.log(transform1(5)); // 5*2=10, 10+3=13, 13*4=52  → 52 ✅

// (x * 2 - 3) / 4
const transform2 = pipe([times(2), subtract(3), divide(4)]);
console.log(transform2(5)); // 5*2=10, 10-3=7, 7/4=1.75  → 1.75 ✅
```

## Key Points

- Composition creates complex operations from simple, reusable functions
- `pipe()` executes functions left-to-right (unlike `compose()` which typically goes right-to-left)
- Each function in the pipeline must accept a single argument
- The result is a new function that's ready to accept its initial input
