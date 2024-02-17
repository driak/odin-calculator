function Calculator() {
  this.operators = ['+', '-', '*', '/']
  this.snarkyMessage = "Say whuuut."

  this.isOperator = (string) => this.operators.includes(string)  
  this.isMinusOperator = (string) => string === '-'
  this.add = (a, b) => Number( a ) + Number( b )
  this.subtract = (a, b) => Number( a ) - Number( b )
  this.multiply = (a, b) => Number( a ) * Number( b )
  this.divide = (a, b) => Number(b) === 0  ? this.snarkyMessage : Number( a ) / Number( b )
  
  this.round = (number, numberOfDecimals = 2) => {
    if ( !Number(number) || Number.isInteger(number) ) return number

    return number.toFixed(numberOfDecimals)
  }
  this.operate = (a, operator, b) => {
    switch(operator) {
      case '+':
        return this.add(a, b)
      case '-':
        return this.subtract(a, b)
      case '*':
        return this.multiply(a, b)
      case '/':
        return this.divide(a, b)
    }
  }
  this.evaluate = (expression) => calculator.round ( this.operate(
    (expression.firstNumberSign + expression.firstNumber), expression.operator, expression.secondNumber )
  )
}

function Expression(firstNumberSign = '+',
                    firstNumber = undefined,
                    operator = undefined,
                    secondNumber = undefined,
                    isEvaluable = false) {
  this.firstNumberSign = firstNumberSign
  this.firstNumber = firstNumber
  this.operator = operator
  this.secondNumber = secondNumber
  this.isEvaluable = isEvaluable
 
  this.signs = ['+', '-']

  this.isSign = string => { 
    return this.signs.includes(string) }
  this.clear = () => {
    if (!this.firstNumber) return

    this.firstNumberSign = '+'
    this.firstNumber = undefined
    this.operator = undefined 
    this.secondNumber = undefined 
    this.lastInput = undefined
    this.isEvaluable = false
  } 
  this.deleteLastInput = (lastInput) => {
    if ( lastInput === this.firstNumberSign ) {
      this.firstNumberSign = '+'
    } else if ( lastInput === String( this.firstNumber ).slice(-1) ) {
      this.firstNumber = String( this.firstNumber ).slice(0, -1)
    } else if ( lastInput === this.operator ) {
      this.operator = undefined
    } else if ( lastInput === String( this.secondNumber ).slice(-1) ) {
      this.secondNumber = String( this.secondNumber ).slice(0, -1)
    }
  }
  this.addEvaluation = evaluation => {
    if (!this.isEvaluable) return

    this.operator = undefined
    this.secondNumber = undefined
    this.isEvaluable = false

    if ( expression.isSign( String(evaluation)[0] ) ) {
      let sign = String(evaluation)[0]

      this.firstNumberSign = sign
      this.firstNumber = String(evaluation).slice(1, String(evaluation).length ) 
    } else {
      this.firstNumberSign = '+'
      this.firstNumber = String(evaluation)
    }
  }
  this.toString = () => {
    let sign, firstNumber, operator, secondNumber
    this.firstNumberSign === '+' ? sign = '' : sign = this.firstNumberSign 
    firstNumber = this.firstNumber || ''
    operator = this.operator || ''
    secondNumber = this.secondNumber || ''

    return `${sign}${firstNumber}${operator}${secondNumber}`
  }
  this.addInput = input => {
    this.lastInput = input

    if ( !this.firstNumber && this.isSign(input) ) {
      this.firstNumberSign = input  
    } else if ( this.firstNumber && !this.operator
             && Number.isInteger( Number(input) ) ) {
      this.firstNumber = this.firstNumber + input 
    } else if (!this.operator
             && input === '.') {
      let firstNumber = this.firstNumber ? this.firstNumber : ''
      if ( firstNumber.split('').filter( char => char === '.').length === 0 ) {
        this.firstNumber = String(firstNumber + input)
      }
    } else if ( !this.firstNumber && Number.isInteger( Number(input) ) ) {
      this.firstNumber = input
    } else if ( this.firstNumber
            && calculator.isOperator(input) && !calculator.isMinusOperator(input) )  {
      this.operator = input
    } else if ( this.firstNumber && !this.operator && calculator.isMinusOperator(input) )  {
      this.operator = input
    } else if (this.operator && !this.secondNumber 
            && calculator.isMinusOperator(input) ) {
      this.secondNumber = input 
    } else if (this.operator && !this.secondNumber 
            && Number.isInteger( Number(input) ) ) {
      this.secondNumber = input 

      this.isEvaluable = true
    } else if ( this.secondNumber
             && Number.isInteger( Number(input) ) ) {
      this.secondNumber = String(this.secondNumber) + input 

      this.isEvaluable = true
    } else if (!this.secondNumber
             && input === '.') {
      let secondNumber = this.secondNumber ? this.secondNumber : ''
      if ( secondNumber.split('').filter( char => char === '.').length === 0 ) {
        this.secondNumber = String(secondNumber + input)
      }
    }                  
  }
}

let calculator = new Calculator()
let expression = new Expression()

let buttonContainer = document.querySelector('.button-container')
let calculationDisplay = document.querySelector('.calculation-display')
let calculationDisplayValue = String(  calculationDisplay.value )
let splitDisplayValue = calculationDisplayValue.split('')

function areConsecutiveOperatorsAtEnd(buttonValue, displayValue) {
  return calculator.isOperator( buttonValue ) 
        && calculator.isOperator( displayValue[displayValue.length - 1] )  
}

function isSnarkyMessage(displayValue) {
  return displayValue === calculator.snarkyMessage 
}

function clearDisplay() {
  calculationDisplayValue = ''
  calculationDisplay.value = calculationDisplayValue
}

function deleteLastCharacter() {
  expression.deleteLastInput( calculationDisplayValue.slice(-1) )

  calculationDisplayValue = calculationDisplayValue.slice(0, -1)
  calculationDisplay.value = calculationDisplayValue
}

function isButtonTrigger(event) {
  return event.target.tagName.toLowerCase() === 'button'
}

const inputButtonValueHandler = event => { 
  let button = event.target
  let buttonValue = button.textContent
  let firstNumber, secondNumber, operator

  if ( !isButtonTrigger(event) ) return 
  
  switch(buttonValue) {
    case 'AC':
      expression.clear()
      clearDisplay()
      break
    case '⌫':
      deleteLastCharacter()
      break
    default:
      if ( isSnarkyMessage(calculationDisplayValue) ) clearDisplay() 

      expression.addInput(buttonValue)

      if ( expression.isEvaluable
        && ( buttonValue === '=' || calculator.isOperator(buttonValue) ) ) {
        calculationDisplayValue = calculator.evaluate(expression)
        expression.addEvaluation( calculator.evaluate(expression) )
      } else {
        calculationDisplayValue = expression.toString()
      }  
    
      calculationDisplay.value = calculationDisplayValue
  }
}

buttonContainer.addEventListener('click', inputButtonValueHandler)

