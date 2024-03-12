'use client'
import { IGameComponent } from '@/app/models/Game';
import { FlagSize } from '@/app/models/Flag';
import { FlagPic } from '@/app/components/server/FlagPic';
import { getRandomCountries } from '@/app/helpers/randomCountries';
import { handleSubmitAnswer } from '@/app/helpers/handleSubmitAnswer';
import { CheckIcon } from '@/app/components/server/CheckIcon';

const GameComponent = (props: IGameComponent) => {
    const { data, setResult, setScore } = props;
    const { shuffledCountries, searchedCountry } = getRandomCountries(data);
    const { name: searchedName } = searchedCountry;
    return (
        <>
            <form onSubmit={(e) => handleSubmitAnswer(e, searchedName, setResult, setScore)}>
                <fieldset>
                    <legend className="p-4">What is the flag of {searchedName}?</legend>
                    {
                        shuffledCountries.map(({name, flag}, i: number) => {
                            return (
                                <div key={i} className="choiceFlag relative p-2 flex space-x-2 justify-center">
                                    <input
                                        type="radio"
                                        name="answer"
                                        id={`answer-${i}`}
                                        value={name}
                                        className="radio-fake hidden"
                                    />
                                    <label htmlFor={`answer-${i}`} className="flex items-center">
                                        <CheckIcon className="check absolute hidden" />
                                        { flag && 
                                            <FlagPic
                                                size={FlagSize.medium}
                                                url={flag.medium}
                                                name="?"
                                            />
                                        }
                                    </label>
                                </div>
                            )
                        })
                    }
                    <input id="submitBtn" type="submit" value="Choose" className="block w-40 m-auto mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
                </fieldset>
            </form>
        </>
    )
}

export { GameComponent as GameFlagsCountry };