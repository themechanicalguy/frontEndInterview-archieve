//Create a private counter function that can increment and decrement a counter variable.
// The counter should be private and not accessible from the outside.
// The function should return an object with two methods: increment and decrement.
// The increment method should increase the counter by 1, and the decrement method should decrease the counter by 1.

function createCounter() {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}
// Example usage:
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
