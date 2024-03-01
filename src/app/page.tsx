import { ApiData } from './models/ApiData';
import { RandomPick } from './components/RandomPick';

// Fetch all countries from the countryapi.io
const getData = async ():Promise<ApiData> => {
  const res = await fetch(`https://countryapi.io/api/all?apikey=${process.env.API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json();
}

export default async function Home() {
  const apiData: ApiData = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{Object.keys(apiData).length} countries await you!</p>
      <p>Here is a random one:</p>
      <RandomPick data={ apiData } />
    </main>);
}
