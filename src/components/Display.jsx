import React from 'react';

/**
 * Enhanced display component with expression preview and animated value
 */
const Display = ({ value, expression }) => {
  // Truncate long numbers for display
  const displayedValue = value.length > 15 ? value.slice(0, 15) + '...' : value;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 mb-4 border border-gray-700/50 shadow-inner">
      {/* Expression line */}
      <div className="text-gray-400 text-sm text-right h-6 overflow-hidden font-mono">
        {expression || '\u00A0'}
      </div>

      {/* Main value */}
      <div
        className="text-white text-right font-bold font-mono overflow-hidden transition-all duration-150"
        style={{
          fontSize: displayedValue.length > 10 ? '1.75rem' : '2.5rem',
          lineHeight: '1.2'
        }}
      >
        {displayedValue}
      </div>
    </div>
  );
};

export default Display;
