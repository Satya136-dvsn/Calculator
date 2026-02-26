import React, { useState } from 'react';

/**
 * Enhanced button component with ripple effect, animations, and compact mode
 */
const Button = ({ onClick, children, className, compact = false, disabled = false }) => {
  const [ripple, setRipple] = useState({ show: false, x: 0, y: 0 });

  const handleClick = (e) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipple({ show: true, x, y });
    setTimeout(() => setRipple({ show: false, x: 0, y: 0 }), 400);

    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        text-white font-semibold rounded-xl
        transition-all duration-150 ease-out
        active:scale-95 active:brightness-90
        focus:outline-none focus:ring-2 focus:ring-white/20
        ${compact ? 'py-2 text-xs' : 'py-3 text-sm'}
        ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {/* Ripple effect */}
      {ripple.show && !disabled && (
        <span
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
