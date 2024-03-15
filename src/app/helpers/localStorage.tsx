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

export const manageBestScore = (game: string, variant: string, value: string): string => {
    const prop: string = genLocalStorageProp(game, variant);
    const prevValue: string = getLocalStorage(prop);
    if(parseInt(value) > parseInt(prevValue)) {
        setLocalStorage(prop, value);    
    }
    return value;
} 