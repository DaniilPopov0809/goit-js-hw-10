import '../css/styles.css';
import Notiflix from 'notiflix';
import cardCountryTpl from '../tamplates/card-country.hbs';
import listCountriesTpl from '../tamplates/card-list-country.hbs';
import getCountries from './fetch-countries.js';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countryListContainer = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');

inputCountry.addEventListener('input', debounce(onFindCountry, DEBOUNCE_DELAY));

function onFindCountry(event) {
  const nameCountry = event.target.value.trim().toLowerCase();
  if (nameCountry.trim() === '') {
    Notiflix.Notify.info('Enter country.');
  } else {
      getCountries(nameCountry)
      .then(countries => {
        showCountries(countries);
      })
      .catch(err => {
        Notiflix.Notify.failure(`${err}`);
        clearCountries();
      });
  }
}

function showCountries(countriesArr) {
  if (countriesArr.length === 1) {
    clearCountries();
    createCardCountry(countriesArr);
  } else if (countriesArr.length >= 2 && countriesArr.length < 10) {
    clearCountries();
    createListCountries(countriesArr);
  } else if (countriesArr.length > 10) {
    clearCountries();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function clearCountries() {
  countryListContainer.innerHTML = '';
  countryInfoContainer.innerHTML = '';
}

function createCardCountry(countriesArr) {
  const countryObj = Object.assign({}, countriesArr[0]);
  countryObj.languages = languageToString(countryObj.languages);
  countryInfoContainer.innerHTML = cardCountryTpl(countryObj);
}

function createListCountries(countriesArr) {
  countryListContainer.innerHTML = listCountriesTpl(countriesArr);
}

function languageToString(objLanguages) {
  const languagesArr = [];
  const values = Object.values(objLanguages);
  for (const value of values) {
    languagesArr.push(value);
  }
  return languagesArr.join(', ');
}
