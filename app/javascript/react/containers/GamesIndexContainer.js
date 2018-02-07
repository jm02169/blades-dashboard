import React, { Component } from 'react'
import GameTile from '../components/GameTile'

class GamesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    fetch("/api/v1/games")
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response =>response.json())
    .then(body => {
      this.setState( {games: body} )
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let gameTiles = this.state.games.map( game => {
      return(
        <li>
          <GameTile
            id={game.id}
            key={game.id}
            name={game.name}
            description={game.description}
          />
        </li>
      )
    })
    return(
      <div className = "row">
        <h1 className = "small-8 small-centered columns">Your games</h1>
        <div className = "small-block-grid-3">
          {gameTiles}
        </div>
      </div>
    )
  }
}
export default GamesIndexContainer;