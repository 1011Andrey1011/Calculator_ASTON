document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            const value = this.innerText;

            if (value >= '0' && value <= '9') {
                currentInput += value;
                updateDisplay(currentInput);
            } else if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += value;
                    updateDisplay(currentInput);
                }
            } else if (value === 'AC') {
                clearCalculator();
            } else if (value === '←') {
                currentInput = currentInput.slice(0, -1);
                updateDisplay(currentInput || '0');
            } else if (value === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay(currentInput);
            } else if (value === '=' && operator) {
                currentInput = operate(operator, previousInput, currentInput).toString();
                operator = '';
                updateDisplay(currentInput);
            } else if (['+', '-', '×', '/'].includes(value)) {
                if (operator) {
                    currentInput = operate(operator, previousInput, currentInput).toString();
                    updateDisplay(currentInput);
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        });
    });

    function updateDisplay(value) {
        output.innerText = value;
    }

    function clearCalculator() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    }

    function operate(operator, num1, num2) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);

        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '×':
                return a * b;
            case '/':
                return a / b;
            default:
                return b;
        }
    }
});
