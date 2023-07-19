const data = [
  // "/src/form/text/text.js",
  // "/src/form/text/multiline.js",
  // "/src/form/number/number.js",
  // "/src/utils/string.js",
  // "/src/utils/date.js",
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

*/
function convertData(data) {
  const res = {};
  if (Array.isArray(data)) {
    let temp = [];
    data.forEach((item) => temp.push(item.split("/")));

    temp.forEach((item) => {
      item.forEach((ele, index, arr) => {
        if (ele !== "" && ele !== "src") {
          if (!ele.includes(".")) {
            // check if the folder exists in res object
            // if (res[ele]) {
            //   //check if it is a file or folder
            //   if (arr[index + 1].includes(".")) {

            //   }

            // }
            //last element is a file not a folder, so push it to array
            // if()
            if (arr[index + 1].includes(".")) {
              res[arr[index - 1]] = { [ele]: [arr[index + 1].split(".")[0]] };
              // res[]
            } else {
              //else create an object with folder name key
              res[ele] = {};
            }
          }
        }
      });
    });
    console.log(res);
  }
  // return 0;
}

convertData(data);
