import React, { Component } from 'react'
import ClockTile from '../components/ClockTile'
import FactionTile from '../components/FactionTile'
import CommentTile from '../components/CommentTile'
import NpcTile from '../components/NpcTile'

class GameHomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      npcs: [],
      factions: [],
      clocks: [],
      comments: [],
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
        game: body,
        npcs: body.npcs,
        factions: body.factions,
        clocks: body.clocks,
        comments: body.comments
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
            clocks = {this.state.clocks}
          /></li>
          <li><FactionTile
            factions = {this.state.factions}
          /></li>
          <li><NpcTile
            npcs = {this.state.npcs}
          /></li>
          <li><CommentTile
            comments = {this.state.comments}
          /></li>

        </div>
      </div>
    )
  }
}

export default GameHomePageContainer
