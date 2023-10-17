//Creating Calculator class

class Calculator {

    constructor(currentOperandText, previousOperandText){
        this.currentOperandText = currentOperandText;
        this.previousOperandText = previousOperandText;
        this.clear();
    }

    

    clear(){
        //Clears the screen
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete(){
        //Deletes one symbol
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
        
        //  console.log('hi');

    }

    compute(){
        //Makes the computations
        if(this.operation === undefined) return;
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch(this.operation){
            case '/':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            default:
                console.log('Nothing was computed!');
                return;
        }

        this.operation = undefined;
        this.previousOperand = '';
        this.currentOperand = computation;


    }

    appendNumber(number){
        //Appends the numbers on the screen
        if(number === '.' && this.currentOperand.includes('.')) return;

        if(this.currentOperand.toString() === ''){
        this.currentOperand = number.toString();
        }else{
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    
    }

    chooseOperation(operation){
        //Choosing the operation to perform
        if(this.currentOperand === '' ) return
        if(this.previousOperand !== '' ){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';


    }

    getDisplayNumber(number){
       const stringNumber = number.toString();
       const integerDigits = parseFloat(stringNumber.split('.')[0]);
       const decimalDigits = stringNumber.split('.')[1];

       let integerDisplay

       if(isNaN(integerDigits)){
         integerDisplay = '';
       } else {
         integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits : 0 });
       }
       if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
       } else {
        return integerDisplay;
       }

      
    }

    updateDisplay(){
        //Updates the display evey time anything is pressed
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandText.innerText = ` ${this.getDisplayNumber(this.previousOperand)}  ${this.operation} `;
        } else {
            this.previousOperandText.innerText = this.getDisplayNumber(this.previousOperand);
        }
        

        
    }
}

//Getting the buttons and the text fields from the HTML. Attaching them to variables in JS

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')


//Creationg an instance of Calculator

const calculator = new Calculator(currentOperandText, previousOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        // console.log('button was clicked')
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })

})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {

    calculator.delete();
    calculator.updateDisplay();    

})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})