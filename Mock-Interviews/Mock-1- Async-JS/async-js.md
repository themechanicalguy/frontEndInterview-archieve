## **What is the difference between Synchronous Code and Asynchronous code?**

**Synchronous:-**

- Synchronous codes are executed line by line.
- Each line of code waits for previous line to finish
- Long running operations block the code execution. i.e alert()

**Asynchronous:-**

- These codes are executed after a task that runs in the background finishes.
- These codes are non-blocking.
- Execution doesn't wait for an asynchronous task to finish its work.
- Callback function alone doesn't alone make code asynchronous

Some of the real-time situations where you may need to use the JavaScript Asynchronous code of execution while implementing business logic are:

- To make an HTTP request call. AJAX Call
- To perform any input/output operations.
- To deal with client and server communication.

These executions in JavaScript can also be achieved through many techniques.Some of the techniques are:

- Callbacks
- Promises
- Async/Await

## **What is a Callback Function?**

- A **callback** function is a function that is passed as an argument to another function.

- Callbacks make sure that a certain function does not execute until another function has already finished execution.

## **What is Callback hell?**

- Callbacks are handy in case there is a requirement to inform the executing function on what next when the asynchronous task completes.
- Here the problem is there are a bunch of asynchronous tasks,which expect you to define one callback within another callback and so on. This leads to **callback hell**.
- **Callback hell**, which is also called a **Pyramid of Doom**, consists of more than one nested callback which makes code hard to read and debug. As call’s become more nested, the code becomes deeper and increasingly more difficult to manage, especially if there are more loops, conditional statements, and so on in the code.

- Callback Hell leads to **Inversion of Control**. It is like you lose the control of code when you are using callback.

  Example:

  ```javascript
  setTimeout(() => {
    console.log("1 second passed");

    setTimeout(() => {
      console.log("2 seconds passed");

      setTimeout(() => {
        console.log("3 second passed");

        setTimeout(() => {
          console.log("4 second passed");
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
  ```

  Why do we need promise ?

- To overcome the disadvantage of callbacks, the concept of Promises was introduced.

## **What is a Promise in JS ?**

- **Promise** is a container for asynchronously delivered value.
- The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
- The constructor of the Promise accepts only one argument, a function with parameters resolve and reject.

```javascript
const promise = new Promise(function (resolve, reject) {
  //async code here*
  //resolve if success, reject if error*
});
```

## **What properties does Promise Object consist of ?**

Promise object has 3 properties :

1. **prototype** from which it is constructed.

2. **promiseResult** - which would be populated once the promise is resolved or rejected.

3. **promiseState** - tells which state promise is currently, initially it will be in ‘pending’ state and later it will become ‘fulfilled’.

## **What are different _promiseState_ of a promise ?**

_promiseState_ has three properties:

- **Pending**: the result of the async call is not known yet.

- **Resolved**: async call returned with success.

- **Rejected**: async call returned with an error.

## **Example of Promise :**

To structure the async code, the async operation will be wrapped in a Promise object and handled using "then".

```javascript
var myPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("success");
  }, 2000);
});

myPromise.then(
  function (data) {
    console.log(data + " received in 2 seconds");
  },

  function (error) {
    console.log(error);
  }
);
```

## **What is the use of .then() method ?**

- **_Consuming functions_** can be registered (subscribed) using the methods .then and .catch.

## **What are Thenables ?**

- A handler may not always return exactly a promise, but a so called "thenable" object - an arbitrary object that has a method .then
- It will be treated the same way as a promise.
- The idea is that 3rd-party libraries may implement "promise-compatible" objects of their own.
- They can have an extended set of methods, but also be compatible with native promises, because they implement .then

```javascript
class Thenable {
  constructor(num) {
    this.num = num;
  }

  then(resolve, reject) {
    alert(resolve);
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

new Promise((resolve) => resolve(1))
  .then((result) => {
    return new Thenable(result);
  })
  .then(alert);
```

## **How are Promises better than Callbacks ?**

- In the callbacks, we used to pass a function that is executed once the asynchronous function is completed and we trust the function to execute the callback.

- In case of promise, we are attaching a callback to a Promise object.

## **Build a simple promise**

```javascript
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lotter draw is happening 🔮");

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("You WIN 💰");
    } else {
      reject(new Error("You lost your money 💩"));
    }
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

##

## **Promisify setTimeout()**

```javascript
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
```

## **Explain async and await keywords?**

**_Async:_**

- Async is a keyword that is used before a function to create an async function.
- An async function always returns a Promise.
- And if the value returned is not a Promise, then JS automatically wraps the value in a resolved Promise

```javascript
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
```

- Async and await combo is used to handle promises.

**Await:**

- Await is a keyword that can be only used inside an async function.
- Await keyword makes JavaScript wait until the promise returns a result.
- JavaScript throws a Syntax error if await is used inside regular functions.
- Await keyword pauses only the async function execution and resumes when the Promise is settled.

```javascript
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
```

## **How we used to handle promises earlier and why do we even need async/await?**

```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value!!");
  }, 3000);
});

function getData() {
  // JS engine will not wait for promise to be resolved
  p.then((res) => console.log(res));
  console.log("Hello There!");
}

getData();

//Hello There!
//Promise resolved value!!
//  First `Hello There!` would be printed and then after 3 secs 'Promise resolved value!!' will be printed.
// Above happens as Javascript waits for none, so it will register this promise and take this callback function and register separately then js will move on and execute the following console and later once promise is resolved, the following console will be printed.

