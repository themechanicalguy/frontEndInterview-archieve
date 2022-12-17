'use strict';
// Call and Apply Method
/** Ways to set this keyword manually */

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //
  //Enhanced object literal:::
  // OTHER WAYS :: [[book : function (flightNum, name) {}]]
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name: name });
  },
};

lufthansa.book(239, 'Zesova de Lucus');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
/**
 * In order to access book method as in lufthansa it is not a good way to copy paste inside eurowings as a new heap memory will be created. so we can do something like this...
 */
const book = lufthansa.book; //As it is a First class function
// book(23, 'Sarah Williams'); // Throws Error as it is a regular function call as 'this' will be undefined in strict mode
/** So How to use this book method??? OR How to make 'this' to point to eurowings??*/
/** We can use
 * 1. Call
 * 2. Apply
 * 3. Bind
 */
// A function is an object so an function can have methods aswell
/**
 * Here we didn't call book method itself
 * We used call method. It will set the this to the first parameter that is passed
 * And all the arguments after the first one is the arguments of the original function
 */
// Call method
book.call(eurowings, 23, 'Sarah Williams'); // here the this is pointing to eurowings manually
console.log(eurowings);

book.call(lufthansa, 239, 'Mary cooper'); // here the this is pointing to lufthansa manually
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);
/** The only thing to notice is that the objects should have same format */

/** Apply does not receive a list of arguments but it will recieve an array and pass it into the function */

//Apply Method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData); // takes in the array of the arguments
console.log(swiss);
// SO AFTER THE INTRODUCTION OF SPREAD OPERATOR APPLY IS NOT OF MUCH USE::: AS THIS WILL HAPPEN:
book.call(swiss, ...flightData);
// BIND WILL BE A NEW FILE AS IT IS IMPORTANT TOPIC
