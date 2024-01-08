

export const flipTiles = function(verdict, prev_guesscount) {
    document.querySelectorAll(`[data-row="${prev_guesscount}"]`).forEach((element, key) => {
        setTimeout(() => {
          element.dataset.state = verdict[key];
          element.classList.add('flip');
        }, key * 500)

        element.addEventListener('transitionend', () => {
          element.classList.remove('flip')
        }, { once: true })
      });
};


export const danceTiles = function(verdict, guesscount) {
    if(verdict.every(item => item === 'correct')) {
        document.querySelectorAll(`[data-row="${guesscount}"]`).forEach((element, key) => {
            setTimeout(() => {
              element.classList.add('dance');
            }, key * 500)
        })
    }
};