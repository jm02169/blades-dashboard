import React, { Component } from 'react'
import ClockShowTile from '../components/ClockShowTile'
import { Link, browserHistory } from 'react-router'

class ClocksIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clocks: []
    }
    this.handlePlusOrMinusClick = this.handlePlusOrMinusClick.bind(this)
    this.fetchClocks = this.fetchClocks.bind(this)
  }

  handlePlusOrMinusClick(clockId, newTicks) {
    let formPayload = {ticks: newTicks}
    fetch(`/api/v1/clocks/${clockId}`, {
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
      this.setState({ clocks: response })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  fetchClocks() {
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
        clocks: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  componentDidMount() {
    this.fetchClocks()
  }

  render() {
    let clockShowTiles = this.state.clocks.map(clock => {
      return (
        <li>
          <ClockShowTile
          key = {clock.id}
          id = {clock.id}
          name = {clock.name}
          description = {clock.description}
          ticks = {clock.ticks}
          segments = {clock.segments}
          factionName = {clock.faction_name}
          npcName = {clock.npc_name}
          factionId = {clock.faction_id}
          npcId = {clock.npc_id}
          gameId = {clock.game_id}
          handleClick = {this.handlePlusOrMinusClick}
          />
        </li>
      )
    })

    return(
      <div className = "row">
        <h1 className = "small-2 small-centered columns">Clocks</h1>
        <ul className = "no-bullet">
          <Link to={this.props.location.pathname+"/new"} className = "button small-12 small-centered columns">Add a new clock</Link>
          {clockShowTiles}
          <Link to={"/games/"+this.props.params.id} className = "button small-12 small-centered columns">Back to Game</Link>
        </ul>
      </div>
    )
  }
}
export default ClocksIndexContainer
