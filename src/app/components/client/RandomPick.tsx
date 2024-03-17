'use client'
import { ReactNode, useState, useEffect } from 'react';
import { Country } from '../../models/Country';
import { FlagSize } from '../../models/Flag';
import { ApiData } from '../../models/ApiData';
import { FlagPic } from '../server/FlagPic';

const RandomPick = (props: ApiData) => {
    const { data } = props;
    const [country, setCountry] = useState<Country | null>(null);

    useEffect(() => {
        setCountry(new Country().random(data));
    }, [data]);

    const { name, capital, flag, subregion } = country || {};

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

    return (
        <div className="game border-4 border-blue-600 border-dashed px-12 py-8">
            <div className="pb-5 font-black text-center">Random pick:</div>
            { name && flag && 
                <div className="grid grid-flow-col auto-cols-max items-end">
                    <div className="pr-3">
                        <FlagPic
                            size={FlagSize.medium}
                            url={flag.medium}
                            name={name}
                        />
                    </div>
                    <div>
                        <p className="pb-1">Country: {genAtag(name)}</p>
                        <p className="pb-1">Capital: {genAtag(capital as string)}</p>
                        <p>Subregion: {genAtag(subregion as string)}</p>
                    </div>
                </div>
            }
            <div className="pt-5 text-xs text-center cursor-pointer" onClick={handleClick}>(click me!)</div>
        </div>
    );
}

export { RandomPick };