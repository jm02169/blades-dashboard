import React, { Component } from 'react'
import ClockTile from '../components/ClockTile'
import FactionTile from '../components/FactionTile'
import CommentTile from '../components/CommentTile'
import NpcTile from '../components/NpcTile'

class GameHomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: []
    }
  }
  componentDidMount() {
    fetch(`/api/v1/${this.props.location.pathname}`)
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
      this.setState({
        game: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    return(
      <div className = "row">
        <h1 className = "small-8 small-centered columns">{this.state.game.name}</h1>
        <div className = "small-block-grid-3">
          <li><ClockTile
            id = {this.state.game.id}
          /></li>
          <li><FactionTile
            id = {this.state.game.id}
          /></li>
          <li><NpcTile
            id = {this.state.game.id}
          /></li>
          <li><CommentTile
            id = {this.state.game.id}
          /></li>

        </div>
      </div>
    )
  }
}

export default GameHomePageContainer
