// QUEST:How do we actually create Prototypes?
//    And how do we link objects to protoypes?
//    How can we have new Objects without classes?

// There are 3 ways to implement Prototypal Inheritance In JavaScript

// 1 : Constructor Function
/**
 * Constructor Function are very similar to normal fucntion, the only diff is that we write constructor function 
    using 'new' keyword.
 * It is a technique to create objects from a function.
 * This is how built-in objects like Arrays, Maps or Sets are actually implemented
 */

//2: ES6 Classes
/**
 * Modern alternative to constructor function syntax.
 * It is 'syntatic sugar' behind the scene, ES6 classes work exactly like constructor functions.
 * ES6 classes do not behave like classes in classical OOP.
 */

// 3 Object.create()
/**
 * This is the easiest and most straight forward way of linking an object to a prototype object.
 */
