const prefix: string = "Fun with ";
enum Games {
    flags = 'flags',
    capitals = 'capitals',
    regions = 'regions',
    areas = 'areas',
    population = 'population',
}
export type ValidGameKeys = typeof Games[keyof typeof Games];

export interface IGameVariant {
    title: string;
    searchedProp: string;
    question: string;
    questionProp?: string;
    startFlag?: boolean;
    flagChoices?: boolean;
    propToDisplay?: string | null;// in choices buttons
    uniqBy?: string | null;
    sortBy?: string | null;
}
/**
 * NB: name is the name of the country
 */
export const gameData:Record<ValidGameKeys, Record<string, IGameVariant>> = {
    flags: {
        flag: {
            title: "Guess the flag",
            searchedProp: 'name',
            question: 'What flag is this?',
            startFlag: true
        },
        country: {
            title: "Guess the country",
            searchedProp: 'name',
            question: 'What is the flag of @questionProp@?',
            questionProp: 'name',
            flagChoices: true
        }
    },
    capitals: {
        capital: {
            title: "Guess the capital",
            searchedProp: 'capital',
            question: 'What is the capital of @questionProp@?',
            questionProp: 'name'
        },
        country: {
            title: "Guess the country",
            searchedProp: 'name',
            question: '@questionProp@ is the capital of?',
            questionProp: 'capital'
        },
    },
    regions: {
        region: {
            title: "Guess the region",
            searchedProp: 'region',
            question: 'Which region is @questionProp@ in?',
            questionProp: 'name',
            uniqBy: 'region'
        },
        subregion: {
            title: "Guess the subregion",
            searchedProp: 'subregion',
            question: 'Which subregion is @questionProp@ in?',
            questionProp: 'name',
            uniqBy: 'subregion'
        },
    },
    areas: {
        area: {
            title: "Who is bigger?",
            searchedProp: 'area',
            propToDisplay: 'name',
            question: 'Who is bigger?',
            sortBy: 'area',
        },
    },
}

export interface IGame {
    name: ValidGameKeys;
    variants?: Record<string, IGameVariant> | null;
    variant?: string | null;
}

export class Game implements IGame {
    name;
    variants?; // available variants with all infos from gameData
    variant?; // current variant key
    constructor(object: IGame) {
      this.name = object.name;
      this.variants = object.variants;
      this.variant = object.variant;

    }
    getName(): string {
      return `${prefix + this.name}`;
    }
    getInfos(variant = this.variant): IGameVariant {
        return gameData[this.name][variant as string];
    }
}