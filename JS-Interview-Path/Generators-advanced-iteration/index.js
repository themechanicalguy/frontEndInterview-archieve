function fruitsIterator(values) {
  let nextIndex = 0;
  return {
    next: function () {
      if (nextIndex < values.length) {
        //we will return object
        return {
          value: values[nextIndex++],
          done: false,
        };
      } else {
        return {
          done: false,
        };
      }
    },
  };
}

const myArr = ["Apples", "Grapes", "Oranges", "Bhindi"];
console.log(myArr);

//using the iterator

const fruits = fruitsIterator(myArr);
console.log(fruits.next().value);
console.log(fruits.next());
