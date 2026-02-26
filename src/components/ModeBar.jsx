import React from 'react';

const ModeBar = ({ calcMode, setCalcMode }) => {
    const modes = [
        { id: 'COMP', label: 'COMP', icon: '🔢' },
        { id: 'BASE-N', label: 'BASE', icon: '⟨⟩' },
        { id: 'EQN', label: 'EQN', icon: '📐' },
        { id: 'INTEGRAL', label: '∫dx', icon: '∫' },
    ];

    return (
        <div className="flex gap-1 mb-3">
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => setCalcMode(mode.id)}
                    className={`
            flex-1 py-1.5 px-2 rounded-lg text-xs font-bold
            transition-all duration-200 ease-out
            ${calcMode === mode.id
                            ? 'bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-lg shadow-orange-500/30 scale-105'
                            : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-gray-200'
                        }
          `}
                >
                    <span className="block text-base leading-none mb-0.5">{mode.icon}</span>
                    {mode.label}
                </button>
            ))}
        </div>
    );
};

export default ModeBar;
