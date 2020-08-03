(function () {
  // Button Queries
  const NUMBER_BUTTONS = document.querySelectorAll(".number-btn");
  const OPERATOR_BUTTONS = document.querySelectorAll(".operator-btn");
  const MEMORY_RECALL_CLEAR_BUTTON = document.querySelector(
    "#memory-clear-btn"
  );
  const MEMORY_PLUS_BUTTON = document.querySelector("#memory-plus-btn");
  const MEMORY_MINUS_BUTTON = document.querySelector("#memory-minus-btn");
  const ABSOLUTE_BUTTON = document.querySelector("#abs-btn");
  const SQUAREROOT_BUTTON = document.querySelector("#sqrt-btn");
  const CLEAR_BUTTON = document.querySelector("#clear-btn");
  const EQUALS_BUTTON = document.querySelector("#equals-btn");

  // Screen Query
  const DISPLAY = document.querySelector("#display");

  // Stored Values
  let displayValue = "";
  let currentEquation = "";
  let currentOperation = "";
  let memory = 0;
  let result;
  let showingAnswer = false;
  let negativeNumber = false;

  // Custom eval() function to avoid security issues
  const customEval = (str) => {
    return new Function(`return (${str})`)();
  };

  // If the number to be displayed is larger that 8,
  // convert to exponential form with 5 decimal placesi
  const numberFitToDisplay = (num) => {
    let numLength = `${num}`.length;
    if (numLength > 8) {
      num = num.toPrecision(5);
    }
    return num;
  };

  // Number buttons functionality
  NUMBER_BUTTONS.forEach((numBtn) =>
    numBtn.addEventListener("mousedown", (e) => {
      let num = e.target.innerHTML;

      if (showingAnswer) {
        displayValue = "";
        currentEquation = "";
        showingAnswer = false;
      }

      // If the current equation ends with an operator,
      // a button press will display the button value
      if (currentEquation.match(/([+\-x%÷]\s)$/)) {
        displayValue = "";
      }

      if (displayValue.length < 8) {
        if (negativeNumber) {
          displayValue = `-${num}`;
          negativeNumber = false;
        } else {
          displayValue += num;
        }

        currentEquation += num;
        console.log(displayValue.length);
        DISPLAY.innerHTML = displayValue;
      }
    })
  );

  // Operator buttons functionality
  OPERATOR_BUTTONS.forEach((opBtn) =>
    opBtn.addEventListener("mousedown", (e) => {
      showingAnswer = false;
      let operator = e.target.innerHTML;
      if (
        (operator === "-" && currentEquation === "") ||
        (operator === "-" && currentEquation.match(/([+\-x%÷]\s)$/))
      ) {
        negativeNumber = true;
        currentEquation += operator;
        getResult();
      } else {
        getResult();
        currentEquation = `(${currentEquation}) ${operator} `;
      }
    })
  );

  // Calculate and display result
  const getResult = () => {
    result = currentEquation
      .split(" ")
      .map((x) => {
        if (x == Number(x)) {
          return (x = Number(x));
        } else if (x == "÷") {
          return (x = "/");
        } else if (x == "x") {
          return (x = "*");
        } else {
          return (x = x);
        }
      })
      .join("");
    result = customEval(result);
    displayValue = result;
    DISPLAY.innerHTML = numberFitToDisplay(displayValue);
  };

  // Save current operation for reuse when equals is pressed multiple times
  const getCurrentOperation = () => {
    let operators = currentEquation.match(/[+\-x÷]/g);
    let lastOperator = operators[operators.length - 1];
    let negativeNumOperator = operators[operators.length - 2];
    if (lastOperator === "-") {
      currentOperation = currentEquation.slice(
        currentEquation.lastIndexOf(negativeNumOperator)
      );
    } else {
      currentOperation = currentEquation.slice(
        currentEquation.lastIndexOf(lastOperator)
      );
    }
  };

  // Equals functionality
  EQUALS_BUTTON.addEventListener("mousedown", (e) => {
    getCurrentOperation();
    if (showingAnswer) {
      currentEquation = `(${currentEquation}) ${currentOperation}`;
    }
    getResult();
    showingAnswer = true;
  });

  // Clear button functionality
  CLEAR_BUTTON.addEventListener("mousedown", (e) => {
    DISPLAY.innerHTML = "0";
    displayValue = "";
    currentEquation = "";
  });

  // Absolute button functionality
  ABSOLUTE_BUTTON.addEventListener("mousedown", (e) => {
    DISPLAY.innerHTML = numberFitToDisplay(
      Math.abs(customEval(currentEquation))
    );
  });

  // Squareroot button functionality
  SQUAREROOT_BUTTON.addEventListener("mousedown", (e) => {
    displayValue = numberFitToDisplay(Math.sqrt(displayValue));
    DISPLAY.innerHTML = displayValue;
  });

  // Memory minus button functionality
  MEMORY_MINUS_BUTTON.addEventListener("mousedown", (e) => {
    memory -= +displayValue;
  });

  // Memory plus button functionality
  MEMORY_PLUS_BUTTON.addEventListener("mousedown", (e) => {
    memory += +displayValue;
  });

  // Memory clear button functionality
  MEMORY_RECALL_CLEAR_BUTTON.addEventListener("mousedown", (e) => {
    if (e.detail == 1) {
      DISPLAY.innerHTML = memory;
      currentEquation += `${memory}`;
    } else if (e.detail == 2) {
      memory = 0;
      DISPLAY.innerHTML = memory;
    }
  });
})();
