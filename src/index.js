module.exports = function check(str, bracketsConfig) {
  let array = transformStringToArray(str);
  let arrayLength = array.length;
  let check1 = checkIfArrayLengthIsEven(array);
  // console.log(check1)
  if (check1) {
    let check2 = checkIfBracketIsOpening(array[0]);
    let check3 = checkIfBracketIsNeutral(array[0]);
    // console.log(check2)
    // console.log(check3)
    // console.log(check2 || check3)
    if (check2 || check3) {
      for (let i = 0; i <= arrayLength/2; i++) {
        let index = findPairOfBrackets(array);
        // console.log(index)
        // console.log(array[index])
        // console.log(array)
        // console.log("array.length", array.length)
        if(array[index] !== '|') {
          if (index) {
            array.splice(index-1, 2)
          } else {
            i = arrayLength
          }          
        } else if (array[index] === '|') {
          array.splice(arrayLength/2+1, 1)
          array.splice(index, 1)
        } else {
          i = arrayLength
        }
      }
      return (array.length == 0)? true:false;    
    }
  } else {
    return false;
  }
}

function transformStringToArray(str) {
  let arr = str.split('');
  return arr;
}
function checkIfArrayLengthIsEven (array){
  return (array.length % 2 == 0)? true : false;
}
function checkIfBracketIsOpening (bracket){
  let openingBrackets = ['(', '[', '{', '|'];
  let result = openingBrackets.filter(br => bracket === br); 
  return (result)? true : false;
}
function findFirstClosingBracket(array) {
  let indexOfFirstClosingBracket = array.findIndex(br => br === ']' || br === '}' || br === ')' || br === '|');
  let check = checkIfBracketIsNeutral(array[indexOfFirstClosingBracket]);
  if (!check) {
    return (indexOfFirstClosingBracket)? indexOfFirstClosingBracket : false;
  } else {
    return indexOfFirstClosingBracket;
  }  
}
function checkIfBracketIsNeutral(bracket) {
  let neutralBracket = '|';
  let result = (bracket === neutralBracket)? true : false; 
  return result;
}
function checkIfBracketsAreMatch(array, index) {
  let openingBrackets = ['(', '[', '{', '|'];
  let closingBrackets = [')', ']', '}', '|'];
  let keyOfClosingBracket = closingBrackets.findIndex(br => br === array[index]);
  let keyOfOpeningBracket = openingBrackets.findIndex(br => br === array[index - 1]);
  return (keyOfClosingBracket == keyOfOpeningBracket)? true:false;
}
function checkForSecondNeutralBracket(array, indexOfFirstNeutralBracket) {
  let result = checkIfBracketsAreMatch(array, indexOfFirstNeutralBracket+1); // check for || that stay close, one after another
  if (!result) { // check for such case |()| - between even number of brackets
    let newArray = array.slice();
    newArray.splice(indexOfFirstNeutralBracket, 1);
    let indexOfSecondNeutralBracket = findFirstClosingBracket(newArray) + 1;
    let numberOfBracketsBetween = indexOfSecondNeutralBracket - indexOfFirstNeutralBracket;
    if (numberOfBracketsBetween % 2 == 0 ) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function findPairOfBrackets(array) {
  let indexOfFirstClosingBracket = findFirstClosingBracket(array);
  if (array[indexOfFirstClosingBracket] === '|') {
    let result3 = checkForSecondNeutralBracket(array, indexOfFirstClosingBracket);
    return (result3)? indexOfFirstClosingBracket : false;
  } else if (indexOfFirstClosingBracket) {
    let result1 = checkIfBracketIsOpening(array[indexOfFirstClosingBracket - 1]);
    let result2 = checkIfBracketsAreMatch(array, indexOfFirstClosingBracket);
    if (result1 && result2) {
      return indexOfFirstClosingBracket;
    } else {
      return false;
    }
  } else {
    return false;
  }
}