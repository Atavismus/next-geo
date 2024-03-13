import { ApiData } from "../models/ApiData";
import { Country, randomCountryIndex } from "../models/Country";

interface IGetRandomCountries {
    shuffledCountries: Country[];
    searchedCountry: Country;    
}


const isUniqBy = (prop: string, data: ApiData, randomCountriesIndex: number[], countryIndex: number): boolean => {
  const randomCountries = [];
  const ranCountryToCompare = new Country().random(data, countryIndex);
  const len = randomCountriesIndex.length;
  for (let i: number = 0; i < len; i++) {
    randomCountries.push(new Country().random(data, randomCountriesIndex[i]));
  }
  for (let i: number = 0; i < len; i++) {
    if(randomCountries[i].get(prop) === ranCountryToCompare.get(prop)) {
      console.log("là")
      return false;
    }
  }
return true;
}
// TODO: deal with difficulty
export const getRandomCountries = (data:ApiData, difficulty = 3, uniqBy = null): IGetRandomCountries => {
    const randomCountriesIndex: number[] = [];
    for (let i: number = 0; i < difficulty; i++) {
        let ran: number = randomCountryIndex(data);
        if(randomCountriesIndex.length > 0) {
          if(uniqBy) {
            while(!isUniqBy(uniqBy, data, randomCountriesIndex, ran)) {
              ran = randomCountryIndex(data);
            } 
          }
          else {
            while(randomCountriesIndex.includes(ran)) {
              ran = randomCountryIndex(data);
            } 
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
    console.log(shuffledCountries)
    console.log(searchedCountry)
    return { shuffledCountries, searchedCountry };
}