/*=========================================================================
Asynchronous JavaScript:
=========================================================================*/

/**
 * 1 - Write a callback hell
 */

//     myFun1(function () {
//     myFun2(function () {
//         myFun3(function () {
//             myFun4(function () {
//                 ....
//             });
//         });
//     });
// });

// 2 - Write a callback function to load a script asynchronously

function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js",
  (script) => {
    alert(`Cool, the script ${script.src} is loaded`);
    alert(_); // _ is a function declared in the loaded script
  }
);

// 3 -  Promisify the loadscript function

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

let promise = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
);
promise.then(
  (script) => alert(`${script.src} is loaded!`),
  (error) => alert(`Error: ${error.message}`)
);
promise.then((script) => alert("Another handler..."));

/**
 * 4 - Delay with a promise
The built-in function setTimeout uses callbacks. Create a promise-based alternative.
The function delay(ms) should return a promise. That promise should resolve after ms milliseconds, 
so that we can add .then to it, like this:
 */

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(3000).then(() => alert("runs after 3 seconds"));

/**
 5- Animated circle with promise
  Rewrite the showCircle function in the solution of the task Animated circle with callback so that it returns a promise instead of accepting a callback.

  The new usage:
  showCircle(150, 150, 100).then(div => {
    div.classList.add('message-ball');
    div.append("Hello, world!");
  });
  Take the solution of the task Animated circle with callback as the base.
 
 */

/*
7- What would be the output 
*/
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    alert(result); // 1

    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    // (**)

    alert(result); // 2

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    alert(result); // 4
  });

// 8 - Output

new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    blabla();
  })
  .catch(alert);

// 9 - output

new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    alert("The error is handled, continue normally");
  })
  .then(() => alert("Next successful handler runs"));

// 10 - output

// the execution: catch -> catch
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    // (*)
    if (error instanceof URIError) {
      // handle it
    } else {
      alert("Can't handle such error");
      throw error; // throwing this or another error jumps to the next catch
    }
  })
  .then(function () {
    /* doesn't run here */
  })
  .catch((error) => {
    // (**)
    alert(`The unknown error has occurred: ${error}`);
    // don't return anything => execution goes the normal way
  });

// 11 - What do you think? Will the .catch trigger? Explain your answer.

new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
