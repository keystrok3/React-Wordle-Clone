

/**
 * Checks how an array of characters matches with another array
 * of characters of similar length
 * 
 * arguments: current_wordle, guess
 * @return array of combination or one of 'correct', 'wrong', 'wrong-location'
*/

export const check_guess = (correct_wordle, guess) => {
    return correct_wordle.map((letter, i) => {
        if(letter === guess[i]) {
            return 'correct';
        } else if(correct_wordle.includes(guess[i].toUpperCase())) {
            return 'wrong-location';
        } else {
            return 'wrong';
        }
    })
};






