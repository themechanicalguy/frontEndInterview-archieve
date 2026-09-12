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

# 5 General memoization (`memo()`)

Problem - Memoize a function that should take a function and an optional resolver for key

Looking at this problem, we need to create a memoization function that:

1. Caches results based on arguments
2. Accepts an optional resolver function for custom cache keys
3. Uses a default key generator when no resolver is provided

## Solution

```javascript
function memo(func, resolver) {
  const cache = new Map();

  return function (...args) {
    // Generate cache key
    const key = resolver ? resolver(...args) : Array.from(args).join("_");

    // Check if result exists in cache
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Compute and cache the result
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

## Explanation

### 1. **Cache Storage**

We use a `Map` for caching because:

- It can use any value as a key (strings, numbers, objects, etc.)
- It has O(1) get/set operations
- It maintains insertion order (though we don't need this feature here)

### 2. **Key Generation**

- If a `resolver` function is provided, we use it to generate the key
- Otherwise, we use the default key generator: `Array.from(args).join('_')`
- Using `Array.from(args)` converts the `arguments`-like object to a real array
- This handles multiple arguments of any type (converted to strings)

### 3. **Function Execution**

- We use `func.apply(this, args)` to maintain the correct `this` context
- This ensures the memoized function works properly when used as a method

### 4. **Caching Logic**

- Check if the key exists in cache → return cached value
- Otherwise, call the original function, cache the result, and return it

## Alternative Implementation (using Map with JSON.stringify)

```javascript
function memo(func, resolver) {
  const cache = new Map();

  return function (...args) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}
```

## Edge Cases and Considerations

1. **Primitive vs Reference Types**: Using `join('_')` works for primitives but converts everything to strings. This means `[1, 2]` and `['1', '2']` would share the same key `'1_2'`.

2. **Objects as Arguments**: The default key generator would convert objects to `'[object Object]'`, causing all objects to share the same cache key. In such cases, a custom resolver is necessary.

3. **`this` Context**: The solution uses `func.apply(this, args)` to preserve `this`, making it work when the memoized function is used as an object method.

4. **Memory Usage**: Each unique combination of arguments creates a cache entry, potentially consuming significant memory. The space complexity is O(n) where n is the number of unique cached calls.

## Example Usage

```javascript
// Example 1: Simple addition
const add = (a, b) => {
  console.log("Computing...");
  return a + b;
};

const memoAdd = memo(add);
console.log(memoAdd(1, 2)); // Computing... 3
console.log(memoAdd(1, 2)); // 3 (from cache)
console.log(memoAdd(2, 3)); // Computing... 5

// Example 2: With custom resolver
const multiply = (a, b) => a * b;
const memoMultiply = memo(multiply, (a, b) => `${a}_${b}`);
console.log(memoMultiply(2, 3)); // 6
console.log(memoMultiply(2, 3)); // 6 (from cache)

// Example 3: Handling objects
const objFunc = (obj) => obj.value;
const memoObjFunc = memo(objFunc, (obj) => obj.id);
const obj1 = { id: 1, value: 100 };
const obj2 = { id: 1, value: 200 };
console.log(memoObjFunc(obj1)); // 100
console.log(memoObjFunc(obj2)); // 100 (from cache because id is same)
```

## Complexity Analysis

- **Time Complexity**: O(1) for cache lookup and storage (assuming Map operations are O(1))
- **Space Complexity**: O(n) where n is the number of unique calls with different cache keys
- Each cache entry stores the key and the computed result, which could be significant for large results

This implementation provides a flexible and efficient memoization utility that works with any function and custom caching strategies.

# 6 - Create a sum(), which makes following possible

The problem requires a function `sum` that supports **arbitrary chaining** of numeric arguments while also behaving like a number when used in comparisons or other value contexts:

```javascript
const sum1 = sum(1);
sum1(2) == 3; // true
sum1(3) == 4; // true
sum(1)(2)(3) == 6; // true
sum(5)(-1)(2) == 6; // true
```

This is achieved by combining two JavaScript features:

1. **Closures** (to keep track of the running total)
2. **The `valueOf` method** (to make the function act like a number)

Here is the complete solution again for reference:

```js
function sum(a) {
  const f = (b) => sum(a + b);
  f.valueOf = () => a;
  return f;
}
```

---

### Step-by-step Breakdown

#### 1. The outer function `sum(a)`

- It receives the current total (`a`).
- On the first call (`sum(1)`), `a` is the starting number.
- On subsequent calls, `a` is the accumulated sum so far.

#### 2. Creating the inner function `f`

```js
const f = (b) => sum(a + b);
```

- `f` is a new function that expects the next number (`b`).
- When called, it **does not** return the sum immediately.
- Instead, it recursively calls `sum` with the new total (`a + b`).
- This creates a new function that “remembers” the updated total via a **closure**.

This is why chaining works:

```js
sum(1)(2)(3);
```

- `sum(1)` → returns a function that knows total = 1
- `(2)` → calls that function → returns a new function that knows total = 3
- `(3)` → calls the new function → returns a function that knows total = 6

#### 3. Making the function behave like a number (`valueOf`)

```js
f.valueOf = () => a;
```

JavaScript has a special mechanism for converting objects/functions to primitive values:

- When you write `someFunction == 6` or use the function in arithmetic, the engine calls `.valueOf()` (or `.toString()` if needed).
- By overriding `valueOf`, we tell JavaScript: “When you need the numeric value of this function, just return the current total `a`.”

This is the key that makes these statements work:

```js
sum(1)(2)(3) == 6; // true  → valueOf() returns 6
sum1(2) == 3; // true  → valueOf() returns 3
```

#### 4. Returning the function

```js
return f;
```

Every call to `sum` returns a **callable function** that can be chained further _and_ can be treated as a number.

---

### Execution Trace Examples

**Example 1: `sum(1)(2)(3) == 6`**

1. `sum(1)`  
   → creates `f1` where `a = 1`  
   → `f1.valueOf = () => 1`  
   → returns `f1`

2. `f1(2)` → calls `sum(1 + 2)` = `sum(3)`  
   → creates `f2` where `a = 3`  
   → returns `f2`

3. `f2(3)` → calls `sum(3 + 3)` = `sum(6)`  
   → creates `f3` where `a = 6`  
   → returns `f3`

4. `f3 == 6`  
   → JavaScript calls `f3.valueOf()` → returns `6`  
   → `6 == 6` → `true`

**Example 2: Reusing the partial sum**

```js
const sum1 = sum(1); // sum1 is a function with total = 1

