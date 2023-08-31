const arr = [1, 2, 3, 4, 5];
// const res = arr.reduce((acc, item) => acc * item, 1);
// console.log(res);

// Array.prototype.customReducer = function (...args) {
//   const [callback, intialValue] = args;

//   for(let i=intialValue ?  )

// };
let chain = arr.map((item) => item * 2).filter((item) => item > 4);
console.log(chain);

{
  let i = 10;
}

const k = function x() {
  let i = 0;
  return function () {
    return i++;
  };
};

// let i = k();
// console.log(i());
// console.log(i());

//

const memoize = (fn) => {
  const cache = {};
  return function (...args) {
    //check if the result is n cache
    //if
    // if(cache[])
    // res = fn(...args);
    // cache[res] = res;
  };
};
