let operators = ['+', '-', '*', '/'] 
 
function add(a, b) {
  return Number( a ) + Number( b )
}

function subtract(a, b) {
  return Number( a ) - Number( b )
}

function multiply(a, b) {
  return Number( a ) * Number( b )
}

function divide(a, b) {
  return Number( a ) / Number( b )
}

function operate(a, operator, b) {
  switch(operator) {
    case '+':
      return add(a, b)
      break
    case '-':
      return subtract(a, b)
      break
    case '*':
      return multiply(a, b)
      break
    case '/':
      return divide(a, b)
      break
  }
}

let buttonContainer = document.querySelector('.button-container')
let calculationDisplay = document.querySelector('.calculation-display')
let calculationDisplayValue = calculationDisplay.value

const inputButtonValueHandler = event => { 
  let button = event.target
  let buttonValue = button.textContent
  let firstNumber, secondNumber, operator

  if (event.target.tagName.toLowerCase() !== 'button') { return }
  
  switch(buttonValue) {
    case 'AC':
      calculationDisplayValue = ''
      calculationDisplay.value = calculationDisplayValue
      break
    case '=':
      let splitDisplayValue = calculationDisplayValue.split('')
      let foundOperators = splitDisplayValue.filter(
        char => operators.includes(char)
      )

      operator = foundOperators[0]
      firstNumber = calculationDisplayValue.split(operator)[0]
      secondNumber = calculationDisplayValue.split(operator)[1]

      calculationDisplayValue = operate(firstNumber, operator, secondNumber)
      calculationDisplay.value = calculationDisplayValue
      break
    default:
      calculationDisplayValue += button.textContent
      calculationDisplay.value = calculationDisplayValue
  }

  console.log( calculationDisplayValue )
}

buttonContainer.addEventListener('click', inputButtonValueHandler)

