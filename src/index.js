import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import Countries from './fetchCountries';

const countries = new Countries();

const DEBOUNCE_DELAY = 300;
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')
const input = document.querySelector('#search-box');
const cardCountry = document.querySelector('.country-info');


const handleInput = () => {
    let country = input.value.trim();
    list.innerHTML = '';
    countryInfo.innerHTML = '';
    if (country === '') {
                return
            }
    countries.fetchCountries(country)
        .then(data => {
            countryСountСheck(data);
        })
        .catch((error) => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    })
}

const createListItem = (item) => `<li class="item-country">
      <img class="svg-country" src="${item.flags.svg}" alt="Прапор">
      <h2>${item.name.common}</h2>
    </li>`;

const generateContent = (array) => array.reduce((acc, item) => acc + createListItem(item), "");

const insertContent = (array) => {
    const result = generateContent(array);
    list.insertAdjacentHTML("beforeend", result);
}

const createListCard = (array) => `<div class="country-card">
       <img class="svg-country" src="${array.flags.svg}" alt="Прапор">
       <h2>${array.name.common}</h2>
      </div>
      <p>Capital: ${array.capital}</p>
      <p>Population: ${array.population}</p>
      <p>Languages: ${Object.values(array.languages)}</p>`;

const generateContentCard = (array) => array.reduce((acc, item) => acc + createListCard(item), "");

const insertContentCard = (array) => {
    const resultCard = generateContentCard(array);
    cardCountry.insertAdjacentHTML("beforeend", resultCard);
}

function countryСountСheck(arrayCount) {
    if (arrayCount.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return
    }
    if (arrayCount.length === 1) {
        insertContentCard(arrayCount);
    } else {
        insertContent(arrayCount);
    }
}

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));