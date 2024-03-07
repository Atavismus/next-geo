export const handleSubmitAnswer = (e, searchedName, setResult, setScore) => {
    e.preventDefault();
    if(e.target.answer.value === searchedName) {
        setResult(true);
        setScore(prevState => prevState + 1);
    }
    else {
        setResult(false);
        setScore(0);
    }
    e.target.reset();
}