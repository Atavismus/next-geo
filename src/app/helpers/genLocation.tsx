import {LocationType, ILocationData } from '../models/Country';
import { Location } from '@/app/components/server/Location';
import { ReactNode } from 'react';
export const genLocation = (latLng: ILocationData, prop: LocationType): ReactNode => {
    return (
        <Location latLng={latLng} type={prop} className="location inline-block pr-[3px] cursor-pointer"/>
    );
}