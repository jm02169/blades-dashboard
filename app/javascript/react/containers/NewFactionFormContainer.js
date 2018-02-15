import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class NewFactionFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      factionStatus: 0,
      errors: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }
  handleStatusChange(event) {
    this.setState({ factionStatus: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault()
    let formPayload = {
      name: this.state.name,
      description: this.state.description,
      faction_status: parseInt(this.state.factionStatus),
      game_id: parseInt(this.props.params.id)
    }
    let errors = []
    if (formPayload.name == null || formPayload.name == '') {
      errors.push("Name is required")
    }
    if (formPayload.faction_status < -3 || formPayload.faction_status > 3) {
      errors.push("Faction status must be between -3 and 3")
    }
    if (errors.length ===0) {
      fetch(`/api/v1/games/${this.props.params.id}/factions`, {
        credentials: 'same-origin',
        method: 'POST',
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
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        this.setState({ errors: [] })
        browserHistory.push(`/games/${this.props.params.id}/factions`)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors })
    }
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

    return(
      <div className= "row">
        <div className= {errorClass}>
          {errorHTML}
        </div>
        <div className= "panel small-12 large-8 small-centered columns" >
          <h2>Add a Faction</h2>
          <form onSubmit = {this.handleFormSubmit}>
            <label>Name
              <input type="text" value={this.state.name} onChange = {this.handleNameChange} />
            </label>
            <label>Description
              <input type="text" value={this.state.description} onChange = {this.handleDescriptionChange}/>
            </label>
            <label>Faction Status
              <input type="number" value={this.state.factionStatus} min = "-3" max = "3" onChange = {this.handleStatusChange}/>
            </label>
            <div className="small-8 columns small-centered small-block-grid-2">
              <li><button type="submit" value="Submit" >Submit</button></li>
              <Link to={"/games/"+this.props.params.id+"/factions"}className = "button">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default NewFactionFormContainer
