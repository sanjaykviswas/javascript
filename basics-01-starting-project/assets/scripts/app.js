const defaultResult = 0;
const CALCULATION_TYPE_ADD = "ADD";
const CALCULATION_TYPE_SUBTRACT = "SUBTRACT";
const CALCULATION_TYPE_MULTIPLY = "MULTIPLY";
const CALCULATION_TYPE_DIVIDE = "DIVIDE";

let currentResult = defaultResult;
let logEntries = [];

// Get input from input field
function getUserNumberInput() {
  return parseInt(userInput.value);
}

// Generates and writes calculation logs
function createAndWriteOutput(operator, resultBeforeCalc, userInputNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${userInputNumber}`;
  outputResult(currentResult, calcDescription); // from vendor file
}

// To log the entries
function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResult(calculationType) {
  const intialResult = currentResult;
  const enteredInput = getUserNumberInput();
  let mathOperator;
  if (
    (calculationType !== CALCULATION_TYPE_ADD &&
      calculationType !== CALCULATION_TYPE_SUBTRACT &&
      calculationType !== CALCULATION_TYPE_MULTIPLY &&
      calculationType !== CALCULATION_TYPE_DIVIDE) ||
    !enteredInput
  ) {
    return;
  }
  if (calculationType === CALCULATION_TYPE_ADD) {
    currentResult += enteredInput;
    mathOperator = "+";
  } else if (calculationType === CALCULATION_TYPE_SUBTRACT) {
    currentResult -= enteredInput;
    mathOperator = "-";
  } else if (calculationType === CALCULATION_TYPE_MULTIPLY) {
    currentResult *= enteredInput;
    mathOperator = "*";
  } else if (calculationType === CALCULATION_TYPE_DIVIDE) {
    currentResult /= enteredInput;
    mathOperator = "/";
  }
  createAndWriteOutput(mathOperator, intialResult, enteredInput);
  writeToLog(calculationType, intialResult, enteredInput, currentResult);
}

// For adding and displaying result
function add() {
  calculateResult(CALCULATION_TYPE_ADD);
}

// For substracting and displaying result
function subtract() {
  calculateResult(CALCULATION_TYPE_SUBTRACT);
}

// For multiplying and displaying result
function multiply() {
  calculateResult(CALCULATION_TYPE_MULTIPLY);
}

// For dividing and displaying result
function divide() {
  calculateResult(CALCULATION_TYPE_DIVIDE);
}

// For listening the event from buttons
// addBtn.addEventListener("click", add);
// subtractBtn.addEventListener("click", subtract);
// multiplyBtn.addEventListener("click", multiply);
// divideBtn.addEventListener("click", divide);

addBtn.addEventListener(
  "click",
  calculateResult.bind(this, CALCULATION_TYPE_ADD)
);
subtractBtn.addEventListener(
  "click",
  calculateResult.bind(this, CALCULATION_TYPE_SUBTRACT)
);
multiplyBtn.addEventListener(
  "click",
  calculateResult.bind(this, CALCULATION_TYPE_MULTIPLY)
);
divideBtn.addEventListener(
  "click",
  calculateResult.bind(this, CALCULATION_TYPE_DIVIDE)
);
