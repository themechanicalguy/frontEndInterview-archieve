// For Each method is a side effect and map builts a new array so it is not a side effect.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/**
 * Map method will pass each element of the array from (0 to n) and creates a new array with every element returned from callback final
 * length of map returned will be equal to the length of the actual array
 */
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
// Below is the on line implementation of the above with arrow function
const movementsUSD = movements.map((mov) => mov * eurToUsd); // arrow function implicitly has return if it is only a single line so (mov * eurToUsd) is returned

console.log(movements);
console.log(movementsUSD);

// The below mentioned thing i what is expected from map function
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
