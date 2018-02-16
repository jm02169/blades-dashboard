import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class NpcShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      id: '',
      name: '',
      description: '',
      factionName: '',
      factionId: '',
      gameId: ''
    }
  }

  componentDidMount() {
    fetch(`/api/v1/${this.props.location.pathname}`, {
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
        id: body.id,
        name: body.name,
        description: body.description,
        factionId: body.faction_id,
        factionName: body.faction_name,
        gameId: body.game_id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    let factionName;
    let factionLink;
    if (this.state.factionId) {
      factionName = this.state.factionName
      factionLink = `/factions/${this.state.factionId}`
    } else {
      factionName = "N/A"
      factionLink = `/games/${this.state.gameId}`
    }
    return(
      <div className = "row">
        <h1 className = "small-4 small-centered columns">{this.state.name}</h1>
        <hr/>
        <div className = "panel small-10 small-centered columns"> <p><b>Description:</b> {this.state.description}</p></div>
        <div className = "panel small-10 small-centered columns"> <p><b>Faction:</b> <Link to={factionLink} className = "underlined">{this.state.factionName}</Link></p></div>
        <ul className = "button-group small-10 small-centered columns even-2">
          <li><Link to={"/npcs/"+this.state.id+"/edit"} className = "button">Edit NPC Details</Link></li>
          <li><Link to={"/games/"+this.state.gameId+"/npcs"} className = "button">Back to NPC List</Link></li>
        </ul>
      </div>
    )
  }
}

export default NpcShowContainer
