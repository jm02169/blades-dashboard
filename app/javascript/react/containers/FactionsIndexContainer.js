import React, { Component } from 'react'
import FactionShowTile from '../components/FactionShowTile'
import { Link, browserHistory } from 'react-router'

class FactionsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factions: []
    }
    this.handlePlusOrMinusClick = this.handlePlusOrMinusClick.bind(this)
    this.fetchFactions = this.fetchFactions.bind(this)
  }

  handlePlusOrMinusClick(factionId, newStatus) {
    let formPayload = {faction_status: newStatus}
    fetch(`/api/v1/factions/${factionId}`, {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json' }
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
    .then(response => response.json())
    .then(response => {
      this.setState({ factions: response })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  fetchFactions() {
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
        factions: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  componentDidMount() {
    this.fetchFactions()
  }

  render() {
    let factionShowTiles = this.state.factions.map(faction => {
      return (
        <li>
          <FactionShowTile
          key = {faction.id}
          id = {faction.id}
          name = {faction.name}
          description = {faction.description}
          factionStatus = {faction.faction_status}
          handleClick = {this.handlePlusOrMinusClick}
          />
        </li>
      )
    })

    return(
      <div className = "row">
        <h1 className = "small-2 small-centered columns">Factions</h1>
        <ul className = "no-bullet">
          <Link to={this.props.location.pathname+"/new"} className = "button small-12 small-centered columns">Add a new faction</Link>
          {factionShowTiles}
          <Link to={"/games/"+this.props.params.id} className = "button small-12 small-centered columns">Back to Game</Link>
        </ul>
      </div>
    )
  }
}
export default FactionsIndexContainer
