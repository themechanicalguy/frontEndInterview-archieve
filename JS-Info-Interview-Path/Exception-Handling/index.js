
=====================================================================================
Exception Handling
=====================================================================================

1- What are the different ways to handle exceptions in Javascript?
2- What does finally keyword do? Will finally be executed if there is a return after try block? will try..finally block work without catch?
3- What is the use of throw keyword?
3- How to handle exception in setTimeout? Withour using Promise.
4- how to handle exception in asynchronous code?

1-
function divide(a,b){
    let div = a/b;
    try{
        if(b === 0)
            throw 0;
    }catch{
        console.log('Real men dont use try...catch');
    }
}

divide(100,0);

2 -

try{
    setTimeout(function(){
        console.log(x);
    },2000);
}catch(err){
    console.log(err);
}

// Reference Error: x is not defined
// Because try...catch only works for runtime errors
// The JS engine first reads the code, and then runs it. The errors that occur on the reading phase are called "parse-time" errors and are
// unrecoverabl. that because the engine can't understand the code.


3- Will it work or not? 

setTimeout(function(){
    try{
      console.log('Started');
        hello;
    }catch(err){
        console.log(err);
    }
},2000);

// 'Started' \n 'error occured' because try catch block inside setTimeout


4
setTimeout(function(){
    try{
      console.log('Started');
      throw new Error('failed);
    }catch{
        console.log('err');
    }
},2000);

// if we dont need error object we can omit it.
// this is a recent addition to the language, this may require polyfill.

5- What is an Error Object? What is the purpose of Error Object?
  An error object is a built in error object that provides error information when an error occurs. 
  It has two properties: name and message. 
  The Error constructor creates an error object and the instances of error objects are thrown when runtime errors occur.
  The Error object can also be used as a base object for user-defined exceptions. 


6-What are different error names from error object?

Error Name	Description
EvalError	An error has occurred in the eval() function
RangeError	An error has occurred with a number "out of range"
ReferenceError	An error due to an illegal reference
SyntaxError	An error due to a syntax error
TypeError	An error due to a type error
URIError	An error due to encodeURI()

7- What are the various statements in error handling ?

8- What is the purpose of EvalError object?
  The EvalError object indicates an error regarding the global eval() function. 
  Even though this exception is not thrown by JavaScript anymore, the EvalError object remains for compatibility. 
  The syntax of this expression would be as below,

  new EvalError([message[, fileName[, lineNumber]]])
  You can throw EvalError with in try...catch block as below,

  try {
    throw new EvalError('Eval function error', 'someFile.js', 100);
  } catch (e) {
    console.log(e.message, e.name, e.fileName);              
    // "Eval function error", "EvalError", "someFile.js"

9 -When you apply 'use strict'; syntax, some of the below cases will throw a SyntaxError before executing the script ?

    When you use Octal syntax
    var n = 022;
    Using with statement
    When you use delete operator on a variable name
    Using eval or arguments as variable or function argument name
    When you use newly reserved keywords
    When you declare a function in a block
    if (someCondition) {
      function f() {}
    }
    Hence, the errors from above cases are helpful to avoid errors in development/production environments.

10- What does throw operator does?
// the throw operator generates a new error.


11- What will be output of this?

Promise.resolve('asyncfail')
    .then(response=>{
        return response;
    })
    .then((response)=>{console.log(response)})
    .then(res => {
        console.log(res);
        throw new Error('Something unexpected happened');
    });

  /*
    asyncfail
    VM493 test:1 Promise {<rejected>: Error: Something unexpected happened
        at snippet:///test:33:15}
    test:33 Uncaught (in promise) Error: Something unexpected happened
        at test:33:15
  */

12 - 
  Promise.resolve('asyncfail')
    .then(response=>{
        return response;
    })
    .then((response)=>{console.log(response)})
    .catch(err => {return err; })
    .then(res => {
        throw new Error('Something unexpected happened');
    });
/*
asyncfail
VM493 test:1 Promise {<rejected>: Error: Something unexpected happened
    at snippet:///test:34:15}
test:34 Uncaught (in promise) Error: Something unexpected happened
    at test:34:15
*/

13-
  Promise.resolve('@ 1 asyncfail')
    .then(response=>{
        Promise.resolve().then(()=>{
            throw new Error('# 2 async failed')
        })
        return 2;
    })
    .then((response)=>{console.log(response,'2nd then')})
    .then((response)=>{console.log(response * 2, '3rd then')})
    .catch(err => console.log(err.message,'<---Error Message'));
/*

2 '2nd then'
test:35 NaN '3rd then'
VM493 test:1 Promise {<fulfilled>: undefined}
test:30 Uncaught (in promise) Error: # 2 async failed
    at test:30:19

note: catch is never executed

*/

14- Output

  Promise.resolve('@ 1 asyncfail')
    .then(response=>{
        Promise.resolve().then(()=>{
            throw new Error('# 2 async failed')
        })
        .catch((err)=>console.log('error handled after # 2 async failed'));
        return 2;
    })
    .then((response)=>{console.log(response,'2nd then')})
    .then((response)=>{console.log(response * 2, '3rd then')})
    .catch(err => console.log(err.message,'<---Error Message'));

/*
  2 '2nd then'
  test:32 error handled after # 2 async failed
  test:36 NaN '3rd then'
  VM493 test:1 Promise {<fulfilled>: undefined}
*/

15- Write a userdefined Error called authenticationError 

/*
class authenticationError extends Error{
  constructor(message){
    super(message)
    this.name = 'authenticationError'
  }
}

throw new authenticationError('you are screwed');
*/

16- can we write try...finally ? 

17 - How will you handle fatal error outside of try....catch ?
// we can assign a function to window.onerror 
// the role of the global handler window.error is usually not to recover the script execution - thats probably impossible in case of programming 
// errors, but to send the error message to developers.


18-
Compare the two code fragments.

The first one uses finally to execute the code after try...catch:

try {
  work work
} catch (err) {
  handle errors
} finally {
  cleanup the working space
}
The second fragment puts the cleaning right after try...catch:

try {
  work work
} catch (err) {
  handle errors
}

cleanup the working space
We definitely need the cleanup after the work, doesn’t matter if there was an error or not.

Is there an advantage here in using finally or both code fragments are equal? 
If there is such an advantage, then give an example when it matters.
