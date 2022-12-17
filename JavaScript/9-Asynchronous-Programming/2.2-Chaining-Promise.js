const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = "dfsdfdef";
      if (!neighbour) return;
      // Country 2: this returns a promise so you need to return
      //chaining promise
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then((response) => response.json());
};
