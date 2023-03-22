import Notiflix from "notiflix";
import { countryListEl, countryInfoEl } from "./index";

export const renderCountries = function  (response) {
    if (response.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    };
    if (response.length === 1) {
        markupSingleCountry(response);
    };
    if (response.length >= 2 && response.length <= 10) {
        markupListOfCountries(response);
    };
}

const markupListOfCountries = function (data) {
    data.map(countryItem => {
        const { flags: { svg: url, alt }, name: {common: countryName} } = countryItem;
        countryListEl.insertAdjacentHTML('beforeend', `<li class="country-item">
        <img src="${url}" width="64" height="42"  alt="${alt}">
        <h2>${countryName}</h2>
      </li>`);
    })
}

export const clearListOfCountries = function () {
    countryListEl.innerHTML = '';
}

const markupSingleCountry = function (data) {
    const {flags: { svg: url, alt }, name: {common: countryName}, capital, population, languages} = data[0];
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

export const clearSingleCountry = function () {
    countryInfoEl.innerHTML = '';
}

