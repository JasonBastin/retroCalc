(function () {
  // Button queries
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

  // Screen query
  const DISPLAY = document.querySelector("#display");

  // Stored Values
  let displayValue = "";
  let currentEquation = "";
  let memory = 0;
  let result;
  let showingAnswer = false;

  // If num is larger than 6 digits and between -1 & 1,
  // round to 7 decimal places. Else make exponential notation
  // rounded to 5 digits.
  const numberFitToDisplay = (num) => {
    let numLength = `${num}`.length;
    if (num < 1 && num > -1 && numLength > 6) {
      return num.toFixed(7);
    } else if (numLength > 6) {
      return num.toPrecision(5);
    } else {
      return num;
    }
  };

  // Number buttons functionality
  NUMBER_BUTTONS.forEach((numBtn) =>
    numBtn.addEventListener("mousedown", (e) => {
      let buttonValue = e.target.innerHTML;

      // If the display is showing an answer, a button
      // press will clear the display and start a new eqaution
      if (showingAnswer) {
        displayValue = "";
        currentEquation = "";
        showingAnswer = false;
      }

      // If the current equation ends with an operator,
      // a button press will display the button value and add it to
      // the current equation
      if (currentEquation.match(/([+\-x%÷]\s)$/)) {
        displayValue = "";
      }
      displayValue += buttonValue;
      currentEquation += buttonValue;
      DISPLAY.innerHTML = displayValue;
    })
  );

  // Operator buttons functionality
  OPERATOR_BUTTONS.forEach((opBtn) =>
    opBtn.addEventListener("mousedown", (e) => {
      showingAnswer = false;
      let buttonValue = e.target.innerHTML;
      // if (e.target.id === "subtract-btn") {
      //   console.log(currentEquation);
      // }
      currentEquation += " " + buttonValue + " ";
    })
  );

  // Equals functionality
  EQUALS_BUTTON.addEventListener("mousedown", (e) => {
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
    result = eval(result);
    DISPLAY.innerHTML = numberFitToDisplay(result);
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
    DISPLAY.innerHTML = numberFitToDisplay(Math.abs(eval(currentEquation)));
  });

  // Squareroot button functionality
  SQUAREROOT_BUTTON.addEventListener("mousedown", (e) => {
    DISPLAY.innerHTML = numberFitToDisplay(Math.sqrt(displayValue));
  });

  // Memory minus button functionality
  MEMORY_MINUS_BUTTON.addEventListener("mousedown", (e) => {
    console.log(typeof +displayValue);
    memory -= +displayValue;
    console.log(memory);
  });

  // Memory plus button functionality
  MEMORY_PLUS_BUTTON.addEventListener("mousedown", (e) => {
    console.log(displayValue);
    memory += +displayValue;
  });

  // Memory clear button functionality
  MEMORY_RECALL_CLEAR_BUTTON.addEventListener("mousedown", (e) => {
    if (e.detail == 1) {
      DISPLAY.innerHTML = memory;
      currentEquation = "";
      currentEquation = `${memory}`;
    } else if (e.detail == 2) {
      memory = 0;
      DISPLAY.innerHTML = memory;
    }
  });
})();
