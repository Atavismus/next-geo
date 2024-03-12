import { getData } from '../../../helpers/getData';
import { ApiData } from '../../../models/ApiData';
import { GameGeneric } from "../../../components/client/GameGeneric";

export default async function Game() {
    const apiData: ApiData = await getData();
    return <GameGeneric data={apiData}/>
}