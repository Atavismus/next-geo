const prefix: string = "Fun with ";
enum Games {
    flags = 'flags',
    capitals = 'capitals',
    regions = 'regions',
    areas = 'areas',
    population = 'population',
}

export interface IGame {
    name: string;
    // icon: string;
    // desc: string;
}

export class Game implements IGame {
    name;
    // icon;
    // desc;
    constructor(object: IGame) {
      this.name = object.name;
    //   this.icon = object.icon;
    //   this.desc = object.desc;
    }
    display(): string {
      return `${prefix + this.name}`;
    }
}

export const getAllGamesName = () => {
    const games = Object.keys(Games);
    return games.map(el => el);
}