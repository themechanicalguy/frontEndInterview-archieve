/**
 * A map is similar to an object where data is stored in key-value pairs.
 * Both keys and values can be objects, primitive values or a combination of the two.
 */

// EXAMPLE:
const employees = new Map();

employees.set("Saurav", {
  firstname: "Saurav",
  lastname: "Rath",
  role: "Devloper",
});

/**
 * Methods and Properties of Map
 
    1- new Map() – creates the map.
    2- map.set(key, value) – stores the value by the key.
    3- map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
    4- map.has(key) – returns true if the key exists, false otherwise.
    5- map.delete(key) – removes the value by the key.
    6- map.clear() – removes everything from the map.
    7- map.size – returns the current element count.

 * 
 */

// EXAMPLE:

let map = new Map();

map.set("1", "str1"); // a string key
map.set(1, "num1"); // a numeric key
map.set(true, "bool1"); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
alert(map.get(1)); // 'num1'
alert(map.get("1")); // 'str1'

alert(map.size); // 3

/**
 * Iteration over Map

For looping over a map, there are 3 methods:

    map.keys() – returns an iterable for keys,
    map.values() – returns an iterable for values,
    map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.

 */

// QUEST: Convert Object to Map
const map = new Map(Object.entries({ foo: "bar" }));

map.get("foo"); // 'bar'
