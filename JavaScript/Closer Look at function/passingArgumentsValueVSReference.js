// PASSING ARGUMENTS ::: VALUES VS REFERENCE

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  // Changes in passenger will reflect in jonas as this is passed as reference
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};
/**
 * flight is passed as value so this value would be assigned
 * jonas is passed as object so this reference(address) would be assigned to passenger
 */
checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

// PARAMETERS PASSED WOULD BE LIKE THE BELOW WAY
const flightNum = flight; // value 'LH234' is passed to flight as flight is primitive type
const passenger = jonas; // reference in memory heap is passed to passenger as jonas is reference type

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};
// If the object is large and changing the values will cause an huge issue.
newPassport(jonas); // Passing by value
checkIn(flight, jonas); // passing by value

/**'JS does not have passing by ReferenceError, since object is passed it does not mean that is pass by reference as the variable holds the value of the memory address'
 * We pass a reference to a function but we do not pass a reference
 */
