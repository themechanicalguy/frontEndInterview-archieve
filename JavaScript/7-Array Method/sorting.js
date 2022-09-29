// Sorting Arrays

/**
 * By default sort method sorts for string value without callback(even an array of numbers is converted based on string)
 * So in order to get sort like that we have to use callback like (a,b) => a-b
 * a and b are two values that will be compared upon
 * sort will do the change of the array on which it is called, so it is recommended to call the method on a shallow copy of the array.
 * we can create a shallow copy with spread operator [...arr] or with slice method (arr.slice())
 */
// Strings
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
