module.exports = function check(str, bracketsConfig) {
  let array = str.split('');
  let arrayLength = array.length;
  let check1 = checkIfArrayLengthIsEven(array);
  // console.log(check1)
  let stack = [];

  if (check1) {
    let checkOpening = checkIfBracketIsOpening(array[0]);    
    let checkNeutral = checkIfBracketIsNeutral(array[0]);

    if (checkOpening || checkNeutral) {
      for (let i = 0; i < array.length; i++) {
        let checkOpening = checkIfBracketIsOpening(array[i]);    
        let checkNeutral = checkIfBracketIsNeutral(array[i]);
        // console.log(array[i])
        // console.log(checkOpening)
        // console.log(checkNeutral)
        if (checkNeutral) {
          let pair = checkForOpeningPair(array[i]);
          if(stack[stack.length-1] === pair) {
            stack.pop()
          } else {
            stack.push(array[i])
          }
        } else if (checkOpening) {
          stack.push(array[i])
          // console.log(stack)
        } else {
          // console.log(stack)
          let pair = checkForOpeningPair(array[i]);
          // console.log(pair)
          // console.log(stack[stack.length-1] === pair)
          if(stack[stack.length-1] === pair) {
            stack.pop()
          } else {
            stack.push(false)
            break
          }
        }        
      }
    } else {
      return false
    }    

    if (stack.length == 0) {
      return true
    }
  
    if (stack.includes(false)) {
      return false
    }

  } else {
    return false
  }    
}

function checkIfArrayLengthIsEven (array) {
  return (array.length % 2 == 0)? true : false;
}

function checkIfBracketIsOpening (bracket) {
  let openingBrackets = ['(', '[', '{'];
  let result = openingBrackets.includes(bracket); 
  return (result)? true : false;
}

function checkIfBracketIsNeutral(bracket) {
  let neutralBracket = '|';
  return (bracket === neutralBracket)? true : false;
}

function checkForOpeningPair(bracket) {
  let openingBrackets = ['(', '[', '{', '|'];
  let closingBrackets = [')', ']', '}', '|'];  
  let indexOfClosingBracket = closingBrackets.indexOf(bracket);
  let openingPair =  openingBrackets[indexOfClosingBracket];
  return openingPair;
}