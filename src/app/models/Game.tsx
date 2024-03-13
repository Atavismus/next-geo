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
    uniqBy: string | null
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
            choices: 'text',
            uniqBy: null
        },
        country: {
            searchedProp: 'name',
            title: 'What is the flag of @titleProp@?',
            titleProp: 'name',
            startFlag: false,
            choices: 'flag',
            uniqBy: null
        }
    },
    capitals: {
        capital: {
            searchedProp: 'capital',
            title: 'What is the capital of @titleProp@?',
            titleProp: 'name',
            startFlag: false,
            choices: 'text',
            uniqBy: null 
        },
        country: {
            searchedProp: 'name',
            title: '@titleProp@ is the capital of?',
            titleProp: 'capital',
            startFlag: false,
            choices: 'text',
            uniqBy: null    
        },
    },
    regions: {
        region: {
            searchedProp: 'region',
            title: 'Which region is @titleProp@ in?',
            titleProp: 'name',
            startFlag: false,
            choices: 'text',
            uniqBy: 'region'
        },
        subregion: {
            searchedProp: 'subregion',
            title: 'Which subregion is @titleProp@ in?',
            titleProp: 'name',
            startFlag: false,
            choices: 'text',
            uniqBy: 'subregion'
        },
    } 
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