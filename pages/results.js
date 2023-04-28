import React, { useState } from "react";
import { useRouter } from "next/router";

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setResults([]);
    fetch(`https://example.com/api/search?query=${e.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
      });
  };

  return (
    <div>
      <h1>Results</h1>
      console.log(results)
      <ul>
        {results.results.map((result) => (
          <li key={result.id}>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{result.title}</h5>
                <p class="card-text">{result.summary}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;