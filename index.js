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

// variable decleration 

let valueStrInMemory = null;
let operatorInMemory = null;

//Function to display the current text content

const getValueAsStr = () => {
    const currentValueStr = valueE.textContent;
    return currentValueStr; //** **********/
    // return currentValueStr.split(',').join('');
}

//Function returning the above string which includes commas into number

const getValueAsNum = () => {
    return parseFloat(getValueAsStr())
}

//Function to set the value in the display

const setStrAsValue = (valueStr) => {

    if (valueStr[valueStr.length - 1] === '.') {            // to include decimal in the current display
        valueE.textContent += '.'
        return;
    }

    // extract the wholenumber and decimal part from valueStr

    const [wholeNumStr, decimalStr] = valueStr.split('.');
    // console.log(wholeNumStr, decimalStr)  to check in devtool if the decimal number is displayed
    if (decimalStr) {
        valueE.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr
    } else {
        valueE.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
}


//Function once number is clicked

const handleNumberClick = ((numStr) => {         // string representation of number
    // console.log(numStr); this is just to check if my number clicked on the calculator is working
    const currentValueStr = getValueAsStr();       // taking the contents of display 

    // to remove 0 from the display contenet 
    if (currentValueStr === '0') {
        setStrAsValue(numStr)
    } else {
        setStrAsValue(currentValueStr + numStr)
        //  valueE.textContent =            //to conver string to numbers and for commas for thousand values used toLocaleString
        //    parseFloat(currentValueStr + numStr).toLocaleString(); 
    }
})


const getResultOfOperationAsStr = () => {

}

const handleOperatorClick = (operation) => {

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

// Add event listenefr to operators

additionE.addEventListener('click', () => {
    handleOperatorClick('addition');
})

subtractionE.addEventListener('click', () => {
    handleOperatorClick('subtraction');
})

multiplicationE.addEventListener('click', () => {
    handleOperatorClick('multiplication');
})

divisionE.addEventListener('click', () => {
    handleOperatorClick('division');
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
        handleNumberClick(i.toString());      // to make the integer index clicked to string
    })
}
decimalE.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    //   valueE.textContent = currentValueStr + '.';  this is to include dot but it's taking more than one dot
    if (!currentValueStr.includes('.')) {
        setStrAsValue(currentValueStr + '.')
        //  valueE.textContent = currentValueStr + '.'  this is for the current display with dot
    }
})