import React, { useState } from 'react';
import { numIntegrate, numDerivative, summation, product } from '../mathUtils';

const IntegralPanel = ({ onClose }) => {
    const [mode, setMode] = useState('integrate');
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleInput = (key, value) => {
        setInputs(prev => ({ ...prev, [key]: value }));
        setResult(null);
        setError(null);
    };

    const createFn = (expr) => {
        try {
            // eslint-disable-next-line no-new-func
            return new Function('x', `return ${expr.replace(/\^/g, '**')}`);
        } catch {
            return null;
        }
    };

    const calculate = () => {
        setError(null);
        const fn = createFn(inputs.expr || 'x');
        if (!fn) {
            setError('Invalid expression');
            return;
        }

        try {
            let res;
            switch (mode) {
                case 'integrate':
                    res = numIntegrate(fn, parseFloat(inputs.a || 0), parseFloat(inputs.b || 1));
                    break;
                case 'derivative':
                    res = numDerivative(fn, parseFloat(inputs.x || 0));
                    break;
                case 'summation':
                    res = summation(fn, parseInt(inputs.start || 1), parseInt(inputs.end || 10));
                    break;
                case 'product':
                    res = product(fn, parseInt(inputs.start || 1), parseInt(inputs.end || 10));
                    break;
                default:
                    break;
            }
            if (isNaN(res) || !isFinite(res)) {
                setError('Math Error');
            } else {
                setResult(Math.round(res * 1e10) / 1e10);
            }
        } catch {
            setError('Calculation error');
        }
    };

    const modes = [
        { id: 'integrate', label: '∫ dx', desc: 'Integrate' },
        { id: 'derivative', label: 'd/dx', desc: 'Derivative' },
        { id: 'summation', label: 'Σ', desc: 'Summation' },
        { id: 'product', label: 'Π', desc: 'Product' },
    ];

    const inputField = (key, placeholder, width = 'w-full') => (
        <input
            key={key}
            type={key === 'expr' ? 'text' : 'number'}
            step="any"
            value={inputs[key] || ''}
            onChange={(e) => handleInput(key, e.target.value)}
            placeholder={placeholder}
            className={`${width} bg-gray-700/60 text-white text-sm py-2 px-3 rounded-lg
        border border-gray-600/50 focus:border-orange-500 focus:outline-none
        placeholder-gray-500 font-mono transition-colors`}
        />
    );

    return (
        <div className="space-y-3">
            {/* Mode selector */}
            <div className="grid grid-cols-4 gap-1">
                {modes.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => { setMode(m.id); setInputs({}); setResult(null); setError(null); }}
                        className={`py-2 rounded-lg text-center transition-all
              ${mode === m.id
                                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md'
                                : 'bg-gray-700/50 text-gray-400 hover:text-white'
                            }`}
                    >
                        <span className="block text-base font-bold leading-none">{m.label}</span>
                        <span className="text-[10px] opacity-70">{m.desc}</span>
                    </button>
                ))}
            </div>

            {/* Expression input */}
            <div>
                <label className="text-gray-400 text-xs mb-1 block">f(x) =</label>
                {inputField('expr', 'e.g. x**2 + 3*x')}
                <p className="text-gray-600 text-[10px] mt-1">Use x as variable. Operators: + - * / ** (power). Math.sin(x), Math.sqrt(x) etc.</p>
            </div>

            {/* Parameters */}
            {(mode === 'integrate') && (
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block">Lower (a)</label>
                        {inputField('a', '0')}
                    </div>
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block">Upper (b)</label>
                        {inputField('b', '1')}
                    </div>
                </div>
            )}

            {mode === 'derivative' && (
                <div>
                    <label className="text-gray-400 text-xs mb-1 block">At x =</label>
                    {inputField('x', '0')}
                </div>
            )}

            {(mode === 'summation' || mode === 'product') && (
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block">Start</label>
                        {inputField('start', '1')}
                    </div>
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block">End</label>
                        {inputField('end', '10')}
                    </div>
                </div>
            )}

            {/* Calculate button */}
            <button
                onClick={calculate}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
            >
                Calculate
            </button>

            {/* Result */}
            {(result !== null || error) && (
                <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/50 text-center">
                    {error ? (
                        <span className="text-red-400 text-sm">{error}</span>
                    ) : (
                        <div>
                            <span className="text-gray-400 text-xs">Result =</span>
                            <div className="text-white font-bold font-mono text-2xl mt-1">{result}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default IntegralPanel;
