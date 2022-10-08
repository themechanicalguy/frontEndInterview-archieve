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

// EXAMPLE:
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
  }

  deposit(val) {
    this.movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1.pin); //this should not be accessible
console.log(acc1.getMovements());
onsole.log(acc1.movements);
