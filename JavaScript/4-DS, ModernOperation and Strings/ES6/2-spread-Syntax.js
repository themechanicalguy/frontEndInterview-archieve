// DEFINE:  Spread syntax (...) allows an iterable to be expanded in places
//  where zero or more arguments (for function calls) or elements (for array literals) are expected.
// DEFINE: In an object literal, the spread syntax enumerates the properties of an object and adds
// the key-value pairs to the object being created.

// QUEST: Difference between Spread and Rest Syntax?
// Spread syntax looks exactly like rest syntax.
// In a way, spread syntax is the opposite of rest syntax.
// Spread syntax "expands" an array into its elements,
// while rest syntax collects multiple elements and "condenses" them into a single element.

// SPREAD -----------------
// EXAMPLE 1:
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers));

/**
 * There are three distinct places that accept the spread syntax:

    Function arguments list:  (myFunction(a, ...iterableObj, b))
    Array literals :  ([1, ...iterableObj, '4', 'five', 6])
    Object literals :  ({ ...obj, key: 'value' })

 */

// EXAMPLE 2: Shallow copy of array or objects
const arr = [1, 2, 3];
const arr2 = [...arr]; // like arr.slice()

arr2.push(4);
//  arr2 becomes [1, 2, 3, 4]

// EXAMPLE 3: concatenate arrays
let arr1 = [0, 1, 2];
const arr3 = [3, 4, 5];

arr1 = [...arr1, ...arr3];

// Spread in object literals ---------------
// EXAMPLE 4: Shallowing cloning of object
const obj1 = { foo: "bar", x: 42 };
const obj2 = { foo: "baz", y: 13 };

const clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

const mergedObj = { ...obj1, ...obj2 };
