var isOperating = false;
var isFloating = false; 
var toBeCleared = false; 
var operator;
var operand; 
var display; 

function numClicked() {
  var currVal = display.val();
  var clickedNum = $(this).text();
  
  if (currVal === "0" || toBeCleared){
    toBeCleared = false;
    display.val(clickedNum);
  }else{
    display.val(currVal + clickedNum);
  }
}

function operatorClicked(){
  alert("Operator button clicked!");
}

function invertClicked(){
  display.val(display.val() * -1);
}

function rootClicked(){
  display.val(Math.sqrt(evaluate()));
}

function decimalClicked(){
  if (toBeCleared){
    display.val('0.');
    toBeCleared = false;
  }else{
    if(!isFloating){
      display.val(display.val().concat("."));
    }
  }
  isFloating = true;
}

function equalsClicked(){
  display.val(evaluate());
  reset();
}

function reset(){
  toBeCleared = true;
  isOperating = false;
  isFloating = false;
  operator = null;
  operand = null;
  
  $('#currOp').text("");
}
function clearClicked(){
  reset();
  display.val("0");
}

function init(){
  display = $('#display');
  
  $('.num').on('click', numClicked);
  $('.operator').on('click', operatorClicked);
  $('#invert').on('click', invertClicked);
  $('#root').on('click', rootClicked);
  $('#decimal').on('click',decimalClicked);
  $('#equals').on('click',equalsClicked);
  $('#clear').on('click',clearClicked);
}

function evaluate(){
  var currVal = parseFloat(display.val());
  var result;
  
  switch (operator){
    case '+' :
      result = operand + currVal;
      break;
    
    case '-' :
      result = operand - currVal;
      break;
      
    case '*' :
      result = operand * currVal;
      break;
      
    case '÷' :
      if (currVal === 0){
        result = 'Err';
      }else{
        result = operand/currVal;
      }
      
      break;
      
    case '^' :
      result = Math.pow(operand,currVal);
      break;
      
    default :
      result = currVal;
  }
  
  return result;
}

function operatorClicked(){
  if (isOperating) {
    display.val(evaluate());
  }
  
  switch($(this).attr('id')){
    case 'plus' : 
      operator = '+';
      break;
      
    case 'minus' :
      operator = '-';
      break;
    
    case 'mult' :
      operator = '*';
      break;
      
    case 'divide' :
      operator = '÷';
      break;
    
    case 'power' :
      operator = '^';
      break;
  }
  
  operand = parseFloat(display.val());
  isOperating = true;
  toBeCleared = true;
  $('#currOp').text(operator);
}

$(document).ready(init);