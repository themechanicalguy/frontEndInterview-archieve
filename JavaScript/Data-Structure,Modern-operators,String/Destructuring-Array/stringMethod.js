const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'.length);
console.log(airline.length);
console.log('B737'.length);
console.log(airline.indexOf('r')); // 6 (gives first occurance)
console.log(airline.lastIndexOf('r')); // 10 (gives final occurance)
console.log(airline.indexOf('Portugal')); // 8 (case sensitive)

console.log(airline.slice(4)); // 'Air Portugal' (Not mutated) always return new string
console.log(airline.slice(4, 7)); //'Air' length will be (7-4)

console.log(airline.slice(0, airline.indexOf(' '))); // to get the first word
console.log(airline.slice(airline.lastIndexOf(' '))); // to get the last word of a sentence

console.log(airline.slice(-2)); // 'al' starts from the last val
console.log(airline.slice(1, -1)); // from first val to the n-1 val

const checkMiddleSeat = function (seat) {
  // B and E are teh middle seats;
  const s = seat.slice(-1);
  if (s == 'B' || s === 'E') console.log('You got the middle seat');
  else console.log('You got lucky');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');
/**
HOW METHOD WORK ON A PRIMITIVE DATA TYPE???
JavaScript will automatically convert string primitive to string object, On this object only these methods are called. 
js takes our string and put inside a box i.e, object
This conversion is called 'boxing'.
*/

/** This conversion is automatically called by js behind the scenes and doing any operation will convert them to primitive type again */
console.log(new String('jonas')); // this is a object

// STRING METHODS 2
console.log(airline.toUpperCase());
console.log(airline.toLowerCase());

// Fix capitalization in name
const passenget = 'jOnAS'; //Jonas should be the out put

const passengerLower = passenget.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

//comparing emails
const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.Io \n';
function compareEmail(email, loginEmail) {
  // const lowerEmail = loginEmail.toLowerCase();
  // const trimmedEmail = lowerEmail.trim(); // removes trailing and leading spaces
  // console.log(trimmedEmail);

  const normalizedEmail = loginEmail.toLowerCase().trim();
  console.log(normalizedEmail);
  console.log(email === normalizedEmail);
}
compareEmail(email, loginEmail);

// replacing
const priceGB = '288,97E';
const priceUS = priceGB.replace('E', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate')); //replace only the first position
console.log(announcement.replaceAll('door', 'gate')); // replace all the occurance. lately introduces

console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const newPlane = 'Airbus A320neo';
console.log(newPlane.includes('A320')); //true
console.log(newPlane.includes('Boeing')); // false
console.log(newPlane.startsWith('Air')); //true

if (newPlane.startsWith('Airbus') && newPlane.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some food and a pocket knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

//SPLIT AND JOIN
console.log('a+very+nice+string'.split('+')); //splits the string with the provides argument and returns an array
console.log('Jonas Schmedtmann'.split(' '));
const [firstName, lastName] = 'Jonas Schmetmann'.split(' ');

const newName = ['Mr', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica and smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30, '+')); //adds the '+' to the starting of the string until the length of the total string is '25'
console.log('Jonas'.padStart('+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  // const str = String(number);
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(98387198));
console.log(maskCreditCard('33137843798828374'));

//Repeat
const message2 = 'Bad weather.. All Departures Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};

planesInLine(5);
planesInLine(4);
planesInLine(10);
