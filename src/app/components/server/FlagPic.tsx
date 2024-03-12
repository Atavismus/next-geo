import Image from 'next/image';
import { Flag, FlagSize } from '../../models/Flag';

interface IFlagPic {
    size: FlagSize;
    url: string;
    name: string;
    className?: string;
}

const FlagPic = (props: IFlagPic) => {
    const { size, url, name, className } = props;
    const { width, height } = new Flag(size).getSizeSpec();
    return (
        <>
            { name && url && 
                <Image
                    src={url}
                    width={width}
                    height={height}
                    alt={name}
                    className={className}
                />
            }
        </>
    )
}

export { FlagPic };