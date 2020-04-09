import React from 'react'

import './Card.css'

const HIDDEN_SYMBOL = '❓'
// card = type du symbole et feedback = état d'affichage de se symbole
 /*si le feedback est un symbol alors on utilise un gros emoji sinon le symbol de la carte*/
const Card = ({card, feedback, onClick }) =>(
    // on donne à onclick une fonction qui le moment venu (quand on l'appelle) fera le onclick
    // si synthaxe onclick={onclick(card) alors pas bon 
<div className={`card ${feedback}`} onClick={()=> onClick(card)}>
<span className="symbol">
   
    {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
</span>
</div>
) 

export default Card