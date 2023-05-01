import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ThingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true)
    if (id) {
      fetch(`https://recs_specter-1-w1125399.deta.app/specter/recs/${id}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));
    }
    setIsFetching(false)
  }, [id]);

  const [expandedSummaries, setExpandedSummaries] = useState([]);

  const handleSummaryClick = id => {
    if (expandedSummaries.includes(id)) {
      setExpandedSummaries(expandedSummaries.filter(item => item !== id));
    } else {
      setExpandedSummaries([...expandedSummaries, id]);
    }
  };

  if (!data || isFetching) {
    return <div className="text-center mt-8">Loading......✨✨✨</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto flex-grow py-8">
    <div className="container">
    <div className="text-center mt-2 text-xl">Enjoy recommendations🎉🎉🎉🎉</div>

      <div className="cards-container">
        {data && data.results.map(item => (
          <div key={item.id} className="card">
            <h2 className="card-title">{item.title}</h2>
            <p className={`card-summary${expandedSummaries.includes(item.id) ? ' expanded' : ''}`} onClick={() => handleSummaryClick(item.id)}>
              {item.summary}
            </p>
            <div className="flex gap-4">
            <a href={item.links.split(";")[0]} className="inline-block px-4 py-2 text-black rounded hover:bg-gray-200">
              View paper
            </a>
            <Link href={`/explain/${id}/${item.index_}`} className="inline-block px-4 py-2 text-black  rounded hover:bg-gray-200">
              Explain
            </Link>
          </div>

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
    </div>
    </div>
  );
};


export default ThingPage;
