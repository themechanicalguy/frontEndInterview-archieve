/**
 * Question 3 in text file Syntax
 */
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
alert(generator);

generator.next(); //{value: 1, done: false}
generator.next(); //{value: 2, done: false} // resumes from where it left, awesome right😮
generator.next(); //{value: 3, done: true} // same here but it is las it gives done as true awesome right😮
generator.next(); //{value: undefined, done: true} // from here on out we cannot call the generator function

/**
 * Question 7
 */
//Generators are iterable, however it won't give the returned value instead it provides the yielded value
// So the result will be 1 and then 2
for (let value of generator) {
  alert(value); // 1, then 2
}

/**
 * Question 8
 */
// It’s because for..of iteration ignores the last value, when done: true. So, if we want all results to be shown by for..of, we must return them with yield:

// USING GENERATORS FRO ITERABLES:
let range = {
  from: 1,
  to: 5,

  // for..of range calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

// iteration over range returns numbers from range.from to range.to
// the above object has now became the iterable I want to cry man😭💚 This awesomeness is overwelming
alert([...range]); // 1,2,3,4,5

/**
 * Ans 9
 */
// Generators may generate values forever
// In the examples above we generated finite sequences, but we can also make a generator that yields values forever. For instance, an unending sequence of pseudo-random numbers.

// That surely would require a break (or return) in for..of over such generator. Otherwise, the loop would repeat forever and hang.
