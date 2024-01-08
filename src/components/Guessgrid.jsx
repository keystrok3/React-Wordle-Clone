/* eslint-disable react/prop-types */

import '../assets/css/Guessgrid.css';
import Alert from './Alert';


const Guessgrid = ({ guesses }) => {


    return (
        <div className="guess-grid">
            {
                guesses.words.map((word, ridx) => {
                    return word.map((letter, lidx) => {
                        return <div className="tile" data-state data-row={`${ridx}`} key={lidx}>{letter}</div>
                    })
                })
            }
            <div className="alert-container"></div>
        </div>
    )
};


export default Guessgrid;