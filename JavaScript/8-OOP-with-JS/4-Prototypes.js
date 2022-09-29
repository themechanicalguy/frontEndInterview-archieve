const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const jonas = new Person("Jonas", 1991);
const saurav = new Person("Saurav", "1990");

// instanceof operator
console.log(jonas instanceof Person); //true

// What are Prototypes?
// Each and every function in JS automatically has a property called Prototype.
console.log(Person.prototype);
/**
 * {constructor: ƒ}
constructor: ƒ (firstName, birthYear)
arguments: null
caller: null
length: 2
name: "Person"
prototype: {constructor: ƒ}
[[FunctionLocation]]: demo:539
[[Prototype]]: ƒ ()
[[Scopes]]: Scopes[2]
[[Prototype]]: Object
 */

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

// Here We have created a method clacAge and attached it to the prototype of a Person.
// So all objects created using Person constructor funciotn can use it.

jonas.calcAge();
saurav.calcAge();

// Any object always has access to all its method that are linked to its prototype.
// Prototype of jonas & saurav is Person.prototype
// Each object has a unique property __proto__

console.log(jonas.__proto__);

/**
 * It is basically the constructor function that is creating the object
 {calcAge: ƒ, constructor: ƒ}
calcAge: ƒ ()
constructor: ƒ (firstName, birthYear)
[[Prototype]]: Object
 */

console.log(jonas.__proto__ === Person.prototype); //true
// step 3 of function constructor creates the __proto__ property

// isPrototypeOf: check if object is prototype of attached prototype

console.log(Person.prototype.isPrototypeOf(jonas)); //true
console.log(Person.prototype.isPrototypeOf(saurav)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false

// Setting properties on prototype object
Person.prototype.species = "Homo Sapiens";
console.log(jonas.species, saurav.species);

console.log(jonas.hasOwnProperty(firstName)); //true
console.log(jonas.hasOwnProperty(species)); //false
