// Introduced in ES6

// FIND Method

/**FIND
 * Find method returns the first element in an array that satisfies a certain condition
 */

const movements = [100, 1800, -400, 20, -25, 209];

const firstWithdrawal = movements.find((mov) => mov < 0); // -400

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find((acc) => acc.owner === 'Jessica Davis');
console.log(account); // the object from the find method

// Here the find gives the first element value this kind of comparison will be very helpful in case of array of object and multiple comparison is required.
