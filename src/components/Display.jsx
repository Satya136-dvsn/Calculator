import React from 'react';

/**
 * Enhanced display component with expression preview, mode indicators, and animated value
 */
const Display = ({ value, expression }) => {
  const displayedValue = value.length > 18 ? value.slice(0, 18) + '…' : value;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 mb-3 border border-gray-700/50 shadow-inner">
      {/* Expression line */}
      <div className="text-gray-400 text-xs text-right h-5 overflow-hidden font-mono truncate">
        {expression || '\u00A0'}
      </div>

      {/* Main value */}
      <div
        className="text-white text-right font-bold font-mono overflow-hidden transition-all duration-150 min-h-[2.5rem]"
        style={{
          fontSize: displayedValue.length > 14 ? '1.25rem' : displayedValue.length > 10 ? '1.75rem' : '2.25rem',
          lineHeight: '1.2'
        }}
      >
        {displayedValue}
      </div>
    </div>
  );
};

export default Display;
