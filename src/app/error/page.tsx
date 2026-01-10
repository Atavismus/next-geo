export default function ApiError() {
    return (
        <div className="mt-10 p-10 border-4 border-dashed border-red-600 rounded-3xl">
            <p><strong>API Error:</strong></p>
            <p>That website uses <a href="https://restcountries.com/" target="_blank" className="text-blue-600 cursor-pointer">REST Countries</a>.</p>
            <p>The API service is currently unavailable.</p>
            <p>This could be due to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Network connectivity issues</li>
                <li>The API service being down or discontinued</li>
                <li>DNS resolution problems</li>
            </ul>
            <p className="mt-4">Please try again later.</p>
        </div>
    );
}