sum1(2); // returns a function with total = 3
sum1(3); // returns a function with total = 4  (independent call)
```

Each call starts from the original total stored in `sum1` because of the closure.

---

### Why This Design?

| Requirement                     | How it is solved                             |
| ------------------------------- | -------------------------------------------- |
| Unlimited chaining              | Returning a new function each time           |
| Ability to stop at any point    | The returned function can be used as a value |
| Correct equality (`==`)         | Overriding `valueOf`                         |
| Support for negative numbers    | Simple addition works with negatives         |
| No mutation of previous results | Each call creates a fresh function           |

---

# 7 `_.once()`

```js
/**
 * Creates a function that is restricted to invoking `func` once.
 * Repeat calls to the function return the value of the first invocation.
 * The `func` is invoked with the `this` binding and arguments of the created function.
 *
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 */
function once(func) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      // Preserve the original `this` context and pass all arguments
      result = func.apply(this, args);
    }
    return result;
  };
}
```

### Usage example (matching the problem)

```js
function func(num) {
  return num;
}

const onced = once(func);

console.log(onced(1)); // 1  → func is called
console.log(onced(2)); // 1  → previous result is returned
console.log(onced(99)); // 1 → still the first result
```

### How it works

1. **Closure variables**
   - `called` – a flag that tracks whether `func` has already been executed.
   - `result` – stores the return value of the first (and only) invocation.

2. **Returned wrapper function**
   - On the **first call**:
     - Sets `called = true`
     - Invokes the original function with the correct `this` and arguments (`func.apply(this, args)`)
     - Saves the return value
   - On **every subsequent call**:
     - Simply returns the saved `result` (the original function is never called again)

3. **Why `apply`?**  
   It correctly forwards the calling context (`this`) and any number of arguments, which is important if the original function relies on `this` or rest parameters.

This implementation is equivalent to Lodash’s `_.once` for the common use-cases shown in the problem.

---

# 8 `memoizeOne()`

Earlier you implemented a memo function without space concern.
But in reality, it could be a problem if cache bloats.
You might need to restrict the cache capacity, just like memoize-one , it only remembers the latest arguments and result.
Please implement your own memoizeOne(), it takes 2 arguments

target function
(optional) a equality check function to compare current and last arguments
Default equality check function should be a shallow comparison on array items with strict equal ===.

```js
/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {Function}
 */
function memoizeOne(func, isEqual = defaultIsEqual) {
  let lastArgs;
  let lastThis;
  let lastResult;
  let hasCache = false;

  return function (...newArgs) {
    // Cache is valid only when:
    // 1. We have cached something before
    // 2. `this` context is the same
    // 3. Arguments are considered equal by the provided (or default) equality check
    if (hasCache && lastThis === this && isEqual(lastArgs, newArgs)) {
      return lastResult;
    }

    // Cache miss → compute, store, and return
    lastResult = func.apply(this, newArgs);
    lastArgs = newArgs;
    lastThis = this;
    hasCache = true;

    return lastResult;
  };
}

/**
 * Default equality: shallow comparison of array items with strict equality (`===`).
 * @param {any[]} args1
 * @param {any[]} args2
 * @returns {boolean}
 */
function defaultIsEqual(args1, args2) {
  if (args1.length !== args2.length) {
    return false;
  }
  for (let i = 0; i < args1.length; i++) {
    if (args1[i] !== args2[i]) {
      return false;
    }
  }
  return true;
}
```

### Explanation

- Only the **most recent** call is cached (`lastArgs` / `lastResult` / `lastThis`).
- The optional `isEqual` receives the previous arguments array and the current arguments array.
- The default equality function performs a simple length check + element-wise `===`.
- `this` is part of the cache key (same behaviour as the popular `memoize-one` library). Changing the execution context forces a re-computation even when the arguments look identical.
- `func.apply(this, newArgs)` preserves the correct `this` binding for the original function.
