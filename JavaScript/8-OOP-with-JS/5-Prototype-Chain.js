// Prototypal Inheritance , Prototype Chain ------------------------------------
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const jonas = new Person("Jonas", 1991);
const saurav = new Person("Saurav", "1990");
Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

console.log(jonas.__proto__);
/**
 * It is basically the constructor function that is creating the object
 {calcAge: ƒ, constructor: ƒ}
calcAge: ƒ ()
constructor: ƒ (firstName, birthYear)
[[Prototype]]: Object
 */

// Object.protorype - top of scopr chain
console.log(jonas.__proto__.__proto__);
/**
 * returns the constructor of Object
 * {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
constructor:ƒ Object()
hasOwnProperty: ƒ hasOwnProperty()
isPrototypeOf: ƒ isPrototypeOf()
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
__proto__: (...)
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
 */

// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__.__proto__); //null
// It is basically the end of prototype chain

// It points back to Person constructor
console.dir(Person.prototype.constructor);
/**
 *  Person(firstName, birthYear)
arguments: null
caller: null
length: 2
name: "Person"
prototype : {calcAge: ƒ, constructor: ƒ}
[[FunctionLocation]]: demo:539
[[Prototype]]: ƒ ()
[[Scopes]]: Scopes[2]
 */

// QUEST: What is Prototype Chain ?

// ----------------------------------------------------------------------------------
// Prototypal Inheritance on built-in Objects

const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__); //contains all methods
console.log(arr.__proto__ === Array.prototype); //true

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir((x) => x + 1);
