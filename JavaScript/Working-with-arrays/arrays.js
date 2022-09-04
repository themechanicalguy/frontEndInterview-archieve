let arr = ["a", "b", "c", "d", "e"];

// SLICE : doesn't mutate the array instead returns a new array
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));

// SPLICE: Splice method mutates the array.
console.log(arr.splice(2)); //returns the deleted elements
console.log(arr); //[]

// QUEST: What is the difference between Slice and Splice ?

// REVERSE: Mutates the original array
const arr2 = ["j", "i", "k", "l", "m"];
console.log(arr2.reverse());

// Concat: It returns a new array with all elements. Doesn't mutate the original array.
const letters = arr.concat(arr2);
// after the introduction of spread op this is least used.

// JOIN:
console.log(letters.join("-"));

// Iterate : forEach
// DEFINE: the arr.forEach method allows to run a function for every element of the array
/**
 * Syntax:
    arr.forEach(function(item, index, array) {
        // ... do something with item
    });
 
 */
// EXAMPLE:
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  // item is the individual element of the array
  // index represents the index of item in the array
  // array contains all items of array
  alert(`${item} is at index ${index} in ${array}`);
});

// --------------------------------------Searching in array----------------------------------------
/**
 *  indexOf/lastIndexOf and includes: 
 * The methods arr.indexOf and arr.includes have the similar syntax and do essentially
     the same as their string counterparts, but operate on items instead of characters:

    arr.indexOf(item, from) – looks for item starting from index from, and returns the index where it was found, otherwise -1.
    arr.includes(item, from) – looks for item starting from index from, returns true if found.

 * Usually these methods are used with only one argument: the item to search. By default, the search is from the beginning.
 */
// EXAMPLE:

let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true

/**
 * Please note that indexOf uses the strict equality === for comparison. So, if we look for false, 
    it finds exactly false and not the zero.
 * If we want to check if item exists in the array, and don’t need the exact index, then arr.includes is preferred.
 * The method arr.lastIndexOf is the same as indexOf, but looks for from right to left.
 */

let fruits = ['Apple', 'Orange', 'Apple']

alert( fruits.indexOf('Apple') ); // 0 (first Apple)
alert( fruits.lastIndexOf('Apple') ); // 2 (last Apple)

/*
 * The includes method handles NaN correctly. IMP
 * A minor, but noteworthy feature of includes is that it correctly handles NaN, unlike indexOf:
 * That’s because includes was added to JavaScript much later and uses the more up to date comparison algorithm internally.
 */
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (wrong, should be 0)
alert( arr.includes(NaN) );// true (correct)

/**
 * at(): takes an integer value and returns the item at that index, allowing for positive and negative integers. 
 * Negative integers count back from the last item in the array.
 */

const array1 = [5, 12, 8, 130, 44];

let index = 2;

console.log(`Using an index of ${index} the item returned is ${array1.at(index)}`);
// expected output: "Using an index of 2 the item returned is 8"

index = -2;

console.log(`Using an index of ${index} item returned is ${array1.at(index)}`);
// expected output: "Using an index of -2 item returned is 130"


/**
 * find and findIndex/findLastIndex
 * Imagine we have an array of objects. How do we find an object with the specific condition?

Here the arr.find(fn) method comes in handy.

The syntax is:

let result = arr.find(function(item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});

The function is called for elements of the array, one after another:

    item is the element.
    index is its index.
    array is the array itself.

If it returns true, the search is stopped, the item is returned. If nothing found, undefined is returned.

For example, we have an array of users, each with the fields id and name. Let’s find the one with id == 1:
*/
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
/**
 * In real life arrays of objects is a common thing, so the find method is very useful.
 * Note that in the example we provide to find the function item => item.id == 1 with one argument. 
    That’s typical, other arguments of this function are rarely used.
 * The arr.findIndex method has the same syntax, but returns the index where the element was found 
    instead of the element itself. The value of -1 is returned if nothing is found.
 * The arr.findLastIndex method is like findIndex, but searches from right to left, similar to lastIndexOf.
 */

let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

// Find the index of the first John
alert(users.findIndex(user => user.name == 'John')); // 0

// Find the index of the last John
alert(users.findLastIndex(user => user.name == 'John')); // 3

/**
 * filter method ES6
 * the find method looks for a single (first) element that makes the function return true.
 * If there may be many, we can use arr.filter(fn).
 * The syntax is similar to find, but filter returns an array of all matching elements:

    let results = arr.filter(function(item, index, array) {
    // if true item is pushed to results and the iteration continues
    // returns empty array if nothing found
    });

 */

let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);
alert(someUsers.length); // 2

//--------------------------Transform an array------------------------------------------------
/** map function
 * The arr.map method is one of the most useful and often used.
 * It calls the function for each element of the array and returns the array of results.

    The syntax is:

    let result = arr.map(function(item, index, array) {
    // returns the new value instead of item
    });
 */

// For instance, here we transform each element into its length:
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6

/** sort(fn)
 * The call to arr.sort() sorts the array in place, changing its element order.
 * It also returns the sorted array, but the returned value is usually ignored, as arr itself is modified.
 */
let arr = [ 1, 2, 15 ];
// the method reorders the content of arr
arr.sort();
alert( arr );  // 1, 15, 2
/*
Did you notice anything strange in the outcome?
The order became 1, 15, 2. Incorrect. But why?
The items are sorted as strings by default.
Literally, all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed "2" > "15".
To use our own sorting order, we need to supply a function as the argument of arr.sort().

The function should compare two arbitrary values and return:
*/
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}

// For instance, to sort as numbers:

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

