import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './HighScoreInput.css'

import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {
  state = { winner: '' }

  //Arrow function for binding
  handleWinnerUpdate = event => {
    //Récupère l'evenement et mets à jour winner en allant
    //chercher la cible de l'evenement qui est notre champs
    // et en la forçant à avoir des majuscules 
    this.setState({ winner: event.target.value.toUpperCase() })
  }

  //Arrow function for binding
  persistWinner = event => {
    // on commence par empecher par défaut le comportement de la soumission
    // c'est à dire la navigation complète vers un serveur (-> preventDefault()),
    // ensuite on crée une nouvelle entrée (newEntry) pour notre tableau de saisie
    //d'honneur, avec 2 info: le nb de tentative (dans nos props) et le player (dans 
    //notre état)
    //Ensuite on utilise la fonction saveHOFEntry qui utilise newEntry + une callback
    //qui sera appelée une fois que le tableau d'honneur aura eventuellement mis à jour
    // retrié etc... On s'attend alors à une propriété onStored (fournit par l'extérieur de l'apli)
    event.preventDefault()
    const newEntry = { guesses: this.props.guesses, player: this.state.winner }
    saveHOFEntry(newEntry, this.props.onStored)
 
    this.setState({ winner: event.target.value.toUpperCase() })
  }

  render() {
    return (
      //On intercepte le submit du formulaire avec onSubmit, pour ça on fait
      // réference à une méthode métier qu'on appelle persistWinner 
      <form className="highScoreInput" onSubmit={this.persistWinner}>
        <p>
          <label>
            Bravo ! Entre ton prénom :
            <input
              autoComplete="given-name"
              onChange={this.handleWinnerUpdate}
              type="text"
              value={this.state.winner}
            />
          </label>
          <button type="submit">J’ai gagné !</button>
        </p>
      </form>
    )
  }
}

HighScoreInput.propTypes = {
  guesses: PropTypes.number.isRequired,
  onStored: PropTypes.func.isRequired,
}

export default HighScoreInput