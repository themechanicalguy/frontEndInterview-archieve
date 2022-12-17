// FUNCTION RETURNING CALLBACK FUNCTION
/** THIS IS A CLOSURE YOU CAN SEE IN UPCOMING TOPICS */
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

/** 'This kind of returning function will be very usefull in functional Paradigm' */
// WE CAN also do this
greet('Hello')('Zesova');

/** Same greet function with Arrow Syntax LOOK how simple it is */
const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`);
greetArrow('Hello')('Zesova');
