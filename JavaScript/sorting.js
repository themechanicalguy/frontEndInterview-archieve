// let arr = [13, 5, 3, 17, 18];
// let res = bubbleSort(arr, arr.length);
// console.log(res);

// const data = ['t','A','a','B','b'];
// data.sort((a,b)=> a.localeCompare(b));
// console.log(data);

//sorting String

const data = [
  { name: "Tomato", cost: 10, weight: 5 },
  { name: "Carrot", cost: 15, weight: 2 },
  { name: "Onion", cost: 5, weight: 7 },
];

function getSortValue(vege) {
  return vege.cost;
}

// data.sort((a,b)=>{
//   const valA = getSortValue(a);
//   const valB = getSortValue(b);

//   if(typeof valA === 'string'){
//     return valA.localeCompare(valB);
//   }else{
//     return valA-valB;
//   }
// })

//sorting in reverse order

const sortOrder = "asc";

data.sort((a, b) => {
  const valA = getSortValue(a);
  const valB = getSortValue(b);

  const reverseOrder = sortOrder === "asc" ? 1 : -1;

  if (typeof valA === "string") {
    return valA.localeCompare(valB) * reverseOrder;
  } else {
    return (valA - valB) * reverseOrder;
  }
});
