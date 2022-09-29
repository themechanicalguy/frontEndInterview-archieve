// class Expression
// const PersonCl = class {}

// Class Declaration
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

const saurav = new PersonCl("Saurav", 1990);
console.log(saurav);
saurav.calcAge();

console.log(saurav.__proto__ === PersonCl.prototype); //true

// This works same as prototypal Inheritance
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
saurav.greet(); // Hey Saurav

// IMP:
// 1. Classes are not hoisted
// 2. Classes are first-class citizen
// 3. Classes are executed in strict mode.
