/**
 ============================================
 INTERVIEW PRESPECTIVE
 ============================================
 */

//What is the use of call method ?

/**
 * The call() method is a predefined JS method.
 * It can be used to invoke a method with an owner object as argument(parameter)
 * With call(), an object can use a method belonging to another object.
 */

function sayHi() {
  console.log(this.name);
}

let user = { name: "john" };
let admin = { name: "Adam" };

// sayHi(user);
sayHi.call(user);

const person = {
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};
const person1 = {
  firstName: "John",
  lastName: "Doe",
};
const person2 = {
  firstName: "Mary",
  lastName: "Doe",
};

person.fullName(person1); //Error
// This will return "John Doe":
person.fullName.call(person1);

//call method with arguments------------------------------------------------

const user = {
  fullName: function (city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  },
};

const user1 = {
  firstName: "John",
  lastName: "Doe",
};

user.fullName.call(user1, "Oslo", "Norway");

/* =================================================================================
Apply method
====================================================================================*/

//What is the use of apply method ?

/**
 * apply() is a predefined method in JS
 * It is very similar to call() method.
 * The only difference is, when we have multiple arguments - call method takes arguments seperately.
    while apply() method takes arguments as an array.
 * After the introduction of spread syntax ES6, apply is rarely used
 */

const user2 = {
  fullName: function (city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  },
};

const user21 = {
  firstName: "John",
  lastName: "Doe",
};

user2.fullName.apply(user21, ["Oslo", "Norway"]);

/* =================================================================================
Bind method
====================================================================================*/
//Explain bind method ?

/**
 * Using the bind() method, an object can borrow a method from another object.
 * Most cases we use bind() method to preserve this context.
 *
 */

const personBind = {
  firstName: "John",
  lastName: "Doe",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

const member = {
  firstName: "Hege",
  lastName: "Nilsen",
};

let fullName = personBind.fullName.bind(member);

//ex - 2

const person = {
  firstName: "John",
  lastName: "Doe",
  display: function () {
    let x = document.getElementById("demo");
    x.innerHTML = this.firstName + " " + this.lastName;
  },
};

setTimeout(person.display, 3000); //ERROR

let display = person.display.bind(person);
