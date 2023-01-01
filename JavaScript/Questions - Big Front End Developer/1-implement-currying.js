function curry(func) {
  return function curried(...args) {
    // 1. if enough args, call func
    // 2. if not enough, bind thae args and wait for the new one
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return curried.bind(null, ...args);
    }
  };
}

// function sum(...args){
//   // console.log(args);
//   return args.reduce((acc,curr)=> acc+curr,0);
// }

function sum(a, b, c) {
  return a + b + c;
}

// sum(1,2,3);
let curried = curry(sum);
// let sum5and10 = curry(5,10);
// sum5and10(15)

console.log(curried(1)(2)(3));
