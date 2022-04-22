//selecting all buttons defined in HTML (display, operators, functions, numbers)

const valueE = document.querySelector('.value');

const acE = document.querySelector('.ac');
const pmE = document.querySelector('.pm');
const percentageE = document.querySelector('.percentage');

const additionE = document.querySelector('.addition');
const subtractionE = document.querySelector('.subtraction');
const multiplicationE = document.querySelector('.multiplication');
const divisionE = document.querySelector('.division');
const equalE = document.querySelector('.equals');

const decimalE = document.querySelector('.decimal');
const number0E = document.querySelector('.number-0');
const number1E = document.querySelector('.number-1');
const number2E = document.querySelector('.number-2');
const number3E = document.querySelector('.number-3');
const number4E = document.querySelector('.number-4');
const number5E = document.querySelector('.number-5');
const number6E = document.querySelector('.number-6');
const number7E = document.querySelector('.number-7');
const number8E = document.querySelector('.number-8');
const number9E = document.querySelector('.number-9');

const numberEArray = [number0E, number1E, number2E, number3E, number4E, number5E, number6E, number7E, number8E, number9E];

// Below are global variable decleration for operators & value in memory. This will be used in handlingOperatorClick function - getResultOfOperationAsStr function and in equal 
let valueStrInMemory = null;
let operatorInMemory = null;

//Function to display the current text content
const getValueAsStr = () => valueE.innerHTML.split(',').join('');

//Function returning the above string which includes commas into number
const getValueAsNum = () => parseFloat(getValueAsStr());

//Function to set the value in the display
const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {    // to include decimal in the current display
        valueE.innerHTML += '.'
        return;
    }
    // extract the wholenumber and decimal part from valueStr
    const [wholeNumStr, decimalStr] = valueStr.split('.');
    // console.log(wholeNumStr, decimalStr)  to check in devtool if the decimal number is displayed
    if (decimalStr) {
        valueE.innerHTML = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr
    } else {
        valueE.innerHTML = parseFloat(wholeNumStr).toLocaleString();
    }
}

//Function once number is clicked
const handleNumberClick = ((numStr) => {
    // console.log(numStr); this is just to check if my number clicked on the calculator is working
    const currentValueStr = getValueAsStr();

    // to remove 0 from the display contenet 
    if (currentValueStr === '0') {
        setStrAsValue(numStr)
    } else {
        setStrAsValue(currentValueStr + numStr)
    }
})

// function to limit the digits in display which will be called on each button clicked
const limitDisplayLength = (numberInputStr) => {
    let inputLength = 0;
    maximumAllowedInput = ''
    inputLength = numberInputStr.length;
    if (inputLength > 10) {
        maximumAllowedInput = 'yes';
        return maximumAllowedInput;
    }
    else {
        maximumAllowedInput = 'no';
    }
}

// function to check for operator in memory and then perform operation accordingly, this will be called twice (handleOperatorClick & on equal opeartor)
const getResultOfOperationAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if (operatorInMemory === '+') {
        newValueNum = valueNumInMemory + currentValueNum;
    } else if (operatorInMemory === '-') {
        newValueNum = valueNumInMemory - currentValueNum;
    } else if (operatorInMemory === '*') {
        newValueNum = valueNumInMemory * currentValueNum;
    } else if (operatorInMemory === '/') {
        newValueNum = valueNumInMemory / currentValueNum;
    }
    return newValueNum.toString();
}

const handleOperatorClick = (operation) => {
    const currentValueStr = getValueAsStr();
    if (!valueStrInMemory) {
        valueStrInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }
    valueStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    setStrAsValue('0');
}

// Add event listener to functions
acE.addEventListener('click', () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
})

pmE.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValueStr = getValueAsStr();

    if (currentValueStr === '-0') {
        setStrAsValue('0')
        return;
    }
    if (currentValueNum >= 0) {
        setStrAsValue('-' + currentValueStr)
    } else {
        setStrAsValue(currentValueStr.substring(1))
    }
})

percentageE.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operatorInMemory = null;
})

// Add event listener to operators
additionE.addEventListener('click', () => {
    handleOperatorClick('+');
})

subtractionE.addEventListener('click', () => {
    handleOperatorClick('-');
})

multiplicationE.addEventListener('click', () => {
    handleOperatorClick('*');
})

divisionE.addEventListener('click', () => {
    handleOperatorClick('/');
})

equalE.addEventListener('click', () => {
    if (valueStrInMemory) {
        setStrAsValue(getResultOfOperationAsStr());
        valueStrInMemory = null;
        operatorInMemory = null;
    }
})

// Adding Event Listener to numbers and decimal buttons
for (let i = 0; i < numberEArray.length; i++) {
    const numberE = numberEArray[i];
    // console.log(numberE)
    numberE.addEventListener('click', () => {
        // call function when a number is clicked
        handleNumberClick(i.toString());
    })
}

decimalE.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    //   valueE.textContent = currentValueStr + '.';  this is to include dot but it's taking more than one dot
    if (!currentValueStr.includes('.')) {
        setStrAsValue(currentValueStr + '.')
        //  valueE.textContent = currentValueStr + '.'  this is for the current display with single dot
    }
})