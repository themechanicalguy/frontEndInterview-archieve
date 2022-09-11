/*
 * DEFINE: Capturing and bubbling allow us to implement one of the most powerful event handling patterns called event delegation.
 * The idea is that if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them 
    – we put a single handler on their common ancestor.

In the handler we get event.target to see where the event actually happened and handle it.

Summary

Event delegation is really cool! It’s one of the most helpful patterns for DOM events.

It’s often used to add the same handling for many similar elements, but not only for that.

The algorithm:

    Put a single handler on the container.
    In the handler – check the source element event.target.
    If the event happened inside an element that interests us, then handle the event.

Benefits:

    Simplifies initialization and saves memory: no need to add many handlers.
    Less code: when adding or removing elements, no need to add/remove handlers.
    DOM modifications: we can mass add/remove elements with innerHTML and the like.

The delegation has its limitations of course:

    First, the event must be bubbling. Some events do not bubble. Also, low-level handlers should not use event.stopPropagation().
    Second, the delegation may add CPU load, because the container-level handler reacts on events in any place of the container,
     no matter whether they interest us or not. But usually the load is negligible, so we don’t take it into account.

 */

///////////////////////////////////////
// For code reference refer to Bankist UI - index.html

// Page navigation
// Without using event delegation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Using Event Delegation

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // Matching strategy : this is the tricky part
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// QUEST: Solve Tasks from JavaScript.info
