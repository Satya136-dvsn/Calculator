import React from 'react';

const Display = ({ value }) => {
  return (
    <div className="bg-gray-700 text-white text-4xl text-right p-4 rounded-md mb-4">
      {value}
    </div>
  );
};

export default Display;
