// The Magic of Chaining Methods
/**
 * the best feature of tranformation methods are the pipeline as below so we can chain them one after another
 */
const eurToUsd = 1.1;
console.log(movements);

// PIPELINE
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
