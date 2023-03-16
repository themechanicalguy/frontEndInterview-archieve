// DEFINE: The optional chaining ?. is a safe way to access nested object properties,
// even if an intermediate property doesn’t exist.

/**
 * IMP: The “non-existing property” problem
EXAMPLE:
 * As an example, let’s say we have user objects that hold the information about our users.
 * Most of our users have addresses in user.address property, with the street user.address.street, 
    but some did not provide them.
 * In such case, when we attempt to get user.address.street, and the user happens to be without an address, we get an error:
*/
// EXAMPLE:
let user = {}; // a user without "address" property
alert(user.address.street); // Error!

// EXAMPLE:
// document.querySelector('.elem') is null if there's no element
let html = document.querySelector(".elem").innerHTML; // error if it's null
// to avoid error previously this pattern was used
let user = {};
alert(user.address ? user.address.street : undefined);

// DEFINE: The optional chaining ?. stops the evaluation if the value before ?. is undefined or null and returns undefined.
// Here’s the safe way to access user.address.street using ?.:
// EXAMPLE:
let user = {}; // user has no address
alert(user?.address?.street); // undefined (no error)
//The code is short and clean, there’s no duplication at all.

// IMP: Don’t overuse the optional chaining

// QUEST: We should use ?. only where it’s ok that something doesn’t exist ?
// For example, if according to our code logic user object must exist,
//  but address is optional, then we should write user.address?.street, but not user?.address?.street.
// Then, if user happens to be undefined, we’ll see a programming error about it and fix it.
//  Otherwise, if we overuse ?., coding errors can be silenced where not appropriate, and become more difficult to debug.
// The variable before ?. must be declared

/**
 * Short-circuiting
 */
// As it was said before, the ?. immediately stops (“short-circuits”) the evaluation if the left part doesn’t exist.
// So, if there are any further function calls or operations to the right of ?., they won’t be made.

// EXAMPLE:
let user = null;
let x = 0;
user?.sayHi(x++); // no "user", so the execution doesn't reach sayHi call and x++
alert(x); // 0, value not incremented

/**
 * Summary
The optional chaining ?. syntax has three forms:

    obj?.prop – returns obj.prop if obj exists, otherwise undefined.
    obj?.[prop] – returns obj[prop] if obj exists, otherwise undefined.
    obj.method?.() – calls obj.method() if obj.method exists, otherwise returns undefined.

As we can see, all of them are straightforward and simple to use. 
The ?. checks the left part for null/undefined and allows the evaluation to proceed if it’s not so.

A chain of ?. allows to safely access nested properties.

Still, we should apply ?. carefully, only where it’s acceptable, according to our code logic,
 that the left part doesn’t exist. So that it won’t hide programming errors from us, if they occur.
 */
