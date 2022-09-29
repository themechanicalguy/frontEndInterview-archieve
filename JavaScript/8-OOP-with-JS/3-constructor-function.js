// QUEST: What is a Constructor Function? How it is implemented?
// 1 : Constructor Function
/**
 * It is a technique to create objects from a function.
 * Constructor Function are very similar to normal fucntion, the only diff is that we write constructor function 
    using 'new' keyword.
 * This is how built-in objects like Arrays, Maps or Sets are actually implemented
 */

//QUEST: What is 'new' Keyword?
/**
 * New keyword in JavaScript is used to create an instance of an object that has a constructor function. 
 * On calling the constructor function with ‘new’ operator, the following actions are taken:

    1- A new empty object is created.
    2- The new object’s internal ‘Prototype’ property (__proto__) is set the same as the prototype of the constructing function.
    3- The ‘this’ variable is made to point to the newly created object. 
        It binds the property which is declared with ‘this’ keyword to the new object.
    4- About the returned value, there are three situations below. 
        a- If the constructor function returns a non-primitive value (Object, array, etc), the constructor function
            still returns that value. Which means the new operator won’t change the returned value.
        b- If the constructor function returns nothing, ‘this’ is return;
        c- If the constructor function returns a primitive value,  it will be ignored, and ‘this’ is returned.

Syntax: new constructorFunction(arguments)
Parameters:
    ConstructorFunction: A class or function that specifies the type of the object instance.
    Arguments: A list of values that the constructor will be called with.
 */

// Constructor Functions and the new Operator
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

const jonas = new Person("Jonas", 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}
