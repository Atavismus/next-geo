const WikiLink = ({ prop, moreClassName }: { prop: string, moreClassName?: string }) => {
    return (
        <a
            href={`https://en.wikipedia.org/wiki/${prop}`}
            target="_blank"
            className={`text-blue-600 italic hover:underline cursor-pointer${moreClassName ? ` ${moreClassName}` : ''}`}>
            {prop}
        </a>
    )
}
export { WikiLink };