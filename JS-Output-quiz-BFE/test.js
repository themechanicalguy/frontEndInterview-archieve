/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (str1, str2) {
  if (str2.length > str1.length) return -1;
  let i = 0;
  let j = 0;
  while (j < str1.length) {
    if (str1[j] === str2[i]) {
      console.log("str1[j], str2[i]", str1[j], str2[i]);
      i++;
      j++;
      if (i === str2.length) return j - i + 1;
    } else {
      if (i !== 0) i = 0;
      // j--;
      j++;
    }
    // j++;
  }
  console.log(j);
  return -1;
};

console.log(strStr("mississippi", "issip"));
