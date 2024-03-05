import Link from 'next/link';
import { Game, getAllGamesName } from '../../models/Game';

const GameList = () => {
  const renderGameVariants = (game: string, variants: string[]) => {
    return variants.map((variant, i) => {
      const url: string = `/funwith/${game}/${variant.split(' ').pop()?.replace('?', '')}`;
      return (
        <p key={i}>{variants.length > 1 ? '>' : ''}<Link href={url} className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">{variant}</Link></p>
      );
    });
  }
  const games = getAllGamesName();
  return (
    <div className="grid grid-cols-2 gap-4">
      { games.map((game, i) => {
        const country = new Game({ name: game });
        return (
          <div key={i} className="border border-black p-4">
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