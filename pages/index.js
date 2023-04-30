import { useState } from "react";
import Link from 'next/link';

export default function MyForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleNameChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("https://recs_paper-1-w3981585.deta.app/titlesearch/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: searchQuery }),
    });
    const data = await response.json();
    console.log(data.results);
    setSearchResults(data.results)
  };

  return (
    <div className="flex container">
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleNameChange} placeholder="Search for papers" />
        <button type="submit">Submit</button>
      </form>
      {searchResults.length > 0 && (
        <div className="cards-container">
          <h2>ML Papers</h2>
          <ul>
            {searchResults.map((result) => (
                <div key={result[0].id} className="card">
                  <h3 className="card-title" >{result[0].title}</h3>
                  {/* <p className="card-summary">{result[0].summary}</p> */}
                  <Link href={`/paper/${result[0].index_}`}             style={{
              textDecoration: 'underline',
              color: '#666',
              fontSize: '15px',
              display: 'block'
            }}>
                     Get Recommendations
                  </Link>
                </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
