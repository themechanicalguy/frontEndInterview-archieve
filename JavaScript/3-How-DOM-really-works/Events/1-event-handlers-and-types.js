/** https://developer.mozilla.org/en-US/docs/Web/Events

 * DEFINE: An event is a signal that something has happened. 
 * All DOM nodes generate such signals (but events are not limited to DOM).
 * Here’s a list of the most useful DOM events, just to take a look at:

Mouse events:
    click – when the mouse clicks on an element (touchscreen devices generate it on a tap).
    contextmenu – when the mouse right-clicks on an element.
    mouseover / mouseout – when the mouse cursor comes over / leaves an element.
    mousedown / mouseup – when the mouse button is pressed / released over an element.
    mousemove – when the mouse is moved.

Keyboard events:

    keydown and keyup – when a keyboard key is pressed and released.

Form element events:

    submit – when the visitor submits a <form>.
    focus – when the visitor focuses on an element, e.g. on an <input>.

Document events:

    DOMContentLoaded – when the HTML is loaded and processed, DOM is fully built.

CSS events:

    transitionend – when a CSS-animation finishes.

There are many other events. We’ll get into more details of particular events in next chapters.
 */

/**
 * DEFINE: Event handlers: To react on events we can assign a handler – a function that runs in case of an event.
 * Handlers are a way to run JavaScript code in case of user actions.
 */
// There are several ways to assign a handler. Let’s see them, starting from the simplest one :

//1: HTML Attribute: -----
//EXAMPLE
function countRabbits() {
  for (let i = 1; i <= 3; i++) {
    alert("Rabbit number " + i);
  }
}
//<input type="button" onclick="countRabbits()" value="Count rabbits!"></input>;

// 2: DOM Property:------
// Only HTML
//<input type="button" onclick="alert('Click!')" value="Button"></input>
// HTML + JS
//<input type="button" id="button" value="Button">
button.onclick = function () {
  alert("Click!");
};

// Main Problem with the above way of using Event Handler: IMP
// As there’s only one onclick property, we can’t assign more than one event handler.

// Accessing the element using this. IMP
// The value of this inside a handler is the element. The one which has the handler on it.
<button onclick="alert(this.innerHTML)">Click me</button>;

// IMP
/**
 * Possible mistakes
 * We can set an existing function as a handler:
 */
function sayThanks() {
  alert("Thanks!");
}

elem.onclick = sayThanks;

// But be careful: the function should be assigned as sayThanks, not sayThanks().

// right
button.onclick = sayThanks;

// wrong
button.onclick = sayThanks();

// If we add parentheses, then sayThanks() becomes a function call.
// So the last line actually takes the result of the function execution,
// that is undefined (as the function returns nothing), and assigns it to onclick. That doesn’t work.

// …On the other hand, in the markup we do need the parentheses: IMP

//<input type="button" id="button" onclick="sayThanks()"></input>

// The difference is easy to explain.
// When the browser reads the attribute, it creates a handler function with body from the attribute content.
// So the markup generates this property:

button.onclick = function () {
  sayThanks(); // <-- the attribute content goes here
};

/**
 * addEventListener: Developers of web standards understood that long ago and suggested an alternative way of 
    managing handlers using special methods addEventListener and removeEventListener. They are free of such a problem.
 * SYNTAX: The syntax to add a handler:

element.addEventListener(event, handler, [options]);

event
    Event name, e.g. "click".
handler
    The handler function.
options
    An additional optional object with properties:

        once: if true, then the listener is automatically removed after it triggers.
        capture: the phase where to handle the event, to be covered later in the chapter Bubbling and capturing. For historical reasons, options can also be false/true, that’s the same as {capture: false/true}.
        passive: if true, then the handler will not call preventDefault(), we’ll explain that later in Browser default actions.

       
// REMOVE EVENT LISTENERS
To remove the handler, use removeEventListener:
SYNTAX: element.removeEventListener(event, handler, [options]);

 * Removal requires the same function
 * To remove a handler we should pass exactly the same function as was assigned.
 */
function handler() {
  alert("Thanks!");
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
// IMP
// Please note – if we don’t store the function in a variable, then we can’t remove it.
// There’s no way to “read back” handlers assigned by addEventListener.

// Multiple Event Handlers:
// Multiple calls to addEventListener allow to add multiple handlers, like this:
<input id="elem" type="button" value="Click me" />;

function handler1() {
  alert("Thanks!");
}

function handler2() {
  alert("Thanks again!");
}

elem.onclick = () => alert("Hello");
elem.addEventListener("click", handler1); // Thanks!
elem.addEventListener("click", handler2); // Thanks again!

/*
 * As we can see in the example above, we can set handlers both using a DOM-property and addEventListener.
 * But generally we use only one of these ways.
 * For some events, handlers only work with addEventListener
 * There exist events that can’t be assigned via a DOM-property. Only with addEventListener.
 * For instance, the DOMContentLoaded event, that triggers when the document is loaded and DOM is built.
 */
// will never run
document.onDOMContentLoaded = function () {
  alert("DOM built");
};

// this way it works
document.addEventListener("DOMContentLoaded", function () {
  alert("DOM built");
});

// So addEventListener is more universal. Although, such events are an exception rather than the rule.

// Types of Events and Event Handlers --JONAS
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :D");
};

h1.addEventListener("mouseenter", alertH1);

// removing event listeners
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

/**
 * SUMMARY:

 * There are 3 ways to assign event handlers:

    HTML attribute: onclick="...".
    DOM property: elem.onclick = function.
    Methods: elem.addEventListener(event, handler[, phase]) to add, removeEventListener to remove.

 * HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little 
    bit odd and alien. Also can’t write lots of code in there.

 * DOM properties are ok to use, but we can’t assign more than one handler of the particular event. 
    In many cases that limitation is not pressing.

 * The last way is the most flexible, but it is also the longest to write. 
    There are few events that only work with it, for instance transitionend and DOMContentLoaded (to be covered).  IMP
 * Also addEventListener supports objects as event handlers. In that case the method handleEvent is called in case of the event.
 * No matter how you assign the handler – it gets an event object as the first argument. 
    That object contains the details about what’s happened.
 */
