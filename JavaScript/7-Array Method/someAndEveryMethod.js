// includes method only compare the equality so that is why some method is introduced.
// if the user want to check or compare an array of objects or based on some conditions

/**
 * 'some' method: all the separate value will be passed to the callback.
 *  for all the value passed if the callback returns true for any of the element then the method returns true.
 *  even if one fails it returns false(even if one is true it won't iterate again)
 */
const array = [1, 2, 3, 4, 5];
// checks whether an element is even
const even = (element) => element % 2 === 0;
console.log(array.some(even));

/**
 * 'every' method: all the separate value will be passed to the callback.
 *  for all the value passed if the callback returns true then the method returns true.
 *  even if one fails it returns false(even if one is false it won't iterate agin)
 */
const isBelowThreshold = (currentValue) => currentValue < 40;
const array1 = [1, 30, 39, 29, 10, 13];
console.log(array1.every(isBelowThreshold));
// expected output: true
