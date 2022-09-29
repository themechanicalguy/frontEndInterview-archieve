// Introduced in es2019
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());
/**FLAT
 * flat method creates an array with the first level of array element taken out into one element
    the second depth of array will be not be flat so flatMap will be used
 * To flatten seconds level deep array, we can pass parameter to flat(). i.e flat(2)
 */

const arr1 = [[1, [2, 3]], 4, [5, [6]], 7, 8];
// here the inner arrays won't flatten
arr1.flat(); // [1,[2,3],4,5,[6],7,8]

//flatMap will have a single parameter and that single parameter is depth i.e) the depth to which the array should be flatten
arr1.flatMap(2); // [1,2,3,4,5,6,7,8]

// JONAS EXAMPLE
/**
// flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap : it basically combines a map and flat method, which is better in performance.
// We can pass callback in flatMap.
// We can go only 1 level deep in flapMap, for multilevel use flat(param)
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

 */
