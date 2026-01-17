import React, { useState, useEffect, useCallback } from 'react';
import Display from './components/Display';
import Button from './components/Button';

/**
 * Advanced Scientific Calculator Component
 * Features: Full scientific functions, keyboard support, expression history
 */
const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousInput, setPreviousInput] = useState(null);
  const [isRadians, setIsRadians] = useState(true);
  const [memory, setMemory] = useState(0);
  const [lastAnswer, setLastAnswer] = useState(0);
  const [isSecondMode, setIsSecondMode] = useState(false);
  const [history, setHistory] = useState([]);

  // Keyboard support
  const handleKeyDown = useCallback((e) => {
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
    }
  }, [displayValue, expression, previousInput]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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
      calculate();
    } else if (['(', ')'].includes(value)) {
      handleParentheses(value);
    } else if (value === '2nd') {
      setIsSecondMode(!isSecondMode);
    } else if (value === 'Ans') {
      setDisplayValue(lastAnswer.toString());
      setPreviousInput('number');
    } else {
      handleOperatorInput(value);
    }
  };

  const handleNumberInput = (num) => {
    if (previousInput === 'operator' || previousInput === 'result') {
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

  const handleOperatorInput = (operator) => {
    const num = parseFloat(displayValue);
    let result = 0;

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
        if (previousInput === 'operator') {
          setExpression(expression.slice(0, -3) + ' ** ');
        } else if (expression) {
          setExpression(`${expression} ${displayValue} ** `);
        } else {
          setExpression(`${displayValue} ** `);
        }
        setPreviousInput('operator');
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

    setDisplayValue(formatResult(result));
    setExpression('');
    setPreviousInput('result');
  };

  const calculate = () => {
    try {
      const fullExpression = expression ? `${expression} ${displayValue}` : displayValue;
      const sanitized = fullExpression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\s+/g, ' ')
        .trim();
      
      const result = new Function(`return ${sanitized}`)();
      
      if (!isFinite(result)) {
        setDisplayValue('Error');
        return;
      }
      
      const formattedResult = formatResult(result);
      
      // Add to history
      setHistory(prev => [...prev.slice(-4), { expr: fullExpression, result: formattedResult }]);
      setLastAnswer(result);
      setDisplayValue(formattedResult);
      setExpression('');
      setPreviousInput('result');
    } catch (error) {
      setDisplayValue('Error');
      setExpression('');
    }
  };

  const formatResult = (result) => {
    if (Math.abs(result) < 1e-10 && result !== 0) return result.toExponential(6);
    if (Math.abs(result) > 1e10) return result.toExponential(6);
    const rounded = Math.round(result * 1e10) / 1e10;
    return rounded.toString();
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = n; i > 0; i--) result *= i;
    return result;
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setExpression('');
    setPreviousInput(null);
  };

  const clearLastEntry = () => {
    if (displayValue === 'Error') {
      clearDisplay();
      return;
    }
    setDisplayValue(displayValue.slice(0, -1) || '0');
  };

  // Primary buttons (shown when 2nd is OFF)
  const primaryButtons = [
    '2nd', '(', ')', 'mc', 'm+', 'm-', 'mr',
    'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', 'ln', 'log₁₀',
    '1/x', '√x', '∛x', 'x!', 'sin', 'cos', 'tan',
    'π', 'e', 'Ans', 'Rad', 'C', 'CE', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '+/-', '0', '.', '='
  ];

  // Secondary buttons (shown when 2nd is ON)
  const secondaryButtons = [
    '2nd', '(', ')', 'mc', 'm+', 'm-', 'mr',
    '|x|', '⌊x⌋', '⌈x⌉', '2ˣ', 'log₂', 'sinh', 'cosh',
    'tanh', 'asin', 'acos', 'atan', '%', '√x', '∛x',
    'π', 'e', 'Ans', 'Rad', 'C', 'CE', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '+/-', '0', '.', '='
  ];

  const buttons = isSecondMode ? secondaryButtons : primaryButtons;

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

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Calculator Container */}
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-gray-700/50">
          
          {/* Header */}
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-2xl font-bold mb-4 text-center">
            Scientific Calculator
          </h1>

          {/* Mode Indicators */}
          <div className="flex justify-between mb-2 px-2 text-xs">
            <span className={`px-2 py-1 rounded-full ${memory !== 0 ? 'bg-purple-500/30 text-purple-300' : 'text-gray-600'}`}>
              {memory !== 0 ? `M: ${memory}` : 'M'}
            </span>
            <span className={`px-2 py-1 rounded-full ${isRadians ? 'bg-blue-500/30 text-blue-300' : 'bg-green-500/30 text-green-300'}`}>
              {isRadians ? 'RAD' : 'DEG'}
            </span>
          </div>

          {/* Display */}
          <Display value={displayValue} expression={expression} />

          {/* Button Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {buttons.map((btn, i) => (
              <Button
                key={`${btn}-${i}`}
                onClick={() => handleButtonClick(btn)}
                className={`${getButtonStyle(btn)} ${
                  btn === '=' ? 'col-span-1' : ''
                }`}
              >
                {btn === 'Rad' ? (isRadians ? 'RAD' : 'DEG') : btn}
              </Button>
            ))}
          </div>

          {/* Keyboard hint */}
          <p className="text-gray-500 text-xs text-center mt-4">
            ⌨️ Keyboard supported: 0-9, +, -, *, /, Enter, Esc
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
