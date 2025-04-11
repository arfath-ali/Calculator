import Button from './button.jsx';

const ButtonGrid = ({
  onClear,
  onOperator,
  onDigit,
  onDot,
  onBackspace,
  onEquals
}) => {
  return (
    <>
      <Button className="btn btn-ac" onClick={onClear}>
        AC
      </Button>
      <Button className="btn btn-operator" onClick={() => onOperator('/100')}>
        %
      </Button>
      <Button className="btn btn-operator" onClick={() => onOperator('/')}>
        /
      </Button>
      <Button className="btn btn-operator" onClick={() => onOperator('*')}>
        *
      </Button>

      {['7', '8', '9'].map((num) => (
        <Button
          key={num}
          className="btn btn-digit"
          onClick={() => onDigit(num.toString())}>
          {num}
        </Button>
      ))}
      <Button className="btn btn-operator" onClick={() => onOperator('-')}>
        -
      </Button>

      {['4', '5', '6'].map((num) => (
        <Button
          key={num}
          className="btn btn-digit"
          onClick={() => onDigit(num.toString())}>
          {num}
        </Button>
      ))}
      <Button className="btn btn-operator" onClick={() => onOperator('+')}>
        +
      </Button>

      {['1', '2', '3'].map((num) => (
        <Button
          key={num}
          className="btn btn-digit"
          onClick={() => onDigit(num.toString())}>
          {num}
        </Button>
      ))}
      <Button className="btn btn-equals" onClick={() => onEquals('=')}>
        =
      </Button>

      <Button className="btn btn-digit col-span-2" onClick={() => onDigit('0')}>
        0
      </Button>
      <Button className="btn btn-dot" onClick={() => onDot('.')}>
        .
      </Button>
      <Button className="btn btn-backspace" onClick={onBackspace}>
        ←
      </Button>
    </>
  );
};

export default ButtonGrid;
