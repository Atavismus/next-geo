'use client'
import { useEffect, useState, useRef } from "react";
import { genLocalStorageProp, getLocalStorage, manageBestScore } from '@/app/helpers/localStorage';
import Link from "next/link";
import { GameScoreProps } from '@/app/types/props';

const GameScore = (props: GameScoreProps) => {
    // TODO: remove result prop if i don't need (i could need it later)
    const { result, score, game, variant } = props;
    const [bestScore, setBestScore] = useState<string>(getLocalStorage(genLocalStorageProp(game, variant)));
    const [scoreClassName, setScoreClassName] = useState<string>('');
    const [bestScoreClassName, setBestScoreClassName] = useState<string>('');
    const scoreRef = useRef<HTMLDivElement>(null);
    const bestScoreRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (scoreRef.current) {
            const currentClass = scoreRef.current.className.replace('animTo', 'resetFrom');
            setScoreClassName(currentClass);
        }
        
        if(manageBestScore(game, variant, score.toString(), setBestScore)) {
            if (bestScoreRef.current) {
                const currentClass = bestScoreRef.current.className.replace('animTo', 'resetFrom');
                setBestScoreClassName(currentClass);
            }
        }
    }, [score, game, variant]);
    
    return (
        <>
            <div ref={scoreRef} id="score" className={scoreClassName}>
                <p className="mt-4 text-lg font-bold">Your score: {score}</p>
            </div>
            <div ref={bestScoreRef} id="bestScore" className={bestScoreClassName}>
                <p className="mt-1 text-lg font-bold">Your best score: {bestScore}</p>
            </div>
            <div className="mt-5">
                <Link href="/" className="text-xs italic text-blue-600 hover:underline cursor-pointer">Traveled enough? Come home!</Link>
            </div>
        </>
    );
}

export { GameScore };