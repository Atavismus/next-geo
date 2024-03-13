import { ApiData } from "./ApiData";

export interface ICountry {
    name?: string;
    capital?: string;
    population?: number;
    area?: number;
    flag?: { [key: string]: string };
    region?: string;
    subregion?: string;
}

export class Country implements ICountry  {
    name;
    capital;
    population;
    area;
    flag;
    region;
    subregion;
    constructor(object?: ICountry) {
        if(object) {
            this.name = object.name;
            this.capital = object.capital;
            this.population = object.population;
            this.area = object.area;
            this.flag = object.flag;
            this.region = object.region;
            this.subregion = object.subregion;
        }
    }
    public get<K extends keyof ICountry>(propertyName: K): ICountry[K] {
        return this[propertyName] as ICountry[K];
    }
    public random(apiData: ApiData, index = null) {
        const country = apiData[Object.keys(apiData)[index ?? randomCountryIndex(apiData)]];
        const { name, capital, population, area, flag, region, subregion } = country;
        return new Country({name, capital, population, area, flag, region, subregion });
    }
}

export const randomCountryIndex = (apiData: ApiData) => {
    const dataLen = Object.keys(apiData).length;
    return Math.floor(Math.random() * dataLen);
}