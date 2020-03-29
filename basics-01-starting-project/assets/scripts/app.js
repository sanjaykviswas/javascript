const defaultResult = 0;
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
    (calculationType !== "ADD" &&
      calculationType !== "SUBTRACT" &&
      calculationType !== "MULTIPLY" &&
      calculationType !== "DIVIDE") ||
    !enteredInput
  ) {
    return;
  }
  if (calculationType === "ADD") {
    currentResult += enteredInput;
    mathOperator = "+";
  } else if (calculationType === "SUBTRACT") {
    currentResult -= enteredInput;
    mathOperator = "-";
  } else if (calculationType === "MULTIPLY") {
    currentResult *= enteredInput;
    mathOperator = "*";
  } else if (calculationType === "DIVIDE") {
    currentResult /= enteredInput;
    mathOperator = "/";
  }
  createAndWriteOutput(mathOperator, intialResult, enteredInput);
  writeToLog(calculationType, intialResult, enteredInput, currentResult);
}

// For adding and displaying result
function add() {
  calculateResult("ADD");
}

// For substracting and displaying result
function subtract() {
  calculateResult("SUBTRACT");
}

// For multiplying and displaying result
function multiply() {
  calculateResult("MULTIPLY");
}

// For dividing and displaying result
function divide() {
  calculateResult("DIVIDE");
}

// For listening the event from buttons
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
