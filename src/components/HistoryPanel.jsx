import React from 'react';

const HistoryPanel = ({ history, onRecall, onClose }) => {
    return (
        <div className="absolute inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Panel */}
            <div className="relative ml-auto w-72 bg-gray-800/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl animate-slide-in-right overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                    <h2 className="text-white font-bold text-sm">📜 History</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors text-lg leading-none"
                    >
                        ✕
                    </button>
                </div>

                {/* History entries */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {history.length === 0 ? (
                        <p className="text-gray-500 text-xs text-center py-8">No calculations yet</p>
                    ) : (
                        [...history].reverse().map((entry, i) => (
                            <button
                                key={i}
                                onClick={() => onRecall(entry.result)}
                                className="w-full text-right p-3 rounded-xl bg-gray-700/40 hover:bg-gray-600/50 transition-all duration-150 group"
                            >
                                <div className="text-gray-400 text-xs font-mono truncate">
                                    {entry.expr}
                                </div>
                                <div className="text-white font-bold font-mono text-lg group-hover:text-orange-400 transition-colors">
                                    = {entry.result}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryPanel;
