// FILTER METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/**
 * Filter method: pushes the current value to a new Array if the callback returns true, ignores the element if the callback function returns false
 */
/**
 * The callback function takes 3 parameters:
 *  1. element (element based on the incrementing index value)
 *  2. index position (current index position)
 *  3. array (the array upon which method is called)
 */
// Below function gives an array with element value more than 0
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// filter with for...of
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// Below function gives an array with element value less than 0
const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);
