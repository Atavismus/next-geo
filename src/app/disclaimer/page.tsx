export default function Disclaimer() {
    return (
        <div className="mt-10 p-10 border-4 border-dashed border-blue-600 rounded-3xl">
            <p><strong>Disclaimer:</strong></p>
            <p>That website uses <a href="https://restcountries.com/" target="_blank" className="text-blue-600 cursor-pointer">REST Countries</a>.</p>
            <p>The API has rate limits. If you see this message, the rate limit has been reached.</p>
            <p>Please come back later. ; )</p>
        </div>
      );
}