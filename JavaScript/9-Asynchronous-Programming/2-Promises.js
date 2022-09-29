// What is a Promise in JavaScript?
/**
 * An object that is used as a placeholder for the future result of an asynchronous operation
 * A container for asynchronously delivered value.
 */

// The constructor of the Promise accepts only one argument, a function with parameters resolve and reject.
new Promise(function (resolve, reject) {
  //async code here
  //resolve if success, reject if error
});

/**
 A Promise has three states:
 * Pending: the result of the async call is not known yet.
 * Resolved: async call returned with success.
 * Rejected: async call returned with an error.
 */

// To structure the async code, the async operation will be wrapped in a Promise object and handled using "then".
var myPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("success");
  }, 2000);
});
myPromise.then(
  function (data) {
    console.log(data + " received in 2 seconds");
  },
  function (error) {
    console.log(error);
  }
);

// Why Promise ? ---------------------------------------------------------------------------------------------------
//Promises have replaced callbacks and have solved the problem of ‘callback hell’.
//The sample code has been shown below to understand how developers handled multiple asynchronous calls
//without Promises in traditional JavaScript applications.
doSomething(function (result) {
  doSomethingElse(
    result,
    function (newResult) {
      doThirfThing(
        newResult,
        function (finalResult) {
          console.log("Print the final result " + finalResult);
        },
        failureCallback
      );
    },
    failurCallback
  );
}, failureCallback);

// The ’Callback hell’, is now resolved using ‘Chaining’ which creates readable code and is an eminent feature of Promise.
// Here, the asynchronous code can be chained using multiple then statements.

doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log("Print the final result " + finalResult);
  })
  .catch(failureCallBack);
