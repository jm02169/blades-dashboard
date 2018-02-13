import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import ListItem from '../components/ListItem'


class NewClockFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      segments: '',
      ticks: 0,
      npcId: null,
      factionId: null,
      factions: [],
      npcs: [],
      errors: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSegmentsChange = this.handleSegmentsChange.bind(this);
    this.handleTicksChange = this.handleTicksChange.bind(this);
    this.handleNpcOrFactionChange = this.handleNpcOrFactionChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }
  handleSegmentsChange(event) {
    this.setState({ segments: parseInt(event.target.value) });
  }
  handleTicksChange(event) {
    this.setState({ ticks: parseInt(event.target.value) });
  }
  handleNpcOrFactionChange(event) {
    if(event.target.value.startsWith("npc")) {
      this.setState({
        npcId: parseInt(event.target.value.substr(4)),
        factionId: null
      });
    } else if (event.target.value.startsWith("fac")) {
      this.setState({
        factionId: parseInt(event.target.value.substr(4)),
        npcId: null
      });
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()
    let formPayload = {
      name: this.state.name,
      description: this.state.description,
      segments: parseInt(this.state.segments),
      ticks: parseInt(this.state.ticks),
      npc_id: this.state.npcId,
      faction_id: this.state.factionId,
      game_id: parseInt(this.props.params.id)
    }
    let errors = []
    if (formPayload.name == null || formPayload.name == '') {
      errors.push("Name is required")
    }
    if (formPayload.segments === null || formPayload.segments === '' || isNaN(formPayload.segments)) {
      errors.push("Number of segments is required")
    }
    if (formPayload.segments < 4 || formPayload.segments > 12) {
      errors.push("Number of segments must be between 4 and 12")
    }
    if (parseInt(formPayload.ticks) > parseInt(formPayload.segments)) {
      errors.push("Number of ticks can't exceed number of segments")
    }
    if (errors.length ===0) {
      fetch(`/api/v1/games/${this.props.params.id}/clocks`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(formPayload),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        this.setState({ errors: [] })
        browserHistory.push(`/games/${this.props.params.id}/clocks`)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors })
    }
  }

  componentDidMount() {
    fetch(`/api/v1/games/${this.props.params.id}`, {
      credentials: 'same-origin'
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
    .then(response =>response.json())
    .then(body => {
      this.setState({
        factions: body.factions,
        npcs: body.npcs
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let errorHTML
    let errorClass = ""
    if (this.state.errors.length > 0) {
      errorClass = "panel alert"
      errorHTML = this.state.errors.map(error => {
        return <li>{error}</li>
      })
    }

    let factionItems = this.state.factions.map( faction => {
      return(
        <ListItem
          key={faction.id}
          id={faction.id}
          name={faction.name}
          identifier= "fac_"
        />
      )
    })
    let npcItems = this.state.npcs.map( npc => {
      return(
        <ListItem
          key={npc.id}
          id={npc.id}
          name={npc.name}
          identifier="npc_"
        />
      )
    })

    return(
      <div className= "row">
        <div className= {errorClass}>
          {errorHTML}
        </div>
        <div className= "panel small-12 large-8 small-centered columns" >
          <h2>Add a new clock</h2>
          <form onSubmit = {this.handleFormSubmit}>
            <label>Name
              <input type="text" value={this.state.name} onChange = {this.handleNameChange} />
            </label>
            <label>Description
              <input type="text" value={this.state.description} onChange = {this.handleDescriptionChange}/>
            </label>
            <label>Segments
              <input type="number" value={this.state.segments} onChange = {this.handleSegmentsChange} />
            </label>
            <label>Starting ticks
              <input type="number" defaultValue={this.state.ticks} onChange = {this.handleTicksChange}/>
            </label>
            <label>Associated NPC or Faction (optional)
              <select onChange = {this.handleNpcOrFactionChange}>
                <option></option>
                <optgroup label="NPCs">
                  {npcItems}
                </optgroup>
                <optgroup label="Faction">
                  {factionItems}
                </optgroup>
              </select>
            </label>
            <div className="small-8 columns small-centered small-block-grid-2">
              <li><button type="submit" value="Submit" >Submit</button></li>
              <Link to={"/games/"+this.props.params.id+"/clocks"} className = "button">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default NewClockFormContainer
