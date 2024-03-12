import Link from 'next/link';
import { Game, getAllGamesName } from '../../models/Game';

const GameList = () => {
  const renderGameVariants = (game: string, variants: string[]) => {
    return variants.map((variant, i) => {
      const url: string = `/funwith/${game}/${variant.split(' ').pop()?.replace('?', '')}`;
      return (
        <p key={i} className="text-blue-600">{variants.length > 1 ? '*' : ''}<Link href={url} className="hover:underline cursor-pointer">{variant}</Link></p>
      );
    });
  }
  const games = getAllGamesName();
  return (
    <div className="grid grid-cols-2 gap-4">
      { games.map((game, i) => {
        const country = new Game({ name: game });
        return (
          <div key={i} className="game border-4 border-blue-600 p-8">
            <>
              { country.getName() }:
              { renderGameVariants(game, country.variants) }
            </>
          </div>
        );
      })}
    </div>
  );
}

export { GameList };