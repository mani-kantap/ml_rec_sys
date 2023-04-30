import { useState } from 'react'

function SearchBar() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([]);


  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("https://recs_paper-1-w3981585.deta.app/titlesearch/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: query }),
    });
    const data = await response.json();
    console.log(data.results);
    setSearchResults(data.results)
  };

  return (
    <form className="max-w-2xl mx-auto my-8" onSubmit={handleFormSubmit}>
      <div className="relative rounded-full shadow-md">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
        />
        <button
          type="submit"
          className="absolute top-0 right-0 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      <div className="mt-12">
        {searchResults.map((result) => (
          <div key={result[0].id} className="border rounded-lg p-4 mb-4">
            <p className="text-lg font-medium">{result[0].title}</p>
            {/* <p className="mt-2 text-gray-500">{result[0].summary}</p> */}
          </div>
        ))}
      </div>
    </form>
  )
}

export default SearchBar
