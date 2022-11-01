/**
 * Transpiling :- union of two operation it performs Transformation + Compiling
 * With every JS updates, new syntax are introduced which are not possible to polyfill, as
    it would throw syntax error in old JS engines. So transpiller is used.
 * we can define a “Transpiler” to be a tool that transforms code with newer syntax into 
    older code equivalents and this process is called “Transpiling”.

 * By development practice, while using Transpiling it is essential to write the code 
    maintaining the newer syntax but while deploying the project use a transpiler similar
     to a minifier or a linter to deploy the transpiled old syntax friendly program. 
     That raises the question why should we even bother writing in the newer syntaxial 
     form while still deploying the older one? This is a very logical question to ask 
     and has a lot of good points to give as answers out of which few are given below.

 * It goes without saying that the newer syntax was added to the language to make the code more 
    readable and easily maintainable.
    i.e. the newer versions are simply better than The older equivalents. 

 * Thus it is recommended to write newer and cleaner syntax to achieve a better result.
 * Transpiling only for older browsers, while serving the newer syntax to the updated browsers, 
    we can get the advantage of browser performance optimizations.

  Examples of trnaspiller are: Babel, traceur
 */

// EXAMPLE:
// Function Defining is now this easy.
var myFunc = () => {
  console.log("This is a function.");
};
myFunc(); // This is a function.

//transpilled form
var myFunc = function () {
  console.log("This is a function.");
};

myFunc();
