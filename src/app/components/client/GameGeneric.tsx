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
    const gameInfos = new Game({name: pathParts[2] as ValidGameKeys, variants: null, variant: pathParts[3]}).getInfos();
    return (
        <>
            <GameTitle game={pathParts[2]} variant={pathParts[3]}/>
            <GameMain data={data} setResult={setResult} setScore={setScore} gameInfos={gameInfos}/>
            <GameScore result={result} score={score}/>
        </>
    );
}

export { GameGeneric };