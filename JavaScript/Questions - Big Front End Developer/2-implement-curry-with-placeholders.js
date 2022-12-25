/**
 * @param {function} func
 */

function curry(func) {
  const fnArglen = func.length;

  return function curryFn(...args) {
    // `args` contains `curry.placeholder`
    const isHasPlaceholder = args
      .slice(0, fnArglen)
      .includes(curry.placeholder);

    if (args.length >= fnArglen && !isHasPlaceholder) {
      return func(...args);
    }

    return function (...nextArgs) {
      //replace `curry.placeholder` in `args` with the value in `nextArgs`.
      //Note : The case where `nextArgs.length` is less than `args.length`.

      const processArgs = args.map((arg) =>
        arg === curry.placeholder && nextArgs.length ? nextArgs.shift() : arg
      );

      const mergedArgs = [...processArgs, ...nextArgs];

      return curryFn(...mergedArgs);
    };
  };
}
