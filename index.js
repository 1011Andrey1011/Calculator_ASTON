document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let resultDisplayed = false;

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            const value = this.innerText;

            if (isNumber(value)) {
                handleNumber(value);
            } else if (value === '.') {
                handleDecimal();
            } else if (value === 'AC') {
                clearCalculator();
            } else if (value === '←') {
                handleBackspace();
            } else if (value === '%') {
                handlePercentage();
            } else if (value === '=') {
                handleEquals();
            } else if (isOperator(value)) {
                handleOperator(value);
            }
        });
    });

    function isNumber(value) {
        return value >= '0' && value <= '9';
    }

    function isOperator(value) {
        return ['+', '-', '×', '/'].includes(value);
    }

    function handleNumber(value) {
        if (resultDisplayed) {
            currentInput = value;
            resultDisplayed = false;
        } else {
            currentInput = currentInput === '0' ? value : currentInput + value;
        }
        updateDisplay(currentInput);
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay(currentInput);
        }
    }

    function handleBackspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    }

    function handlePercentage() {
        if (currentInput) {
            const value = parseFloat(currentInput);
            if (isNaN(value)) return;

            currentInput = (value / 100).toString();
            updateDisplay(currentInput);
        }
    }

    function handleEquals() {
        if (operator && previousInput) {
            const result = calculateResult();
            updateDisplay(result);
            currentInput = result.toString();
            previousInput = '';
            operator = '';
            resultDisplayed = true;
        }
    }

    function handleOperator(value) {
        if (operator && currentInput) {
            currentInput = calculateResult().toString();
            updateDisplay(currentInput);
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculateResult() {
        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);
        if (isNaN(a) || isNaN(b)) return '0';

        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '×':
                return a * b;
            case '/':
                if (b === 0) {
                    alert("Ошибка: Деление на ноль");
                    return '0';
                }
                return a / b;
            default:
                return '0';
        }
    }

    function updateDisplay(value) {
        output.innerText = value;
    }

    function clearCalculator() {
        currentInput = '';
        previousInput = '';
        operator = '';
        resultDisplayed = false;
        updateDisplay('0');
    }
});
