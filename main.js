/*------------------------------------------------------------------------------
                                Decrypter 
                            By Gracie Hutchins
------------------------------------------------------------------------------*/

function textToBinary(text) {
  return text.split('').map(
    c => c.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ');
}

function binaryToText(binary) {
  return binary.split(' ').map(
    b => String.fromCharCode(parseInt(b, 2))
  ).join('');
}

console.log(textToBinary("Hello!"));
console.log(binaryToText("01001000 01100101 01101100 01101100 01101111 00100001"));

const morse = {
  "A": ".-","B": "-...","C": "-.-.","D": "-..","E": ".","F": "..-.","G": "--.","H": "....","I": "..",
  "J": ".---","K": "-.-","L": ".-..","M": "--","N": "-.","O": "---","P": ".--.","Q": "--.-","R": ".-.",
  "S": "...","T": "-","U": "..-","V": "...-","W": ".--","X": "-..-","Y": "-.--","Z": "--..",
  "0": "-----","1": ".----","2": "..---","3": "...--","4": "....-","5": ".....","6": "-....",
  "7": "--...","8": "---..","9": "----."," ": "/",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--", "/": "-..-.", 
  "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-", 
  "+": ".-.-.", "-": "-....-", "_": "..--.-", '"': ".-..-.", "$": "...-..-", "@": ".--.-."
};

const textFromMorse = {};
for (let k in morse) textFromMorse[morse[k]] = k;

function textToMorse(text) {
  return text.toUpperCase().split('').map(c => morse[c] || '').join(' ').replace(/ +/g, ' ').trim();
}

function morseToText(code) {
  return code.split(' ').map(c => textFromMorse[c] || '').join('').replace(/\//g, ' ');
}

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.cipher-tabs li');
    const panels = document.querySelectorAll('.cipher-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const cipher = tab.getAttribute('data-cipher');
            document.getElementById(`${cipher}-panel`).classList.add('active');
        });
    });

    //-------------------------------Caesar Cipher-------------------------------
    const caesarButton = document.getElementById('caesar-button');
    const caesarInput = document.getElementById('caesar-input');
    const shiftInput = document.getElementById('shift-input');
    const caesarResult = document.getElementById('caesar-result');

    caesarButton.addEventListener('click', () => {
        const userStr = caesarInput.value;
        const userShift = parseInt(shiftInput.value);
        
        if (!userStr) {
            caesarResult.textContent = 'Please enter text to encrypt/decrypt.';
            return;
        }
        
        const result = caesar_cipher(userStr, userShift);
        caesarResult.textContent = result;
    });

    document.getElementById('code-copy-btn').addEventListener('click', function() {
        const codeText = document.getElementById('cipher-code').textContent;
        navigator.clipboard.writeText(codeText).then(() => {
          const originalText = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i> Copied!';
          setTimeout(() => {
            this.innerHTML = originalText;
          }, 2000);
        });
      });

    //-------------------------------Atbash Cipher-------------------------------
    const atbashButton = document.getElementById('atbash-button');
    const atbashInput = document.getElementById('atbash-input');
    const atbashResult = document.getElementById('atbash-result');

    atbashButton.addEventListener('click', () => {
        const userStrAtbash = atbashInput.value;
        
        if (!userStrAtbash) {
            atbashResult.textContent = 'Please enter text to encrypt/decrypt.';
            return;
        }
        
        const result = atbash(userStrAtbash.toUpperCase());
        atbashResult.textContent = result;
    });

    //-------------------------------Binary Cipher-------------------------------
    const binaryInput = document.getElementById('binary-input');
    const toBinaryBtn = document.getElementById('to-binary-btn');
    const fromBinaryBtn = document.getElementById('from-binary-btn');
    const binaryResult = document.getElementById('binary-result');

    if (toBinaryBtn) {
        toBinaryBtn.addEventListener('click', function() {
            const input = binaryInput.value;
            if (!input) {
                binaryResult.textContent = 'Please enter text to convert to binary.';
                return;
            }
            binaryResult.textContent = textToBinary(input);
        });
    }

    if (fromBinaryBtn) {
        fromBinaryBtn.addEventListener('click', function() {
            const input = binaryInput.value;
            if (!input) {
                binaryResult.textContent = 'Please enter binary to convert to text.';
                return;
            }
            binaryResult.textContent = binaryToText(input);
        });
    }

    //-------------------------------Morse Code Cipher-------------------------------
    const morseInput = document.getElementById('morse-input');
    const toMorseBtn = document.getElementById('to-morse-btn');
    const fromMorseBtn = document.getElementById('from-morse-btn');
    const morseResult = document.getElementById('morse-result');

    if (toMorseBtn) {
        toMorseBtn.addEventListener('click', function() {
            const input = morseInput.value;
            if (!input) {
                morseResult.textContent = 'Please enter text to convert to Morse.';
                return;
            }
            morseResult.textContent = textToMorse(input);
        });
    }

    if (fromMorseBtn) {
        fromMorseBtn.addEventListener('click', function() {
            const input = morseInput.value;
            if (!input) {
                morseResult.textContent = 'Please enter morse code to convert to text.';
                return;
            }
            morseResult.textContent = morseToText(input);
        });
    }

    //-------------------------------ROT13 Cipher-------------------------------
    const rot13Button = document.getElementById('rot13-button');
    const rot13Input = document.getElementById('rot13-input');
    const rot13Result = document.getElementById('rot13-result');

    if (rot13Button) {
        rot13Button.addEventListener('click', () => {
            const userStrRot13 = rot13Input.value;
            if (!userStrRot13) {
                rot13Result.textContent = 'Please enter text to encrypt/decrypt.';
                return;
            }
            const result = rot13(userStrRot13.toUpperCase());
            rot13Result.textContent = result;
        });
    }

    //-------------------------------Copy button for results-------------------------------
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const resultId = button.getAttribute('data-result');
            const resultText = document.getElementById(resultId).textContent;
            
            if (resultText && resultText !== 'Please enter text to encrypt/decrypt.' && resultText !== 'Please enter text to convert to Morse.' && resultText !== 'Please enter morse code to convert to text.' && resultText !== 'Please enter text to convert to binary.' && resultText !== 'Please enter binary to convert to text.') {
                navigator.clipboard.writeText(resultText).then(() => {
                    const originalText = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        button.innerHTML = originalText;
                    }, 2000);
                });
            }
        });
    });
});

