export default class Countries {
    constructor() {}
    
    fetchCountries(country) {
        const url = `https://restcountries.com/v3.1/name/${country}?fields=name,name.official,capital,population,flags,languages`;
        return fetch(url)
            .then((r) => r.json());
    }
};



