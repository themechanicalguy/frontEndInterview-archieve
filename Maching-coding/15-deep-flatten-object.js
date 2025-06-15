function deepFlatten(obj, prefix = "") {
  let res = {};
  //loop over objec check if its item is object
  for (let item in obj) {
    let val = obj[item];
    let newKey = prefix === "" ? item : prefix + "." + item;
    if (val !== null && typeof obj[item] === "object") {
      let recurssiveRes = deepFlatten(val, newKey);
      res = { ...res, ...recurssiveRes };
    } else {
      res[newKey] = val;
    }
  }
  return res;
}

const obj = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

console.log(deepFlatten(obj));
