///////////////////////////////////////
// Consuming Promises using then()

//using Promise we cannot get rid of callbacks but the code will be more readable and
// we get rid of callback hell.
const getCountryData = function (country) {
  //fetch function returns a Promise
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); //this also returns a Promise, so need to return it
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
