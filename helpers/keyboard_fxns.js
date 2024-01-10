
import dict_data from '../data/dictionary.json';

/**
 * Checks how an array of characters matches with another array
 * of characters of similar length
 * 
 * arguments: current_wordle, guess
 * @return array of combination or one of 'correct', 'wrong', 'wrong-location'
*/

export const check_guess = (correct_wordle, guess) => {
    correct_wordle = correct_wordle.split("");
    return correct_wordle.map((letter, i) => {
        if(letter === guess[i]) {
            return 'correct';
        } else if(correct_wordle.includes(guess[i].toUpperCase())) {
            // Check for repeating wrong-location
            if(correct_wordle.findIndex(char => char === guess[i]) < i) return 'wrong';

            return 'wrong-location';
        } else {
            return 'wrong';
        }
    })
};



/**
 * Responds to the 'Enter' keystroke or button click
 * */ 

export const enterKeyResponse = (prev) => {
    if(!dict_data.includes(prev.words[prev.guesscount].join("").toLowerCase())) {
        document.querySelectorAll(`[data-row="${prev.guesscount}"]`).forEach((element) => {
            element.classList.add('shake');
            element.addEventListener("animationend", () => {
                element.classList.remove("shake");
            }, { once: true });
        });
        return { ...prev };
    }

    if(prev.words[prev.guesscount].some(char => char === "")) {
        return { words: [ ...prev.words ], guesscount: prev.guesscount };
    }

    if(prev.guesscount === 5) {

        return { words: [ ...prev.words ], guesscount: prev.guesscount };
    }

    return { words: [ ...prev.words ], guesscount: prev.guesscount + 1 };
};


/**
 * Responds to the 'Backspace' keystroke or button click
 * */ 

export const backspaceKeyResponse = (prev) => {
    let wordscopy = [...prev.words];
        
    let word = [...wordscopy[prev.guesscount]];
    let top = word.findLastIndex(char => char !== "");
    
    if(top === -1) return { ...prev };

    word[top] = "";
    wordscopy[prev.guesscount] = word;

    return { words: [...wordscopy], guesscount: prev.guesscount };
};


/**
 * Responds to the alphabetic keystroke or button click
 *  
 * */ 
export const alphabeticKeyResponse = (prev, letter) => {
    let wordscopy = [...prev.words];
            
    let word = [...wordscopy[prev.guesscount]];
    let top = word.findIndex(char => char === "");
    
    if(top === -1) return { words: [...wordscopy], guesscount: prev.guesscount };

    word[top] = letter.toUpperCase();
    wordscopy[prev.guesscount] = word;

    return { words: [...wordscopy], guesscount: prev.guesscount };
};