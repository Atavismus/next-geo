const WikiLink = ({ prop }: { prop: string }) => {
    return (
        <a
            href={`https://en.wikipedia.org/wiki/${prop}`}
            target="_blank"
            className="text-blue-600 italic hover:underline cursor-pointer">
            {prop}
        </a>
    )
}
export { WikiLink };