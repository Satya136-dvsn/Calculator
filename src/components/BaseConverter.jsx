import React from 'react';
import { toBase, fromBase } from '../mathUtils';

const BaseConverter = ({ displayValue, onInput, onClear }) => {
    const [currentBase, setCurrentBase] = React.useState('DEC');
    const [inputValue, setInputValue] = React.useState('0');

    const bases = ['DEC', 'HEX', 'OCT', 'BIN'];

    const handleBaseChange = (newBase) => {
        try {
            const decValue = fromBase(inputValue, currentBase);
            if (isNaN(decValue)) {
                setInputValue('0');
            } else {
                setInputValue(toBase(decValue, newBase));
            }
            setCurrentBase(newBase);
        } catch {
            setInputValue('0');
            setCurrentBase(newBase);
        }
    };

    const handleButtonClick = (val) => {
        if (val === 'C') {
            setInputValue('0');
            return;
        }
        if (val === 'CE') {
            setInputValue(inputValue.length > 1 ? inputValue.slice(0, -1) : '0');
            return;
        }
        setInputValue(inputValue === '0' ? val : inputValue + val);
    };

    const getDecimalValue = () => {
        try {
            return fromBase(inputValue, currentBase);
        } catch {
            return 0;
        }
    };

    const decVal = getDecimalValue();

    // Determine valid buttons for current base
    const allDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    const validDigits = {
        BIN: ['0', '1'],
        OCT: ['0', '1', '2', '3', '4', '5', '6', '7'],
        DEC: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        HEX: allDigits,
    };

    const isValidDigit = (d) => validDigits[currentBase]?.includes(d);

    return (
        <div className="space-y-3">
            {/* Base selector */}
            <div className="grid grid-cols-4 gap-1">
                {bases.map((base) => (
                    <button
                        key={base}
                        onClick={() => handleBaseChange(base)}
                        className={`
              py-2 rounded-lg text-xs font-bold transition-all
              ${currentBase === base
                                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                                : 'bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-600/50'
                            }
            `}
                    >
                        {base}
                    </button>
                ))}
            </div>

            {/* Current value display */}
            <div className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/50">
                <div className="text-right font-mono text-white text-2xl font-bold overflow-x-auto">
                    {inputValue}
                </div>
                <div className="text-right text-gray-500 text-xs mt-1">
                    {currentBase} mode
                </div>
            </div>

            {/* All base values */}
            <div className="bg-gray-900/40 rounded-xl p-3 space-y-1.5 border border-gray-700/30">
                {bases.map((base) => (
                    <div key={base} className="flex justify-between items-center">
                        <span className={`text-xs font-bold w-8 ${currentBase === base ? 'text-cyan-400' : 'text-gray-500'}`}>
                            {base}
                        </span>
                        <span className={`font-mono text-sm text-right flex-1 ml-3 truncate ${currentBase === base ? 'text-white' : 'text-gray-400'}`}>
                            {isNaN(decVal) ? 'Error' : toBase(decVal, base)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Input buttons */}
            <div className="grid grid-cols-6 gap-1">
                {allDigits.map((d) => (
                    <button
                        key={d}
                        onClick={() => handleButtonClick(d)}
                        disabled={!isValidDigit(d)}
                        className={`
              py-2.5 rounded-lg text-sm font-bold font-mono transition-all
              ${!isValidDigit(d)
                                ? 'bg-gray-800/30 text-gray-700 cursor-not-allowed'
                                : 'bg-gray-700/60 text-white hover:bg-gray-600/60 active:scale-95'
                            }
            `}
                    >
                        {d}
                    </button>
                ))}
            </div>

            {/* Clear buttons */}
            <div className="grid grid-cols-2 gap-1.5">
                <button
                    onClick={() => handleButtonClick('CE')}
                    className="py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold rounded-xl transition-colors"
                >
                    ⌫ CE
                </button>
                <button
                    onClick={() => handleButtonClick('C')}
                    className="py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white text-sm font-bold rounded-xl transition-colors"
                >
                    C
                </button>
            </div>
        </div>
    );
};

export default BaseConverter;
