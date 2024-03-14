import Link from 'next/link';
import { Game, gameData, IGameVariant, ValidGameKeys } from '../../models/Game';

const GameList = () => {
  const renderGameVariants = (game: Game) => {
    const variants = game.variants as Record<string, IGameVariant>;
    return Object.entries(variants).map(([keyVariant, valueVariant], i) => {
      const url: string = `/funwith/${game.name}/${keyVariant}`;
      return (
        <p key={i} className="text-blue-600">{Object.keys(variants).length > 1 ? '*' : ''}
          <Link href={url} className="hover:underline cursor-pointer">{valueVariant.title}</Link>
        </p>
      );
    });
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {
        Object.entries(gameData).map(([keyGame, valueVariants], i) => {
          const game = new Game({ name: keyGame as ValidGameKeys, variants: valueVariants});
          return (
            <div key={i} className="game border-4 border-blue-600 p-8">
              <>
                {game.getName()}
                {renderGameVariants(game)}
              </>
            </div>
          );
        })
      }
    </div>
  );
}

export { GameList };