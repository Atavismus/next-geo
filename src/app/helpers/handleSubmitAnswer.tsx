import { FormEvent } from "react";

export const handleSubmitAnswer = (e: FormEvent<HTMLFormElement>, searchedName = '', setResult: Function, setScore: Function) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const rightAnswer = form.answer.value === searchedName;
    form.classList.add(rightAnswer ? 'right' : 'wrong');
    const submitBtn = document.getElementById('submitBtn') as HTMLInputElement;
    const score = document.getElementById('score') as HTMLDivElement;
    score.className = "";
    score.classList.add(`animTo${rightAnswer ? 'Right' : 'Wrong'}`);
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
    setTimeout(() => {
        form.className = "";
        submitBtn.disabled = false;
        submitBtn.classList.remove('disabled');
        setResult(rightAnswer);
        if(rightAnswer) {
            setScore((prevState:number) => prevState + 1);
        }
        else {
            setScore(0);
        }
        form.reset();
    }, 1000);
}