async function handlePromise() {
  // JS Engine will waiting for promise to resolve.
  const val = await p;
  console.log("Hello There!");
  console.log(val);
}

handlePromise();

//Hello There!
//Promise resolved value!!
//  Here, ``Hello There!`  won't be printed immediately.
//  After 3 seconds `Hello There!` will be printed followed by 'Promise resolved value!!'
//  So basically code was waiting at the `await` line to get the promise resolved before moving on to the next line.

// This is the major difference between Promise.then/.catch vs async-await

// Output questions on async await

async function handlePromise() {
  console.log("Hi");
  // JS Engine will waiting for promise to resolve.
  const val = await p;
  console.log("Hello There!");
  console.log(val);
}
handlePromise();

// Hi - Immediately printed
//Hello There!
//Promise resolved value!!
// `Hi` printed instantly -> now code will wait for 3 secs -> After 3 secs both promises will be resolved so ('Hello There!' 'Promise resolved value!!'*
// Let's create one promise and then resolve two different promise.

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value p1!!");
  }, 3000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value by p2!!");
  }, 2000);
});

async function handlePromise() {
  console.log("Hi");
  const val = await p;
  console.log("Hello There! After p1");
  console.log(val);
  const val2 = await p2;
  console.log("Hello There! After p2");
  console.log(val2);
}

handlePromise();

// Hi
// demo:1 Promise {<pending>}
// demo:18 Hello There! after p1
// demo:19 Promise resolved value p1!!
// demo:23 Hello There! after p2
// demo:24 Promise resolved value by p2!!

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value by p1!!");
  }, 5000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value by p2!!");
  }, 10000);
});

async function handlePromise() {
  console.log("Hi");
  const val = await p1;
  console.log("Hello There!");
  debugger;
  console.log(val);
  const val2 = await p2;
  console.log("Hello There! 2");
  console.log(val2);
}

handlePromise();
```

- When this function is executed, it will go line by line as JS is a synchronous single threaded language.
- Lets observe what is happening under call-stack. Above you can see we have set the break-points.
- call stack flow `handlePromise()` is pushed It will log `Hi` to console Next it sees we have await where promise is suppose to be resolved
- So will it wait for a promise to resolve and block the call stack?
- No ,thus `handlePromise()` execution get suspended and moved out of call stack
- So when JS sees await keyword it suspend the execution of function till promise is resolved -
- So `p` will get resolved after 5 secs so `handlePromise()` will be pushed to call-stack again after 5 secs.
- But this time it will start executing from where it had left.
- Now it will log 'Hello There!' and 'Promise resolved value!!'
- then it will check whether `p2` is resolved or not
- It will find since `p2` will take 10 secs to resolve so the same above process will repeat
- execution will be suspended until the promise is resolved.

Thus JS is not waiting, call stack is not getting blocked.

_Moreover in the above scenario what if p1 would be taking 10 secs and p2 5 secs even though p2 got resolved earlier but JS is a synchronous single threaded language so it will first wait for p1 to be resolved and then will immediately execute all._

## **What is Promisification?**

- “Promisification” is a long word for a simple transformation.
- It’s the conversion of a function that accepts a callback into a function that returns a promise.

```javascript
  const wait \= function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds \* 1000);
    });

  };

```

## **What are all static methods of Promise API?**

There are 6 static methods in Promise class:

1. `Promise.all()`
2. `Promise.allSettled()`
3. `Promise.race()`
4. `Promise.resolve()`
5. `Promise.reject()`

## **Explain Promise.all()**

- Suppose, we want many promises to execute in parallel and wait until all of them are ready. i.e download several URLs in parallel and process the content once they are all done.
- Promise.all takes an iterable (usually, an array of promises) and returns a new promise.
- The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.
  ```javascript
  let promise = Promise.all(iterable);
  ```
- If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error.

## **Explain Promise.allSettled()**

- Promise.all rejects as a whole if any promise rejects. That’s good for “all or nothing” cases, when we need all results successful to proceed.
- Promise.allSettled just waits for all promises to settle, regardless of the result. The resulting array has:
  - `{status:"fulfilled", value:result}` for successful responses,
  - `{status:"rejected", reason:error}` for errors.

## **Write polyfill for Promise.allSettled()**

## **Explain Promise.race()**

- Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).
- The first promise here was fastest, so it became the result. After the first settled promise “wins the race”, all further results/errors are ignored.

```javascript
let promise = Promise.race(iterable);
```

## **Explain Promise.any()**

- Similar to Promise.race, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with `AggregateError` – a special error object that stores all promise errors in its errors property.

## **Explain Promise.resolve()**

- Promise.resolve(value) creates a resolved promise with the result value.

```javascript
let promise = new Promise((resolve) => resolve(value));
```

## **Explain Promise.reject()**

- Promise.reject(error) creates a rejected promise with error.

```javascript
let promise = new Promise((resolve, reject) => reject(error));
```

## **What is a generator function ?**

- Generators can return `(“yield”)` multiple values, one after another, on-demand. They work great with iterables, allowing to create data streams with ease.
- To create a generator, we need a special syntax construct: function, so-called “generator function”.
- Generator functions behave differently from regular ones. When such a function is called, it doesn’t run its code. Instead it returns a special object, called “generator object”, to manage the execution.

```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
alert(generator);

generator.next(); //{value: 1, done: false}
generator.next(); //{value: 2, done: false} // resumes from where it left, awesome right😮
generator.next(); //{value: 3, done: true} // same here but it is las it gives done as true awesome right😮
generator.next(); //{value: undefined, done: true} // from here on out we cannot call the generator function
```
