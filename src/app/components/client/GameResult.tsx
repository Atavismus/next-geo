'use client'
interface IGameTitle {
    result: boolean;
    score: number;
}
const GameResult = (props: IGameTitle) => {
    const { result, score } = props;
    return (
        <>
            <strong className={`m-4 ${result === false ? 'text-red-600' : 'text-green-600'}`}>{ result === false ? 'Wrong' : (result === true ? 'Right!' : '')}</strong>
            <p>Your score: {score}</p>
        </>
    )
}

export { GameResult };