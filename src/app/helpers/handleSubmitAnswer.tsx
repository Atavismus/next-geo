import { FormEvent } from "react";

export const handleSubmitAnswer = (e: FormEvent<HTMLFormElement>, rightAnswer = '', setResult: Function, setScore: Function) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const correct = form.answer.value === rightAnswer;
    form.classList.add(correct ? 'right' : 'wrong');
    const submitBtn = document.getElementById('submitBtn') as HTMLInputElement;
    const score = document.getElementById('score') as HTMLDivElement;
    score.className = "";
    score.classList.add(`animTo${correct ? 'Right' : 'Wrong'}`);
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
    setTimeout(() => {
        form.className = "";
        submitBtn.disabled = false;
        submitBtn.classList.remove('disabled');
        setResult(correct);
        if(correct) {
            setScore((prevState:number) => prevState + 1);
        }
        else {
            setScore(0);
        }
        form.reset();
    }, 1000);
}