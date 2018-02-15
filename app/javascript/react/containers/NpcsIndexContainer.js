import React, { Component } from 'react'
import NpcShowTile from '../components/NpcShowTile'
import { Link, browserHistory } from 'react-router'

class NpcsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      npcs: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1${this.props.location.pathname}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else if (response.status === 401) {
        let errorMessage = `${response.status} (${response.statusText})`
        browserHistory.push('/')
        let error = new Error(errorMessage);
        throw(error);
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response =>response.json())
    .then(body => {
      this.setState({
        npcs: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let npcShowTiles = this.state.npcs.map(npc => {
      return (
        <li>
          <NpcShowTile
          key = {npc.id}
          id = {npc.id}
          name = {npc.name}
          factionName = {npc.faction_name}
          factionId = {npc.faction_id}
          gameId = {npc.game_id}
          />
        </li>
      )
    })
    return(
      <div className = "row">
        <h1 className = "small-12 small-centered columns">NPCs</h1>
        <div className = "small-10 small-centered columns">
          <ul className = "no-bullet">
            <Link to={this.props.location.pathname+"/new"} className = "button small-12 small-centered columns">Add a new NPC</Link>
            {npcShowTiles}
            <Link to={"/games/"+this.props.params.id} className = "button small-12 small-centered columns">Back to Game</Link>`
          </ul>
        </div>
      </div>
    )
  }
}
export default NpcsIndexContainer
