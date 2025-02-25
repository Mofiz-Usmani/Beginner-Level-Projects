const display = document.getElementById("par");
const buttonsContainer = document.querySelector(".buttons-grid");
let currentInput = "0";
let prevInput = "";
let operator = null;

// Single event listener for all buttons
buttonsContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn")) return;
    const value = e.target.textContent.trim();

    if (e.target.classList.contains("number")) handleNumber(value);
    else if (e.target.classList.contains("operator")) handleOperator(value);
    else if (e.target.id === "equals") handleEquals();
    else if (e.target.id === "clear") resetCalculator();
    else if (e.target.id === "backspace") handleBackspace();
    else if (e.target.id === "decimal") handleDecimal();
});

function handleNumber(num) {
    currentInput = currentInput === "0" ? num : currentInput + num;
    updateDisplay();
}

function handleOperator(op) {
    if (operator) handleEquals();
    prevInput = currentInput;
    operator = op;
    currentInput = "0";
}

function handleEquals() {
    if (!operator || prevInput === "") return;
    currentInput = calculate(prevInput, operator, currentInput);
    operator = null;
    prevInput = "";
    updateDisplay();
}

function handleDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
}

function handleBackspace() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    updateDisplay();
}

function resetCalculator() {
    currentInput = "0";
    prevInput = "";
    operator = null;
    updateDisplay();
}

function calculate(a, op, b) {
    const x = parseFloat(a);
    const y = parseFloat(b);
    switch (op) {
        case "+": return (x + y).toString();
        case "-": return (x - y).toString();
        case "X": return (x * y).toString();
        case "/": return y !== 0 ? (x / y).toString() : "Error";
        case "%": return ((x / 100) * y).toString();
        default: return "Error";
    }
}

function updateDisplay() {
    display.textContent = currentInput;
}
