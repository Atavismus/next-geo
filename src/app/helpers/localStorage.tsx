export const genLocalStorageProp = (game: string, variant: string): string => {
    return `${game}_${variant}`;
}

export const getLocalStorage = (prop: string): string => {
    try {
        return localStorage.getItem(prop) ?? '0';
    } catch (error) {
        return "0";
    }
}

export const setLocalStorage = (prop: string, value: string) => {
    try {
        localStorage.setItem(prop, value.toString());    
    } catch (error) {}
}

export const isBestScore = (score: number, storedScore: number) => {
    return score >= storedScore;
}

export const manageBestScore = (game: string, variant: string, value: string, setBestScore: Function): boolean => {
    const prop: string = genLocalStorageProp(game, variant);
    const prevValue: string = getLocalStorage(prop);
    if(isBestScore(parseInt(value), parseInt(prevValue))) {
        setLocalStorage(prop, value);
        setBestScore(value);
        return true;
    }
    return false;
} 