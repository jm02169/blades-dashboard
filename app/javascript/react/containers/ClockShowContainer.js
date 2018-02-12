import React, { Component } from 'react'
import { Link } from 'react-router'
import ClockShowTile from '../components/ClockShowTile'

class ClockShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      id: '',
      name: '',
      description: '',
      ticks: '',
      segments: '',
      npc_name: '',
      faction_name: '',
      game_id: ''
    }
    this.handleUpClick = this.handleUpClick.bind(this)
    this.handleDownClick = this.handleDownClick.bind(this)
  }

  handleUpClick(event) {
    event.preventDefault()
    let newTicks;
    let formPayload;
    if (this.state.ticks == this.state.segments) {
      newTicks = this.state.ticks
    } else {
      newTicks = this.state.ticks + 1
    }
    formPayload = {ticks: newTicks}
    fetch(`/api/v1/${this.props.location.pathname}`, {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ ticks: newTicks })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  handleDownClick(event) {
    event.preventDefault()
    let newTicks;
    let formPayload;
    if (this.state.ticks == 0) {
      newTicks = this.state.ticks
    } else {
      newTicks = this.state.ticks - 1
    }
    formPayload = {ticks: newTicks}
    fetch(`/api/v1/${this.props.location.pathname}`, {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ ticks: newTicks })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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
        id: body.id,
        name: body.name,
        description: body.description,
        ticks: body.ticks,
        segments: body.segments,
        npc_name: body.npc_name,
        faction_name: body.faction_name,
        game_id: body.game_id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    let npcOrFactionClass = "hidden"
    if (this.state.npc_name != null || this.state.faction_name != null) {
      npcOrFactionClass = "panel small-10 small-centered columns"
    }
    return(
      <div className = "row">
        <h1 className = "small-8 small-centered columns">{this.state.name}</h1>
        <div className = "small-2 small-centered columns">
          <span>
            <a href="#" onClick = {this.handleUpClick}>
              <i className="fas fa-plus fa-lg"></i>
            </a>
            <span>{this.state.ticks}/{this.state.segments}</span>
            <a href="#" onClick = {this.handleDownClick}>
              <i className="fas fa-minus fa-lg"></i>
            </a>
          </span>
        </div>
        <div className = "panel small-10 small-centered columns"> <p>{this.state.description}</p></div>
        <div className = {npcOrFactionClass}>{this.state.npc_name}{this.state.faction_name}</div>
        <ul className = "button-group small-10 small-centered columns even-2">
          <li><Link to={"/clocks/"+this.state.id+"/edit"} className = "button">Edit Clock Details</Link></li>
          <li><Link to={"/games/"+this.state.game_id+"/clocks"} className = "button">Back to Clock List</Link></li>
        </ul>
      </div>
    )
  }
}

export default ClockShowContainer
