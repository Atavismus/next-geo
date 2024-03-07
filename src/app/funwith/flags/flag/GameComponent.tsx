'use client'
import { IGameComponent } from '@/app/models/Game';
import { FlagSize } from '@/app/models/Flag';
import { FlagPic } from '@/app/components/server/FlagPic';
import { getRandomCountries } from '@/app/helpers/randomCountries';
import { handleSubmitAnswer } from '@/app/helpers/handleSubmitAnswer';

const GameComponent = (props: IGameComponent) => {
    const { data, setResult, setScore } = props;
    const { shuffledCountries, searchedCountry } = getRandomCountries(data);
    const { name: searchedName, flag: searchedFlag} = searchedCountry;
    return (
        <>
            { searchedName && searchedFlag && 
                <FlagPic
                    size={FlagSize.large}
                    url={searchedFlag.large}
                    name="?"
                />
            }
            <form onSubmit={(e) => handleSubmitAnswer(e, searchedName, setResult, setScore)}>
                <fieldset>
                    <legend className="p-4">What flag is this?</legend>
                    {
                        shuffledCountries.map(({name}, i: number) =>
                            <div key={i} className="p-2">
                                <input
                                    type="radio"
                                    name="answer"
                                    id={`answer-${i}`}
                                    value={name}
                                />
                                <label htmlFor={`answer-${i}`} className="pl-4">{name}</label>
                            </div>
                        ) 
                    }
                    <input type="submit" value="Choose" className="block m-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
                </fieldset>
            </form>
        </>
    )
}

export { GameComponent as GameFlagsFlag };