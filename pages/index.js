import React, { useState } from 'react'
import Header from '../components/Header'
import SearchResult from '../components/SearchResult'
import Image from 'next/image'

const search = async (query) => {
  console.log("In Search")
  const response = await fetch("https://recs_paper-1-w3981585.deta.app/titlesearch/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: query }),
  });
  const data = await response.json();
  console.log(data.results);
  return data.results
}

const Home = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFetching(true);
    const newResults = await search(query)
    console.log(newResults)
    setResults(newResults)
    setIsFetching(false);
  }

  return (
    <>
  <div className="flex flex-col min-h-screen items-center justify-center">
    <div className="container mx-auto py-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center relative text-gray-600 focus-within:text-gray-400">
          <input
            type="search"
            name="q"
            className="py-2 w-full text-base text-gray-900 bg-gray-100 rounded-lg pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder="Search for an ML Paper title....."
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-200 ml-2"
          >
            Search
          </button>
        </div>
      </form>
      {isFetching && <div className="text-center">Searching...</div>}
      {results.length == 0 && (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Welcome to
            </h1>
            <p className="text-4xl md:text-7xl font-extrabold text-gray-500 animate-pulse">
              ML Paper recommendations
            </p>
            <div className="mt-8">
                Search with your favourite ML Paper title to get recommendations..
                </div>
          </div>
        </div>
      )}
      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mt-8">
          {results.map((result) => (
            <SearchResult
              key={result[0].title}
              title={result[0].title}
              summary={result[0].summary}
              index_={result[0].index_}
            />
          ))}
        </div>
      )}
    </div>
  </div>
    </>
  )
}

export default Home
