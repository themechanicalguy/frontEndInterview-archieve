# DOM Interview Questions

## 1. What is the difference between Window and Document?

**Document Object**:

- The document object represent a web page that is loaded in the browser.
- By accessing the document object, we can access the element in the HTML page.
- With the help of document objects, we can add dynamic content to our web page.
- The document object can be accessed with a window.document or just document.

**Window Object**:

- The window object is the topmost object of the DOM hierarchy. It represents a browser window or frame that displays the contents of the webpage. Whenever a window appears on the screen to display the contents of the document, the window object is created.

## 2. Difference between window.onload and document.onload?

- `window.onload`: Waits for ALL content (images, CSS, scripts) to load before executing
- `document.onload`: Fires before loading of images and other external content

## 3. Ways to get an element from DOM (fastest methods)

### Methods:

1. `getElementById()` - This method allows you to retrieve an element from the DOM using the element’s ID. If no element exists in the DOM with the supplied ID, null will be returned instead.
2. `querySelector()` - This method allows you to retrieve an element from the DOM using a CSS selector. It returns the first element that matches the selector.
3. `getElementsByClassName()` - This method allows you to retrieve an array of elements from the DOM using a class name.
4. `getElementsByTagName()` - This method allows you to retrieve an array of elements from the DOM using a tag name.
5. `querySelectorAll()` - This method allows you to retrieve an array of elements from the DOM using a CSS selector.

### Performance:

- Fastest for ID: `getElementById()`
- Fastest for CSS selectors: `querySelector()`
- Best choice depends on use case:
  - Single element: `getElementById()`
  - Flexible selection: `querySelector()`

## 4. Why is querySelectorAll() slower?

- Traverses entire DOM tree to find matches
- `getElementByClassName`/`getElementById` are optimized for specific lookups

## 5. How could you verify one element is child of another ?

Use `contains()` method:
The contains() method returns a Boolean value indicating whether a node is a descendant of a given node or not. It takes one argument, which is the node you want to check.

```javascript
const parent = document.getElementById("parent");
const child = document.getElementById("child");

if (parent.contains(child)) {
  console.log("Child is descendant");
}
```

## 6. Event Bubbling vs Capturing

- The **bubbling** principle is simple.
  When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.
- There’s another phase of event processing called `capturing`. It is rarely used in real code, but sometimes can be useful.

The standard DOM Events describes 3 phases of event propagation:

1. **Capturing phase** - the event goes down to the element.
2. **Target phase** - the event reached the target element.
3. **Bubbling phase** - the event bubbles up from the element.

```html
<!DOCTYPE html>
<body>
  <style>
    body * {
      margin: 10px;
      border: 1px solid blue;
    }
  </style>

  <form>
    FORM
    <div>
      DIV
      <p>P</p>
    </div>
  </form>

  <script>
    const divTag = document.querySelector("div");
    for (let elem of document.querySelectorAll("*")) {
      elem.addEventListener(
        "click",
        (e) => alert(`Capturing: ${elem.tagName}`),
        true
      );
      elem.addEventListener(
        "click",
        (e) => {
          alert(`Bubbling: ${elem.tagName}`);
          if (elem.tagName === "DIV") {
            e.stopPropagation();
          }
        },
        false
      );
    }
  </script>
</body>
```

### 6.1 event.target vs event.currentTarget

- `event.target`: The most deeply nested element that caused the event is called a target element, accessible as event.target
- `event.currentTarget`: the current element that handles the event (the one that has the handler on it)

### 6.2 Run handlers in capturing phase

```javascript
elem.addEventListener(..., {capture: true});
// or
elem.addEventListener(..., true);
```

### 6.3 Prevent multiple handlers

Use `stopImmediatePropagation()`

### 6.4 Cancelable Event

- A cancelable event is an event that can be canceled, and therefore prevented as if the event never happened.
- If an event is cancelable, then its cancelable property will be true and the event listener can stop the event from occurring by calling the `preventDefault()` method.
- one can say that `stopImmediatePropagation` and `stopPropagation` is also cancelable event

Event that can be prevented using `preventDefault()`

### 6.5 Method Comparison - preventDefault() vs stoppropagation vs stopImmediatePropagation

- `preventDefault()`: used to cancel the event if it is cancelable, without stopping further propagation of the event. For example, if you have a form with a submit button, calling preventDefault() will prevent the form from being submitted.
- `stopPropagation()`: prevent further propagation of the current event. This means that any parent elements that have event listeners attached will not receive the event.
- `stopImmediatePropagation()`: similar to stopPropagation(), but it also prevents other listeners of the same event from being called. This means that if there are multiple event listeners attached to an element for the same event type, calling stopImmediatePropagation() will prevent any remaining listeners from being called.

