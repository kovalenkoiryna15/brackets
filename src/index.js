module.exports = function check(str, bracketsConfig) {
  let array = str.split('');
  let check1 = checkIfArrayLengthIsEven(array);
  let stack = [];

  if (check1) {
    let checkOpening = checkIfBracketIsOpening(array[0], bracketsConfig);
    let checkNeutral = checkIfBracketIsNeutral(array[0], bracketsConfig);

    if (checkOpening || checkNeutral) {
      for (let i = 0; i < array.length; i++) {
        let checkOpening = checkIfBracketIsOpening(array[i], bracketsConfig);    
        let checkNeutral = checkIfBracketIsNeutral(array[i], bracketsConfig);
        if (checkNeutral) {
          if(stack[stack.length-1] === array[i]) {
            stack.pop()
          } else {
            stack.push(array[i])
          }
        } else if (checkOpening) {
          stack.push(array[i])
        } else {
          let pair = checkForOpeningPair(array[i], bracketsConfig);
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
    } else if (stack.includes(false)) {
      return false
    } else {
      return false
    }

  } else {
    return false;
  }
  
}

function checkIfArrayLengthIsEven (array) {
  return array.length % 2 == 0;
}

function checkIfBracketIsOpening (bracket, bracketsConfig) {  
  let targetPairIndex;
  for (let i = 0; i <  bracketsConfig.length; i++) {
    if (bracketsConfig[i].includes(bracket)) {
      targetPairIndex = i;
    }
  }
  return bracketsConfig[targetPairIndex][0] === bracket;
}

function checkIfBracketIsNeutral(bracket, bracketsConfig) {
  let targetPairIndex = false;
  for (let i = 0; i <  bracketsConfig.length; i++) {
    if (bracketsConfig[i].includes(bracket) && bracketsConfig[i][0] === bracketsConfig[i][1]) {
      targetPairIndex = true;
    }
  }
  return targetPairIndex;
}

function checkForOpeningPair(bracket, bracketsConfig) {
  let targetPairIndex;
  for (let i = 0; i <  bracketsConfig.length; i++) {
    if (bracketsConfig[i].includes(bracket)) {
      targetPairIndex = i;
    }
  }
  let openingPair = bracketsConfig[targetPairIndex][0];
  return openingPair;
}