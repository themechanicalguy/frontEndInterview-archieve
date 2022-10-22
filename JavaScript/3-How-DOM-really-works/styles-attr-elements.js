///////////////////////////////////////
// Styles, Attributes and Classes
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Styles----------------------------------------------------------------------------------------------------------------------------------------------------------
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color); // The Window.getComputedStyle() method returns an object containing the values of all CSS properties of an element,
//getComputedStyle returns a CSSStyleDeclaration Object.
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px"; //Used parseFloat as getComputedStyle gives string

document.documentElement.style.setProperty("--color-primary", "orangered"); // It is a property in root

// Attributes----------------------------------------------------------------------------------------------------------------------------------------------------------
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist"); // Adds a new attribute to the element('logo')

console.log(logo.src);
console.log(logo.getAttribute("src"));

// Accessing links attributes----------------------------------------------------------------------------------------------------------------------------------------------------------
const link = document.querySelector(".nav__link--btn");
console.log(link.href); // actual url
console.log(link.getAttribute("href")); // relative url

// Data attributes----------------------------------------------------------------------------------------------------------------------------------------------------------
console.log(logo.dataset.versionNumber); // for accessing data attribute in element we use camelcasing

// Classes-------------------------------------------------------------------------------------------------------------------------------------------------------------------
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c"); // not includes

// Don't use as it overrides all the class that already exist and put one class
logo.className = "jonas";
