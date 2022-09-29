/**
 * IMP: Types of Loops in JavaScript
    1-For loop:- Loops through a block of code a number of times
    2-For/in loop:- Loops through the property of an object
    3-For/of loop:- Loops through the values of an iterable object
    4-While loops:- Loops through a block of code while a specified condition is true.
    5-do/While:- also loops through a block of code while a specified condition is true.
 */

// For loop: ---------------------------------------------------------------------------------
for (let i = 0; i < N; i++) {
  ans += arr[i];
}

// For-in loop: It loops through the properties of an object ----------------------------------
// Syntax
for (key in object) {
  //Code block to be executed
}
// EXAMPLE:
const person = { fname: "saurav", lname: "rath", age: 80 };
let fullName = "";
for (let val in person) {
  fullName += person[val];
}
// For-of loop: ES6 it loops through the values of an iterable object.-------------------------------
// SYNTAX:
for (let item of iterable) {
  //** */
  // code block to execute
}
//  -> It lets you loop over iterable DS such as Arrays, Strings, Map, NodeList and more.
//  *item: for every iteration the value of the next property is assignmed to the item.
//  *iterable: An object that has iterable properties.
const cars = ["BMW", "Volvo", "Mini"];

let text = "";
for (let x of cars) {
  text += x;
}

// While loop: It loops through a block of code as long as a specified condition if true-----------
//  also called entry control loop
// SYNTAX:
while (condition) {
  // code block to be execute
}

// EXAMPLE:
// the code in the loop will run over and over again, as long as a variable (i) is less than 10
while (i < 10) {
  text += "The number is " + i;
  i++;
}

// Do While loop:
// The do while loop is a veriant of the while loop.
// This code will execute the code block once, before checking if the condition is true.
// Then it will repeart the loop as long as the codn if true.
// Also called exit control loop

// EXAMPLE:
do {
  text += "The number is " + i;
  i++; // dont forget to increment i
} while (i <= 10);
