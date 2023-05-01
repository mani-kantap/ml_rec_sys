import { useState, useEffect } from 'react';

const InfoPopup = ({ id }) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch(`/api/hello`);
      const data = await response.json();
      setInfo(data);
    };

    fetchInfo();
  }, [id]);

  if (!info) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-4 shadow-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-medium mb-2">{info.title}</h2>
        <p className="text-gray-500">{info.description}</p>
      </div>
    </div>
  );
};

export default InfoPopup;
