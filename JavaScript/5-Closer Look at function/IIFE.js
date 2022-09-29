// IIFE - IMMEDIATELY INVOKED FUNCTION EXPRESSIONS
//  Function that executes only once

//However we want this function to execute once there is a chance that this runOnce can be called again
const runOnce = function () {
  console.log('this will never run again');
};
runOnce();

/** The below function expression is Called IIFE */
(function () {
  console.log('this will never run again');
})();
/**
 * Initially IIFE was introduced for data privacy.
 * Before ES6, before introduction of const and let keyword var is used so in order to create data privacy(one of the factor) IIFE is used
 * now var is not much used and let and const are block scoped which makes them unaccessible outside block IIFE is not used for data privacy
 * However, IIFE is the way to go if a function is supposed to be called only once.
 */
(() => console.log('This will ALSO never run again'))();

{
  // this block scope provide data privacy to const and let variables as they won't be accessible outside this block. So the concept of IIFE is ignored now-a-days
  //
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate); // throws
console.log(notPrivate);
