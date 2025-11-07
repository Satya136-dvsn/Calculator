import React from 'react';

/**
 * A reusable button component.
 *
 * @param {object} props - The component's props.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @param {string} props.className - Additional CSS classes to apply to the button.
 * @returns {React.ReactElement} The rendered button component.
 */
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
