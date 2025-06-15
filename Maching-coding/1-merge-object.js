//Write a function that merges multiple objects into one object.
// The function should take an arbitrary number of objects as arguments
// and return a new object that contains all the properties of the input objects.
// If there are any duplicate properties, the value from the last object should be used.

function deepMerge(...objects) {
  return objects.reduce((acc, obj) => {
    for (const key in obj) {
      if (
        obj[key] &&
        typeof obj[key] === "object" &&
        !Array.isArray(obj[key])
      ) {
        acc[key] = deepMerge(acc[key] || {}, obj[key]);
      } else {
        acc[key] = obj[key];
      }
    }
    return acc;
  }, {});
}
