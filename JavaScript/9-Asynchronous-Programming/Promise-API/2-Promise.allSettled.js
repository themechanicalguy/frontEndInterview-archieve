/**
 * Promise.all rejects as a whole if any promise rejects. Thats good for all or nothing case, 
    when we need all results successfull to proceed.
 * Promise.allSettled just waits for all promises to settle, regardless of the result.
 *  The resulting array has:
      {status:"fulfilled", value:result} for successful responses,
      {status:"rejected", reason:error} for errors.
 */

// For example, we’d like to fetch the information about multiple users.
// Even if one request fails, we’re still interested in the others.

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  results.forEach((result, num) => {
    if (result.status == "fulfilled") {
      alert(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      alert(`${urls[num]}: ${result.reason}`);
    }
  });
});

/**
 [
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
 */

// So for each promise we get its status and value/error.

// Polyfill for Promise.allSettled

function allSettled(promises) {
  const resolveHandler = (value) => {
    return { status: "fulfilled", value };
  };
  const rejectHandler = (reason) => {
    return { status: "rejected" };
  };
  // your code here
  return Promise.all(
    promises.map((p) => Promise.resolve(p).then(resolveHandler, rejectHandler))
  );
}
