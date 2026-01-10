import { ApiData } from "../models/ApiData";
import { Country, ICountry, randomCountryIndex } from "../models/Country";

interface IGetRandomCountries {
    shuffledCountries: Country[] | null;
    searchedCountry: Country | null;    
}

const isUniqBy = <K extends keyof ICountry>(prop: K, data: ApiData, randomCountriesIndex: number[], countryIndex: number): boolean => {
  const randomCountries = [];
  const ranCountryToCompare = new Country().random(data, countryIndex);
  const len = randomCountriesIndex.length;
  for (let i: number = 0; i < len; i++) {
    randomCountries.push(new Country().random(data, randomCountriesIndex[i]));
  }
  for (let i: number = 0; i < len; i++) {
    if(randomCountries[i].get(prop) === ranCountryToCompare.get(prop)) {
      return false;
    }
  }
return true;
}
import { GAME_CONFIG } from '../constants';

// TODO: deal with difficulty
export const getRandomCountries = (
    data: ApiData, 
    difficulty: number = GAME_CONFIG.DEFAULT_DIFFICULTY, 
    uniqBy: string | null | undefined = null, 
    sortBy: string | null | undefined = null
): IGetRandomCountries => {
    const randomCountriesIndex: number[] = [];
    for (let i: number = 0; i < difficulty; i++) {
        let ran: number = randomCountryIndex(data);
        if(randomCountriesIndex.length > 0) {
          if(uniqBy) {
            while(!isUniqBy(uniqBy as keyof ICountry, data, randomCountriesIndex, ran)) {
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

    const countries: IGetRandomCountries = {
      searchedCountry: null,
      shuffledCountries: null
    }
    if(sortBy) {
      randomCountries.sort((a, b) => {
        const aValue = a.get(sortBy as keyof ICountry) as number;
        const bValue = b.get(sortBy as keyof ICountry) as number;
        return (bValue ?? 0) - (aValue ?? 0);
      });
    }
    countries.searchedCountry = randomCountries[0]; 
    countries.shuffledCountries = randomCountries.sort(() => Math.random() - 0.5);
    return { ...countries };
}