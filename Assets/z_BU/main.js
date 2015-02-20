var numberArray, arrayIndex, mathEnd, operator, calcDisplay, result, logDisplay, pass;

function inital(){
    numberArray = ['',''];
    arrayIndex = 0;
    operator = [''];
    calcDisplay = document.querySelector('#screen');
    logDisplay = document.querySelector('#mathLog');
    result = null;
    errorStr = "";
    pass = 0;
}

function doMath(){
    
    result = doMyNumbers(numberArray[0], numberArray[1], operator);
    
    if(result !== false){
        calcDisplay.value = result;
        logDisplay.value += " = " + result + "\n";
        
    }else{
        calcDisplay.value = "Error: " + errorStr;
    }
    arrayIndex = 1;
    pass = 0;
}

function pushAnimation(element){
    element.classList.add('push');
    setTimeout(function(){element.classList.remove('push')}, 150);
} 

function numButtonPush(num, element){
    
    if(result != null){
        console.log("result");
        calcDisplay.value = '';
        result = null;
    }
    
    if(checkSign(calcDisplay.value)){
        calcDisplay.value = '';
        console.log('Op check');
    }
    pushAnimation(element);
    calcDisplay.value += num;
    logDisplay.value += num;
    numberArray[arrayIndex] += num;
}

function opButtonPush(op, element){
    
    pushAnimation(element);
    
    if(pass > 0){
        numberArray[0] = doMyNumbers(numberArray[0], numberArray[1], operator);
        numberArray[1] = '';
    }
    
    if(result != null){
        numberArray[0] = result;
        numberArray[1] = '';
        calcDisplay.value = result;
    }
    
    calcDisplay.value = op;
    logDisplay.value += " " + op + " ";
    operator = op;
    arrayIndex = 1;
    pass++;
}

function changeSign(element){
    pushAnimation(element);
    var screenCont = calcDisplay.value;
    var location = calcDisplay.value.length - numberArray[arrayIndex].length;
    if(numberArray[arrayIndex] < 0){
        //console.log("to positive");
        numberArray[arrayIndex] = numberArray[arrayIndex] * -1;
        calcDisplay.value = screenCont.replace(/-/g, '');
    }else{
        //console.log("to negative");
        numberArray[arrayIndex] = parseFloat(numberArray[arrayIndex]) * -1;
        calcDisplay.value = [screenCont.slice(0, location), "-", screenCont.slice(location)].join('');
    }
}

function mainReset(){
    calcDisplay.value = '';
    arrayIndex = 0;
    operator = '';
    numberArray = ['',''];
    result = null;
    logDisplay.value += '\n';
    console.log('reset');
    pass = 0;
}

function logReset(){
    logDisplay.value = "";
}

function checkSign(sign){
    if(sign === "+" || sign === "-" || sign === "*" || sign === "/"){
        return true;
    }
    errorStr = "Op!";
    return false;
}

function doMyNumbers(x, y, sign){

    if (areNums(x, y)){
        return myMath(x, y, sign);
    }else{
        errorStr = "Input";
        return false;
    }
}

function notNumbers(){
    alert("ERROR! Please give me NUMBERS and a proper OPERATOR!");
    //return false;
}

function myMath(x, y, sign){
    var answer= null;
    x = parseFloat(x);
    y = parseFloat(y);
    
    if(checkSign(sign)){
    
    switch (sign) {
        case "+":
            answer = x + y;
            break;
        case "-":
            answer = x - y;
            break;
        case "*":
            answer = x * y;
            break;
        case "/":
            if(y != 0){
                answer = x / y;
                break;
            }else{
                errorStr = "div 0 !";
                return false;
            }
        default:
            errorStr = "Math";
            return false;
    }
    return answer;
    }else{
        return false;
    }
}
           

function areNums(x, y){
    
    if(isNaN(x) || isNaN(y)){
        errorStr = "Input";
        return false;
    }
    return true; 
}

function result(){
    alert("Your numbers are " + num1 + " and " + num2 + "\nYou chose to use: " + mySign + "\nThe result is: " + doMyNumbers(num1, num2, mySign));
}
