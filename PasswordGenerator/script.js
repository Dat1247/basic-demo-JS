const pwEl = document.getElementById('pw');
const copyEl = document.getElementById('copy');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+=';

function getUpperCase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getLowerCase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];

}

function generatePassword() {
    const len = lengthEl.value;

    let password = '';

    // if (upperEl.checked) {
    //     password += getUpperCase();
    // }
    // if (lowerEl.checked) {
    //     password += getLowerCase();
    // }
    // if (numberEl.checked) {
    //     password += getNumber();
    // }
    // if (symbolEl.checked) {
    //     password += getSymbol();
    // }

    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }

    pwEl.innerText = password;
}

function generateX() {
    let xs = [];
    if (upperEl.checked) {
        xs.push(getUpperCase())
    }
    if (lowerEl.checked) {
        xs.push(getLowerCase())
    }
    if (numberEl.checked) {
        xs.push(getNumber())
    }
    if (symbolEl.checked) {
        xs.push(getSymbol())
    }

    if (xs.length === 0) {
        return '';
    }
    return xs[Math.floor(Math.random() * xs.length)];
}

generateEl.addEventListener('click', () => {
    if (upperEl.checked || lowerEl.checked || numberEl.checked || symbolEl.checked) {
        generatePassword();
    } else {
        alert('Please choose any value')
    }
})


// COPY A ELEMENT
copyEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = pwEl.innerText;

    if (!password) {
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    alert("Password copied to clipboard")
})