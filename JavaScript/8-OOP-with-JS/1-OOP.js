// What is OOP?
/**
 * Object-Oriented Programming(OOP) is a programming paradigm based on the concept of objects.
 * We use object to model real-world or abstract features
 */

// What is an Object in OOP?
/**
 * Objects are self contained block of codes, they are instances of class.
 */

// What is a Class?
/**
 * Class is a blueprint to create new Objects
 */

// 4 fundamental principles of OOP:
/**
 * 1- Abstraction : Ignoring or hiding details that doesn't matter
 * 2- Encapsulation : Keeping properties and methods private inside the class, so they are not accessible from outside class.
 * 3- Inheritance : Makes all properties and methods of a certain class available to a child class, forming a hierarchiacal relationship claasses.
 * 4- Polymorphism : A child class can overwrite a method it inherited from a parent class
 */

// OOP in JavaScript

// QUEST: What is Prototype in JS?
/**
 * Prototype contains all the methods and properties that are accessible to all objects linked to that prototype.
 * Basically object inherit properties and methods from prototype. That is why it is called Prototypal Inheritance
 */
// EXAMPLE:
const num = [1, 2, 3];
num.map((v) => v * 2);
//here in array num, we are able to use map because Array.prototype has a map method and all arrays have access to it.
//since array.prototype is the prototype of num array so methods are delegated to nums array(object).
// the map method is not defined in num array itself but on its prototype(Array.prototye)

// QUEST: What is the difference between Class based OOP and Prototype based OOP?
/**
 * In classical OOP, Objects are instances of class and methods are copied from class to all instances.
 * While in Prototypal Inheritance or OOP, Behaviour is delegated to the linked prototype Object. They are not copied
 */
