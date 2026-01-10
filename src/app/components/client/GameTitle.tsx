'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Link from "next/link";
import { GameTitleProps } from '@/app/types/props';

const GameTitle = (props: GameTitleProps) => {
    const { game } = props;
    const pathname = usePathname();
    const titleRef = useRef<HTMLSpanElement>(null);
    const gameName = game.charAt(0).toUpperCase() + game.slice(1);
    
    useEffect(() => {
        const titleElement = titleRef.current;
        if (titleElement && pathname) {
            titleElement.classList.add('crossed');
        }
        return () => {
            if (titleElement) {
                titleElement.setAttribute("class", "");
            }
        };
    }, [pathname]);
    return (
        <>
            <h2 className="text-center marker text-blue-600 text-5xl font-black small-caps rotate-[-5deg] mt-[5px]">
                <span className="text-transparent select-none">Fun with </span>
                <Link href="/" className="cursor-pointer">{gameName}</Link>
            </h2>
            {/* <h3 className="p-4">Guess the {variant}</h3> */}
        </>
    )
}

export { GameTitle };