var mathArray, arrayIndex, operator, calcDisplay, result, logDisplay, disArray, disString, errorStr, round;

function inital(){
    disArray = [];
    disString = '';
    mathArray = ['', ''];
    operator = '';
    arrayIndex = 0;
    calcDisplay = document.querySelector('#screen');
    result = null;
    errorStr = "";
    round = 0;
}

//NEEDS WORK!!!
function numButtonPush(num, element){
    pushAnimation(element);
    
    if(round > 0){
        calcDisplay.value = "";
        round = 0;
    }
    
    calcDisplay.value += num;
}

//NEEDS WORK!!!
function opButtonPush(op, element){
    pushAnimation(element);
    
    calcDisplay.value += ' ' + op + ' ';
    round = 0;
}

function equals(element){
    pushAnimation(element);
    
    disArray = calcDisplay.value.split(' ');
    var length = disArray.length;
    
    if(disArray[length-1] == " " || disArray[length-1] == ""){
        disArray.pop();
    } 
    
    result = getResult();
    calcDisplay.value = result;
    round++;
}

function backspace(element){
    pushAnimation(element);
    
    disString = calcDisplay.value;
    var length = disString.length;

    calcDisplay.value = disString.slice(0, length-1);
    var lastChar = disString[length-1];
    if(lastChar == " "){
        backspace(element);
    }
}

function changeSign(element){
    pushAnimation(element);
    disString = calcDisplay.value;
    var lastChar = disString[disString.length-1];
    
    if(disString == ''){
        calcDisplay.value = "-";
    }
    
    if( lastChar == '-' || lastChar != ' '){
        console.log(lastChar);
        if(areNums(parseFloat(lastChar), 0)){
            disArray = disString.split(' ');
            disArray[disArray.length-1] = disArray[disArray.length-1] * -1;
            console.log(disArray);
            calcDisplay.value = disArray.join(' ');
            return;
        }else{
            console.log("hit error");
            return;
        }
        
    }
    calcDisplay.value += "-";
}

//NEEDS WORK!!!
function mainReset(){
    calcDisplay.value = '';
    arrayIndex = 0;
    operator = '';
    numberArray = [];
    result = null;
    round = 0;
    console.log('reset');
}

function logReset(){
    logDisplay.value = '';
}

function checkSign(sign){
    if(sign === "+" || sign === "-" || sign === "*" || sign === "/" || sign === "pow" || sign === "sqrt"){
        return true;
    }
    errorStr = "Op!";
    return false;
}

function getResult(){
    arrayIndex = 0;
    arrLength = disArray.length;
    
    for(var i=0; i<arrLength; i++){
        if(areNums(parseFloat(disArray[i]), 0)){
            mathArray[arrayIndex] = (disArray[i]);
        }else if(checkSign(disArray[i])){
            operator = disArray[i];
        }else{
            console.log("bad input");
            return;
        }
        
        if(i%2 == 0 && arrayIndex == 1){
            mathArray[0] = myMath(mathArray[0], mathArray[1], operator);
        }
        arrayIndex = 1;
    }
    return mathArray[0];
}

function doMyNumbers(x, y, sign){

    if (areNums(x, y)){
        return myMath(x, y, sign);
    }else{
        errorStr = "Input";
        return false;
    }
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
        case "pow":
            answer = Math.pow(x, y);
            break;
        case "sqrt":
            answer = Math.sqrt(x);
            break;
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

function pushAnimation(element){
    element.classList.add('push');
    setTimeout(function(){element.classList.remove('push')}, 150);
} 
