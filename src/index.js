import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler (event) {
    console.log(event.target.value);
    if (event.target.value === '') {
        return;
    }
    clearListOfCountries();
    clearSingleCountry();
    fetchCountries(event.target.value)
        .then(fetchResponse => renderCountries(fetchResponse))
        .catch(error => {
            console.log(error);
            Notiflix.Notify.failure("Oops, there is no country with that name");
        });
}

function renderCountries (response) {
    console.log('renderCountriesData=', response);
    if (response.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    };
    if (response.length === 1) {
        markupSingleCountry(response);
    };
    if (response.length >= 2 && response.length <= 10) {
        console.log('rendering LIST of countries');
        markupListOfCountries(response);
    };
}

function markupListOfCountries (data) {
    data.map(countryItem => {
        const { flags: { png: url, alt }, name: {common: countryName} } = countryItem;
        countryListEl.insertAdjacentHTML('beforeend', `<li class="country-item">
        <img src="${url}" width="64" height="42"  alt="${alt}">
        <h2>${countryName}</h2>
      </li>`);
    })
}

function clearListOfCountries () {
    countryListEl.innerHTML = '';
}

function markupSingleCountry (data) {
    const {flags: { png: url, alt }, name: {common: countryName}, capital, population, languages} = data[0];
    const lang = Object.values(languages).join(', ');
    const populationString = new Intl.NumberFormat({useGrouping: true}).format(population).replaceAll(',', ' ');
    countryInfoEl.insertAdjacentHTML('beforeend', `<div class="country-logo-thumb">
        <img src="${url}" width="64" height="42"  alt="${alt}">
        <h2>${countryName}</h2>
      </div>
      <p><span class="title">Capital:</span>&#32;${capital}</p>
      <p><span class="title">Population:</span>&#32;${populationString}</p>
      <p><span class="title">Languages:</span>&#32;${lang}</p>`);
}

function clearSingleCountry () {
    countryInfoEl.innerHTML = '';
}

