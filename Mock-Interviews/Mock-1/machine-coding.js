const data = [
  "/src/form/text/text.js",
  "/src/form/text/multiline.js",
  "/src/form/number/number.js",
  "/src/utils/string.js",
  "/src/utils/date.js",
  "/src/general.js",
];

/* Convert the (above) data to the below JSON format,
   where each key is a folder (discarding "src") and the value
 * is an array of files in the folder (without extension).
 * 👀 The keys & array values should be sorted.

{
  "form": {
    "number": ["number"],
    "text": ["text", "multiline"]

  },
  "general": ["general"]
  "utils": ["date", "string"]
}

1- delete src from the splitted string -done
2- loop over the result array and check if element has (.), if it has dot it is a file
3- check for it parent folder, by going 1 index backward
4- if items length is more than 1 then create object else create array
5- if you find a finle with (.) find its parent and push it over there.
6- Already existing case
  1- check in the res obj, if parent folder key exist, if index is [0] it is root parent
  2- if parent exist go inside that again check if child parent exist or not, if exist push file 
      name over there
7- return result



*/
function sanitizeData(data) {
  const res = {};
  const temp = data.map((item) => item.split("/"));
  temp.forEach((arr) => {
    arr.forEach((item, index, arr) =>
      item === "src" ? arr.splice(index, 1) : arr
    );
    arr.splice(0, 1);
  });
  //check for parent folder and create key value pair
  temp.forEach((item, index, array) => {
    item.map((ele, i, arr) => {
      //this condition works only for root folder
      if (i === 0) {
        if (!res[ele]) {
          if (arr.length > 2) {
            res[ele] = {};
          } else if (arr.length === 1) {
            res[ele.split(".")[0]] = [ele.split(".")[0]];
          } else {
            res[ele] = [];
          }
        }
      }

      if (i > 0) {
        if (res[arr[0]] && !ele.includes(".")) {
          res[arr[0]] = { ...res[arr[0]], [ele]: [] };
        }
      }
    });
  });
  temp.forEach((item, index, array) => {
    item.map((ele, i, arr) => {
      if (ele.includes(".") && i > 0) {
        const parent = arr[i - 1];
        const [splitted] = ele.split(".");

        if (res[arr[0]][parent]) {
          res[arr[0]][parent].push(splitted);
          res[arr[0]][parent].sort();
        } else if (res[arr[i - 1]]) {
          res[arr[i - 1]].push(splitted);
          res[arr[i - 1]].sort();
        }
      }
    });
  });
  // sorting
  Object.keys(res)
    .sort()
    .forEach(function (v, i) {
      console.log(v, data[v]);
    });
  return res;
}

console.log(sanitizeData(data));
