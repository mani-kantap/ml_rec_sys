import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ThingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://recs_paper-1-w3981585.deta.app/recs/${id}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));
    }
  }, [id]);

  const [expandedSummaries, setExpandedSummaries] = useState([]);

  const handleSummaryClick = id => {
    if (expandedSummaries.includes(id)) {
      setExpandedSummaries(expandedSummaries.filter(item => item !== id));
    } else {
      setExpandedSummaries([...expandedSummaries, id]);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Recommendations</h1>
      <div className="cards-container">
        {data && data.results.map(item => (
          <div key={item.id} className="card">
            <h2 className="card-title">{item.title}</h2>
            <p className={`card-summary${expandedSummaries.includes(item.id) ? ' expanded' : ''}`} onClick={() => handleSummaryClick(item.id)}>
              {item.summary}
            </p>
            <a href={item.links.split(";")[0]} style={{
              textDecoration: 'underline',
              color: '#666',
            }}>view paper </a>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 30px 0;
        }

        .title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
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

        .card-summary {
          font-size: 18px;
          color: #666;
          line-height: 1.5;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          cursor: pointer;
        }

        .card-summary.expanded {
          -webkit-line-clamp: initial;
        }
      `}</style>
    </div>
  );
};

export default ThingPage;
