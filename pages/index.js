import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchResult from '../components/SearchResult'

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
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto flex-grow py-8">
        <form onSubmit={handleSubmit}>
            <div className="flex items-center relative text-gray-600 focus-within:text-gray-400">
                <input type="search" name="q" className="py-2 w-full text-base text-gray-900 bg-gray-100 rounded-lg pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search for an ML Paper title....." autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-2">
                Search
                </button>
            </div>
        </form>
        {isFetching && <div className="text-center mt-8">Searching...</div>}
        {results.length > 0 &&(
        <div className="grid grid-cols-1 gap-4 mt-8">
        {results.map((result) => (
            <SearchResult
            key={result[0].title}
            title={result[0].title}
            summary={result[0].summary}
            index_={result[0].index_}
            />
        ))}
        </div>)}
      </div>
    </div>
  )
}

export default Home
