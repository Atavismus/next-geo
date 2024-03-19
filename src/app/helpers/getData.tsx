import { redirect } from 'next/navigation'
import { ApiData } from '../models/ApiData';

// Fetch all countries from the countryapi.io
export const getData = async ():Promise<ApiData> => {
    const res = await fetch(`https://countryapi.io/api/all?apikey=${process.env.API_KEY}`);
    if (!res.ok) {
      redirect('/disclaimer/');
    }
    return res.json();
}