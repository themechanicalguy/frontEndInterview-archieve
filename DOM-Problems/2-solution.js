/**
DOM children - https://javascript.info/dom-navigation
importance: 5
Look at this page:

<html>
<body>
  <div>Users:</div>
  <ul>
    <li>John</li>
    <li>Pete</li>
  </ul>
</body>
</html>
For each of the following, give at least one way of how to access them:

The <div> DOM node?
The <ul> DOM node?
The second <li> (with Pete)?
 */

document.body.firstElementChild;
// or
document.body.children[0];
// or (the first node is space, so we take 2nd)
document.body.childNodes[1];

// The <ul> DOM node:

document.body.lastElementChild;
// or
document.body.children[1];
// The second <li> (with Pete):

// get <ul>, and then get its last element child
document.body.lastElementChild.lastElementChild;

4 -
