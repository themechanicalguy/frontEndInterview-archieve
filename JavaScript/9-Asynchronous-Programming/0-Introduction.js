// JavaScript is a synchronous single-threaded language.
console.log("Before For loop execution");
for (var i = 0; i < 2; i++) {
  console.log("setTimeout message");
  func1();
  func2();
}
console.log("After For loop execution");
function func1() {
  console.log("Am in func1");
}
function func2() {
  console.log("Am in func2");
}

/**
 * Before For loop execution
 * setTimeout message
 * Am in func1
 * Am in func2
 * setTimeout message
 * Am in func1
 * Am in func2
 * After For loop execution
 */
console.log("Before For loop execution");
for (var i = 0; i < 2; i++) {
  setTimeout(function () {
    console.log("setTimeout message");
    func1();
  });
  func2();
}
console.log("After For loop execution");
/**
 * Before For loop execution
2 Am in func2
After For loop execution
setTimeout message
 Am in func1
 setTimeout message
 Am in func1
 */

//  As observed in the output above, due to usage of setTimeout() method the entire
// execution of code behavior has been changed, and the code has been executed asynchronously.

/**
Some of the real-time situations where you may need to use the JavaScript Asynchronous 
code of execution while implementing business logic are:

 * To make an HTTP request call.
 * To perform any input/output operations.
 * To deal with client and server communication.

These executions in JavaScript can also be achieved through many techniques.
Some of the techniques are:  
 * Callbacks
 * Promises
 * Async/Await  

 */
