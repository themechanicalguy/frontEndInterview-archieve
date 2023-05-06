/**
 * 1- Promise Order
 */

console.log(1);
const promise = new Promise((resolve) => {
  console.log(2);
  resolve();
  console.log(3);
});

console.log(4);

promise
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

console.log(7);

setTimeout(() => {
  console.log(8);
}, 10);

setTimeout(() => {
  console.log(9);
}, 0);

// 1
// 2
// 3
// 4
// 7
// 5
// 6
// 9
// 8

/**
 * 2- Promise Executor
 */

new Promise((resolve, reject) => {
  resolve(1);
  resolve(2);
  reject("error");
}).then(
  (value) => {
    console.log(value);
  },
  (error) => {
    console.log("error");
  }
);

// 1

/**
 * 3- Promise then callbacks
 */

Promise.resolve(1)
  .then(() => 2)
  .then(3)
  .then((value) => value * 3)
  .then(Promise.resolve(4))
  .then(console.log);

// output - 6

/**
 * 4- Promise then callbacks II
 */

Promise.resolve(1)
  .then((val) => {
    console.log(val);
    return val + 1;
  })
  .then((val) => {
    console.log(val);
  })
  .then((val) => {
    console.log(val);
    return Promise.resolve(3).then((val) => {
      console.log(val);
    });
  })
  .then((val) => {
    console.log(val);
    return Promise.reject(4);
  })
  .catch((val) => {
    console.log(val);
  })
  .finally((val) => {
    console.log(val);
    return 10;
  })
  .then((val) => {
    console.log(val);
  });

// 1
// 2
// undefined
// 3
// undefined
// 4
// undefined
// undefined

/**
 * 5-Scope
 */
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}

for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
// 5
// 5
// 5
// 5
// 5
// 0
// 1
// 2
// 3
// 4

/**
 * 5-Arrow Function
 */

const obj = {
  dev: "bfe",
  a: function () {
    return this.dev;
  },
  b() {
    return this.dev;
  },
  c: () => {
    return this.dev;
  },
  d: function () {
    return (() => {
      return this.dev;
    })();
  },
  e: function () {
    return this.b();
  },
  f: function () {
    return this.b;
  },
  g: function () {
    return this.c();
  },
  h: function () {
    return this.c;
  },
  i: function () {
    return () => {
      return this.dev;
    };
  },
};

console.log(obj.a()); //bfe
console.log(obj.b()); //bfe
console.log(obj.c()); //undefined
console.log(obj.d()); //bfe --edge case
console.log(obj.e()); //bfe
console.log(obj.f()()); //undefined --edge case
console.log(obj.g()); //undefined
console.log(obj.h()()); //undefined
console.log(obj.i()()); //bfe
// error on strict mode

/**
 * 7- Increment Operator
 */

let a = 1;
const b = ++a;
const c = a++;
console.log(a); //3
console.log(b); //2
console.log(c); //2

/**
 * 8 - Implicit Conversion - 1
 */

console.log(Boolean("false")); //true
console.log(Boolean(false)); //false
console.log("3" + 1); //31
console.log("3" - 1); //2
console.log("3" - " 02 "); //1
console.log("3" * " 02 "); //6
console.log(Number("1")); //1
console.log(Number("number")); //NaN
console.log(Number(null)); //0
console.log(Number(false)); //0

/**
 * 9 - null and undefined
 */

console.log(JSON.stringify([1, 2, null, 3])); // [1,2,null,3] - x
console.log(JSON.stringify([1, 2, undefined, 3])); // [1,2,null,3] - x
console.log(null === undefined); //false
console.log(null == undefined); //true
console.log(null == 0); //false
console.log(null < 0); //false
console.log(null > 0); //false
console.log(null <= 0); //true
console.log(null >= 0); //true - x
console.log(undefined == 0); //false - x
console.log(undefined < 0); //false
console.log(undefined > 0); //false
console.log(undefined <= 0); //false
console.log(undefined >= 0); //false

/**
 * Equal
 */

console.log(0 == false); //true
console.log("" == false); //true
console.log([] == false); //true
console.log(undefined == false); //false -x
console.log(null == false); //false -x
console.log("1" == true); //true
console.log(1n == true); //true
console.log(" 1     " == true); //true
