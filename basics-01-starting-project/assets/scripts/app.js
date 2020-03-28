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

// For adding and displaying result
function add() {
  const intialResult = currentResult;
  const enteredInput = getUserNumberInput();
  currentResult += enteredInput;
  createAndWriteOutput("+", intialResult, enteredInput);
  writeToLog("ADD", intialResult, enteredInput, currentResult);
}

// For substracting and displaying result
function subtract() {
  const intialResult = currentResult;
  const enteredInput = getUserNumberInput();
  currentResult -= enteredInput;
  createAndWriteOutput("-", intialResult, enteredInput);
  writeToLog("SUBTRACT", intialResult, enteredInput, currentResult);
}

// For multiplying and displaying result
function multiply() {
  const intialResult = currentResult;
  const enteredInput = getUserNumberInput();
  currentResult *= enteredInput;
  createAndWriteOutput("*", intialResult, enteredInput);
  writeToLog("MULTIPLY", intialResult, enteredInput, currentResult);
}

// For dividing and displaying result
function divide() {
  const intialResult = currentResult;
  const enteredInput = getUserNumberInput();
  currentResult /= enteredInput;
  createAndWriteOutput("/", intialResult, enteredInput);
  writeToLog("DIVIDE", intialResult, enteredInput, currentResult);
}

// For listening the event from buttons
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
