// Lifecycle DOM Events

// 1- DOMContentLoaded : The DOMContentLoaded event fires when the HTML document has been completely parsed, and 
// all deferred scripts (<script defer src="…"> and <script type="module">) have downloaded and executed. 
// It doesn't wait for other things like images, subframes, and async scripts to finish loading.
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// load event : The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images. 
// This is in contrast to DOMContentLoaded, which is fired as soon as the page DOM has been loaded, without waiting for resources to finish loading.
// This event is not cancelable and does not bubble.
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// beforeunload event: The beforeunload event is fired when the window, the document and its resources are about to be unloaded. 
// The document is still visible and the event is still cancelable at this point.

This event enables a web page to trigger a confirmation dialog asking the user if they really want to leave the page. If the user confirms, the browser navigates to the new page, otherwise it cancels the navigation.
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/
