import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { renderCountries, clearSingleCountry, clearListOfCountries } from './renderCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
export const countryListEl = document.querySelector('.country-list');
export const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler (event) {
    let searchRequest = event.target.value.trim();

    if (searchRequest === '') {
        return;
    }

    clearListOfCountries();
    clearSingleCountry();
    fetchCountries(searchRequest)
        .then(fetchResponse => renderCountries(fetchResponse))
        .catch(error => {
            console.log(error);
            Notiflix.Notify.failure("Oops, there is no country with that name");
        });
}