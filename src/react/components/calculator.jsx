import { useState } from 'react';
import { useEffect } from 'react';
import { evaluate } from 'mathjs';
import Display from './display.jsx';
import ButtonGrid from './buttonGrid.jsx';

const Calculator = () => {
  const [input, setNewInput] = useState('');
  const [output, setNewOutput] = useState('');
  const [isError, setIsError] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (key.toLowerCase() === 'c') {
        clearValues();
      } else if (!isNaN(key) || key === '.') {
        handleButtonClick(key);
      } else if (['+', '-', '*', '/', '%'].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Backspace') {
        handleBackspaceButton();
      } else if (key === 'Enter') {
        handleEqualButton('=');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleButtonClick = (value) => {
    const operators = ['+', '-', '*', '/'];

    setNewInput((prevInput) => {
      const lastChar = prevInput.slice(-1);

      if (operators.includes(value) && prevInput === '') return prevInput;

      if (prevInput.includes('=')) return prevInput;

      if (operators.includes(value) && operators.includes(lastChar))
        return prevInput;

      return prevInput + value;
    });
  };

  const handleEqualButton = (value) => {
    setNewInput((prevInput) => {
      const hasOperator = /[+\-*/%]/.test(prevInput);

      if (!hasOperator || prevInput.trim() === ''|| prevInput.includes(value)) {
        return prevInput;
      } 
      else {
        evaluateOutput(prevInput);
        return prevInput + value;
      }
    });
  };

  const handleBackspaceButton = () => {
    setNewInput((prevInput) => {
      if (prevInput.includes('=')) return prevInput;
      if (prevInput === '') return '';
      return prevInput.slice(0, -1);
    });
  };

  const evaluateOutput = (value) => {
    try {
      const evaluatedValue = evaluate(value);
      setNewOutput(evaluatedValue);
      setIsError(false);
    } catch (error) {
      setNewOutput('Incorrect Expression');
      setIsError(true);
    }
  };

  const clearValues = () => {
    setNewInput(() => '');
    setNewOutput(() => '');
  };

  return (
    <>
      <div className="conatiner bg-graphiteCore max-w-[22rem] min-w-[22rem] rounded-2xl p-4 shadow-xl">
        <div className="calculator-output-display leading-display tracking-display bg-carbonShell mb-4 flex min-h-[4rem] flex-col items-end rounded-lg p-4 text-right break-words">
          <Display input={input} output={output} isError={isError} />
        </div>

        <div className="calculator-buttons grid grid-cols-4 gap-2">
          <ButtonGrid
            onClear={clearValues}
            onOperator={handleButtonClick}
            onDigit={handleButtonClick}
            onDot={handleButtonClick}
            onBackspace={handleBackspaceButton}
            onEquals={handleEqualButton}
          />
        </div>
      </div>
    </>
  );
};

export default Calculator;
