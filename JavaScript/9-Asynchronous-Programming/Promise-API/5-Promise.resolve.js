/**
 * Promise.resolve(value) creates a resolved promise with the result value.
    Syntax: let promise = new Promise(resolve => resolve(value));
 * The method is used for compatibility, when a function is expected to return a promise.
    For example, the loadCached function below fetches a URL and remembers (caches) its content. 
    For future calls with the same URL it immediately gets the previous content from cache, 
    but uses Promise.resolve to make a promise of it, so the returned value is always a promise:
 */

// Example
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      cache.set(url, text);
      return text;
    });
}

// We can write loadCached(url).then(…), because the function is guaranteed to return a promise.
// We can always use.then after loadCached.That’s the purpose of Promise.resolve in the line(*).

// Promise.reject ------------------------------------------------------
// Promise.reject(error) creates a rejected promise with error.
// In practice, this method is almost never used.

// Syntax:
let promise = new Promise((resolve, reject) => reject(error));
