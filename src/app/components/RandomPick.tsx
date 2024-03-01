import Image from 'next/image';
import { Country } from '../models/Country';
import { Flag, FlagSize } from '../models/Flag';
import { ApiData } from '../models/ApiData';

const RandomPick = (props: ApiData) => {
    const { data } = props;
    const country = new Country().random(data);
    const { name, capital, flag } = country;
    const { width, height } = new Flag(FlagSize.medium).getSizeSpec();
    return (
        <>
            <p>{capital} is the capital of {name}</p>
            { name && flag && 
                <Image
                    src={flag.medium}
                    width={width}
                    height={height}
                    alt={name}
                />
            }
        </>
    )
}

export { RandomPick };