import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import FactionShowTile from '../components/FactionShowTile'
import CommentShowTile from '../components/CommentShowTile'

class FactionShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      id: '',
      name: '',
      description: '',
      factionStatus: '',
      game_id: '',
      npcs: [],
      comments: [],
      commentBody: ''
    }
    this.handleUpClick = this.handleUpClick.bind(this)
    this.handleDownClick = this.handleDownClick.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
  }

  handleUpClick(event) {
    event.preventDefault()
    let newStatus;
    let formPayload;
    if (this.state.factionStatus == 3) {
      newStatus = this.state.factionStatus
    } else {
      newStatus = this.state.factionStatus + 1
    }
    formPayload = {faction_status: newStatus}
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
      this.setState({ factionStatus: newStatus })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  handleDownClick(event) {
    event.preventDefault()
    let newStatus;
    let formPayload;
    if (this.state.factionStatus == -3) {
      newStatus = this.state.factionStatus
    } else {
      newStatus = this.state.factionStatus - 1
    }
    formPayload = {faction_status: newStatus}
    fetch(`/api/v1/${this.props.location.pathname}`, {
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
      this.setState({ factionStatus: newStatus })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleCommentChange(event) {
    this.setState({ commentBody: event.target.value })
  }

  handleCancelClick(event) {
    event.preventDefault()
    this.setState({ commentBody: '' })
  }

  handleFormSubmit(event) {
    event.preventDefault()
    let formPayload = {
      body: this.state.commentBody,
      npc_id: null,
      clock_id: null,
      game_id: null,
      faction_id: parseInt(this.props.params.id)
    }
    if (formPayload.body !== null && formPayload.body !== '') {
      fetch(`/api/v1${this.props.location.pathname}/comments`, {
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
      .then(response => response.json())
      .then(response => {
        let newComments = this.state.comments
        newComments.push(response)
        console.log(newComments)
        this.setState({
          commentBody: '',
          comments: newComments
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
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
        factionStatus: body.faction_status,
        npcs: body.npcs,
        game_id: body.game_id,
        comments: body.comments
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    let commentTiles = this.state.comments.map(comment => {
      return(
        <CommentShowTile
          key = {comment.id}
          commentBody = {comment.body}
        />
      )
    })
    let npcList = this.state.npcs.map(npc => {
      return(
        <li><Link to={"/npcs/"+npc.id}><h4 className = "underlined">{npc.name}</h4></Link></li>
      )
    })

    return(
      <div className = "row">
        <h1 className = "small-4 small-centered columns">{this.state.name}</h1>
        <div className = "small-12 small-centered columns panel">
          <span className = "row">
          <h4 className = "small-5 columns" >Faction Status: </h4>
            <span className = "small-5 columns">
              <a href="#" onClick = {this.handleUpClick}>
                <i className="fas fa-plus fa-2x"></i>
              </a>
              <span><h3> {'\u00A0'}{this.state.factionStatus}{'\u00A0'}</h3> </span>
              <a href="#" onClick = {this.handleDownClick}>
                <i className="fas fa-minus fa-2x"></i>
              </a>
            </span>
          </span>
        </div>
        <div className = "panel small-12 small-centered columns"> <p>{this.state.description}</p></div>
        <ul className = "panel small-12 small-centered columns"> <h4>NPCs:</h4>
        <hr/>
          {npcList}
        </ul>
        <ul className = "button-group small-12 small-centered columns even-2">
          <li><Link to={"/factions/"+this.state.id+"/edit"} className = "button">Edit Faction Details</Link></li>
          <li><Link to={"/games/"+this.state.game_id+"/factions"} className = "button">Back to Faction List</Link></li>
        </ul>
        <hr/>
        <div className= "panel small-12 small-centered columns" >
          <h2>Add a Note</h2>
          <form onSubmit = {this.handleFormSubmit}>
            <label>Body
              <input type="text" value={this.state.commentBody} onChange = {this.handleCommentChange} />
            </label>
            <div className="small-6 columns small-centered small-block-grid-2">
              <li><button type="submit" value="Submit" >Submit</button></li>
              <button onClick = {this.handleCancelClick}>Cancel</button>
            </div>
          </form>
        </div>
        <h1>Notes:</h1>
        <ul className = "no-bullet small-12 small-centered columns">
          {commentTiles.reverse()}
        </ul>
        <hr/>
      </div>
    )
  }
}

export default FactionShowContainer
