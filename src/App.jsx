import React, { useState } from 'react';
import Display from './components/Display';
import Button from './components/Button';

/**
 * The main component for the scientific calculator.
 *
 * @returns {React.ReactElement} The rendered calculator component.
 */
const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousInput, setPreviousInput] = useState(null);
  const [isRadians, setIsRadians] = useState(true);
  const [memory, setMemory] = useState(0);

  /**
   * Handles button clicks and routes them to the appropriate function.
   *
   * @param {string} value - The value of the button that was clicked.
   */
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
    } else {
      handleOperatorInput(value);
    }
  };

  /**
   * Handles number inputs.
   *
   * @param {string} num - The number that was entered.
   */
  const handleNumberInput = (num) => {
    if (previousInput === 'operator' || previousInput === 'result') {
      setDisplayValue(num);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
    setPreviousInput('number');
  };

  /**
   * Handles parenthesis inputs.
   *
   * @param {string} paren - The parenthesis that was entered.
   */
  const handleParentheses = (paren) => {
    setDisplayValue(displayValue === '0' ? paren : displayValue + paren);
  };

  /**
   * Handles operator inputs.
   *
   * @param {string} operator - The operator that was entered.
   */
  const handleOperatorInput = (operator) => {
    const num = parseFloat(displayValue);
    let result = 0;

    switch (operator) {
      case '%':
        result = num / 100;
        break;
      case '√x':
        if (num < 0) {
          setDisplayValue('Error');
          return;
        }
        result = Math.sqrt(num);
        break;
      case 'x²':
        result = Math.pow(num, 2);
        break;
      case '1/x':
        if (num === 0) {
          setDisplayValue('Error: Cannot divide by zero');
          return;
        }
        result = 1 / num;
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
        result = isRadians ? Math.asin(num) : Math.asin(num) * (180 / Math.PI);
        break;
      case 'acos':
        result = isRadians ? Math.acos(num) : Math.acos(num) * (180 / Math.PI);
        break;
      case 'atan':
        result = isRadians ? Math.atan(num) : Math.atan(num) * (180 / Math.PI);
        break;
      case 'ln':
        if (num <= 0) {
          setDisplayValue('Error');
          return;
        }
        result = Math.log(num);
        break;
      case 'log₁₀':
        if (num <= 0) {
          setDisplayValue('Error');
          return;
        }
        result = Math.log10(num);
        break;
      case 'x!':
        if (num < 0) {
          setDisplayValue('Error');
          return;
        }
        result = factorial(num);
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case 'm+':
        setMemory(memory + num);
        return;
      case 'm-':
        setMemory(memory - num);
        return;
      case 'mr':
        setDisplayValue(memory.toString());
        return;
      case 'mc':
        setMemory(0);
        return;
      case 'Rad':
        setIsRadians(!isRadians);
        return;
      default:
        if (previousInput === 'operator') {
          setExpression(expression.slice(0, -1) + operator);
        } else if (expression) {
          const newExpression = `${expression} ${displayValue} ${operator}`;
          setExpression(newExpression);
          calculate(newExpression);
        } else {
          setExpression(`${displayValue} ${operator}`);
        }
        setPreviousInput('operator');
        return;
    }

    setDisplayValue(result.toString());
    setExpression('');
    setPreviousInput('result');
  };

  /**
   * Calculates the result of the expression.
   *
   * @param {string} [expr=''] - The expression to calculate.
   */
  const calculate = (expr = '') => {
    try {
      const currentExpression = (expr || `${expression} ${displayValue}`).replace('×', '*').replace('÷', '/').replace('xʸ', '**');
      const result = new Function(`return ${currentExpression}`)();
      setDisplayValue(result.toString());
      setExpression(expr ? currentExpression : '');
      setPreviousInput('result');
    } catch (error) {
      setDisplayValue('Error');
      setExpression('');
    }
  };

  /**
   * Calculates the factorial of a number.
   *
   * @param {number} n - The number to calculate the factorial of.
   * @returns {number} The factorial of the number.
   */
  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = n; i > 0; i--) {
      result *= i;
    }
    return result;
  };

  /**
   * Clears the display and resets the expression.
   */
  const clearDisplay = () => {
    setDisplayValue('0');
    setExpression('');
    setPreviousInput(null);
  };

  /**
   * Clears the last entry from the display.
   */
  const clearLastEntry = () => {
    if (displayValue === 'Error') {
      clearDisplay();
      return;
    }
    setDisplayValue(displayValue.slice(0, -1) || '0');
  };

  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr',
    'x²', 'ln', 'log₁₀', 'x!', 'sin', 'cos',
    'tan', 'π', 'e', 'Rad', 'asin', 'acos',
    'atan', 'C', 'CE', '%', '÷', '7',
    '8', '9', '×', '4', '5', '6', '-',
    '1', '2', '3', '+', '0', '.', '='
  ];

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-white text-3xl font-bold mb-4 text-center">Scientific Calculator</h1>
        <Display value={displayValue} />
        <div className="grid grid-cols-6 gap-2">
          {buttons.map((btn, i) => {
            let className = 'bg-gray-600 hover:bg-gray-700';
            if (['÷', '×', '-', '+', '='].includes(btn)) {
              className = 'bg-orange-500 hover:bg-orange-600';
            } else if (['C', 'CE', '%', '√x', 'x²', '1/x', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'log₁₀', 'x!', 'π', 'e'].includes(btn)) {
              className = 'bg-gray-500 hover:bg-gray-600';
            } else if (['mc', 'm+', 'm-', 'mr'].includes(btn)) {
              className = 'bg-purple-500 hover:bg-purple-600';
            } else if (btn === 'Rad') {
              className = isRadians ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600';
            }

            return (
              <Button
                key={i}
                onClick={() => handleButtonClick(btn)}
                className={className}
              >
                {btn === 'Rad' ? (isRadians ? 'Rad' : 'Deg') : btn}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
