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
    <div className="container">
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
      <style jsx>{`
        container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 30px 0;
        }
        form {
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: 500px;
          margin: 0 auto;
        }
        
        form input {
          width: 100%;
          max-width: 400px;
        }
        input[type="text"] {
          width: 100%;
          padding: 10px;
          font-size: 18px;
          border-radius: 4px;
          border: none;
          box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
        }
        button[type="submit"] {
          padding: 10px;
          font-size: 18px;
          border-radius: 4px;
          border: none;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
        }
        .my-link {
          color: #666;
          text-decoration: underline;
        }
        .cards-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .card {
          width: 100%;
          margin-bottom: 20px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }

        .card-title {
          color: #666;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .view-details {
          display: block;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
