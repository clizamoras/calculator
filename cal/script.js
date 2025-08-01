let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.querySelector('[data-action="clear"]');
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('[data-action="backspace"]');

numberButtons.forEach(button => {
  button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => setOperator(button.dataset.operator));
});

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
decimalButton.addEventListener('click', appendDecimal);
backspaceButton.addEventListener('click', backspace);

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetDisplay) resetDisplay();
  display.textContent += number;
}

function resetDisplay() {
  display.textContent = '';
  shouldResetDisplay = false;
}

function clear() {
  display.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
}

function appendDecimal() {
  if (shouldResetDisplay) resetDisplay();
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function backspace() {
  if (shouldResetDisplay) return;
  display.textContent = display.textContent.slice(0, -1) || '0';
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondNumber = display.textContent;
  const result = operate(currentOperator, firstNumber, secondNumber);
  display.textContent = roundResult(result);
  currentOperator = null;
}

function roundResult(number) {
  if (typeof number === 'string') return number;
  return Math.round(number * 1000) / 1000;
}

// Math operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Nope 😤";
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}
