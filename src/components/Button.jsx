import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 rounded-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
