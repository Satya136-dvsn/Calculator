import React from 'react';
import PropTypes from 'prop-types';

/**
 * Enhanced display component with expression preview, aria-live for accessibility
 */
const Display = ({ value, expression }) => {
  const displayedValue = value.length > 18 ? value.slice(0, 18) + '…' : value;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 mb-3 border border-gray-700/50 shadow-inner">
      {/* Expression line */}
      <div className="text-gray-400 text-xs text-right h-5 overflow-hidden font-mono truncate" aria-label="Expression">
        {expression || '\u00A0'}
      </div>

      {/* Main value — aria-live announces changes to screen readers */}
      <div
        className="text-white text-right font-bold font-mono overflow-hidden transition-all duration-150 min-h-10"
        role="status"
        aria-live="polite"
        aria-label={`Result: ${displayedValue}`}
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

Display.propTypes = {
  value: PropTypes.string.isRequired,
  expression: PropTypes.string,
};

export default Display;
