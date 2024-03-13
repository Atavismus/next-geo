const prefix: string = "Fun with ";
enum Games {
    flags = 'flags',
    capitals = 'capitals',
    regions = 'regions',
    areas = 'areas',
    population = 'population',
}
export type ValidGameKeys = typeof Games[keyof typeof Games];

const gamesVariants:Record<ValidGameKeys, string[]> = {
    flags: ['Guess the flag', 'Guess the country'],
    capitals: ['Guess the capital', 'Guess the country'],
    regions: ['Guess the region', 'Guess the subregion'],
    areas: ['Who is bigger?'],
    population: ['Who is bigger?'],
};

export interface IGameVariant {
    searchedProp: string;
    title: string;
    titleProp: string | null;
    startFlag: boolean;
    choices: string;
}
/**
 * NB: name is the name of the country
 */
export const gameData:Record<ValidGameKeys, Record<string, IGameVariant>> = {
    flags: {
        flag: {
            searchedProp: 'name',
            title: 'What flag is this?',
            titleProp: null,
            startFlag: true,
            choices: 'text'
        },
        country: {
            searchedProp: 'name',
            title: 'What is the flag of @titleProp@?',
            titleProp: 'name',
            startFlag: false,
            choices: 'flag'
        }
    },   
}

export interface IGame {
    name: ValidGameKeys;
    variants?: string[];
    variant?: string;
}

export class Game implements IGame {
    name;
    variants; // available variants
    variant;
    constructor(object: IGame) {
      this.name = object.name;
      this.variants = gamesVariants[object.name];
      this.variant = object.variant;

    }
    getName(): string {
      return `${prefix + this.name}`;
    }
    getInfos(variant = this.variant): IGameVariant {
        return gameData[this.name][variant as string];
    }
}

export const getAllGamesName = () => {
    const games = Object.keys(Games);
    return games.map(el => el);
}