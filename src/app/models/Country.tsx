import { ApiData } from "./ApiData";

export interface ILocationData {
    country?: [number, number];
    capital?: [number, number];
}

export interface ICountry {
    area?: number;
    capital?: string;
    flag?: { [key: string]: string };
    name?: string;
    population?: number;
    region?: string;
    subregion?: string;
    latLng?: ILocationData;
}

export class Country implements ICountry  {
    area;
    capital;
    flag;
    name;
    population;
    region;
    subregion;
    latLng;
    constructor(object?: ICountry) {
        if(object) {
            this.area = object.area;
            this.capital = object.capital;
            this.flag = object.flag;
            this.name = object.name;
            this.population = object.population;
            this.region = object.region;
            this.subregion = object.subregion;
            this.latLng = object.latLng;
        }
    }
    public get<K extends keyof ICountry>(propertyName: K): ICountry[K] {
        return this[propertyName] as ICountry[K];
    }
    public getLat(): [number, number] | null {
        return this.latLng?.country ?? null;
    }
    public getCapitalLat(): [number, number] | null {
        return this.latLng?.capital ?? null;
    }
    public random(apiData: ApiData, index?: number | null): Country {
        const country = apiData[Object.keys(apiData)[index ?? randomCountryIndex(apiData)]];
        return new Country({...country});
    }
}

export const randomCountryIndex = (apiData: ApiData): number => {
    const dataLen = Object.keys(apiData).length;
    return Math.floor(Math.random() * dataLen);
}