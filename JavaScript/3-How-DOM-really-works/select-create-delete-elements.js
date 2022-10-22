///////////////////////////////////////
// Selecting, Creating, and Deleting Elements

// Selecting elements----------------------------------------------------------------------------------------------------------------------
console.log(document); // has html with doctype
console.log(document.documentElement); //Complete html structure
console.log(document.head); // head tag
console.log(document.body); // body tag

const header = document.querySelector(".header"); //returns an node
const allSections = document.querySelectorAll(".section"); //returns a nodeList, that can further looped
console.log(allSections);

document.getElementById("section--1"); // returns an node(element)
const allButtons = document.getElementsByTagName("button");// returns an html collection
/// difference btw nodelist and htmlcollection???
console.log(allButtons);

console.log(document.getElementsByClassName("btn")); // return htmlcollections

// Creating and inserting elements----------------------------------------------------------------------------------------------------------------------
const message = document.createElement("div"); // returns a dom element
message.classList.add("cookie-message");
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message);

// header.append(message);
// now message is like a person so it cannot be in two places so we will have to clone the node
// header.append(message.cloneNode(true)); // cloneNode parameter is true to clone to child node

// header.before(message);
// header.after(message);

// Delete elements----------------------------------------------------------------------------------------------------------------------
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
  // message is a reference so it removes in the dom as well
    message.remove();
  // old way to remove a child
//     message.parentElement.removeChild(message);
  });