## 7. window.getComputedStyle()

- `window.getComputedStyle()` is a method that returns an object containing the values of all CSS properties of an element, after applying active stylesheets and resolving any basic computation those values may contain.
- Individual CSS property values are accessed through APIs provided by the object, or by indexing with CSS property names.

Returns computed CSS properties for an element:

```javascript
const element = document.getElementById("myElement");

const styles = window.getComputedStyle(element);

console.log(styles.color);
console.log(styles.fontSize);
```

## 8. Find all images (including background)

```javascript
// Regular images
const allImages = document.getElementsByTagName("img");
for (let i = 0; i < allImages.length; i++) {
  console.log(allImages[i].src);
}

// Background images
const allElements = document.getElementsByTagName("*");
for (let elem of allElements) {
  const bgImage = getComputedStyle(elem).backgroundImage;
  if (bgImage !== "none") console.log(bgImage);
}
```

- In this example, we first get all `<img>` elements using `document.getElementsByTagName()`. We then loop through each element and log its src attribute to the console.
- Next, we get all elements using `document.getElementsByTagName(‘*’)`. We then loop through each element and use `window.getComputedStyle()` to get its computed styles. We then use `getPropertyValue()` to get the value of the `background-image` property. If this value is not `none`, we log it to the console.

## 9. Event Delegation

- `Event delegation` is a technique in JavaScript that allows you to attach a single event listener to a parent element, instead of attaching an event listener to each child element.
- When an event occurs on a child element, the event is propagated (or “bubbles up”) to the parent element. The parent element can then handle the event using a single event listener.
- This technique can be useful when you have many child elements that need to share the same event handling logic. By using event delegation, you can avoid attaching an event listener to each child element.

Attach single listener to parent instead of multiple child listeners:

```javascript
document.querySelector("#parent").addEventListener("click", function (event) {
  // Check if the clicked element is a child of the parent
  if (event.target.closest(".child")) {
    // Handle the click event for child elements
    console.log("Child element clicked");
  }
});
```

- In this example, we attach a single click event listener to the parent element using `addEventListener()`.
- When a click event occurs on any child element of the parent, the event bubbles up to the parent element.
- We then use `event.target.closest()` to check if the clicked element is a child of the parent. If it is, we handle the click event for child elements.

## 10. Lazy Loading

- Lazy loading is a technique for waiting to load certain parts of a webpage — especially images — until they are needed.
- Instead of loading everything all at once, known as “eager” loading, the browser does not request certain resources until the user interacts in such a way that the resources are needed.
- This technique can help reduce page load times by shortening the length of the critical rendering path2. Lazy loading can occur on different moments in the application, but it typically happens on some user interactions such as scrolling and navigation2.

Delays loading non-critical resources until needed:

```html
<img src="placeholder.jpg" data-src="real-image.jpg" class="lazy" />
```

- In this example, we use a placeholder image (placeholder.jpg) as the initial image source.
- We then use the data-src attribute to specify the actual image source (image.jpg). Finally, we add a class of “lazy” to indicate that this image should be lazy loaded.

To implement lazy loading, you can use a JavaScript library such as lazysizes3 or you can write your own JavaScript code.

## 11. Intersection Observer API

- The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document’s viewport1.
- The ancestor element or viewport is referred to as the root2.
- The Intersection Observer API lets code register a callback function that is executed whenever an element they wish to monitor enters or exits another element (or the viewport), or when the amount by which the two intersect changes by a requested amount1.

Asynchronously observes element visibility changes:

```javascript
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

const observer = new IntersectionObserver(callback, options);

observer.observe(target);
```

- In this example, we create an IntersectionObserver object with a callback function and options. We then call the observe method on our observer object and pass in our target element.

## 12. Mutation Observer

- Mutation Observer is a powerful JavaScript API that detects changes to DOM tree elements, such as added/removed components, changed attributes, altered text content, and changed styles1. A practical use is to detect and customize content set by external scripts1.
- MutationObserver is a built-in object that observes a DOM element and fires a callback when it detects a change2. We can create an observer with a callback-function like this:

Detects DOM changes (elements, attributes, content):

```javascript
const targetNode = document.getElementById("some-id");

const config = { attributes: true, childList: true, subtree: true };

const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      console.log("The " + mutation.attributeName + " attribute was modified.");
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
```

- In this example, we create an observer with a callback function and options. We then call the observe method on our observer object and pass in our target element.

## 13. Adding Scripts to Document

Methods:

1. Inline `<script>`
2. External `<script src>`
3. Dynamic injection with JavaScript

## 14. async vs defer Attributes

- **async**: Downloads script asynchronously and executes immediately when ready
- **defer**: Downloads async but waits until document is parsed before executing

---
