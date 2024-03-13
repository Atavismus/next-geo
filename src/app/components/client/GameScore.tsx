'use client'
import { useEffect } from "react";
interface IGameTitle {
    result: boolean | null;
    score: number;
}
const GameScore = (props: IGameTitle) => {
    // TODO: remove result prop if i don't need (i could need it later)
    const { result, score } = props;
    useEffect(() => {
        const scoreEl = document.getElementById("score");
        scoreEl?.setAttribute("class", scoreEl?.className.replace('animTo', 'resetFrom'));
    });
    return (
        <div id="score">
            <p className="m-4 text-lg font-bold">Your score: {score}</p>
        </div>
    )
}

export { GameScore };