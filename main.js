/*------------------------------------------------------------------------------
                                Decrypter 
                            By Gracie Hutchins
------------------------------------------------------------------------------*/

//----------------------------Connect JS to HTML-------------------------------
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

    // For the code copy and paste 
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

    //-------------------------------Copy button for results-------------------------------
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const resultId = button.getAttribute('data-result');
            const resultText = document.getElementById(resultId).textContent;
            
            if (resultText && resultText !== 'Please enter text to encrypt/decrypt.') {
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

/*-------------------------------Sources----------------------------------------
https://dev.to/cerchie/writing-a-caesar-shift-cipher-function-with-javascript-27eh
https://www.sciencedirect.com/topics/computer-science/caesar-cipher#:~:text=The%20Caesar%20cipher%20is%20based,shifts%20in%20the%20opposite%20direction.
https://en.wikipedia.org/wiki/Caesar_cipher
https://www.youtube.com/watch?v=M15LVmGe8-w
https://cryptii.com/pipes/caesar-cipher
------------------------------------------------------------------------------*/

/*----------------------------Atbash Cipher-------------------------------------
//Info

// Variables
var user_str_atbash = prompt("Enter the string to encode/decode: ");

// Logic
// Alphabet
*/
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
      // If it's a letter in our alphabet, substitute it
      if (alphebet_atbash[letter]) {
        cipher += alphebet_atbash[letter];
      } else {
        // If it's not in our alphabet (numbers, symbols), keep it as is
        cipher += letter;
      }
    } else {
        cipher += ' ';
    }
  }
  return cipher;
}
 
/*-------------------------------Sources----------------------------------------
https://en.wikipedia.org/wiki/Atbash
https://www.geeksforgeeks.org/implementing-atbash-cipher/
https://rumkin.com/tools/cipher/atbash/
https://www.youtube.com/watch?v=WYvHY7Kv3QU
------------------------------------------------------------------------------*/

//-------------------------------Hexdec.----------------------------------------
function hex(){
    null;
}

//-------------------------------Binary-----------------------------------------
function binary(){
    null;
}

//base64
function base64(){
    null;
}

//morse code
function mores_code(){
    null;
}

// rot 13
function rot13(){
    null;
}