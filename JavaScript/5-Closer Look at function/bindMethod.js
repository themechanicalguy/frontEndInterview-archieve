const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
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

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

//BIND Method
/** Allows as to set 'this' keyword. Bind method does not call the method imediately when called Instead it returns a method that can be called later */
//book.call(eurowings, 23, 'SarahWilliams');

// WE CAN CREATE BIND FOR ALL THE REQUIRED OBJECTS AND USE THEM WHEN NEEDED
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
const bookEW = book.bind(eurowings); // HERE THE book function is binded with 'eurowings' as 'this' keyword So the below function call works fine.
bookEW(23, 'Steven Williams');

/**
 * IN THE BIND WE CAN SET THE PARAMETERS(Partial or Full) AS WELL SO IT WILL BE CALLED WITH A CONSTANT PARAMETER FUNCTION CALL
 * This will seem magical so this bind will map 'this' keyword to eurowings and 23 will be the flightNumber, so now one parameter is missing that one parameter will now be a parameter for bookEW23, so we can book the user for that one particular flight. ---> AWESOME right???😍😍
 *
 */
const bookEW23 = book.bind(eurowings, 23); // we are presetting the flight number(arguments)
// SEE BELOW NOW THE BOOKING FOR FLIGHT 23 IS VERY EASY.
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');
/**
 * 'SPECIFYING ARGUMENTS BEFOREHAND IS CALLED PARTILAL APPLICATION.'
 * So partial appliation means part of the arguments of the original function si already applied like bookEW23 as 23 is predefined(Paritally setted)
 */

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); // now the 'this' in the buyPlane will point to 'document.querySelector('.buy')' element now to rectify this we will need bind method as shown below

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // this will work as we have binded buyplane with lufthansa now, Phew!!! it is resolved

//Partial application
/** Means we can preset parameters */
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// PORTUGAL has a tax percent of 23 percent so we are presetting it
//creation of new specific Function from addTax function
const addVAT = addTax.bind(null, 0.23); // order is important
// THIS IS HOW 'addVAT' method looks like, we dont care about this here
// addVat = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(40));

// const addTaxRate = rate => value => value + value * rate;
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
