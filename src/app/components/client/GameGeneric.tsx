'use client'
import { usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Game, ValidGameKeys } from '../../models/Game';
import { GameTitle } from './GameTitle';
import { GameMain } from './GameMain';
import { GameScore } from './GameScore';
import { GameGenericProps } from '../../types/props';

const GameGeneric = (props: GameGenericProps) => {
    const { data } = props;
    const [result, setResult] = useState<boolean | null>(null);
    const [score, setScore] = useState<number>(0);
    const pathname = usePathname();
    
    // Extraire game et variant du pathname de manière sécurisée
    const { game, variant } = useMemo(() => {
        const pathParts = pathname?.split('/') || [];
        const gameKey = pathParts[2] as ValidGameKeys;
        const variantKey = pathParts[3] || '';
        
        // Validation : vérifier que game est un ValidGameKeys
        const validGames: ValidGameKeys[] = ['flags', 'capitals', 'regions', 'areas', 'populations'];
        const isValidGame = validGames.includes(gameKey);
        
        return {
            game: isValidGame ? gameKey : 'flags' as ValidGameKeys,
            variant: variantKey
        };
    }, [pathname]);
    
    const gameInfos = useMemo(() => {
        return new Game({name: game, variants: null, variant }).getInfos();
    }, [game, variant]);
    return (
        <>
            <GameTitle game={game} variant={variant}/>
            <GameMain data={data} setResult={setResult} score={score} setScore={setScore} gameInfos={gameInfos} game={game} variant={variant}/>
            <GameScore result={result} score={score >= 0 ? score : 0} game={game} variant={variant}/>
        </>
    );
}

export { GameGeneric };