import React, { Component } from 'react'
import ClockShowTile from '../components/ClockShowTile'

class ClocksIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clocks: []
    }
  }
  componentDidMount() {
    console.log(this.props.location.pathname)
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
      <h1>Clocks</h1>
      <ul className = "no-bullet">
        {clockShowTiles}
      </ul>
      </div>
    )
  }
}
export default ClocksIndexContainer
