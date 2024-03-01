import { ApiData } from "./ApiData";

export interface ICountry {
    name?: string;
    capital?: string;
    population?: number;
    area?: number;
    flag?: { [key: string]: string };
}

export class Country implements ICountry  {
    name;
    capital;
    population;
    area;
    flag;
    constructor(object?: ICountry) {
        if(object) {
            this.name = object.name;
            this.capital = object.capital;
            this.population = object.population;
            this.area = object.area;
            this.flag = object.flag;    
        }
    }
    random(apiData: ApiData) {
        const dataLen = Object.keys(apiData).length;
        const random = Math.floor(Math.random() * dataLen);
        const country = apiData[Object.keys(apiData)[random]];
        const { name, capital, population, area, flag } = country;
        return new Country({name, capital, population, area, flag});
    }
}