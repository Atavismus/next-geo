'use client'
import { ApiData } from '@/app/models/ApiData';
import { Country, ICountry } from '@/app/models/Country';
import { FlagSize } from '@/app/models/Flag';
import { FlagPic } from '@/app/components/server/FlagPic';
import { getRandomCountries } from '@/app/helpers/randomCountries';
import { handleSubmitAnswer } from '@/app/helpers/handleSubmitAnswer';
import { CheckIcon } from '@/app/components/server/CheckIcon';

const GameMain = (props: ApiData) => {
    const { data, score, setResult, setScore, gameInfos, game, variant } = props;
    const { question, questionProp, searchedProp, startFlag, flagChoices, propToDisplay, uniqBy, sortBy } = gameInfos;
    const { shuffledCountries, searchedCountry } = getRandomCountries(data, undefined, uniqBy, sortBy);
    const { name: searchedName, flag: searchedFlag } = searchedCountry as Country;
    const searcedPropValue: string = sortBy ? 'name' : searchedProp;
    const rightAnswer = (searchedCountry as Country).get(searcedPropValue as keyof ICountry);
    const formattedTitle: string = question.includes('@questionProp@') ? question.replace('@questionProp@', (searchedCountry as Country).get(questionProp)) : question;
    const choiceDivClass: string = flagChoices ? 'choiceFlag relative p-2 flex justify-center' : 'choiceText';
    const getPropValue = (country: Country) => {
        return propToDisplay ? country.get(propToDisplay) : country.get(searchedProp);
    }
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
            <form onSubmit={(e) => handleSubmitAnswer(e, rightAnswer?.toString(), score, setResult, setScore, game, variant)}>
                <fieldset>
                    {
                        (shuffledCountries as Country[]).map((country, i: number) =>
                            <div key={i} className={choiceDivClass}>
                                <input
                                    type="radio"
                                    name="answer"
                                    id={`answer-${i}`}
                                    value={getPropValue(country)}
                                    className="radio-fake hidden"
                                />
                                {
                                    flagChoices ?
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
                                    :
                                    (
                                        
                                        <label htmlFor={`answer-${i}`} className="w-80 m-2 p-2 flex items-center justify-center border-2 border-blue-600 rounded cursor-pointer">
                                            {getPropValue(country)}
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