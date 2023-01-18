import '../css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

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
    fetchCountries(nameCountry);
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
  const languagesObj = countriesArr[0].languages;
  const strLanguages = languageToString(languagesObj);

  countryInfoContainer.innerHTML = `<div class='country-info__container'>
      <img src=${countriesArr[0].flags.svg} alt="Flag country" width=40px>
      <h1 class = 'country-info__title'>${countriesArr[0].name.official}</h1>
      </div>
      <p class = 'country-info__item'>Capital:<span class='country-info__data'>${countriesArr[0].capital}</span></p>
      <p class = 'country-info__item'>Population:<span class='country-info__data'>${countriesArr[0].population}</span></p>  
      <p class = 'country-info__item'>Language:<span class='country-info__data'>${strLanguages}</span></p>
      `;
}

function createListCountries(countriesArr) {
  for (
    let indexCountry = 0;
    indexCountry < countriesArr.length;
    indexCountry++
  ) {
    let currentName = countriesArr[indexCountry].name.official;
    let currentFlag = countriesArr[indexCountry].flags.svg;

    countryListContainer.insertAdjacentHTML(
      'beforeend',
      `<li class = 'country-list__item'>
          <img src=${currentFlag} alt="Flag country" width=40px>
          <span class = 'country-list__country-name'>${currentName}</span>
          </li>`
    );
  }
}

function languageToString(objLanguages) {
  const languagesArr = [];
  const values = Object.values(objLanguages);
  for (const value of values) {
    languagesArr.push(value);
  }
  return languagesArr.join(', ');
}

export { showCountries, clearCountries };
