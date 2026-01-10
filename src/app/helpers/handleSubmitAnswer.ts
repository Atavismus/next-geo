import { FormEvent, Dispatch, SetStateAction } from "react";
import { genLocalStorageProp, getLocalStorage, isBestScore } from './localStorage';
import { GAME_CONFIG } from '@/app/constants';

export const handleSubmitAnswer = (
    e: FormEvent<HTMLFormElement>, 
    rightAnswer = '', 
    score: number, 
    setResult: Dispatch<SetStateAction<boolean | null>>, 
    setScore: Dispatch<SetStateAction<number>>, 
    game: string, 
    variant: string
) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const correct = form.answer.value === rightAnswer;
    form.classList.add(correct ? 'right' : 'wrong');
    const scoreEl = document.getElementById('score') as HTMLDivElement;
    scoreEl.className = "";
    scoreEl.classList.add(`animTo${correct ? 'Right' : 'Wrong'}`);
    if(correct && isBestScore(score + 1, parseInt(getLocalStorage(genLocalStorageProp(game, variant))))) {
        const bestScore = document.getElementById('bestScore') as HTMLDivElement;
        bestScore.className = "";
        bestScore.classList.add(`animTo${correct ? 'Right' : 'Wrong'}`);    
    }
    (document.getElementById('submitBtn') as HTMLInputElement).disabled = true;
    setTimeout(() => {
        form.className = "";
        setResult(correct);
        // Mechanic to render a new question even if user fails two in a row
        if(correct) {
            setScore((prevState:number) => prevState <= 0 ? 1 : prevState + 1);

        }
        else {
            setScore((prevState:number) => prevState <= 0 ? prevState - 1 : 0);
        }
        form.reset();
    }, GAME_CONFIG.ANIMATION_DELAY_MS);
}
