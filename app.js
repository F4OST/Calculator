const display = document.getElementById("calculator-display");
const buttons = document.querySelectorAll("#buttons [value]");
const allClearButton = document.querySelector("#all-clear");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let displayValue = "";
let hasCalculated = false;

function parseNumber(num) {
  return parseFloat(num.replace(",", "."));
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Baka. Nice try!";
  }
  return num1 / num2;
}

function operate() {
  let num1 = parseNumber(firstNumber);
  let num2 = parseNumber(secondNumber);
  let result = 0;

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "x":
      result = multiply(num1, num2);
      break;
    case "÷":
      result = divide(num1, num2);
      break;
  }

  displayValue = result.toString();
  updateDisplay();
}

function updateDisplay() {
  display.textContent = displayValue;
}

function clearDisplay() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  displayValue = "";
  updateDisplay();
}

function clearLastCharacter() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}

function results() {
  if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
    operate();
    hasCalculated = true;
  }
}

function handleClick(event) {
  const buttonValue = event.target.value;

  if (displayValue.length < 12) {
    if (["+", "-", "x", "÷"].includes(buttonValue)) {
      if (operator === "" && firstNumber === "") {
        return;
      } else if (operator !== "" && secondNumber === "") {
        operator = buttonValue;
        displayValue = displayValue.slice(0, -1) + operator;
      } else {
        if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
          operate();
          hasCalculated = true;
        }
        firstNumber = displayValue;
        operator = buttonValue;
        secondNumber = "";
        displayValue += operator;
      }
    } else if (buttonValue === "=") {
      if (
        !hasCalculated &&
        firstNumber !== "" &&
        operator !== "" &&
        secondNumber !== ""
      ) {
        operate();
        hasCalculated = true;
      }
    } else if (operator === "") {
      firstNumber += buttonValue;
      displayValue = firstNumber;
      hasCalculated = false;
    } else {
      secondNumber += buttonValue;
      displayValue += buttonValue;
      hasCalculated = false;
    }

    updateDisplay();
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

allClearButton.addEventListener("click", clearDisplay);
clearButton.addEventListener("click", clearLastCharacter);
equalButton.addEventListener("click", results);

