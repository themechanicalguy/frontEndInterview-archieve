/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  let sum = 0;
  const splitted = [...s];
  // console.log(splitted[0]);
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  for (let index = 0; index < splitted.length; index++) {
    const current = roman[splitted[index]];
    const next = roman[splitted[index + 1]];
    if (next > current) {
      let tempSum = next - current;
      sum += tempSum;
      index++;
    } else {
      sum += current;
    }
  }

  return sum;
};

console.log(romanToInt("III")); //3
console.log(romanToInt("LVIII")); //58
console.log(romanToInt("MCMXCIV")); //1994
