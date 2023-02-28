// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]//valid, accordint to our function
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]//valid, accordint to our function

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
const validateCred = card => {
    //let'sum up the numbers of the card(copy [...card] so we dont mutate it), using Luhn's algorithim:
    // https://content.codecademy.com/PRO/independent-practice-projects/credit-card-checker/diagrams/cc%20validator%20diagram%201.svg?_gl=1*1d18j51*_ga*NTg0OTQzNTA4Ny4xNjcyMjMzOTg4*_ga_3LRZM6TM9L*MTY3NzUxMzUxNS45LjEuMTY3NzUxMzUyNC41MS4wLjA.

    let sum = [...card].reduceRight((total, number, i) => {
        if (([...card].length - i) % 2 != 0) {
            return total + number
        } else {
            let modNumber = number * 2;
            if (modNumber > 9){
                modNumber -= 9;
            }
            return total + modNumber
        }
    })
    // The card is valid if the sums module of 10 is 0.
    return sum % 10 === 0;
}

//Uncoment to try function:
// console.log(validateCred([4,5,3,9,6,8,9,8,8,7,7,0,5,7,9,8]));
// console.log(validateCred(valid1));

const findInvalidCards = cards => cards.filter(card => validateCred(card) === false);
//Uncoment to try function:
// console.log(findInvalidCards(batch));

const idInvalidCardCompanies = invalidCards => {
    let firstDigits = invalidCards.map(card => card[0]);
    let invalidCardCompanies = [];
    if (firstDigits.findIndex(digit => digit === 3) > -1) {
        invalidCardCompanies.push('Amex (American Express)')
    } 
    if (firstDigits.findIndex(digit => digit === 4) > -1) {
        invalidCardCompanies.push('Visa')
    } 
    if (firstDigits.findIndex(digit => digit === 5) > -1) {
        invalidCardCompanies.push('MasterCard')
    } 
    if (firstDigits.findIndex(digit => digit === 6) > -1) {
        invalidCardCompanies.push('Discover')
    }
    return invalidCardCompanies
}
//Uncoment to try function:
// console.log(idInvalidCardCompanies([invalid1, invalid2, invalid3, invalid4, invalid5]));



let convertToNum = num =>String(num).split('').map(Number);

let checkCardLive = num => {
  let cardNumber = convertToNum(num);
  let cardCompany = '';
  switch (cardNumber[0]) {
    case 3:
    cardCompany = 'American Express';
    break;
    case 4:
    cardCompany = 'Visa';
    break;
    case 5:
    cardCompany = 'MasterCard';
    break;
    case 6:
    cardCompany = 'Discover';
    break;
  }
  if(validateCred(cardNumber)){
  console.log(`Tu tarjeta ${cardCompany} es VÁLIDA.`)
  } else {
    console.log('Tarjeta Inválida. Verifica tu número.')
  }
}
// CopyPaste for testing: 4539677908016808
const prompt = require('prompt-sync')();
checkCardLive(prompt('Ingresa tu numero de tarjeta, sin espacios: '));
