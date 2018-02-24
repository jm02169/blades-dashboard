import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import ClockTile from '../components/ClockTile'
import FactionTile from '../components/FactionTile'
import CommentTile from '../components/CommentTile'
import NpcTile from '../components/NpcTile'

class GameHomePageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [],
      comments: [],
      commentBody: ''
    }
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
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
      faction_id: null,
      game_id: parseInt(this.props.params.id)
    }
    if (formPayload.body !== null && formPayload.body !== '') {
      fetch(`/api/v1/games/${this.props.params.id}/comments`, {
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
    .then(response => response.json())
    .then(body => {
      this.setState({
        game: body,
        comments: body.comments
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let commentTiles = this.state.comments.map(comment => {
      return(
        <CommentTile
          key = {comment.id}
          body = {comment.body}
        />
      )
    })
    return(
      <div className = "row">
        <h1>{this.state.game.name}</h1>
        <hr/>
        <div className = "small-block-grid-3">
          <li><ClockTile
            key = "1"
            id = {this.state.game.id}
          /></li>
          <li><FactionTile
            key = "2"
            id = {this.state.game.id}
          /></li>
          <li><NpcTile
            key = "3"
            id = {this.state.game.id}
          /></li>
        </div>
        <Link to="/games" className = "button small-12 small-centered columns">Back to Games List</Link>
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
        {commentTiles.reverse()}
      </div>
    )
  }
}

export default GameHomePageContainer