alert(arr);  // 1, 2, 15
/**
 * Now it works as intended.
 * Let’s step aside and think what’s happening. The arr can be array of anything, right? 
    It may contain numbers or strings or objects or whatever. We have a set of some items. 
    To sort it, we need an ordering function that knows how to compare its elements. The default is a string order.
 * The arr.sort(fn) method implements a generic sorting algorithm. 
    We don’t need to care how it internally works (an optimized quicksort or Timsort most of the time). 
    It will walk the array, compare its elements using the provided function and reorder them, 
    all we need is to provide the fn which does the comparison.
 */

// By the way, if we ever want to know which elements are compared – nothing prevents from alerting them:

[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});

/**
 * The algorithm may compare an element with multiple others in the process, 
    but it tries to make as few comparisons as possible.
 * A comparison function may return any number
 * Actually, a comparison function is only required to return a positive number to say “greater” and
    a negative number to say “less”.
 */
// That allows to write shorter functions:

let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // 1, 2, 15

// Arrow functions for the best

// Remember arrow functions? We can use them here for neater sorting:

arr.sort( (a, b) => a - b );
/*
This works exactly the same as the longer version above.
Use localeCompare for strings

Remember strings comparison algorithm? It compares letters by their codes by default.

For many alphabets, it’s better to use str.localeCompare method to correctly sort letters, such as Ö.

For example, let’s sort a few countries in German:
*/

let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)

// reverse

The method arr.reverse reverses the order of elements in arr.

For instance:

let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1

It also returns the array arr after the reversal.
split and join

Here’s the situation from real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: John, Pete, Mary. But for us an array of names would be much more comfortable than a single string. How to get it?

The str.split(delim) method does exactly that. It splits the string into an array by the given delimiter delim.

In the example below, we split by a comma followed by space:

let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}

The split method has an optional second numeric argument – a limit on the array length. If it is provided, then the extra elements are ignored. In practice it is rarely used though:

let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf

Split into letters

The call to split(s) with an empty s would split the string into an array of letters:

let str = "test";

alert( str.split('') ); // t,e,s,t

The call arr.join(glue) does the reverse to split. It creates a string of arr items joined by glue between them.

For instance:

let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // glue the array into a string using ;

alert( str ); // Bilbo;Gandalf;Nazgul

reduce/reduceRight

When we need to iterate over an array – we can use forEach, for or for..of.

When we need to iterate and return the data for each element – we can use map.

The methods arr.reduce and arr.reduceRight also belong to that breed, but are a little bit more intricate. They are used to calculate a single value based on the array.

The syntax is:

let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);

The function is applied to all array elements one after another and “carries on” its result to the next call.

Arguments:

    accumulator – is the result of the previous function call, equals initial the first time (if initial is provided).
    item – is the current array item.
    index – is its position.
    array – is the array.

As function is applied, the result of the previous function call is passed to the next one as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end it becomes the result of reduce.

Sounds complicated?

The easiest way to grasp that is by example.

Here we get a sum of an array in one line:

let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15

The function passed to reduce uses only 2 arguments, that’s typically enough.

Let’s see the details of what’s going on.

    On the first run, sum is the initial value (the last argument of reduce), equals 0, and current is the first array element, equals 1. So the function result is 1.
    On the second run, sum = 1, we add the second array element (2) to it and return.
    On the 3rd run, sum = 3 and we add one more element to it, and so on…

The calculation flow:

Or in the form of a table, where each row represents a function call on the next array element:
	sum 	current 	result
the first call 	0 	1 	1
the second call 	1 	2 	3
the third call 	3 	3 	6
the fourth call 	6 	4 	10
the fifth call 	10 	5 	15

Here we can clearly see how the result of the previous call becomes the first argument of the next one.

We also can omit the initial value:

let arr = [1, 2, 3, 4, 5];

// removed initial value from reduce (no 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15

The result is the same. That’s because if there’s no initial, then reduce takes the first element of the array as the initial value and starts the iteration from the 2nd element.

The calculation table is the same as above, minus the first row.

But such use requires an extreme care. If the array is empty, then reduce call without initial value gives an error.

Here’s an example:

let arr = [];

// Error: Reduce of empty array with no initial value
// if the initial value existed, reduce would return it for the empty arr.
arr.reduce((sum, current) => sum + current);

So it’s advised to always specify the initial value.

The method arr.reduceRight does the same, but goes from right to left.
Array.isArray

Arrays do not form a separate language type. They are based on objects.

So typeof does not help to distinguish a plain object from an array:

alert(typeof {}); // object
alert(typeof []); // object (same)

…But arrays are used so often that there’s a special method for that: Array.isArray(value). It returns true if the value is an array, and false otherwise.

alert(Array.isArray({})); // false

alert(Array.isArray([])); // true

Most methods support “thisArg”

Almost all array methods that call functions – like find, filter, map, with a notable exception of sort, accept an optional additional parameter thisArg.

That parameter is not explained in the sections above, because it’s rarely used. But for completeness we have to cover it.

Here’s the full syntax of these methods:

arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg is the optional last argument

The value of thisArg parameter becomes this for func.

For example, here we use a method of army object as a filter, and thisArg passes the context:

let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

// find users, for who army.canJoin returns true
let soldiers = users.filter(army.canJoin, army);

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23

If in the example above we used users.filter(army.canJoin), then army.canJoin would be called as a standalone function, with this=undefined, thus leading to an instant error.

A call to users.filter(army.canJoin, army) can be replaced with users.filter(user => army.canJoin(user)), that does the same. The latter is used more often, as it’s a bit easier to understand for most people.
