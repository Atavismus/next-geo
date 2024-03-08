import { ApiData } from './models/ApiData';
import { getData } from './helpers/getData';
import { RandomPick } from './components/client/RandomPick';
import { GameList } from './components/server/GameList';

export default async function Home() {
  const apiData: ApiData = await getData();
  return (
    <>
      <h2 className="p-5 italic">{Object.keys(apiData).length} countries await you!</h2>
      <h3 className="pb-5 font-black text-2xl"> ~ Pick a game ~</h3>
      <GameList />
      <RandomPick data={ apiData } />
    </>);
}
