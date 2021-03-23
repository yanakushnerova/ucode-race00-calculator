const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};
  
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}
  
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    if (calculator.displayValue < 0) {
        calculator.displayValue = '-' + calculator.displayValue;
    }
}
  
function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecondOperand = false;
        return;
    }
  
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function changeDisplayValue() {
    calculator.displayValue *= -1;
}
  
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);
    
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }
  
  
    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
    
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function handleOperator2(nextOperator) {
    const {firstOperand, operator, displayValue} = calculator;

    if (nextOperator && displayValue) {
        const result = calculate2(displayValue, nextOperator);
        
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
}
  
function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === 'x') {
        return firstOperand * secondOperand;
    } else if (operator === '÷') {
        return firstOperand / secondOperand;
    } else if (operator === 'x^n') {
        return Math.pow(firstOperand, secondOperand);
    } else if (operator === 'e') {
        return firstOperand * Math.pow(10, secondOperand);
    }
  
    return secondOperand;
}

function factorial(number) {
    if (number == 0 || number == 1) {
        return 1;
    }
     
    let result = 1;

    for (let i = 1; i <= number; i++) {
        result *= i;
    }

    return result;
}

function calculate2(firstOperand, operator) {
    if (operator === '%') {
        return firstOperand * 0.01;
    } else if (operator === '√x') {
        return Math.sqrt(firstOperand);
    } else if (operator === 'x!') {
        return factorial(firstOperand);
    } else if (operator === '1/x') {
        return Math.pow(firstOperand, -1);
    }

    return firstOperand;
}

function calculate3(firstOperand, operator) {
    if (operator === 'BIN') {
        return parseInt(firstOperand, 10).toString(2);
    } else if (operator === 'HEX') {
        return parseInt(firstOperand, 10).toString(16).toUpperCase();
    }

    return firstOperand;
}

function handleConvertion(nextOperator) {
    const {firstOperand, operator, displayValue} = calculator;
    if (nextOperator && displayValue) {
        const result = calculate3(displayValue, nextOperator);
        
        calculator.displayValue = result;
        calculator.firstOperand = result;
    }
}

let calculatorMemory = 0;

function memoryClear() {
    if (calculatorMemory == 0) {
        return;
    }

    calculatorMemory = 0;
}

function handleOperatorMR(nextOperator) {
    const {displayValue} = calculator;

    if (nextOperator && displayValue) {
        const result = memoryRecall(displayValue);

        //calculator.displayValue = result;
        calculator.firstOperand = result;
    }
}

function memoryRecall(value) {
    memoryClear();
    calculatorMemory = value;
    calculator.displayValue = '0';
    return calculatorMemory;
}

function memoryAdd(nextOperator) {
    const {displayValue} = calculator;

    if (nextOperator && displayValue) {
        const result = parseInt(displayValue) + parseInt(calculatorMemory);
        
        calculator.displayValue = result;
        calculator.firstOperand = result;
    }
} 

function memorySubstract(nextOperator) {
    const {displayValue} = calculator;

    if (nextOperator && displayValue) {
        const result = parseInt(displayValue) - parseInt(calculatorMemory);
        
        calculator.displayValue = result;
        calculator.firstOperand = result;
    }
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}
  
updateDisplay();
    
const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case 'x':
        case '÷':
        case '=':
        case 'x^n':
        case 'e':
            handleOperator(value);
            break;
        case '%':
        case '√x':
        case 'x!':
        case '1/x':
            handleOperator2(value);
            break;
        case '±':
            changeDisplayValue();
            break;
        case 'MC':
            memoryClear();
            break;
        case 'MR':
            handleOperatorMR(value);
            console.log(calculatorMemory)
            break;
        case 'M+':
            memoryAdd(value);
            break;
        case 'M-':
            memorySubstract(value);
            break;
        case 'BIN':
        case 'HEX':
            handleConvertion(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        case 'π':
            inputDigit(3.1415926);
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
        }
  
    updateDisplay();
});
