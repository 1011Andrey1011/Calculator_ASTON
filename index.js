const resultElement = document.querySelector('#result'),
      expressionElement = document.querySelector('#expression'),
      numberButtons = document.querySelectorAll('.number:not(.equals)'),
      operationButtons = document.querySelectorAll('.operation'),
      equalsButton = document.querySelector('.equals'),
      clearButton = document.querySelector('#clear'),
      ceButton = document.querySelector('#ce');

let expression = '';

resultElement.innerHTML = '0';

function handleNumberClick(event) {
  const number = event.target.id;
  expression += number;
  updateExpression(expression);
  updateResult(expression);
}

function handleOperationClick(event) {
  const operation = event.target.id;
  if (!expression) return;
  expression += operation;
  updateExpression(expression);
  updateResult(operation);
}

numberButtons.forEach(button => button.addEventListener('click', handleNumberClick));
operationButtons.forEach(button => button.addEventListener('click', handleOperationClick));

clearButton.addEventListener('click', () => {
  expression = '';
  resultElement.innerHTML = '';
  expressionElement.innerHTML = '';
});

ceButton.addEventListener('click', () => {
  if (!expression.endsWith('=')) {
    expression = removeLastToken(expression);
    expressionElement.innerHTML = expression;
    resultElement.innerHTML = '0';
  }
});

// Simplified equals functionality
equalsButton.addEventListener('click', () => {
  if (!expression) {
    resultElement.innerHTML = '0';
  } else {
    expression += '=';
    expressionElement.innerHTML = expression;
    const result = evaluateExpression(expression);
    resultElement.innerHTML = formatResult(result);
  }
});

function updateExpression(newExpression) {
  expressionElement.innerHTML = newExpression;
}

function updateResult(newResult) {
  resultElement.innerHTML = newResult;
}

function removeLastToken(expression) {
  return expression.split(/([\/\*\+\-\=])/g).slice(0, -1).join('');
}

function evaluateExpression(expression) {
  return eval(expression.replace(/=/, ''));
}

function formatResult(result) {
  if (result.toString().length > 14) {
    return parseFloat(result.toPrecision(12)).toString();
  } else {
    return result.toString();
  }
}