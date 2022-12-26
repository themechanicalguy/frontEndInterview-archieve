/**
 * What is the use of Promise.all?
 * Suppose we want many promises to execute in parallel and wait untill all of them are ready.
 * Syntax : 
    let promise = Promise.all([...promise]);
 * Promise.all takes an array of promises(it technically can be any iterable, but it usually an array)
    and returns a new promise.
 * The new promise resolves when all the listed promises are resolved, and the array of 
    their results become its result 
 */

// Ex:

Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
]).then(alert);

// Example 2
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// map every url to the promise of the fetch
let requests = urls.map((url) => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests).then((responses) =>
  responses.forEach((response) => alert(`${response.url}: ${response.status}`))
);

// Example 3
let names = ["iliakan", "remy", "jeresig"];

let requests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(requests)
  .then((responses) => {
    // all responses are resolved successfully
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then((users) => users.forEach((user) => alert(user.name)));

// Example 4:
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(alert); // Error: Whoops!

/**
 * If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error.
 *If one promise rejects, Promise.all immediately rejects,  completely forgetting about 
    the other ones in the list. Their results are ignored.
 */

// Promise.all(iterable) allows non-promise “regular” values in iterable
// Normally, Promise.all(...) accepts an iterable (in most cases an array) of promises.
// But if any of those objects is not a promise, it’s passed to the resulting array “as is”.
// For instance, here the results are [1, 2, 3]:

Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  }),
  2,
  3,
]).then(alert); // 1, 2, 3
// So we are able to pass ready values to Promise.all where convenient.
