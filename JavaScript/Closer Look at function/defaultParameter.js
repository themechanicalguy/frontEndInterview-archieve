"use strict";

// Default parameters in function
const bookings = [];
/**
 * ES6 allows the developer to create function with parameter with the below mentioned way i.e) 
    vvCan be defined along with the Parameters
 */
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers // calculates only when the numPassengers is a parameter before and price is undefined
) {
  v;
  /**
   * ES5 - Way to define default Parameter
   * numPassengers = numPassengers || 1;
   * price = price || 199;
   */
  // Will create an object with flightNum, numPassengers and price  as key
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);

createBooking("LH123", undefined, 1000); // to skip a default parameter
