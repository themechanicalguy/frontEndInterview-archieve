/**
 * JavaScript plays an important role in communication with the server. 
 * This can be achieved by sending a request to the server and obtaining the information sent by the server. 
 * For example:
    ->Submit an order
    ->Load user information
    ->Receive latest information updates from the server

 * All the above works without reloading the current page!

There are many ways to send a request and get a response from the server. 

// IMP : fetch() 
 * The fetch() is a modern and versatile method available in JavaScript.
 * Fetch provides a generic definition of Request and Response objects. 
 * The fetch() method takes one mandatory argument, the path to the resource you want to fetch. 
 * It returns a Promise that resolves to Response if the fetch operation is successful or throws 
    an error that can be caught in case the fetch fails. You can also optionally pass in an 
    init options object as the second argument.
 */

// SYNTAX: var promiseAPI = fetch(urlOfTheSite, [options]);
// param1 - urlOfTheSite – The URL to be accessed.
// param2- options – optional parameters: method, headers, etc.

// Without options, this is a simple/default GET request which downloads the contents from the URL.
// The fetch() returns a promise which needs to be resolved to obtain the response from the server or for handling the error.

// EXAMPLE:

/** Getting a response from a fetch() is a two-step process.
 
1. The promise object returned by fetch() needs to be resolved to an object after the server sends a response.

Here, HTTP status needs to be checked to see it is successful or not.
 * The promise will be rejected if the fetch is unable to make a successful HTTP-request to the server 
 * e.g. may be due to network issues, or if the URL mentioned in fetch does not exist.
 * HTTP-status can be seen in response properties easily by doing console.log
    status – HTTP status code returned from a response, e.g., 200.
    ok – Boolean, true if the HTTP status code returned from a response, is 200-299.

2. Get the response body using additional methods.

Response object can be converted into various formats by using multiple methods to access the body/data from response object:

 * response.text() –read body/data from response object as a text.
 * response.json() – parse body/data from response object as JSON.
 * response.formData() – return body/data from response object as FormData. 
 * response.blob() – return body/data from response object as Blob (binary data with its type).
 */

// EXAMPLE
//pass any url that you wish to access to fetch()
let response = await fetch(url);
if (response.ok) {
  // if HTTP-status is 200-299
  // get the response body
  let json = await response.json();
  console.log(json);
} else {
  console.log("HTTP-Error: " + response.status);
}
