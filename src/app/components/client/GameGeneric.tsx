'use client'
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ApiData } from '../../models/ApiData';
import { gamesComponents } from '../../models/Game';
import { GameTitle } from './GameTitle';
import { GameResult } from './GameResult';

const GameGeneric = (props: ApiData) => {
    const { data } = props;
    const [result, setResult] = useState(null);
    const [score, setScore] = useState(0);
    const pathParts = usePathname().split('/');
    const componentName = `Game${pathParts[2].charAt(0).toUpperCase()}${pathParts[2].slice(1)}${pathParts[3].charAt(0).toUpperCase()}${pathParts[3].slice(1)}`;
    const GameToRender = gamesComponents[componentName];
    return (
        <>
            <GameTitle game={pathParts[2]} variant={pathParts[3]} />
            <GameToRender data={data} setResult={setResult} setScore={setScore}/>
            <GameResult result={result} score={score} />
        </>
    );
}

export { GameGeneric };