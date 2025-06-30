# 2637. Promise Time Limit

## Problem Statement

Given an asynchronous function `fn` and a time `t` in milliseconds, return a new time limited version of the input function.
`fn` takes arguments provided to the time limited function.

The time limited function should follow these rules:

- If the `fn` completes within the time limit of `t` milliseconds, the time limited function should resolve with the result.
- If the execution of the `fn` exceeds the time limit, the time limited function should reject with the string "Time Limit Exceeded".

### Concept Explanation

The problem revolves around creating a **time-limited** version of an asynchronous function. This means that if the original function (`fn`) does not complete its execution within a specified time (`t` milliseconds), the time-limited function should reject with a "Time Limit Exceeded" error. Otherwise, it should resolve with the result of the original function.

Key points:

1. **Asynchronous Function Handling**: The original function (`fn`) is asynchronous, so we need to handle Promises.
2. **Time Limitation**: We need to enforce a time constraint on the execution of `fn`.
3. **Race Condition**: We can use `Promise.race()` to compete between:
   - The original function's Promise.
   - A timeout Promise that rejects after `t` milliseconds.

### Solution Code

```javascript
/**
 * Creates a time-limited version of an asynchronous function.
 * @param {Function} fn - The asynchronous function to be time-limited.
 * @param {number} t - The time limit in milliseconds.
 * @return {Function} - A new function that enforces the time limit.
 */
function timeLimit(fn, t) {
  return async function (...args) {
    // Create a promise that rejects after `t` milliseconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t);
    });

    // Race between the original function's promise and the timeout promise
    try {
      const result = await Promise.race([fn(...args), timeoutPromise]);
      return result; // If fn completes before timeout, return its result
    } catch (err) {
      throw err; // Propagate the error (either from fn or timeout)
    }
  };
}

// Example Usage
(async () => {
  // Example 1: Function exceeds time limit
  const fn1 = async (n) => {
    await new Promise((res) => setTimeout(res, 100));
    return n * n;
  };
  const limited1 = timeLimit(fn1, 50);
  const inputs1 = [5];

  try {
    const start1 = performance.now();
    const res1 = await limited1(...inputs1);
    console.log({
      resolved: res1,
      time: Math.floor(performance.now() - start1),
    });
  } catch (err1) {
    console.log({
      rejected: err1,
      time: Math.floor(performance.now() - start1),
    });
  }
  // Expected Output: {"rejected":"Time Limit Exceeded","time":50}

  // Example 2: Function completes within time limit
  const fn2 = async (n) => {
    await new Promise((res) => setTimeout(res, 100));
    return n * n;
  };
  const limited2 = timeLimit(fn2, 150);
  const inputs2 = [5];

  try {
    const start2 = performance.now();
    const res2 = await limited2(...inputs2);
    console.log({
      resolved: res2,
      time: Math.floor(performance.now() - start2),
    });
  } catch (err2) {
    console.log({
      rejected: err2,
      time: Math.floor(performance.now() - start2),
    });
  }
  // Expected Output: {"resolved":25,"time":100}
})();
```

### Explanation of the Code

1. **`timeLimit` Function**:

   - Takes an asynchronous function `fn` and a time limit `t` as input.
   - Returns a new asynchronous function that enforces the time limit.

2. **Timeout Promise**:

   - A `timeoutPromise` is created that rejects with "Time Limit Exceeded" after `t` milliseconds using `setTimeout`.

3. **Promise.race**:

   - `Promise.race()` is used to compete between:
     - The original function's execution (`fn(...args)`).
     - The `timeoutPromise`.
   - Whichever settles first (either resolving or rejecting) determines the outcome.

4. **Handling Results**:

   - If `fn` completes before the timeout, its result is returned.
   - If the timeout occurs first, the function rejects with "Time Limit Exceeded".

5. **Example Usage**:
   - Two examples demonstrate the behavior:
     - **Example 1**: The function takes 100ms, but the time limit is 50ms → Rejects.
     - **Example 2**: The function takes 100ms, and the time limit is 150ms → Resolves with the result.

