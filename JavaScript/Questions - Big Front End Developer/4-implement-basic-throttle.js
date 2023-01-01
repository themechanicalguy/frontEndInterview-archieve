let currentTime = 0;

const run = (input) => {
  currentTime = 0;
  const calls = [];

  const func = (arg) => {
    calls.push(`${arg}@${currentTime}`);
  };

  const throttled = throttle(func, 3);
  input.forEach((call) => {
    const [arg, time] = call.split("@");
    setTimeout(() => throttled(arg), time);
  });
  return calls;
};

expect(run(["A@0", "B@2", "C@3"])).toEqual(["A@0", "C@3"]);

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  // your code here
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();

    if (now - prev > wait) {
      prev = now;
      return func(...args);
    }
  };
}
