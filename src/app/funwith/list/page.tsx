import { ApiData } from '@/app/models/ApiData';
import { getData } from '@/app/helpers/getData';
import { LocationType, ILocationData } from '@/app/models/Country';
import { FlagSize } from '@/app/models/Flag';
import { FlagPic } from '@/app/components/server/FlagPic';
import { WikiLink } from '@/app/components/server/WikiLink';
import { genLocation } from '@/app/helpers/genLocation';
import { formatNumber } from '@/app/helpers/formatNumber';

export default async function List() {
  const apiData: ApiData = await getData();
  // Convertir en tableau, trier, puis reconstruire l'objet
  const sortedEntries = Object.entries(apiData).sort(([, a], [, b]) => {
    const nameA = a.name ?? '';
    const nameB = b.name ?? '';
    return nameA.localeCompare(nameB);
  });
  const sortedData: ApiData = Object.fromEntries(sortedEntries);
  return (
    <>
        <h2 className="p-5 italic">{Object.keys(apiData).length} countries await you!</h2>
        <table className="list my-5">
            <thead>
                <tr className="text-left">
                    <th className="border-r-2">Country</th>
                    <th className="border-r-2">Capital</th>
                    <th className="border-r-2">Subregion</th>
                    <th className="border-r-2">Area</th>
                    <th className="border-r-2">Population</th>
                    <th>Flag</th>
                </tr>
            </thead>
            <tbody>
            {
                Object.values(sortedData).map(({ name, capital, subregion, area, population, latLng, flag }, i) => {
                    return (
                        <tr key={i} className="border-t-2">
                            <td className="border-r-2">
                                {name && <WikiLink prop={name} moreClassName="pr-1" />}
                                {latLng && genLocation(latLng, LocationType.country)}
                            </td>
                            <td className="border-r-2">
                                {capital && <WikiLink prop={capital} moreClassName="pr-1" />}
                                {latLng && genLocation(latLng, LocationType.capital)}
                            </td>
                            <td className="border-r-2">{subregion && <WikiLink prop={subregion} />}</td>
                            <td className="border-r-2">{formatNumber(area ?? 0)}</td>
                            <td className="border-r-2">{formatNumber(population ?? 0)}</td>
                            <td>
                                {flag?.medium && name && (
                                    <FlagPic
                                        size={FlagSize.medium}
                                        url={flag.medium}
                                        name={name}
                                    />
                                )}
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </>);
}