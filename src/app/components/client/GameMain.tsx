'use client'
import { useRef, useState } from 'react';
import { Country, ICountry } from '@/app/models/Country';
import { FlagSize } from '@/app/models/Flag';
import { FlagPic } from '@/app/components/server/FlagPic';
import { getRandomCountries } from '@/app/helpers/randomCountries';
import { handleSubmitAnswer } from '@/app/helpers/handleSubmitAnswer';
import { CheckIcon } from '@/app/components/server/CheckIcon';
import { GameMainProps } from '@/app/types/props';

const GameMain = (props: GameMainProps) => {
    const { data, score, setResult, setScore, gameInfos, game, variant } = props;
    const { question, questionProp, searchedProp, startFlag, flagChoices, propToDisplay, uniqBy, sortBy } = gameInfos;
    const { shuffledCountries, searchedCountry } = getRandomCountries(data, undefined, uniqBy, sortBy);
    const { name: searchedName, flag: searchedFlag } = searchedCountry as Country;
    const searchedPropValue: string = sortBy ? 'name' : searchedProp;
    const rightAnswer = (searchedCountry as Country).get(searchedPropValue as keyof ICountry);
    const formattedTitle: string = question.includes('@questionProp@') ? question.replace('@questionProp@', (searchedCountry as Country).get(questionProp)) : question;
    const choiceDivClass: string = flagChoices ? 'choiceFlag relative p-2 flex justify-center' : 'choiceText';
    
    const submitButtonRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const getPropValue = (country: Country) => {
        return propToDisplay ? country.get(propToDisplay) : country.get(searchedProp);
    }
    
    const enableSubmit = () => {
        if (submitButtonRef.current) {
            submitButtonRef.current.disabled = false;
        }
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
            <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const userAnswer = formData.get('answer') as string;
                const correct = userAnswer === rightAnswer?.toString();
                
                if (submitButtonRef.current) {
                    submitButtonRef.current.disabled = true;
                }
                
                handleSubmitAnswer(e, rightAnswer?.toString(), score, setResult, setScore, game, variant);
            }}>
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
                                    onClick={enableSubmit}
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
                    <input 
                        ref={submitButtonRef}
                        id="submitBtn" 
                        type="submit" 
                        value="Choose" 
                        disabled={isSubmitting}
                        className="block w-40 m-auto mt-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                    />
                </fieldset>
            </form>
        </>
    )
}

export { GameMain };