// More Ways of Creating and Filling Arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Emprty arrays + fill method
const x = new Array(7); // will create an empty array of length 7
console.log(x);
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

/**
 * fill can take in three parameters, last two are optional
 *  1. value to be filled in array that is created or can also
 *  2. start of the array from which the array should be filled
 *  3. end position of the array
 */
arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1); // creation of arry with constant value
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // creation of array with increasing value
console.log(z);
/**
 * querySelectorAll will return nodeList which will not have array method(map, filter, reduce, ...).
 * So we will use spread operator or from to create the nodeList to array
 */
// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);

//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
// });
