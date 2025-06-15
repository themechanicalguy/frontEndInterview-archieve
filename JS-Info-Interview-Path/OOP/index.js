// 1- Create an Object using Constructor Function! ----------------------------------

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Never to this! - Never create a method inside constructor function
  //   Because if we create 1000 Person object, then each object would be having a copy of calcAge method.
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const saurav = new Person("Saurav", 1996);
const venkat = new Person("Venkat", 1999);

// 2 - Attach a method to above created Prototype!----------------------------------------
Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

//3 - Add a new property to the Prototype Person! -----------------------------------------------
Person.prototype.species = "Homo Sapiens";
console.log(venkat.species, saurav.species);

//4 - Predict the output -----------------------------------------------------------------------
console.log(saurav.__proto__ === Person.prototype); //true
console.log(Person.prototype.isPrototypeOf(venkat)); //true
console.log(Person.prototype.isPrototypeOf(saurav)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false
console.log(jonas.hasOwnProperty(firstName)); //true
console.log(jonas.hasOwnProperty(species)); //false

//5 - Write the same using ES6 classes ! -------------------------------------------------------------
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //   Methods will be added to prototype property
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const saurav1 = new PersonCl("SauravR", 1990);

//6- Predict the output ----------------------------------------------------------
console.log(PersonCl === PersonCl.prototype.constructor); //true

//7- Predict the output ------------------------------------------------------------------------------
function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}
// Create a new class
let User = makeClass("Hello");
new User().sayHi(); // Hello
