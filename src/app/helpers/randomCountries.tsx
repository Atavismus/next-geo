import { ApiData } from "../models/ApiData";
import { Country, randomCountryIndex } from "../models/Country";

interface IGetRandomCountries {
    shuffledCountries: Country[];
    searchedCountry: Country;    
}

// TODO: deal with difficulty
export const getRandomCountries = (data:ApiData, difficulty = 3): IGetRandomCountries => {
    const randomCountriesIndex: number[] = [];
    for (let i: number = 0; i < difficulty; i++) {
        let ran: number = randomCountryIndex(data);
        if(randomCountriesIndex.length > 0) {
          while(randomCountriesIndex.includes(ran)) {
            ran = randomCountryIndex(data);
          }  
        }
        randomCountriesIndex.push(ran);
    }
    const randomCountries: Country[] = [];
    for (let i: number = 0; i < difficulty; i++) {
        // TODO: we should deal with not asking twice the same country
        randomCountries.push(new Country().random(data, randomCountriesIndex[i]));
    }
    const searchedCountry: Country = randomCountries[0];
    const shuffledCountries: Country[] = randomCountries.sort(() => Math.random() - 0.5);
    return { shuffledCountries, searchedCountry };
}