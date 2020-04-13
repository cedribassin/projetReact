import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'
import Card from './Card'
import GuessCount from './GuessCount'
import HallOfFame, { FAKE_HOF } from './HallOfFame'
import HighScoreInput from './HighScoreInput'

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750

class App extends Component {

  state = {
    cards: this.generateCards(),
    // currentPair => représente la paire en cours de sélection
    //1 élément signifie qu’une première carte a été retournée. 
    //2 éléments signifient qu’on a retourné une seconde carte, 
    //ce qui déclenchera une analyse de la paire et l’avancée éventuelle de la partie.
    currentPair: [],
    //guesses => nb de tentatives de la partie en cours
    guesses: 0,
    //hallOfFame => propriété d'état qui est nulle par défaut, obj = quand la couche
    // de sauvegarde de notre tableau d'honneur fini la persistance et 
    // appelle le onStored (dans HighScoredInput.js), elle va lui passer
    // le tableau d'honneur à jour. On va alors le stocker dans l'état (cf displayHallOfFame)
    hallOfFame: null,
    //matchedCardIndices => liste les positions des cartes appartenant aux paires 
    //déjà réussies, et donc visibles de façon permanente
    matchedCardIndices: [],
  }

  //Arrow function for binding
  displayHallOfFame = hallOfFame => {
    this.setState({ hallOfFame })
  }


  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }

    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }

    return indexMatched ? 'visible' : 'hidden'
  }


  // Arrow function for binding
  handleCardClick = index => {
    const { currentPair } = this.state

    if (currentPair.length === 2) {
      return
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] })
      return
    }

    this.handleNewPairClosedBy(index)
  }

  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state

    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    const matched = cards[newPair[0]] === 2//cards[newPair[1]]
    this.setState({ currentPair: newPair, guesses: newGuesses })
    if (matched) {
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
  }

  render() {
    // je me sers de l'etat que j'ai crée avec this.state
    const { cards, guesses, hallOfFame, matchedCardIndices } = this.state
    const won = matchedCardIndices.length === cards.length
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        {cards.map((card, index) => (
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            key={index}
            index={index}
            onClick={this.handleCardClick}
          />
        ))}
        {won &&
          (hallOfFame ? (<hallOfFame entries={hallOfFame} />
          ) : (
              <HighScoreInput
                guesses={guesses}
                onStored={this.displayHallOfFame}
              />
            ))}
      </div>
    )
  }
}

export default App