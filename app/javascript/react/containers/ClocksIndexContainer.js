import React, { Component } from 'react'
import ClockShowTile from '../components/ClockShowTile'
import { Link } from 'react-router'

class ClocksIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clocks: []
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
        clocks: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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
          />
        </li>
      )
    })

    return(
      <div className = "row">
        <h1 className = "small-2 small-centered columns">Clocks</h1>
        <ul className = "no-bullet">
          <Link to={this.props.location.pathname+"/new"}className = "button small-12 small-centered columns">Add a new clock</Link>
          {clockShowTiles}
          <Link to={"/games/"+this.props.params.id}className = "button small-12 small-centered columns">Back to Game</Link>
        </ul>
      </div>
    )
  }
}
export default ClocksIndexContainer