This approach efficiently handles the time-limiting logic using native Promise features, ensuring clean and understandable code.

# 2622. Cache With Time Limit

### Concept Explanation

The problem involves creating a **Time-Limited Cache** that stores key-value pairs where each key has an associated expiration time. The cache should automatically remove keys once their expiration time has passed. The cache should support three main operations:

1. **`set(key, value, duration)`**: Adds a key-value pair to the cache with a specified duration (in milliseconds). If the key already exists and is unexpired, it updates the value and duration, returning `true`. Otherwise, it returns `false`.
2. **`get(key)`**: Retrieves the value associated with an unexpired key. If the key is expired or doesn't exist, it returns `-1`.
3. **`count()`**: Returns the number of unexpired keys currently in the cache.

The challenge is to efficiently manage the expiration of keys and ensure that the cache operations are performed in constant time, O(1), where possible.

### Solution Code

```javascript
//Constructor Function approach as provided in LeetCode------------------------------------------------------------------------------------------------
var TimeLimitedCache = function () {
  this.cache = new Map(); // Maps key to { value, expirationTime }
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  const currentTime = Date.now();
  const expirationTime = currentTime + duration;
  const existingEntry = this.cache.get(key);

  if (existingEntry && existingEntry.expirationTime > currentTime) {
    // Key exists and is unexpired, update value and expiration time
    this.cache.set(key, { value, expirationTime });
    return true;
  } else {
    // Key does not exist or is expired, set new entry
    this.cache.set(key, { value, expirationTime });
    return false;
  }
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  const currentTime = Date.now();
  const entry = this.cache.get(key);

  if (entry && entry.expirationTime > currentTime) {
    return entry.value;
  } else {
    return -1;
  }
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  const currentTime = Date.now();
  let count = 0;

  // Iterate through all entries and count unexpired keys
  for (const [key, entry] of this.cache.entries()) {
    if (entry.expirationTime > currentTime) {
      count++;
    } else {
      // Remove expired entries to clean up the cache
      this.cache.delete(key);
    }
  }

  return count;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
// Class Based Implementation---------------------------------------------------------------------------------------------------------------
class TimeLimitedCache {
  constructor() {
    this.cache = new Map(); // Maps key to { value, expirationTime }
  }

  /**
   * Sets a key-value pair with a specified duration.
   * @param {number} key - The key to set.
   * @param {number} value - The value to associate with the key.
   * @param {number} duration - The time in milliseconds until the key expires.
   * @returns {boolean} - True if the key already exists and is unexpired, false otherwise.
   */
  set(key, value, duration) {
    const currentTime = Date.now();
    const expirationTime = currentTime + duration;
    const existingEntry = this.cache.get(key);

    if (existingEntry && existingEntry.expirationTime > currentTime) {
      // Key exists and is unexpired, update value and expiration time
      this.cache.set(key, { value, expirationTime });
      return true;
    } else {
      // Key does not exist or is expired, set new entry
      this.cache.set(key, { value, expirationTime });
      return false;
    }
  }

  /**
   * Retrieves the value associated with an unexpired key.
   * @param {number} key - The key to retrieve.
   * @returns {number} - The value if the key is unexpired, otherwise -1.
   */
  get(key) {
    const currentTime = Date.now();
    const entry = this.cache.get(key);

    if (entry && entry.expirationTime > currentTime) {
      return entry.value;
    } else {
      return -1;
    }
  }

  /**
   * Returns the count of unexpired keys in the cache.
   * @returns {number} - The number of unexpired keys.
   */
  count() {
    const currentTime = Date.now();
    let count = 0;

    // Iterate through all entries and count unexpired keys
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expirationTime > currentTime) {
        count++;
      } else {
        // Remove expired entries to clean up the cache
        this.cache.delete(key);
      }
    }

    return count;
  }
}

// Example Usage
const cache = new TimeLimitedCache();

// Example 1
console.log(cache.set(1, 42, 100)); // false, key did not exist
console.log(cache.get(1)); // 42, key is unexpired
console.log(cache.count()); // 1, one unexpired key
setTimeout(() => {
  console.log(cache.get(1)); // -1, key has expired
}, 150);

// Example 2
console.log(cache.set(1, 42, 50)); // false, key did not exist
setTimeout(() => {
  console.log(cache.set(1, 50, 100)); // true, key existed and was unexpired
  console.log(cache.get(1)); // 50, key is unexpired
  setTimeout(() => {
    console.log(cache.get(1)); // 50, key is still unexpired
    setTimeout(() => {
      console.log(cache.get(1)); // -1, key has expired
      console.log(cache.count()); // 0, no unexpired keys
    }, 80); // Total 200ms (40 + 100 + 60)
  }, 80); // Total 120ms (40 + 80)
}, 40);
```