/*----------------------------Ceaser Cypher-------------------------------------
//Info
alert("The Caesar Cypher is a famous cypher made and named after Julius Caesar. Caesar used this encryption method in the military to send mrssages without enemies being able to decrypt their messages. This methods takes a number, or key and whatever the number is is how many places the letters shift. So if you had the word 'Hello' and the key was one, the finished encryoted message would be 'Ifmmp'");

// Variables
var userStr = prompt("Enter the string to encode/decode: ");
var userShift = parseInt(prompt("Enter the shift[key] number (can be negative):"));

// Logic
*/
function caesar_cipher(str, num){
    var lowerCaseStr = str.toLowerCase();
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var newStr = '';
    
    for (var i = 0; i < lowerCaseStr.length; i++){
        var currentLetter = lowerCaseStr[i];
        if (currentLetter === ' '){
            newStr += currentLetter;
            continue;
        }
        var currentIndex = alphabet.indexOf(currentLetter);
        if (currentIndex === -1) {
            newStr += currentLetter;
            continue;
        }
        var newIndex = (currentIndex + num) % 26;
        if (newIndex < 0) newIndex += 26;
        if (str[i] === str[i].toUpperCase()) {
            newStr += alphabet[newIndex].toUpperCase();
        }
        else newStr += alphabet[newIndex];
    }
    return newStr;    
}

let alphebet_atbash = {
'A': 'Z', 'B': 'Y', 'C': 'X', 'D': 'W', 'E': 'V',
'F': 'U', 'G': 'T', 'H': 'S', 'I': 'R', 'J': 'Q',
'K': 'P', 'L': 'O', 'M': 'N', 'N': 'M', 'O': 'L',
'P': 'K', 'Q': 'J', 'R': 'I', 'S': 'H', 'T': 'G',
'U': 'F', 'V': 'E', 'W': 'D', 'X': 'C', 'Y': 'B', 'Z': 'A'
};
 
function atbash(user_str_atbash) {
  let cipher = '';
  for (let letter of user_str_atbash) {
    if (letter !== ' ') {
      if (alphebet_atbash[letter]) {
        cipher += alphebet_atbash[letter];
      } else {
        cipher += letter;
      }
    } else {
        cipher += ' ';
    }
  }
  return cipher;
}

function hex(){
    null;
}

let input = "HELLO WORLD";
function rot13(text){
    let result = "";
    for(let i = 0; i < text.length; i++) {
        let letter = text[i];
        let code = text.charCodeAt(i);

        if (code >= 65 && code <= 90){
            if (code + 13 > 90) {
                code = code -13;
            } else {
                code = code +13;
            }
            result += String.fromCharCode(code);
        } else {
            result += letter;
        }
    }
    return result;
}
let output = rot13(input);
console.log(output);
