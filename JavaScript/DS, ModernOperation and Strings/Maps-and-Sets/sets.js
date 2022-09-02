/**
 * Set is a new built-in object introduced in ES6 which is similar to an array but ensure distinct values
 * Sets are not index based and connot be referred based on the position-items in a set cannot be accessed individually
 * Add/Remove and looping over set is permissible.
 * Both primitives and Object are allowed in a set
 * Sets are also iterables
 * Order of elements in a set are irrelevant
 */

// EXAMPLE:
const orderSet = new Set([1, 1, 2, 3, 2, 4, 4, 5, 6, 7, 8]);
console.log(orderSet); //1,2,3,4,5,6,7,8

console.log(typeof orderSet); //Object

// QUEST: Why do we need Sets?
/**
 * Arrays do not check for dupliate entries, In many practical cases we need to store unique data.
 * Both Primitive and Objects are allowed in a set.
 */

/**IMP:
 * Methods for set manipulation:
    1- add() - adds a value to set
    2- delete() - helps in removing a value from set
    3- size -property that helps in getting the lenght of the set
    4- has() - method that helps in checking if an element exist in a set
    5- values() - Fetches all the values in a set
 */

// Weak Set------------------------
