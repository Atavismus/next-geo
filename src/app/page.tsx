import { ApiData } from './models/ApiData';

// Fetch all countries from the countryapi.io
const getData = async ():Promise<ApiData> => {
  const res = await fetch(`https://countryapi.io/api/all?apikey=${process.env.API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json();
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {Object.keys(await getData()).length} countries loaded!
    </main>);
}
