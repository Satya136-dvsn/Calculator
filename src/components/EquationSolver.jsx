import React, { useState } from 'react';
import { solveQuadratic, solveCubic, solveLinear2, solveLinear3 } from '../mathUtils';

const EquationSolver = ({ onClose }) => {
    const [eqType, setEqType] = useState('quadratic');
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);

    const handleInput = (key, value) => {
        setInputs(prev => ({ ...prev, [key]: value }));
        setResult(null);
    };

    const getNum = (key) => parseFloat(inputs[key] || '0');

    const solve = () => {
        let res;
        switch (eqType) {
            case 'quadratic':
                res = solveQuadratic(getNum('a'), getNum('b'), getNum('c'));
                break;
            case 'cubic':
                res = solveCubic(getNum('a'), getNum('b'), getNum('c'), getNum('d'));
                break;
            case 'linear2':
                res = solveLinear2(getNum('a1'), getNum('b1'), getNum('c1'), getNum('a2'), getNum('b2'), getNum('c2'));
                break;
            case 'linear3':
                res = solveLinear3([
                    [getNum('a1'), getNum('b1'), getNum('c1'), getNum('d1')],
                    [getNum('a2'), getNum('b2'), getNum('c2'), getNum('d2')],
                    [getNum('a3'), getNum('b3'), getNum('c3'), getNum('d3')],
                ]);
                break;
            default:
                break;
        }
        setResult(res);
    };

    const clear = () => {
        setInputs({});
        setResult(null);
    };

    const inputField = (key, placeholder) => (
        <input
            key={key}
            type="number"
            step="any"
            value={inputs[key] || ''}
            onChange={(e) => handleInput(key, e.target.value)}
            placeholder={placeholder}
            className="w-full bg-gray-700/60 text-white text-center text-sm py-2 px-2 rounded-lg
        border border-gray-600/50 focus:border-orange-500 focus:outline-none
        placeholder-gray-500 font-mono transition-colors"
        />
    );

    const eqTypes = [
        { id: 'quadratic', label: 'ax²+bx+c=0' },
        { id: 'cubic', label: 'ax³+bx²+cx+d=0' },
        { id: 'linear2', label: '2×2 Linear' },
        { id: 'linear3', label: '3×3 Linear' },
    ];

    return (
        <div className="space-y-3">
            {/* Equation type selector */}
            <div className="grid grid-cols-2 gap-1">
                {eqTypes.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => { setEqType(t.id); clear(); }}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all
              ${eqType === t.id
                                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md'
                                : 'bg-gray-700/50 text-gray-400 hover:text-white'
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Input fields */}
            <div className="space-y-2">
                {eqType === 'quadratic' && (
                    <>
                        <div className="text-gray-400 text-xs text-center font-mono">ax² + bx + c = 0</div>
                        <div className="grid grid-cols-3 gap-2">
                            {inputField('a', 'a')}
                            {inputField('b', 'b')}
                            {inputField('c', 'c')}
                        </div>
                    </>
                )}

                {eqType === 'cubic' && (
                    <>
                        <div className="text-gray-400 text-xs text-center font-mono">ax³ + bx² + cx + d = 0</div>
                        <div className="grid grid-cols-4 gap-1.5">
                            {inputField('a', 'a')}
                            {inputField('b', 'b')}
                            {inputField('c', 'c')}
                            {inputField('d', 'd')}
                        </div>
                    </>
                )}

                {eqType === 'linear2' && (
                    <>
                        <div className="text-gray-400 text-xs text-center font-mono">a₁x + b₁y = c₁</div>
                        <div className="grid grid-cols-3 gap-2">
                            {inputField('a1', 'a₁')}
                            {inputField('b1', 'b₁')}
                            {inputField('c1', 'c₁')}
                        </div>
                        <div className="text-gray-400 text-xs text-center font-mono">a₂x + b₂y = c₂</div>
                        <div className="grid grid-cols-3 gap-2">
                            {inputField('a2', 'a₂')}
                            {inputField('b2', 'b₂')}
                            {inputField('c2', 'c₂')}
                        </div>
                    </>
                )}

                {eqType === 'linear3' && (
                    <>
                        <div className="text-gray-400 text-xs text-center font-mono mb-1">a₁x + b₁y + c₁z = d₁</div>
                        {[1, 2, 3].map((row) => (
                            <div key={row} className="grid grid-cols-4 gap-1.5">
                                {inputField(`a${row}`, `a${row}`)}
                                {inputField(`b${row}`, `b${row}`)}
                                {inputField(`c${row}`, `c${row}`)}
                                {inputField(`d${row}`, `d${row}`)}
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Solve / Clear buttons */}
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={clear}
                    className="py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold rounded-xl transition-colors"
                >
                    Clear
                </button>
                <button
                    onClick={solve}
                    className="py-2 px-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
                >
                    Solve
                </button>
            </div>

            {/* Results */}
            {result && (
                <div className="bg-gray-900/60 rounded-xl p-3 border border-gray-700/50">
                    {result.error ? (
                        <div className="text-red-400 text-sm text-center">{result.error}</div>
                    ) : (
                        <div className="space-y-1">
                            {result.roots && result.roots.map((root, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-gray-400 text-xs">x{result.roots.length > 1 ? `₁₂₃`[i] : ''} =</span>
                                    <span className="text-white font-bold font-mono text-sm">{root}</span>
                                </div>
                            ))}
                            {result.x !== undefined && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-xs">x =</span>
                                        <span className="text-white font-bold font-mono text-sm">{result.x}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-xs">y =</span>
                                        <span className="text-white font-bold font-mono text-sm">{result.y}</span>
                                    </div>
                                    {result.z !== undefined && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400 text-xs">z =</span>
                                            <span className="text-white font-bold font-mono text-sm">{result.z}</span>
                                        </div>
                                    )}
                                </>
                            )}
                            {result.discriminant !== undefined && (
                                <div className="flex justify-between border-t border-gray-700/50 pt-1 mt-1">
                                    <span className="text-gray-500 text-xs">Δ =</span>
                                    <span className="text-gray-400 font-mono text-xs">{result.discriminant}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EquationSolver;
