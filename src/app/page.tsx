import { ApiData } from './models/ApiData';
import { getData } from './helpers/getData';
import { RandomPick } from './components/server/RandomPick';
import { GameList } from './components/server/GameList';

export default async function Home() {
  const apiData: ApiData = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{Object.keys(apiData).length} countries await you!</p>
      <p>Here is a random one:</p>
      <RandomPick data={ apiData } />
      <GameList />
    </main>);
}
