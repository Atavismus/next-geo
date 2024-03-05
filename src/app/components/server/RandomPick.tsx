import { Country } from '../../models/Country';
import { FlagSize } from '../../models/Flag';
import { ApiData } from '../../models/ApiData';
import { FlagPic } from './FlagPic';

const RandomPick = (props: ApiData) => {
    const { data } = props;
    const country = new Country().random(data);
    const { name, capital, flag } = country;
    return (
        <>
            <p>{capital} is the capital of {name}</p>
            { name && flag && 
                <FlagPic
                    size={FlagSize.medium}
                    url={flag.medium}
                    name={name}
                />
            }
        </>
    )
}

export { RandomPick };