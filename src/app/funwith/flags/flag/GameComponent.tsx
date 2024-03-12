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
            <h3 className="m-5 font-black text-2xl"> ~ What flag is this? ~</h3>
            { searchedName && searchedFlag && 
                <FlagPic
                    size={FlagSize.large}
                    url={searchedFlag.large}
                    name="?"
                    className="mt-3 mb-6"
                />
            }
            <form onSubmit={(e) => handleSubmitAnswer(e, searchedName, setResult, setScore)}>
                <fieldset>
                    {
                        shuffledCountries.map(({name}, i: number) =>
                            <div key={i} className="choiceText">
                                <input
                                    type="radio"
                                    name="answer"
                                    id={`answer-${i}`}
                                    value={name}
                                    className="radio-fake hidden"
                                />
                                <label htmlFor={`answer-${i}`} className="w-80 m-2 p-2 flex items-center justify-center border-2 border-blue-600 rounded cursor-pointer">
                                    {name}
                                </label>
                            </div>
                        ) 
                    }
                    <input id="submitBtn" type="submit" value="Choose" className="block w-40 m-auto mt-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer" />
                </fieldset>
            </form>
        </>
    )
}

export { GameComponent as GameFlagsFlag };