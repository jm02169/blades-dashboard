import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class NewGameFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      defaultFactions: 1,
      errors: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }
  handleCheckboxChange(event) {
    if (this.state.defaultFactions === 1) {
      this.setState({ defaultFactions: 0})
    }
    if (this.state.defaultFactions === 0) {
      this.setState({ defaultFactions: 1})
    }
  }
  handleFormSubmit(event) {
    event.preventDefault()
    let formPayload = {
      name: this.state.name,
      description: this.state.description,
      user_id: this.props.currentUserId,
      default_factions: this.state.defaultFactions
    }
    let errors = []
    if (formPayload.name == null || formPayload.name == '') {
      errors.push("Name is required")
    }
    if (errors.length ===0) {
      fetch(`/api/v1/games/`, {
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
        browserHistory.push(`/games/`)
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
          <h2>Add a Game</h2>
          <form onSubmit = {this.handleFormSubmit}>
            <label>Name
              <input type="text" value={this.state.name} onChange = {this.handleNameChange} />
            </label>
            <label>Description
              <input type="text" value={this.state.description} onChange = {this.handleDescriptionChange}/>
            </label>
            <label>Use default factions?
              <input type="checkbox" defaultChecked = "true" onChange = {this.handleCheckboxChange}/>
            </label>
            <div className="small-8 columns small-centered small-block-grid-2">
              <li><button type="submit" value="Submit" >Submit</button></li>
              <Link to="/" className = "button">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default NewGameFormContainer
