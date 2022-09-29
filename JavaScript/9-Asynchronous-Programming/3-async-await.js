/**
 * Async Function
 * An async function is declared wiht an async keyword.
 * It always returns a Promise,
 * And if the value returned is not a Promise, then JS automatically wraps the value in a resolved Promise
 */

// EXAMPLE:
async function hello() {
  //Value will be wrapped in a resolved promise and returned
  return "Hello Async";
}
hello().then((val) => console.log(val)); // Hello Async
async function hello() {
  //Promise can be returned explicitly as well
  return Promise.resolve("Hello Async");
}
hello().then((val) => console.log(val)); // Hello Async

/**
 * Await:
 * Await keyword makes JavaScript wait until the promise returns a result.
 * It works only inside async functions. IMP
 * JavaScript throws Syntax error if await is used inside regular functions.
 * Await keyword pauses only the async function execution and resumes when the Promise is settled.
 */

// EXAMPLE:

function sayAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}
async function hello() {
  //wait until the promise returns a value
  var x = await sayAfter2Seconds("Hello Async/Await");
  console.log(x); //Hello Async/Await
}
hello();
