/** PRIMITIVE
 * Some Assumptions are followed like address
 * Identifier: age, Address:0001, value: 30 //line 1
 * Identifier: oldAge, // points to the above address //line 1
 * age =31; //sets to a new Address say, address:0002, value: 31
 */
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

/** OBJECT(REFERENCE TYPE)-stored in heap
 * Some Assumptions are followed like address, Here
 * me will point to a address just like PRIMITIVE but the value will be a address of a object in heap
 * so whenever we want to change a value in a object that was pointed by other variables as well it will be reflected in all the places as the value is in heap though the pointed address is not changed
 */
const me = {
  name: 'Jonas',
  age: 30,
};

const friend = me;
friend.age = 27;
/** Both will be same */
console.log('Friend', friend);
// {name:'Jonas', age: 27}
console.log('Me', me);
// {name:'Jonas', age: 27}
