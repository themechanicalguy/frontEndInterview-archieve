// FUNCTIONS ACCEPTING OTHER FUNCTIONS
/**
 * 'oneWord' and 'upperFirstWord' provide low level of abstraction JONAS 006 of chapter 10
 * The function 'transformer' provide a higher level of abstraction that means some of it functions are delegated to other function.
 */
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transfomed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('✋');
};

document.body.addEventListener('click', high5);
['martha', 'jonas', 'Adam'].forEach(high5);

/**
 * ADVANTAGES OF CALLBACK FUNCTIONS
 * helps in abstraction
 */
