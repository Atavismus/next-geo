'use client'
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from "next/link";
interface IGameTitle {
    game: string;
    variant: string;
}
const GameTitle = (props: IGameTitle) => {
    // TODO: remove variant if not used (we could use it later) 
    const { game, variant } = props;
    const pathname = usePathname();
    const gameName = game.charAt(0).toUpperCase() + game.slice(1);
    useEffect(() => {
        const titleEl = document.getElementById("geo");
        if(pathname) {
            titleEl?.classList.add('crossed');
        }
        return () => {
            titleEl?.setAttribute("class", "");
        }
    });
    return (
        <>
            <h2 className="text-center marker text-blue-600 text-5xl font-black small-caps rotate-[-5deg] mt-[5px]"><span className="text-transparent">Fun with </span><Link href="/" className=" cursor-pointer">{gameName}</Link></h2>
            {/* <h3 className="p-4">Guess the {variant}</h3> */}
        </>
    )
}

export { GameTitle };