import { FormEvent } from "react";
import { genLocalStorageProp, getLocalStorage, isBestScore } from '@/app/helpers/localStorage';

export const handleSubmitAnswer = (e: FormEvent<HTMLFormElement>, rightAnswer = '', score: number, setResult: Function, setScore: Function, game: string, variant: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const correct = form.answer.value === rightAnswer;
    form.classList.add(correct ? 'right' : 'wrong');
    const submitBtn = document.getElementById('submitBtn') as HTMLInputElement;
    const scoreEl = document.getElementById('score') as HTMLDivElement;
    scoreEl.className = "";
    scoreEl.classList.add(`animTo${correct ? 'Right' : 'Wrong'}`);
    if(correct && isBestScore(score + 1, parseInt(getLocalStorage(genLocalStorageProp(game, variant))))) {
        const bestScore = document.getElementById('bestScore') as HTMLDivElement;
        bestScore.className = "";
        bestScore.classList.add(`animTo${correct ? 'Right' : 'Wrong'}`);    
    }
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
    setTimeout(() => {
        form.className = "";
        submitBtn.disabled = false;
        submitBtn.classList.remove('disabled');
        setResult(correct);
        // Mechanic to render a new question even if user fails two in a row
        if(correct) {
            setScore((prevState:number) => prevState <= 0 ? 1 : prevState + 1);

        }
        else {
            setScore((prevState:number) => prevState <= 0 ? prevState - 1 : 0);
        }
        form.reset();
    }, 1000);
}