export default function Disclaimer() {
    return (
        <div className="mt-10 p-10 border-4 border-dashed border-blue-600 rounded-3xl">
            <p><strong>Disclaimer:</strong></p>
            <p>That website uses <a href="https://countryapi.io/" target="_blank" className="text-blue-600 cursor-pointer">countryapi.io</a>.</p>
            <p>The free plan allows 250 Requests per month.</p>
            <p>That limit has been reached, please come back next month. ; )</p>
        </div>
      );
}