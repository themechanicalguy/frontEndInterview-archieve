// REDUCE METHOD

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/**
 * BELOW IS THE ACTUAL TEMPLATE FROM reduce and returns a single value that is the final accumulator.
 */
// const balance = movements.reduce(function (acc, cur, index, arr) {
//   return acc + cur;
// }, 0);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
/**  Reduce method will take in two arguments ->
 * 1. callback function as shown above callback function has 4 parameters
 *    a. accumulator -> is the value that will be accumulated each time the function returns
 *    b. current -> is the current index value of the array
 *    c. index -> current index of the array
 *    d. array -> implies the current array itself.
 * 2. initail accumulator value
 */

// The reduce Method
console.log(movements);

// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

// return number of trans > 1000
const numDeposits1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

const sums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? "deposits" : "withdrawals"] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
