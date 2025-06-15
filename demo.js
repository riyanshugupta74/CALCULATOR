
var currentInput = '';
var displayElement = document.getElementById('display');


function addToDisplay(value) {
    currentInput = currentInput + value;
    displayElement.value = currentInput;
}


function clearDisplay() {
    currentInput = '';
    displayElement.value = '';
}


function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    displayElement.value = currentInput;
}

function calculateResult() {
    try {
    
        var expression = currentInput.replace(/×/g, '*');
        

        if (expression === '' || expression === null) {
            return;
        }
        
        
        var result = eval(expression);
    

        if (result === Infinity || result === -Infinity) {
            displayElement.value = 'Error';
            currentInput = '';
        } else if (isNaN(result)) {
            displayElement.value = 'Error';
            currentInput = '';
        } else {
            
            result = Math.round(result * 100000000) / 100000000;
            displayElement.value = result;
            currentInput = result.toString();
        }
        
    } catch (error) {
        displayElement.value = 'Error';
        currentInput = '';
    }
}


document.addEventListener('keydown', function(event) {
    var key = event.key;
    
    if (key >= '0' && key <= '9') {
        addToDisplay(key);
    } else if (key === '+' || key === '-' || key === '/' || key === '*') {
        if (key === '*') {
            addToDisplay('×');
        } else {
            addToDisplay(key);
        }
    } else if (key === '.') {
        addToDisplay('.');
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});


function addButtonEffect(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(function() {
        button.style.transform = 'scale(1)';
    }, 150);
}


document.addEventListener('DOMContentLoaded', function() {
    
    displayElement = document.getElementById('display');
    
    
    var buttons = document.querySelectorAll('.calc-button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            addButtonEffect(this);
        });
    }
});


function addDecimal() {
    if (currentInput.indexOf('.') === -1) {
        addToDisplay('.');
    }
}
function isOperator(char) {
    return ['+', '-', '*', '×', '/'].indexOf(char) !== -1;
}


function addOperator(operator) {
    if (currentInput === '') {
        return; 
    }
    
    var lastChar = currentInput.slice(-1);
    if (isOperator(lastChar)) {
        
        currentInput = currentInput.slice(0, -1) + operator;
        displayElement.value = currentInput;
    } else {
        addToDisplay(operator);
    }
}