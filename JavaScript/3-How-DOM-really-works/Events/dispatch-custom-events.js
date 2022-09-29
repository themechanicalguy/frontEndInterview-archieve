/** Dispatching custom events
 * We can not only assign handlers, but also generate events from JavaScript.
 * Custom events can be used to create “graphical components”. For instance, a root element of our own 
    JS-based menu may trigger events telling what happens with the menu: open (menu open), 
    select (an item is selected) and so on. Another code may listen for the events and observe what’s happening with the menu.
 * We can generate not only completely new events, that we invent for our own purposes, but also built-in ones, 
    such as click, mousedown etc. That may be helpful for automated testing.
 */

/**Event constructor:
 * Built-in event classes form a hierarchy, similar to DOM element classes. The root is the built-in Event class.
 * We can create Event objects like this:
 */
    let event = new Event(type[, options]);
/*
Arguments:
    type – event type, a string like "click" or our own like "my-event".
    options – the object with two optional properties:
        bubbles: true/false – if true, then the event bubbles.
        cancelable: true/false – if true, then the “default action” may be prevented. Later we’ll see what it means for custom events.

    By default both are false: {bubbles: false, cancelable: false}.

 */
