// Selects the paragraph element with id "par" to display results
const display = document.getElementById("par");

// Selects the container that holds all the calculator buttons
const buttonsContainer = document.querySelector(".buttons-grid");

// Stores the currently entered number (default is "0")
let currentInput = "0";

// Stores the previous input value before an operation
let prevInput = "";

// Stores the selected operator
let operator = null;

// Adds a single event listener to the buttons container
buttonsContainer.addEventListener("click", (e) => {
    // Ensures that only elements with the class "btn" trigger an action
    if (!e.target.classList.contains("btn")) return;
    
    // Gets the button's text value
    const value = e.target.textContent.trim();
    
    // Calls appropriate function based on button type
    if (e.target.classList.contains("number")) handleNumber(value);
    else if (e.target.classList.contains("operator")) handleOperator(value);
    else if (e.target.id === "equals") handleEquals();
    else if (e.target.id === "clear") resetCalculator();
    else if (e.target.id === "backspace") handleBackspace();
    else if (e.target.id === "decimal") handleDecimal();
});

// Handles number input
function handleNumber(num) {
    // If the current input is "0", replace it; otherwise, append the number
    currentInput = currentInput === "0" ? num : currentInput + num;
    updateDisplay();
}

// Handles operator input
function handleOperator(op) {
    // If an operator is already selected, calculate the previous expression first
    if (operator) handleEquals();
    
    // Store the current input as the previous value
    prevInput = currentInput;
    
    // Store the selected operator
    operator = op;
    
    // Reset current input for the next number
    currentInput = "0";
}

// Handles equal button click (performs calculation)
function handleEquals() {
    // Ensure both an operator and a previous input exist before calculating
    if (!operator || prevInput === "") return;
    
    // Perform the calculation and store the result in currentInput
    currentInput = calculate(prevInput, operator, currentInput);
    
    // Reset operator and previous input after calculation
    operator = null;
    prevInput = "";
    
    // Update the display with the result
    updateDisplay();
}

// Handles decimal point input
function handleDecimal() {
    // Add a decimal point only if it doesn't already exist in the input
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
}

// Handles backspace (deletes last digit)
function handleBackspace() {
    // Remove the last character from currentInput, or reset to "0" if empty
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    updateDisplay();
}

// Resets the calculator to its initial state
function resetCalculator() {
    currentInput = "0";
    prevInput = "";
    operator = null;
    updateDisplay();
}

// Performs the calculation based on the selected operator
function calculate(a, op, b) {
    // Convert input values to floating point numbers
    const x = parseFloat(a);
    const y = parseFloat(b);
    
    // Perform the calculation based on the operator
    switch (op) {
        case "+": return (x + y).toString(); // Addition
        case "-": return (x - y).toString(); // Subtraction
        case "X": return (x * y).toString(); // Multiplication
        case "/": return y !== 0 ? (x / y).toString() : "Error"; // Division (avoid division by zero)
        case "%": return ((x / 100) * y).toString(); // Percentage calculation
        default: return "Error"; // Return "Error" for invalid operations
    }
}

// Updates the display with the current input value
function updateDisplay() {
    display.textContent = currentInput;
}

/*
========================================================
            Step-by-Step Working Guide
========================================================
1️⃣ When a number button is clicked, `handleNumber()` is called:
   - If the display shows "0", it replaces it.
   - Otherwise, it appends the clicked number to the current input.
   - Updates the display.

2️⃣ When an operator button (+, -, X, /, %) is clicked, `handleOperator()` is called:
   - If an operator was already selected, it calculates the previous operation.
   - Stores the current input as `prevInput`.
   - Stores the selected operator.
   - Resets `currentInput` to "0" for the next number.

3️⃣ When `=` (equals) is clicked, `handleEquals()` is called:
   - Checks if both `prevInput` and `operator` exist.
   - Calls `calculate()` to perform the operation.
   - Stores the result in `currentInput`.
   - Clears the previous input and operator.
   - Updates the display.

4️⃣ When `.` (decimal) is clicked, `handleDecimal()` is called:
   - Adds a decimal point to `currentInput` only if it doesn't already have one.
   - Updates the display.

5️⃣ When `⌫` (backspace) is clicked, `handleBackspace()` is called:
   - Removes the last digit from `currentInput`.
   - If it becomes empty, it resets to "0".
   - Updates the display.

6️⃣ When `C` (clear) is clicked, `resetCalculator()` is called:
   - Resets `currentInput`, `prevInput`, and `operator`.
   - Updates the display to "0".

7️⃣ The `calculate()` function performs arithmetic operations based on the selected operator.
   - Converts inputs to numbers.
   - Executes the operation.
   - Returns the result as a string.

8️⃣ The `updateDisplay()` function updates the displayed value.
*/
