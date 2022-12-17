/**
 * Polyfilling is an invented term by Remy Sharp. 
 * It is one of the methodologies that can be used as a sort of backward compatibility measurement. 
 * A polyfill or polyfiller is a code segment that is supposed to behave identically to a 
    newer feature of JavaScript and still being able to run on older versions. 

For example, ES2015 provides a new utility Number.isNaN(…) to provide a secure and 
accurate method to check for NaN or Not a Number values. 
We can use polyfilling to replicate this behavior and use it on those pre-ES2015 browsers. 

The following snippet will be helpful in our case.
*/

// Check if Number.isNaN already exists.
// If False then proceed.
if (!Number.isNaN) {
  // Define explicitly for older browsers.
  Number.isNaN = function isNaN(x) {
    // This is a property of NaN.
    // No two NaN can be equal to the other.
    // Because NaN is a concept not a comparable value.
    return x !== x;
  };
}
/*
We first check if the method is already available and prevent defining the explicit version. 
If not present then we are definitely on an older version of JavaScript so we explicitly define one
using the property of NaNs that no two NaN is equal to each - other because NaN is a concept, not 
a comparable value to be equal to the other.
Thus, we return True if they are not equals and otherwise
we return False.This can be considered as one of the easiest polyfills.

Note: All the new features are not polyfillable or it is not possible always to create polyfills 
without any deviation thus while implementing polyfills explicitly it is recommended to have a knowledge 
of the working on whole.But, many developers prefer using the polyfills that are already available.
*/
