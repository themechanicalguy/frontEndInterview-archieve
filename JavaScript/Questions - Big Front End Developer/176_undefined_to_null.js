function undefinedToNull(arg) {
  // your code here
  if (arg === undefined || arg === null) return null;
  else if (Array.isArray(arg)) return arg.map(undefinedToNull);
  else if (typeof arg === 'object') {
    return Object.keys(arg).reduce((a, b) => {
      return { ...a, [b]: undefinedToNull(arg[b]) };
    }, {});
  } else return arg;
}
