'use client'
import { ReactNode, useState, useEffect } from 'react';
import { Country, LocationType, ILocationData } from '../../models/Country';
import { FlagSize } from '../../models/Flag';
import { ApiData } from '../../models/ApiData';
import { FlagPic } from '../server/FlagPic';
import { Location } from '@/app/components/server/Location';

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

    const genAtag = (prop: string): ReactNode => {
        return (
            <a
                href={`https://en.wikipedia.org/wiki/${prop}`}
                target="blank"
                className="text-blue-600 italic hover:underline cursor-pointer">
                {prop}
            </a>
        );
    }

    const genLocation = (prop: LocationType): ReactNode => {
        return (
            <Location latLng={latLng as ILocationData} type={prop} className="location inline-block pr-[3px]animate-[locationPing] cursor-pointer"/>
        );
    }

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
                        <p className="pb-1">{genLocation(LocationType.country)}Country: {genAtag(name)}</p>
                        <p className="pb-1">{genLocation(LocationType.capital)}Capital: {genAtag(capital as string)}</p>
                        <p>Subregion: {genAtag(subregion as string)}</p>
                    </div>
                </div>
            }
            <div className="pt-5 text-xs text-center select-none cursor-pointer" onClick={handleClick}>(click me!)</div>
        </div>
    );
}

export { RandomPick };