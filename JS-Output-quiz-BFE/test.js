// Given a sorted array, find the no. of pairs which have a sum of K
// I = [1,4,4,5,5,5,6,6,11], K=11
// O = 6

//Solve this problem before interview to remember the case of implementation

// Naive Approach: O(n2)
function naivePairSum(arr, sum) {
  let count = 0;
  // Consider all possible pairs and check their sums
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length - 1; j++)
      if (arr[i] + arr[j] == sum) count++;

  return count;
}

console.log(getPairsSum([1, 4, 4, 5, 5, 5, 6, 6, 11], 11));

function getPairsSum(arr, sum) {
  const freqMap = new Map();
  //Store count of all elements in map m
  for (const element of arr) {
    if (freqMap.has(element)) {
      freqMap.set(element, freqMap.get(element) + 1);
    } else {
      freqMap.set(element, 1);
    }
  }
  console.log(freqMap);

  let countTwice = 0;
  //iterate through each element and increment the count(Notice that every pair is counted twice)
  for (const element of arr) {
    if (freqMap.has(sum - element)) countTwice += freqMap.get(sum - element);
    // if(arr[i], arr[i]) pair satisfies the condition, then we need to ensure that the count is decreased by one such that the
    // (arr[i],arr[i]) pair is not considered
    if (sum - element === element) countTwice--;
  }
  return countTwice / 2;
}
