const numberButtons = document.querySelectorAll('.number');
const currentOperationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const delButton = document.querySelector('.delete');
const allClearButton = document.querySelector('.clear');
const previousOperandTextElement = document.querySelector('.previous_operand');
const currentOperandTextElement = document.querySelector('.current_operand');
    
let previousOperand = "";
let currentOperand = "";
let currentOperation = null;


equalsButton.addEventListener('click', () => {

  
    currentOperand = calculate();
    previousOperand=''
    currentOperation=''
    updateDisplay();
})

allClearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
})

delButton.addEventListener('click', () => {
    del();
    updateDisplay();
})

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.innerText);
        updateDisplay();

    })
})

currentOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseCurrentOperation(button.innerText);
        updateDisplay();
    })
})

function chooseCurrentOperation(operation) {
    if (operation ==='√'&&!isEmpty(currentOperand)&&Number(currentOperand)>0)
    {
        currentOperation=operation;
        currentOperand=calculate();
        currentOperation = '';
        return;
    }
    if (operation ==='√')
    {
        return;
    }
    if(!isEmpty(currentOperation))
    {
        previousOperand=calculate();
        currentOperation=operation;
        currentOperand = '';
        return;
    }
    if (isEmpty(currentOperand) || currentOperand === '-') return;
    currentOperation = operation;
    previousOperand=currentOperand;
    currentOperand = '';

    if (!isEmpty(currentOperand) && !isEmpty(previousOperand)) {
        previousOperand = calculate();
        currentOperand = '';
    }

}

/*checking if a string is empty, null or undefined */
function isEmpty(str) {
    return (!str || 0 === str.length);
}

function calculate() {
    let result;
    let prev = parseFloat(previousOperand);
    let current = parseFloat(currentOperand);
    switch (currentOperation) {
        case '+':
            result = prev + current;
            break
        case '-':
            result = prev - current;
            break
        case '*':
            result = prev * current;
            break
        case '÷':
            result = prev / current;
            break
        case '√':
            result = Math.sqrt(currentOperand);
            break
        default:
            return;
    }
    return result;
}

function updateDisplay() {

    currentOperandTextElement.innerText = currentOperand;

    if (currentOperation != null) {
        previousOperandTextElement.innerText =
            `${previousOperand} ${currentOperation}`
    } else {
        previousOperandTextElement.innerText = ''
    }
}

function appendNumber(number) {
    if (currentOperand)
    if (number === '-' && currentOperand === "") {
        currentOperand = number;
        return;
    }
    if (number === '-' && !isEmpty(currentOperand)) {
        if (currentOperand.includes('-') && currentOperand.length < 2) return;

        if (!isEmpty(currentOperand) && !isEmpty(previousOperand)) {
            previousOperand = calculate();
            currentOperation = number;
            currentOperand = '';
            return;
        }
        previousOperand = currentOperand;
        currentOperation = number;
        currentOperand = '';
        return;
    }

    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number.toString();

}
function clear() {
    currentOperand = '';
    previousOperand = '';
    currentOperation = '';
}

function del() {
    currentOperand = currentOperand.toString().slice(0, -1);
}