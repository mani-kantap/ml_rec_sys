import React, { useState } from "react";
import Link from "next/link";

function SearchResult({ title, summary, index_ }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="px-4 py-2 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-gray-400">
        <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-xl">{title}       
            </div>
            <Link className="ml-2 text-blue-500" href={`/paper/${index_}`} >
                    Get Recommendations
                </Link>
        </div>
      <p className="text-gray-700 text-base">
        {expanded ? summary : summary.slice(0, 50) + "..."}
        <button
          className="ml-2 text-blue-500"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      </p>

    </div>
  );
}

export default SearchResult;
