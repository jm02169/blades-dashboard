import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import CommentShowTile from '../components/CommentShowTile'

class NpcShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      id: '',
      name: '',
      description: '',
      factionName: '',
      factionId: '',
      gameId: '',
      comments: [],
      commentBody: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
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
      clock_id: null,
      faction_id: null,
      game_id: null,
      npc_id: parseInt(this.props.params.id)
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
        factionId: body.faction_id,
        factionName: body.faction_name,
        gameId: body.game_id,
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
    let factionName;
    let factionLink;
    if (this.state.factionId) {
      factionName = this.state.factionName
      factionLink = `/factions/${this.state.factionId}`
    } else {
      factionName = "N/A"
      factionLink = `/games/${this.state.gameId}`
    }
    return(
      <div className = "row">
        <h1 className = "small-4 small-centered columns">{this.state.name}</h1>
        <hr/>
        <div className = "panel small-12 small-centered columns"> <p><b>Description:</b> {this.state.description}</p></div>
        <div className = "panel small-12 small-centered columns"> <p><b>Faction:</b> <Link to={factionLink} className = "underlined">{this.state.factionName}</Link></p></div>
        <ul className = "button-group small-12 small-centered columns even-2">
          <li><Link to={"/npcs/"+this.state.id+"/edit"} className = "button">Edit NPC Details</Link></li>
          <li><Link to={"/games/"+this.state.gameId+"/npcs"} className = "button">Back to NPC List</Link></li>
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

export default NpcShowContainer
