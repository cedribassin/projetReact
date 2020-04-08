import React from 'react'

import './Card.css'

const HIDDEN_SYMBOL = '❓'
// card = type du symbole et feedback = état d'affichage de se symbole
const Card = ({card, feedback}) =>(
<div className="card">
<span className="symbol">
    // si le feedbackest un symbol alors on utilise un gros emoji sinon le symbol de la carte
    {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
</span>
</div>
) 

export default Card