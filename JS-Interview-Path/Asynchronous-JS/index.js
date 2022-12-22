/**
 * Write a callback funcrion to load a script asynchronously
 */

function loadScript(src) {
  let script = document.createElement("script");
  script.src = src;

  document.head.append(script);
}

loadScript("/my/script.js");

// Pass a callbacl function to the loadScript function
function loadScript(src, cb) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => cb(script);

  document.head.append("script");
}
