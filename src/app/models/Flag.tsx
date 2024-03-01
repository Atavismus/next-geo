
export enum FlagSize {
    small ='small',
    medium ='medium',
    large = 'large',
}

interface IFlagSize {
    width: number,
    height: number
}

export class Flag  {
    size: FlagSize;
    constructor(size: FlagSize) {
      this.size = size;
    }
    private medium: IFlagSize = { width: 96, height: 72 };
    getSizeSpec(): IFlagSize {
        switch (this.size) {
            case FlagSize.small:
                return { width:24, height: 18 };
            case FlagSize.medium:
                return this.medium;
            case FlagSize.large:
                return { width:256, height: 192 };
            default:
                return this.medium;
        }
    }
}
