// Good example to understand Static Method is Array.from
Array.from(document.querySelectorAll("h1")); //returns a nodeList

// Array.from is a method that is attached to the Array constructor, not the Prototype.
[1, 2, 3].from(); //throws error
// Therefore all the arrays do not inherit these method

Number.parseFloat(12); //this ia also a static method

// static methods are attached to the Class
Person.hey = function () {
  console.log("Hey There");
};
Person.hey();

// we cannot call it using object
saurav.hey(); //it is not inhertied
