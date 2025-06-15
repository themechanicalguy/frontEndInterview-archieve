//create a decorator function that caches the result of a function call based on its arguments.
// The decorator should take a function as an argument and return a new function that caches the result of the original function.

function caches(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
