const prefix: string = "Fun with ";
enum Games {
    flags = 'flags',
    capitals = 'capitals',
    regions = 'regions',
    areas = 'areas',
    population = 'population',
}

const gamesVariants:Record<string, string[]> = {
    flags: ['Guess the flag', 'Guess the country'],
    capitals: ['Guess the capital', 'Guess the country'],
    regions: ['Guess the region', 'Guess the subregion'],
    areas: ['Who is bigger?'],
    population: ['Who is bigger?'],
};

export interface IGame {
    name: string;
    variants?: string[];
    // icon: string;
    // desc: string;
}

export class Game implements IGame {
    name;
    variants;
    // icon;
    // desc;
    constructor(object: IGame) {
      this.name = object.name;
      this.variants = gamesVariants[object.name];
    //   this.icon = object.icon;
    //   this.desc = object.desc;
    }
    getName(): string {
      return `${prefix + this.name}`;
    }
    // getVariants(): string[] {
    //     return gamesVariants[this.name];
    //   }
}

export const getAllGamesName = () => {
    const games = Object.keys(Games);
    return games.map(el => el);
}