import { LocationIcon } from './LocationIcon';
import { LocationType, ILocationData } from '@/app/models/Country';

interface ILocation {
    className: string;
    latLng: ILocationData;
    type: LocationType;
}

const Location = (props: ILocation) => {
    const { className, latLng, type } = props;
    const coord = latLng[type] ?? [0, 0];
    const coords = {
        lat: Array.isArray(coord) ? coord[0] : 0,
        lng: Array.isArray(coord) ? coord[1] : 0,
    }
    const {lat, lng} = coords;
    return (
        <a href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${type === LocationType.country ? 6 : 7}/${lat}/${lng}`} className={className} target="_blank">
            <LocationIcon className="inline mt[-3px]" />
        </a>
    );
}

export { Location };