import * as calculator from './operations.js';

const numbersButtons = document.querySelectorAll('.number');
const backspaceButton = document.querySelector('#backspace');
const operationsButtons = document.querySelectorAll('.operation');
const equalityButton = document.querySelector('#equality');
const displayValue = document.querySelector('#display #value');
const displayExpression = document.querySelector('#display #expression');

const numberDisplay = [];
let n1 = 0;
let n2 = 0;
let operation;
let result;

function resetArray(arr) {
  while (arr.length) {
    arr.pop();
  }
}

function attDisplayExpression(n1, op, n2) {
  displayExpression.textContent = `${n1 || ''} ${op || ''} ${n2 ? n2 + ' =' : ''}`;
}

function attDisplayValue(n) {
  let number = numberDisplay.join('') || 0;
  if (n) {
    number = n;
  }
  displayValue.textContent = number;
}

function solve(op, x, y) {
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
  attDisplayValue(result);
  attDisplayExpression(x, operation, y);
}

numbersButtons.forEach((numberBtn) =>
  numberBtn.addEventListener('click', () => {
    let number = numberBtn.textContent;

    if (number != '0' || numberDisplay.length > 0) {
      numberDisplay.push(number);
    }

    attDisplayValue();
  })
);

backspaceButton.addEventListener('click', () => {
  numberDisplay.pop();
  attDisplayValue();
});

operationsButtons.forEach((operationBtn) => {
  operationBtn.addEventListener('click', () => {
    if (n1 == 0) {
      n1 = Number(numberDisplay.join('')) || 0;
    }
    operation = operationBtn.id;

    attDisplayExpression(n1, operation);
    resetArray(numberDisplay);
  });
});

equalityButton.addEventListener('click', () => {
  n2 = Number(numberDisplay.join(''));
  solve(operation, n1, n2);
});
