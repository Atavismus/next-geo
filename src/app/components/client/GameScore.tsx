'use client'
import { useEffect, useState } from "react";
import { genLocalStorageProp, getLocalStorage, manageBestScore } from '@/app/helpers/localStorage';
import Link from "next/link";
interface IGameTitle {
    result: boolean | null;
    score: number;
    game: string;
    variant: string;
}
const GameScore = (props: IGameTitle) => {
    // TODO: remove result prop if i don't need (i could need it later)
    const { result, score, game, variant } = props;
    const [bestScore, setBestScore] = useState(getLocalStorage(genLocalStorageProp(game, variant))); 
    useEffect(() => {
        const scoreEl = document.getElementById("score");
        scoreEl?.setAttribute("class", scoreEl?.className.replace('animTo', 'resetFrom'));
        if(manageBestScore(game, variant, score.toString(), setBestScore)) {
            const bestScoreEl = document.getElementById("bestScore");
            bestScoreEl?.setAttribute("class", bestScoreEl?.className.replace('animTo', 'resetFrom'));
        }
    }, [score, game, variant]);
    return (
        <>
            <div id="score">
                <p className="mt-4 text-lg font-bold">Your score: {score}</p>
            </div>
            <div id="bestScore">
                <p className="mt-1 text-lg font-bold">Your best score: {bestScore}</p>
            </div>
            <div className="mt-5">
                <Link href="/" className="text-xs italic text-blue-600 hover:underline cursor-pointer">Traveled enough? Come home!</Link>
            </div>
        </>
    );
}

export { GameScore };