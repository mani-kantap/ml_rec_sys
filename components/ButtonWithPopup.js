import { useState } from 'react';
import HoverPopup from './HoverPopup';

const ButtonWithPopup = ({ id, label }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleClick}
      >
        {label}
      </button>
      {showPopup && <HoverPopup id={id} />}
    </div>
  );
};

export default ButtonWithPopup;
