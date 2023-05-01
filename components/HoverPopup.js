import { useState, useEffect } from 'react';

const HoverPopup = ({ id }) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch(`https://recs_paper-1-w3981585.deta.app/recs/${id}`);
      const data = await response.json();
      const info = data.results[0]
      console.log("Hover making an api call")
      console.log(info)
      setInfo(data);
    };

    fetchInfo();
  }, [id]);

  if (!info) {
    return null;
  }

  return (
    <div className="absolute z-10 bg-white rounded-lg p-4 shadow-lg">
      <h2 className="text-lg font-medium mb-2">{info.title}</h2>
      <p className="text-gray-500">{info.summary}</p>
    </div>
  );
};

export default HoverPopup;
