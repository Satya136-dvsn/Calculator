import React from 'react';

/**
 * A component to display the calculator's current value.
 *
 * @param {object} props - The component's props.
 * @param {string} props.value - The value to display.
 * @returns {React.ReactElement} The rendered display component.
 */
const Display = ({ value }) => {
  return (
    <div className="bg-gray-700 text-white text-4xl text-right p-4 rounded-md mb-4">
      {value}
    </div>
  );
};

export default Display;
