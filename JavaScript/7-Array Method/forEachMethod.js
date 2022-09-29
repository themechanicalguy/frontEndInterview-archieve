const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// For Each method is a side effect and map builts a new array so it is not a side effect.

/**
 * In the below for how is it possible to find the index. we can use entries instead
 */
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

/**
 * This entries will give value in nested array like:
 * [[0,200],[1,450],[2,-400],[3,3000],....[7,1300]]
 */
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// FOREACH
/**
 * forEach will take a callback and returns void
 * callback is called with each value of the array from 0 -> n(len of arr)
 * parameters of callback:
 *  1. value - (single element of the array on which the method is called upon)
 *  2. index - (index of the current element)
 *  3. array - (the array itself as the callback may be a seperate function)
 */
movement.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

// FOREACH IN MAP AND SET
/**
 * forEach is also added to MAP and SET datastructures
 * the only difference is the index will be the key value of map and for set it will be index(Only for map it changes)
 */
//eg:

const currencies = new Map([
  ['USD', 'United States Dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
