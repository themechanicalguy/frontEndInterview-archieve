// Handling rejected promise

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    //.then(resolvedCallback, rejectedCallback)
    .the n(
      (response) => {
        console.log(response);

        if (!response.ok)
          throw new Error(`Country not found (${response.status})`);

        return response.json();
      } // we can pass the rejected callback
    )
    .then((data) => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders[0];
      const neighbour = "dfsdfdef";

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then((data) => renderCountry(data, "neighbour"))
    // catch will only be executed when promise is rejected. It will be handled for all prmoise
    .catch((err) => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    // Finally will be executed irrespective of promise settlement( resolve or reject).
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
