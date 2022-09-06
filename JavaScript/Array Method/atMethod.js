// 'at' Method is used to find the element at an index and also it can take in negative value(starting from right) as an index position

const arr = [23, 11, 64];
console.log(arr[0]);

console.log(arr.at(0));

// for finding last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
// At method can be used to find the last index of an array with the -1 itself where traditional ways is tough to acheive it
// in case we are fetching the last element of a calculated element then we can't find the length of a array in the go so 'at' can be use in that place
console.log(arr.at(-1));
