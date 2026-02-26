import React, { useState, useEffect, useCallback } from 'react';
import Display from './components/Display';
import Button from './components/Button';
import ModeBar from './components/ModeBar';
import HistoryPanel from './components/HistoryPanel';
import EquationSolver from './components/EquationSolver';
import BaseConverter from './components/BaseConverter';
import IntegralPanel from './components/IntegralPanel';
import {
  factorial, nPr, nCr, gcd, lcm, mod,
  toPolar, toRect, decToDms, dmsToDec, formatDms,
  nthRoot, randomNum, randomInt,
  formatResult, toEngNotation,
} from './mathUtils';

/**
 * Casio fx-991EX ClassWiz Scientific Calculator
 * Full-featured scientific calculator with COMP, BASE-N, EQN, and ∫dx modes
 */
const App = () => {
  // ─── Core State ────────────────────────────────────
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousInput, setPreviousInput] = useState(null);
  const [isRadians, setIsRadians] = useState(true);
  const [memory, setMemory] = useState(0);
  const [lastAnswer, setLastAnswer] = useState(0);
  const [isSecondMode, setIsSecondMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [engMode, setEngMode] = useState(false);

  // ─── Mode State ────────────────────────────────────
  const [calcMode, setCalcMode] = useState('COMP');
  const [showHistory, setShowHistory] = useState(false);

  // ─── Two-operand function state ────────────────────
  const [pendingTwoOp, setPendingTwoOp] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);

  // ─── Keyboard support ──────────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (calcMode !== 'COMP') return; // Keyboard only in COMP mode

    const key = e.key;
    if (/^[0-9.]$/.test(key)) {
      handleButtonClick(key);
    } else if (key === '+') {
      handleButtonClick('+');
    } else if (key === '-') {
      handleButtonClick('-');
    } else if (key === '*') {
      handleButtonClick('×');
    } else if (key === '/') {
      e.preventDefault();
      handleButtonClick('÷');
    } else if (key === 'Enter' || key === '=') {
      e.preventDefault();
      handleButtonClick('=');
    } else if (key === 'Escape') {
      handleButtonClick('C');
    } else if (key === 'Backspace') {
      handleButtonClick('CE');
    } else if (key === '(' || key === ')') {
      handleButtonClick(key);
    } else if (key === '^') {
      handleButtonClick('xʸ');
    } else if (key === '%') {
      handleButtonClick('%');
    } else if (key === '!') {
      handleButtonClick('x!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayValue, expression, previousInput, calcMode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // ─── Main Click Handler ────────────────────────────
  const handleButtonClick = (value) => {
    if (displayValue === 'Error') {
      clearDisplay();
      if (!isNaN(value) || value === '.') {
        handleNumberInput(value);
      }
      return;
    }

    if (!isNaN(value) || value === '.') {
      handleNumberInput(value);
    } else if (value === 'C') {
      clearDisplay();
    } else if (value === 'CE') {
      clearLastEntry();
    } else if (value === '=') {
      if (pendingTwoOp) {
        executeTwoOpFunction();
      } else {
        calculate();
      }
    } else if (['(', ')'].includes(value)) {
      handleParentheses(value);
    } else if (value === '2nd') {
      setIsSecondMode(!isSecondMode);
    } else if (value === 'Ans') {
      setDisplayValue(lastAnswer.toString());
      setPreviousInput('number');
    } else if (value === 'HIST') {
      setShowHistory(true);
    } else if (value === 'ENG') {
      setEngMode(!engMode);
    } else {
      handleOperatorInput(value);
    }
  };

  // ─── Number Input ──────────────────────────────────
  const handleNumberInput = (num) => {
    if (previousInput === 'operator' || previousInput === 'result' || previousInput === 'two-op') {
      setDisplayValue(num);
    } else {
      if (num === '.' && displayValue.includes('.')) return;
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
    setPreviousInput('number');
  };

  const handleParentheses = (paren) => {
    setDisplayValue(displayValue === '0' ? paren : displayValue + paren);
    setPreviousInput('paren');
  };

  // ─── Two-operand function handler ──────────────────
  const initTwoOpFunction = (funcName) => {
    setPendingTwoOp(funcName);
    setFirstOperand(parseFloat(displayValue));
    setExpression(`${displayValue} ${funcName} `);
    setPreviousInput('two-op');
  };

  const executeTwoOpFunction = () => {
    const a = firstOperand;
    const b = parseFloat(displayValue);
    let result;

    switch (pendingTwoOp) {
      case 'nPr': result = nPr(a, b); break;
      case 'nCr': result = nCr(a, b); break;
      case 'GCD': result = gcd(a, b); break;
      case 'LCM': result = lcm(a, b); break;
      case 'mod': result = mod(a, b); break;
      case 'ⁿ√x': result = nthRoot(b, a); break; // a-th root of b → nthRoot(b, a)
      case 'xʸ':
        result = Math.pow(a, b);
        break;
      case 'Pol':
        const pol = toPolar(a, b, !isRadians);
        setDisplayValue(`r=${formatResult(pol.r, engMode)}`);
        setExpression(`θ=${formatResult(pol.theta, engMode)}`);
        addToHistory(`Pol(${a}, ${b})`, `r=${formatResult(pol.r)}, θ=${formatResult(pol.theta)}`);
        setPendingTwoOp(null);
        setFirstOperand(null);
        setPreviousInput('result');
        return;
      case 'Rec':
        const rec = toRect(a, b, !isRadians);
        setDisplayValue(`x=${formatResult(rec.x, engMode)}`);
        setExpression(`y=${formatResult(rec.y, engMode)}`);
        addToHistory(`Rec(${a}, ${b})`, `x=${formatResult(rec.x)}, y=${formatResult(rec.y)}`);
        setPendingTwoOp(null);
        setFirstOperand(null);
        setPreviousInput('result');
        return;
      case 'RanInt':
        result = randomInt(a, b);
        break;
      default:
        result = NaN;
    }

    if (isNaN(result) || !isFinite(result)) {
      setDisplayValue('Error');
    } else {
      const formatted = formatResult(result, engMode);
      addToHistory(`${a} ${pendingTwoOp} ${b}`, formatted);
      setDisplayValue(formatted);
      setLastAnswer(result);
    }
    setExpression('');
    setPendingTwoOp(null);
    setFirstOperand(null);
    setPreviousInput('result');
  };

  // ─── Operator Handler ──────────────────────────────
  const handleOperatorInput = (operator) => {
    const num = parseFloat(displayValue);
    let result = 0;

    // Two-operand functions
    if (['nPr', 'nCr', 'GCD', 'LCM', 'mod', 'ⁿ√x', 'Pol', 'Rec', 'RanInt'].includes(operator)) {
      initTwoOpFunction(operator);
      return;
    }

    switch (operator) {
      case '%':
        result = num / 100;
        break;
      case '√x':
        if (num < 0) { setDisplayValue('Error'); return; }
        result = Math.sqrt(num);
        break;
      case '∛x':
        result = Math.cbrt(num);
        break;
      case 'x²':
        result = Math.pow(num, 2);
        break;
      case 'x³':
        result = Math.pow(num, 3);
        break;
      case '1/x':
        if (num === 0) { setDisplayValue('Error'); return; }
        result = 1 / num;
        break;
      case '|x|':
        result = Math.abs(num);
        break;
      case '⌊x⌋':
        result = Math.floor(num);
        break;
      case '⌈x⌉':
        result = Math.ceil(num);
        break;
      case 'Rnd':
        result = Math.round(num * 1e10) / 1e10;
        break;
      case 'sin':
        result = isRadians ? Math.sin(num) : Math.sin(num * (Math.PI / 180));
        break;
      case 'cos':
        result = isRadians ? Math.cos(num) : Math.cos(num * (Math.PI / 180));
        break;
      case 'tan':
        result = isRadians ? Math.tan(num) : Math.tan(num * (Math.PI / 180));
        break;
      case 'asin':
        if (num < -1 || num > 1) { setDisplayValue('Error'); return; }
        result = isRadians ? Math.asin(num) : Math.asin(num) * (180 / Math.PI);
        break;
      case 'acos':
        if (num < -1 || num > 1) { setDisplayValue('Error'); return; }
        result = isRadians ? Math.acos(num) : Math.acos(num) * (180 / Math.PI);
        break;
      case 'atan':
        result = isRadians ? Math.atan(num) : Math.atan(num) * (180 / Math.PI);
        break;
      case 'sinh':
        result = Math.sinh(num);
        break;
      case 'cosh':
        result = Math.cosh(num);
        break;
      case 'tanh':
        result = Math.tanh(num);
        break;
      case 'asinh':
        result = Math.asinh(num);
        break;
      case 'acosh':
        if (num < 1) { setDisplayValue('Error'); return; }
        result = Math.acosh(num);
        break;
      case 'atanh':
        if (num <= -1 || num >= 1) { setDisplayValue('Error'); return; }
        result = Math.atanh(num);
        break;
      case 'ln':
        if (num <= 0) { setDisplayValue('Error'); return; }
        result = Math.log(num);
        break;
      case 'log₁₀':
        if (num <= 0) { setDisplayValue('Error'); return; }
        result = Math.log10(num);
        break;
      case 'log₂':
        if (num <= 0) { setDisplayValue('Error'); return; }
        result = Math.log2(num);
        break;
      case 'eˣ':
        result = Math.exp(num);
        break;
      case '10ˣ':
        result = Math.pow(10, num);
        break;
      case '2ˣ':
        result = Math.pow(2, num);
        break;
      case 'x!':
        if (num < 0 || !Number.isInteger(num)) { setDisplayValue('Error'); return; }
        result = factorial(num);
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case '+/-':
        result = -num;
        break;
      case 'Ran#':
        result = randomNum();
        break;
      case 'DMS':
        setDisplayValue(formatDms(num));
        setPreviousInput('result');
        return;
      case '→DEG': {
        const { d, m, s } = decToDms(num);
        result = dmsToDec(d, m, s);
        break;
      }
      case 'm+':
        setMemory(memory + num);
        return;
      case 'm-':
        setMemory(memory - num);
        return;
      case 'mr':
        setDisplayValue(memory.toString());
        setPreviousInput('number');
        return;
      case 'mc':
        setMemory(0);
        return;
      case 'Rad':
        setIsRadians(!isRadians);
        return;
      case 'xʸ':
        initTwoOpFunction('xʸ');
        return;
      default:
        if (previousInput === 'operator') {
          setExpression(expression.slice(0, -3) + ` ${operator} `);
        } else if (expression) {
          setExpression(`${expression} ${displayValue} ${operator} `);
        } else {
          setExpression(`${displayValue} ${operator} `);
        }
        setPreviousInput('operator');
        return;
    }

    const formatted = formatResult(result, engMode);
    setDisplayValue(formatted);
    setExpression('');
    setPreviousInput('result');
  };

  // ─── Calculate Expression ──────────────────────────
  const calculate = () => {
    try {
      const fullExpression = expression ? `${expression} ${displayValue}` : displayValue;
      const sanitized = fullExpression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\s+/g, ' ')
        .trim();

      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${sanitized}`)();

      if (!isFinite(result)) {
        setDisplayValue('Error');
        return;
      }

      const formattedResult = formatResult(result, engMode);
      addToHistory(fullExpression, formattedResult);
      setLastAnswer(result);
      setDisplayValue(formattedResult);
      setExpression('');
      setPreviousInput('result');
    } catch {
      setDisplayValue('Error');
      setExpression('');
    }
  };

  // ─── History Helper ────────────────────────────────
  const addToHistory = (expr, result) => {
    setHistory(prev => [...prev.slice(-19), { expr, result }]);
  };

  // ─── Clear ─────────────────────────────────────────
  const clearDisplay = () => {
    setDisplayValue('0');
    setExpression('');
    setPreviousInput(null);
    setPendingTwoOp(null);
    setFirstOperand(null);
  };

  const clearLastEntry = () => {
    if (displayValue === 'Error') {
      clearDisplay();
      return;
    }
    setDisplayValue(displayValue.slice(0, -1) || '0');
  };

  const handleHistoryRecall = (val) => {
    setDisplayValue(val.toString());
    setPreviousInput('number');
    setShowHistory(false);
  };

  // ─── Button Layouts ────────────────────────────────
  const primaryButtons = [
    '2nd', '(', ')', 'mc', 'm+', 'm-', 'mr', 'HIST',
    'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', 'ln', 'log₁₀', 'ENG',
    '1/x', '√x', '∛x', 'x!', 'sin', 'cos', 'tan', 'nPr',
    'π', 'e', 'Ans', 'Rad', 'C', 'CE', '÷', 'nCr',
    '7', '8', '9', '×', 'GCD', 'LCM', 'mod', 'ⁿ√x',
    '4', '5', '6', '-', 'Pol', 'Rec', 'DMS', 'Ran#',
    '1', '2', '3', '+',
    '+/-', '0', '.', '=',
  ];

  const secondaryButtons = [
    '2nd', '(', ')', 'mc', 'm+', 'm-', 'mr', 'HIST',
    '|x|', '⌊x⌋', '⌈x⌉', '2ˣ', 'log₂', 'sinh', 'cosh', 'ENG',
    'tanh', 'asin', 'acos', 'atan', 'asinh', 'acosh', 'atanh', '%',
    'π', 'e', 'Ans', 'Rad', 'C', 'CE', '÷', 'Rnd',
    '7', '8', '9', '×', 'RanInt', '→DEG', 'x⁻¹', 'ⁿ√x',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '+/-', '0', '.', '=',
  ];

  const buttons = isSecondMode ? secondaryButtons : primaryButtons;

  // ─── Button Styling ────────────────────────────────
  const getButtonStyle = (btn) => {
    if (btn === '2nd') {
      return isSecondMode
        ? 'bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/30'
        : 'bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600';
    }
    if (['÷', '×', '-', '+', '='].includes(btn)) {
      return 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 shadow-lg shadow-orange-500/20';
    }
    if (['C', 'CE'].includes(btn)) {
      return 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500';
    }
    if (['mc', 'm+', 'm-', 'mr'].includes(btn)) {
      return 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500';
    }
    if (['nPr', 'nCr', 'GCD', 'LCM', 'mod', 'Pol', 'Rec', 'RanInt'].includes(btn)) {
      return 'bg-gradient-to-br from-teal-600 to-cyan-700 hover:from-teal-500 hover:to-cyan-600';
    }
    if (['HIST', 'ENG', 'DMS', 'Ran#', 'ⁿ√x', '→DEG', 'Rnd', 'x⁻¹'].includes(btn)) {
      return 'bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600';
    }
    if (btn === 'Rad') {
      return isRadians
        ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500'
        : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500';
    }
    if (!isNaN(btn) || btn === '.' || btn === '+/-') {
      return 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700';
    }
    return 'bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600';
  };

  // ─── Render ────────────────────────────────────────
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl relative">
        {/* Calculator Container */}
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-5 border border-gray-700/50">

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-xl font-bold">
              fx-991EX
            </h1>
            <span className="text-gray-500 text-[10px] tracking-widest uppercase">Scientific Calculator</span>
          </div>

          {/* Mode Bar */}
          <ModeBar calcMode={calcMode} setCalcMode={(m) => { setCalcMode(m); clearDisplay(); }} />

          {/* Mode Indicators */}
          {calcMode === 'COMP' && (
            <div className="flex justify-between mb-2 px-2 text-xs">
              <span className={`px-2 py-0.5 rounded-full ${memory !== 0 ? 'bg-purple-500/30 text-purple-300' : 'text-gray-600'}`}>
                {memory !== 0 ? `M: ${memory}` : 'M'}
              </span>
              <div className="flex gap-2">
                {engMode && <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300">ENG</span>}
                {pendingTwoOp && <span className="px-2 py-0.5 rounded-full bg-teal-500/30 text-teal-300">{pendingTwoOp}</span>}
                <span className={`px-2 py-0.5 rounded-full ${isRadians ? 'bg-blue-500/30 text-blue-300' : 'bg-green-500/30 text-green-300'}`}>
                  {isRadians ? 'RAD' : 'DEG'}
                </span>
              </div>
            </div>
          )}

          {/* ── COMP Mode ──────────────────────────── */}
          {calcMode === 'COMP' && (
            <>
              {/* Display */}
              <Display value={displayValue} expression={expression} />

              {/* Button Grid */}
              <div className="grid grid-cols-8 gap-1">
                {buttons.map((btn, i) => (
                  <Button
                    key={`${btn}-${i}`}
                    onClick={() => handleButtonClick(btn)}
                    className={getButtonStyle(btn)}
                    compact={true}
                  >
                    {btn === 'Rad' ? (isRadians ? 'RAD' : 'DEG') : btn === 'x⁻¹' ? '1/x' : btn}
                  </Button>
                ))}
              </div>

              {/* Keyboard hint */}
              <p className="text-gray-500 text-[10px] text-center mt-3">
                ⌨️ Keyboard: 0-9, +, -, *, /, ^, !, Enter, Esc, Backspace
              </p>
            </>
          )}

          {/* ── BASE-N Mode ────────────────────────── */}
          {calcMode === 'BASE-N' && <BaseConverter />}

          {/* ── EQN Mode ───────────────────────────── */}
          {calcMode === 'EQN' && <EquationSolver />}

          {/* ── INTEGRAL Mode ──────────────────────── */}
          {calcMode === 'INTEGRAL' && <IntegralPanel />}

        </div>
      </div>

      {/* History Panel Overlay */}
      {showHistory && (
        <HistoryPanel
          history={history}
          onRecall={handleHistoryRecall}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
};

export default App;
