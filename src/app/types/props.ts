import { Dispatch, SetStateAction } from 'react';
import { ApiData } from '../models/ApiData';
import { IGameVariant } from '../models/Game';
import { ValidGameKeys } from '../models/Game';

// Props types pour les composants
export interface GameGenericProps {
    data: ApiData;
}

export interface GameMainProps {
    data: ApiData;
    score: number;
    setResult: Dispatch<SetStateAction<boolean | null>>;
    setScore: Dispatch<SetStateAction<number>>;
    gameInfos: IGameVariant;
    game: ValidGameKeys;
    variant: string;
}

export interface GameScoreProps {
    result: boolean | null;
    score: number;
    game: string;
    variant: string;
}

export interface GameTitleProps {
    game: string;
    variant: string;
}

export interface RandomPickProps {
    data: ApiData;
}
