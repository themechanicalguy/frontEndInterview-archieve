/**
 * Similar to Promise.race, but waits only for the first fulfilled promise and gets its result. 
 * If all of the given promises are rejected, then the returned promise is rejected with AggregateError – a 
    special error object that stores all promise errors in its errors property.
  Syntax: let promise = Promise.any(iterable);
 */

Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1

// The first promise here was fastest, but it was rejected, so the second promise became the result.
// After the first fulfilled promise “wins the race”, all further results are ignored.

// Here’s an example when all promises fail:
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Ouch!")), 1000)
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Error!")), 2000)
  ),
]).catch((error) => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
