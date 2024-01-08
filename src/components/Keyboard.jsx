/* eslint-disable react/prop-types */

import '../assets/css/Keyboard.css';
import { useEffect } from 'react';

import dict_data from '../../data/dictionary.json';

const Keyboard = ({ onGuess, status }) => {
    

    /** Handle button clicks */
    const handleKeyClick = (e) => {
        // e.preventDefault();
    };

    /** Handle 'Enter' click */
    const handleEnterButtonClick = (e) => {
        // e.preventDefault();
        // 
    }

    /** Handle Backspace ckick */
    const handleBackspaceButtonClick = (e) => {
        // e.preventDefault();
        // 
    }

    /**
     * Detect keystrokes on device keyboard and make appropriate
     * changes to state
    */
    const handleKeyDown = (e) => {

        e.preventDefault();

        if(e.key === "Enter") {
        
            onGuess(prev => {
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
            });
        } else if(e.key === "Backspace") {
            onGuess(prev => {   // update previous state
                let wordscopy = [...prev.words];
        
                let word = [...wordscopy[prev.guesscount]];
                let top = word.findLastIndex(char => char !== "");
                
                if(top === -1) return { ...prev };

                word[top] = "";
                wordscopy[prev.guesscount] = word;
        
                return { words: [...wordscopy], guesscount: prev.guesscount };
            });
        } else {
            if (e.key.match(/^[a-z]$/)) {
                onGuess(prev => {   // update previous state
                    let wordscopy = [...prev.words];
            
                    let word = [...wordscopy[prev.guesscount]];
                    let top = word.findIndex(char => char === "");
                    
                    if(top === -1) return { words: [...wordscopy], guesscount: prev.guesscount };

                    word[top] = e.key.toUpperCase();
                    wordscopy[prev.guesscount] = word;
            
                    return { words: [...wordscopy], guesscount: prev.guesscount };
                });
            }
        }

    };


    // Mount onClick listener at when document is loaded
    useEffect(() => {
        if(status === false) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [ status ]);


    return (
        <div className="keyboard">
            <button className="key" data-key="Q" onClick={handleKeyClick}>Q</button>
            <button className="key" data-key="W" onClick={handleKeyClick}>W</button>
            <button className="key" data-key="E" onClick={handleKeyClick}>E</button>
            <button className="key" data-key="R" onClick={handleKeyClick}>R</button>
            <button className="key" data-key="T" onClick={handleKeyClick}>T</button>
            <button className="key" data-key="Y" onClick={handleKeyClick}>Y</button>
            <button className="key" data-key="U" onClick={handleKeyClick}>U</button>
            <button className="key" data-key="I" onClick={handleKeyClick}>I</button>
            <button className="key" data-key="O" onClick={handleKeyClick}>O</button>
            <button className="key" data-key="P" onClick={handleKeyClick}>P</button>
            <div className="space"></div>
            <button className="key" data-key="A" onClick={handleKeyClick}>A</button>
            <button className="key" data-key="S" onClick={handleKeyClick}>S</button>
            <button className="key" data-key="D" onClick={handleKeyClick}>D</button>
            <button className="key" data-key="F" onClick={handleKeyClick}>F</button>
            <button className="key" data-key="G" onClick={handleKeyClick}>G</button>
            <button className="key" data-key="H" onClick={handleKeyClick}>H</button>
            <button className="key" data-key="J" onClick={handleKeyClick}>J</button>
            <button className="key" data-key="K" onClick={handleKeyClick}>K</button>
            <button className="key" data-key="L" onClick={handleKeyClick}>L</button>
            <div className="space"></div>
            <button className="key large" onClick={handleEnterButtonClick}>Enter</button>
            <button className="key" data-key="Z" onClick={handleKeyClick}>Z</button>
            <button className="key" data-key="X" onClick={handleKeyClick}>X</button>
            <button className="key" data-key="C" onClick={handleKeyClick}>C</button>
            <button className="key" data-key="V" onClick={handleKeyClick}>V</button>
            <button className="key" data-key="B" onClick={handleKeyClick}>B</button>
            <button className="key" data-key="N" onClick={handleKeyClick}>N</button>
            <button className="key" data-key="M" onClick={handleKeyClick}>M</button>

            <button className="key large" onClick={handleBackspaceButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
                </svg>
            </button>
            
        </div>
    )
};


export default Keyboard;