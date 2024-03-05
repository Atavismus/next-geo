import { ApiData } from './models/ApiData';
import { getData } from './helpers/getData';
import { RandomPick } from './components/server/RandomPick';
import { GameList } from './components/server/GameList';

export default async function Home() {
  const apiData: ApiData = await getData();
  return (
    <>
      <h2>{Object.keys(apiData).length} countries await you!</h2>
      <h3>Here is a random one:</h3>
      <RandomPick data={ apiData } />
      <h3>Pick a game:</h3>
      <GameList />
    </>);
}
