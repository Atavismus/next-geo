'use client'
import { useState } from 'react';
import { Country } from '../../models/Country';
import { FlagSize } from '../../models/Flag';
import { ApiData } from '../../models/ApiData';
import { FlagPic } from '../server/FlagPic';

const RandomPick = (props: ApiData) => {
    const { data } = props;
    const [rerender, setRerender] = useState(false);
    const country = new Country().random(data);
    const { name, capital, flag, region } = country;
    const handleClick = () => {
        setRerender(!rerender);
    }
    return (
        <div className="game border-4 border-blue-600 border-dashed px-12 py-8 cursor-pointer" onClick={handleClick}>
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
                        <p className="pb-1">Country: <span className="italic">{name}</span></p>
                        <p className="pb-1">Capital: <span className="italic">{capital}</span></p>
                        <p>Region: <span className="italic">{region}</span></p>
                    </div>
                </div>
            }
            <div className="pt-5 text-xs text-center">(click me!)</div>
        </div>
    )
}

export { RandomPick };