### Explanation of the Code

1. **`TimeLimitedCache` Class**:

   - **`constructor()`**: Initializes the cache as a `Map` where each key maps to an object containing `value` and `expirationTime`.

2. **`set(key, value, duration)`**:

   - Calculates the `expirationTime` as the current time plus the `duration`.
   - Checks if the key already exists and is unexpired. If so, updates the value and expiration time, returning `true`. Otherwise, adds a new entry and returns `false`.

3. **`get(key)`**:

   - Retrieves the entry for the key. If the key exists and is unexpired, returns the value; otherwise, returns `-1`.

4. **`count()`**:

   - Iterates through all entries in the cache, counts the unexpired keys, and removes any expired keys to clean up the cache.

5. **Example Usage**:
   - Demonstrates the behavior of the cache with time delays to show how keys expire and how the cache operations respond.

This implementation efficiently manages key expiration and ensures that the cache operations are performed in constant time for `set` and `get`, while `count` involves a linear scan to clean up expired keys, which is acceptable given the problem constraints.

# 2627. Debounce

### Concept Explanation

**Debouncing** is a technique used to limit the rate at which a function is executed. It ensures that the function is only called once after a specified delay, even if it's triggered multiple times during that delay. If the function is called again within the delay period, the previous pending execution is canceled, and a new delay is started.

**Key Points:**

1. **Delay Execution**: The function is not executed immediately but after a specified delay (`t` milliseconds).
2. **Cancel Previous Calls**: If the function is called again within the delay period, the previous pending execution is canceled.
3. **Latest Call Only**: Only the last call within the delay period is executed after the delay.

### Solution Code

```javascript
/**
 * Creates a debounced function that delays invoking `fn` until after `t` milliseconds
 * have elapsed since the last time the debounced function was called.
 * @param {Function} fn - The function to debounce.
 * @param {number} t - The number of milliseconds to delay.
 * @return {Function} - The debounced function.
 */
function debounce(fn, t) {
  let timeoutId; // Stores the timeout ID to clear it if needed

  return function (...args) {
    // Clear the previous timeout to cancel the pending execution
    clearTimeout(timeoutId);

    // Set a new timeout to execute the function after `t` milliseconds
    timeoutId = setTimeout(() => {
      fn.apply(this, args); // Call the original function with the provided arguments
    }, t);
  };
}

// Example Usage
const start = Date.now();

function log(...inputs) {
  console.log([Date.now() - start, inputs]);
}

const dlog = debounce(log, 50);

// Example 1
setTimeout(() => dlog(1), 50); // Will be cancelled
setTimeout(() => dlog(2), 75); // Will execute at 125ms (75 + 50)

// Example 2
// setTimeout(() => dlog(1), 50); // Will execute at 70ms (50 + 20)
// setTimeout(() => dlog(2), 100); // Will execute at 120ms (100 + 20)
```

### Explanation of the Code

1. **`debounce` Function**:

   - Takes a function `fn` and a delay `t` as input.
   - Returns a new function that can be called with arguments.

2. **`timeoutId`**:

   - Stores the ID of the timeout set by `setTimeout`. This allows us to cancel the pending execution using `clearTimeout`.

