/**
 * What are Thenables?
 * A handler may not always return exactly a promise, but a so called "thenable" object - an arbitrary
   object that has a method .then
 * It will be treated the same way as a promise.
 
 * The idea is that 3rd-party libraries may implement "promise-compatible" objects of their own.
 * They can have an extended set of methods, but also be compatible with native promises, because 
    they implement .then 
 */

// Ex:

class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);

    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

new Promise((resolve) => resolve(1))
  .then((result) => {
    return new Thenable(result);
  })
  .then(alert);
