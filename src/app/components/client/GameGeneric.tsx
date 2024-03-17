'use client'
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ApiData } from '../../models/ApiData';
import { Game, ValidGameKeys } from '../../models/Game';
import { GameTitle } from './GameTitle';
import { GameMain } from './GameMain';
import { GameScore } from './GameScore';

const GameGeneric = (props: ApiData) => {
    const { data } = props;
    const [result, setResult] = useState(null);
    const [score, setScore] = useState(0);
    const pathParts = usePathname().split('/');
    const game = pathParts[2] as ValidGameKeys;
    const variant = pathParts[3];
    const gameInfos = new Game({name: game as ValidGameKeys, variants: null, variant }).getInfos();
    return (
        <>
            <GameTitle game={game} variant={variant}/>
            <GameMain data={data} setResult={setResult} score={score} setScore={setScore} gameInfos={gameInfos} game={game} variant={variant}/>
            <GameScore result={result} score={score} game={game} variant={variant}/>
        </>
    );
}

export { GameGeneric };