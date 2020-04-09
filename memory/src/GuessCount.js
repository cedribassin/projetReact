import React from 'react'

import './GuessCount.css'

//mise en place du compteur de paires et on destructure la props guesses pour l'afficher
const GuessCount = ({guesses}) => <div className="guesses">{guesses}</div>

export default GuessCount