let operators = ['+', '-', '*', '/'] 

let backspaceCharacter = "⌫"

function round(number, numberOfDecimals) {
  if ( !Number(number) ) return number

  return number.toFixed(numberOfDecimals)
}

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
  if ( Number(b) === 0 ) { return snarkyMessage() }

  return Number( a ) / Number( b )
}

function operate(a, operator, b) {
  if (!b) return a

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

function isOperator(string) {
  return operators.includes(string)  
}

function snarkyMessage() {
  return "A snarky message :smirk:"
}

let buttonContainer = document.querySelector('.button-container')
let calculationDisplay = document.querySelector('.calculation-display')
let calculationDisplayValue = String(  calculationDisplay.value )

const inputButtonValueHandler = event => { 
  let button = event.target
  let buttonValue = button.textContent
  let firstNumber, secondNumber, operator

  if (event.target.tagName.toLowerCase() !== 'button') { return }
  
  switch(buttonValue) {
    case 'AC':
      calculationDisplayValue = ''
      calculationDisplay.value = String(  calculationDisplayValue )
      break
    case '⌫':
      calculationDisplayValue = calculationDisplayValue.slice(0, -1)
      calculationDisplay.value = calculationDisplayValue
      break
    default:
      if ( isOperator( buttonValue ) 
        && isOperator( calculationDisplayValue[calculationDisplayValue.length - 1] ) ) return
      if ( calculationDisplayValue === snarkyMessage() ) {
        calculationDisplayValue = ''
        calculationDisplay.value = calculationDisplayValue
      }

      let splitDisplayValue = calculationDisplayValue.split('')
      let foundDots = splitDisplayValue.filter(
        char => char === '.'
      )
      let foundDot = foundDots[0]

      if (foundDot && buttonValue === '.') return

      let foundOperators = splitDisplayValue.filter(
        char => operators.includes(char)
      )

      operator = foundOperators[0]
      firstNumber = calculationDisplayValue.split(operator)[0]
      secondNumber = calculationDisplayValue.split(operator)[1]

      if ( secondNumber && (isOperator(buttonValue) || buttonValue === '=') ) {
        let numberOfDecimals = 2
  
        calculationDisplayValue = String( round( operate(firstNumber, operator, secondNumber), numberOfDecimals ) )
        calculationDisplay.value = String(  calculationDisplayValue )
      }

      if (buttonValue !== '=') calculationDisplayValue += button.textContent
      calculationDisplay.value = String( calculationDisplayValue ) 
  }
}

buttonContainer.addEventListener('click', inputButtonValueHandler)