3. **Returned Debounced Function**:

   - Accepts any number of arguments (`...args`).
   - Clears any existing timeout to cancel the previous pending execution.
   - Sets a new timeout to execute `fn` after `t` milliseconds with the provided arguments.

4. **`fn.apply(this, args)`**:

   - Ensures the original function `fn` is called with the correct context (`this`) and arguments (`args`).

5. **Example Usage**:
   - **Example 1**: The first call at 50ms is canceled by the second call at 75ms. The second call is executed at 125ms (75ms + 50ms delay).
   - **Example 2**: The first call at 50ms is executed at 70ms (50ms + 20ms delay), and the second call at 100ms is executed at 120ms (100ms + 20ms delay).

# 2721. Execute Asynchronous Functions in Parallel

### Concept Explanation

The problem requires us to implement a function `promiseAll` that mimics the behavior of the built-in `Promise.all` method. This function should take an array of asynchronous functions (each returning a promise) and return a new promise that:

1. **Resolves** when all the promises from the functions resolve successfully. The resolved value should be an array of results in the same order as the input functions.
2. **Rejects** immediately if any of the promises reject, with the reason of the first rejection.

Key Points:

- **Parallel Execution**: All promises should start executing at the same time (in parallel), not sequentially.
- **Order Preservation**: The results should be collected in the same order as the input functions, regardless of their resolution time.
- **Early Rejection**: If any promise rejects, the entire operation should reject immediately with that reason.

### Solution Code

```javascript
/**
 * Executes an array of promise-returning functions in parallel and returns a single promise.
 * @param {Array<Function>} functions - An array of functions that return promises.
 * @return {Promise<Array>} - A promise that resolves to an array of results or rejects with the first error.
 */
function promiseAll(functions) {
  return new Promise((resolve, reject) => {
    const results = new Array(functions.length); // To store results in order
    let completedCount = 0; // Track how many promises have resolved

    if (functions.length === 0) {
      resolve(results); // Edge case: empty input array
      return;
    }

    functions.forEach((fn, index) => {
      fn() // Execute each function to get a promise
        .then((value) => {
          results[index] = value; // Store result at the correct index
          completedCount++;
          // Resolve when all promises are done
          if (completedCount === functions.length) {
            resolve(results);
          }
        })
        .catch(reject); // Reject immediately on any error
    });
  });
}

// Example Usage
const functions1 = [
  () => new Promise((resolve) => setTimeout(() => resolve(5), 200)),
];

promiseAll(functions1).then(console.log); // [5]

const functions2 = [
  () => new Promise((resolve) => setTimeout(() => resolve(1), 200)),
  () =>
    new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100)),
];

promiseAll(functions2).catch(console.log); // "Error"

const functions3 = [
  () => new Promise((resolve) => setTimeout(() => resolve(4), 50)),
  () => new Promise((resolve) => setTimeout(() => resolve(10), 150)),
  () => new Promise((resolve) => setTimeout(() => resolve(16), 100)),
];

promiseAll(functions3).then(console.log); // [4, 10, 16]
```

### Explanation of the Code

1. **Initialization**:

   - `results` array is created to store the resolved values in the same order as the input functions.
   - `completedCount` keeps track of how many promises have resolved.

2. **Edge Case Handling**:

   - If the input array is empty, the promise immediately resolves with an empty array.

3. **Parallel Execution**:

   - Each function in the input array is executed immediately (using `forEach`), and the returned promise is handled.
   - The `then` callback stores the resolved value at the correct index in `results` and checks if all promises have resolved. If so, it resolves the outer promise with the `results` array.
   - The `catch` callback immediately rejects the outer promise if any promise rejects, ensuring early rejection.

4. **Example Usage**:
   - **Example 1**: A single function resolves after 200ms, resulting in `[5]`.
   - **Example 2**: One function rejects after 100ms, causing the entire operation to reject with `"Error"`.
   - **Example 3**: Three functions resolve at different times, and the results are collected in order `[4, 10, 16]`.

This implementation efficiently handles parallel promise execution, maintains order, and ensures proper resolution or rejection as required.
