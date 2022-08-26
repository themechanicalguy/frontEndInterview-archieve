// Introduced in  ES6
// DEFINE: Way of unpacking values from an array or an object into seperate variable
// Can be used to break a complex Data Structure into simpler one. i.e primitive variable
// Whenever [] is user on left side, it is destructuring syntax

// EXAMPLE 1: Given an array, store all its item in a seperate variable
const arr = [2, 3, 4];
const [a, b, c] = arr;

// EXAMPLE 2: Swapping of Variable values
[b, c] = [c, b];

// Example:3 Returning 2 values from function
const [height, setHeight] = useState();

// EXAMPLE 4: Destructuring nested arrays
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;

// EXAMPLE 5: Assigining default values to destructured variables
const [p = 1, q = 3, r = 4] = [8, 9];

// OBJECT DESTRUCTURING
// EXAMPLE 6:
const user = {
  id: 42,
  isVerified: true,
};

const { id, isVerified } = user;

// EXAMPLE 7: Assigning to new variable names
const o = { p: 42, q: true };
const { p: foo, q: bar } = o;
