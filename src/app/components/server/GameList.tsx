import Link from 'next/link';
import { Game, getAllGamesName } from '../../models/Game';

const GameList = () => {
  const renderGameVariants = (game: string, variants: string[]) => {
    return variants.map((variant, i) => {
      const url: string = `/funwith/${game}/${variant.split(' ').pop()?.replace('?', '')}`;
      return (
        <p key={i}>{variants.length > 1 ? '>' : ''}<Link href={url}>{variant}</Link></p>
      );
    });
  }
  return getAllGamesName().map((game, i) => {
      const country = new Game({ name: game });
      return (
          <div key={i}>
              <>
                { country.getName() }:
                { renderGameVariants(game, country.variants) }
              </>
          </div>
      );
  });
}

export { GameList };