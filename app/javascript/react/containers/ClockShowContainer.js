import React, { Component } from 'react'
import { Link } from 'react-router'
import ClockShowTile from '../components/ClockShowTile'

class ClockShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      clock: []
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
        clock: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    let npcOrFactionClass = "hidden"
    if (this.state.clock.npc_name != null || this.state.clock.faction_name != null) {
      npcOrFactionClass = "panel small-10 small-centered columns"
    }

    return(
      <div className = "row">
        <h1 className = "small-8 small-centered columns">{this.state.clock.name}</h1>
        <div className = "panel small-10 small-centered columns"> <p>{this.state.clock.description}</p></div>
        <div className = {npcOrFactionClass}>{this.state.clock.npc_name}{this.state.clock.faction_name}</div>
        <Link to={"/games/"+this.state.clock.game_id+"/clocks"} className = "button small-12 small-centered columns">Back to Clock List</Link>
      </div>
    )
  }
}

export default ClockShowContainer
