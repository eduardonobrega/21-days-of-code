import * as calculator from './operations.js';

const numbersButtons = document.querySelectorAll('.number');
const backspaceButton = document.querySelector('#backspace');
const operationsButtons = document.querySelectorAll('.operation');
const equalityButton = document.querySelector('#equality');
const clearButton = document.querySelector('#clear');
const displayValue = document.querySelector('#display #value');
const displayExpression = document.querySelector('#display #expression');

const numberDisplay = [];
let operation;
let result;

function resetArray(arr) {
  while (arr.length) {
    arr.pop();
  }
}

function attDisplayExpression(op, x, y) {
  displayExpression.textContent = `${x == undefined ? '' : x} ${op || ''} ${
    y || y == 0 ? y + ' =' : ''
  }`;
}

function attDisplayValue(n) {
  let number = numberDisplay.join('') || 0;
  if (n !== undefined) {
    number = n;
  }
  displayValue.textContent = number;
}

const getDisplayValue = () => Number(displayValue.textContent);

function solve(op, x, y) {
  let result;
  switch (op) {
    case '/':
      result = calculator.division(x, y);
      break;

    case '*':
      result = calculator.multiplication(x, y);
      break;
    case '-':
      result = calculator.subtraction(x, y);
      break;
    case '+':
      result = calculator.sum(x, y);
      break;
  }
  return result;
}

const clear = () => {
  result = null;
  operation = null;
  resetArray(numberDisplay);
  attDisplayValue();
  attDisplayExpression();
};

numbersButtons.forEach((numberBtn) =>
  numberBtn.addEventListener('click', () => {
    let number = numberBtn.textContent;

    if (number != '0' || numberDisplay.length > 0) {
      numberDisplay.push(number);
    }

    attDisplayValue();
  })
);

operationsButtons.forEach((operationBtn) => {
  operationBtn.addEventListener('click', () => {
    result = getDisplayValue(); // analizar

    operation = operationBtn.id;

    attDisplayExpression(operation, result);
    resetArray(numberDisplay);
  });
});

backspaceButton.addEventListener('click', () => {
  numberDisplay.pop();
  attDisplayValue();
});

equalityButton.addEventListener('click', () => {
  let x = result;
  let y = getDisplayValue();

  result = solve(operation, x, y);

  attDisplayValue(result);
  attDisplayExpression(operation, x, y);
});

clearButton.addEventListener('click', clear);
