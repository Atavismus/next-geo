'use client'
import { ApiData } from '@/app/models/ApiData';
import { FlagSize } from '@/app/models/Flag';
import { FlagPic } from '@/app/components/server/FlagPic';
import { getRandomCountries } from '@/app/helpers/randomCountries';
import { handleSubmitAnswer } from '@/app/helpers/handleSubmitAnswer';
import { CheckIcon } from '@/app/components/server/CheckIcon';

const GameMain = (props: ApiData) => {
    const { data, setResult, setScore, gameInfos } = props;
    const { choices, searchedProp, startFlag, title, titleProp, uniqBy } = gameInfos;
    const { shuffledCountries, searchedCountry } = getRandomCountries(data, undefined, uniqBy);
    const { name: searchedName, flag: searchedFlag } = searchedCountry;
    const rightAnswer = searchedCountry.get(searchedProp);
    const formattedTitle = title.includes('@titleProp@') ? title.replace('@titleProp@', searchedCountry.get(titleProp)) : title;
    const choiceDivClass = choices === 'text' ? 'choiceText' : 'choiceFlag relative p-2 flex justify-center';
    return (
        <>
            <h3 className="m-5 font-black text-2xl"> ~ {formattedTitle} ~</h3>
            { startFlag && searchedName && searchedFlag && 
                <FlagPic
                    size={FlagSize.large}
                    url={searchedFlag.large}
                    name="?"
                    className="mt-3 mb-6"
                />
            }
            <form onSubmit={(e) => handleSubmitAnswer(e, rightAnswer, setResult, setScore)}>
                <fieldset>
                    {
                        shuffledCountries.map((country, i: number) =>
                            <div key={i} className={choiceDivClass}>
                                <input
                                    type="radio"
                                    name="answer"
                                    id={`answer-${i}`}
                                    value={country.get(searchedProp)}
                                    className="radio-fake hidden"
                                />
                                {
                                    choices === 'text' ?
                                    (
                                        <label htmlFor={`answer-${i}`} className="w-80 m-2 p-2 flex items-center justify-center border-2 border-blue-600 rounded cursor-pointer">
                                            {country.get(searchedProp)}
                                        </label>
                                    )
                                    :
                                    (
                                        <label htmlFor={`answer-${i}`} className="flex items-center w-3/5 cursor-pointer">
                                            <CheckIcon className="check absolute hidden"/>
                                            { country.flag && 
                                                <FlagPic
                                                    size={FlagSize.large}
                                                    url={country.flag.large}
                                                    name="?"
                                                />
                                            }
                                        </label>
                                    )
                                }
                            </div>
                        ) 
                    }
                    <input id="submitBtn" type="submit" value="Choose" className="block w-40 m-auto mt-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer" />
                </fieldset>
            </form>
        </>
    )
}

export { GameMain };