'use client'
interface IGameTitle {
    game: string;
    variant: string;
}
const GameTitle = (props: IGameTitle) => {
    const { game, variant } = props;
    return (
        <>
            <h2 className="p-4">Fun with {game}:</h2>
            <h3 className="p-4">Guess the {variant}</h3>
        </>
    )
}

export { GameTitle };