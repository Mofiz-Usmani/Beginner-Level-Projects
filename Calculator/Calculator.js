const display = document.getElementById("par");
const buttons = document.querySelectorAll(".btn");
let currentInput = "";
let firstOperand = "";
let operator = null;
let shouldResetDisplay = false;

// Add event listeners to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => handleButtonClick(button));
});

function handleButtonClick(button) {
    const value = button.textContent;

    if (button.classList.contains("number")) {
        handleNumber(value);
    } else if (button.classList.contains("operator")) {
        handleOperator(value);
    } else if (button.id === "equals") {
        handleEquals();
    } else if (button.id === "clear") {
        handleClear();
    } else if (button.id === "backspace") {
        handleBackspace();
    } else if (button.id === "reset") {
        handleReset();
    } else if (button.id === "decimal") {
        handleDecimal();
    }
}

function handleNumber(number) {
    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }
    currentInput += number;
    updateDisplay();
}

function handleOperator(op) {
    if (operator !== null) handleEquals();
    firstOperand = currentInput;
    operator = op;
    shouldResetDisplay = true;
}

function handleEquals() {
    if (operator === null || shouldResetDisplay) return;
    const secondOperand = currentInput;
    const result = calculate(firstOperand, operator, secondOperand);
    currentInput = result.toString();
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function handleClear() {
    currentInput = "";
    firstOperand = "";
    operator = null;
    updateDisplay();
}

function handleBackspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function handleReset() {
    currentInput = "";
    firstOperand = "";
    operator = null;
    updateDisplay();
}

function handleDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
}

function updateDisplay() {
    display.textContent = currentInput || "0";
}

function calculate(num1, op, num2) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    switch (op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "X":
            return a * b;
        case "/":
            return b !== 0 ? a / b : "Error";
        case "%":
            return a % b;
        default:
            return "Error";
    }
}