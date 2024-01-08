import Guessgrid from "./components/Guessgrid";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";

import './App.css';
import { useEffect, useState } from "react";
import { check_guess } from "../helpers/keyboard_fxns";

import dict_data from '../data/dictionary';
import words_data from '../data/targetWords.json';
import { danceTiles, flipTiles } from "../helpers/animations";


const App = () => {

  const [ guesses, setGuesses ] = useState({
    words: [
      [ "", "", "", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ], 
      [ "", "", "", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ]
    ],
    guesscount: 0,
  });

  const [ gameOver, setGameOver ] = useState(false); 




  useEffect(() => {
    

    if(guesses.guesscount !== 0) {  // if Enter key has been pressed for next guess
      
      const verdict = check_guess(["L", "U", "N", "C", "H"], guesses.words[guesses.guesscount-1]);
      
      // Flip tiles 
      flipTiles(verdict, guesses.guesscount-1)

      document.querySelector(`[data-key="${guesses.words[guesses.guesscount-1][0]}"]`).classList.add(verdict[0]);
      document.querySelector(`[data-key="${guesses.words[guesses.guesscount-1][1]}"]`).classList.add(verdict[1]);
      document.querySelector(`[data-key="${guesses.words[guesses.guesscount-1][2]}"]`).classList.add(verdict[2]);
      document.querySelector(`[data-key="${guesses.words[guesses.guesscount-1][3]}"]`).classList.add(verdict[3]);
      document.querySelector(`[data-key="${guesses.words[guesses.guesscount-1][4]}"]`).classList.add(verdict[4]);

      
      if(verdict.every(value => value === 'correct')) {
        setGameOver(true)
      }
    }
  }, [ guesses.guesscount ]);


  // useEffect(() => {
  //   if(guesses.guesscount != 0) {
  //     const verdict = check_guess(["L", "U", "N", "C", "H"], guesses.words[guesses.guesscount-1]);

  //     setTimeout(danceTiles(verdict, guesses.guesscount-1), 3000)
  
  //   }
  // }, [ gameOver ]);

  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>

      <div className="main-section">
        <Guessgrid guesses={guesses}/>
        <Keyboard 
          word={guesses.words[guesses.guesscount]}
          onGuess={setGuesses} 
          status={ gameOver }
          guesscount={guesses.guesscount}
        />
    </div>
    </div>
  )
};


export default App;