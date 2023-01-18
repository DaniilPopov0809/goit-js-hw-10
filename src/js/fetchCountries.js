import { showCountries, clearCountries } from './index.js';
import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const OPTIONS = '?fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${OPTIONS}`)
    .then(response => {
      if (!response.ok) {
        throw Error('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(countries => {
      showCountries(countries);
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      clearCountries();
    });
}

export { fetchCountries };
