'use client'
import { useState, useEffect } from 'react';
import { Country, LocationType, ILocationData } from '@/app/models/Country';
import { FlagSize } from '@/app/models/Flag';
import { ApiData } from '@/app/models/ApiData';
import { FlagPic } from '../server/FlagPic';
import { WikiLink } from '../server/WikiLink';
import { genLocation } from '@/app/helpers/genLocation';


const RandomPick = (props: ApiData) => {
    const { data } = props;
    const [country, setCountry] = useState<Country | null>(null);

    useEffect(() => {
        setCountry(new Country().random(data));
    }, [data]);

    const { name, capital, flag, subregion, latLng } = country || {};

    const handleClick = () => {
        setCountry(new Country().random(data));
    };

    return (
        <div className="game border-4 border-blue-600 border-dashed px-12 py-8">
            <div className="pb-5 font-black text-center">Random pick:</div>
            { name && flag && 
                <div className="grid grid-flow-col auto-cols-max items-center">
                    <div className="pr-3">
                        <FlagPic
                            size={FlagSize.medium}
                            url={flag.medium}
                            name={name}
                        />
                    </div>
                    <div>
                        <p className="pb-1">{genLocation(latLng as ILocationData, LocationType.country)}Country: {<WikiLink prop={name} />}</p>
                        <p className="pb-1">{genLocation(latLng as ILocationData, LocationType.capital)}Capital: {<WikiLink prop={capital as string} />}</p>
                        <p>Subregion: {<WikiLink prop={subregion as string} />}</p>
                    </div>
                </div>
            }
            <div className="pt-5 text-xs text-center select-none cursor-pointer" onClick={handleClick}>(click me!)</div>
        </div>
    );
}

export { RandomPick };