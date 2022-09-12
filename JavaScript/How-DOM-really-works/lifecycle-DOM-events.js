// Lifecycle DOM Events
// 1- DOMContentLoaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// load event
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// beforeunload event
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/
