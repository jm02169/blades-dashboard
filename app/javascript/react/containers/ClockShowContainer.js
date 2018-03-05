import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import ClockShowTile from '../components/ClockShowTile'
import CommentShowTile from '../components/CommentShowTile'
import { Chart } from 'react-google-charts'

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
      game_id: '',
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
    fetch(`/api/v1${this.props.location.pathname}`, {
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
      this.setState({ ticks: newTicks })
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
      faction_id: null,
      game_id: null,
      clock_id: parseInt(this.props.params.id)
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
    let npcOrFactionClass = "hidden"
    if (this.state.npc_name != null || this.state.faction_name != null) {
      npcOrFactionClass = "panel small-12 small-centered columns"
    }
    let unticked = this.state.segments - this.state.ticks
    let data = [["ticks", "segments"],["ticked", this.state.ticks], ["unticked", unticked]]
    let options = {
      chartArea: {width: "100%", height: "100%"},
      legend: "none",
      backgroundColor: "#f2f2f2",
      enableInteractivity: false,
      slices: [{color: "black"}, {color: "white"}],
      pieSliceText: "none"
    }
    let clock =
      <Chart
      chartType = "PieChart"
      data = {data}
      options = {options}
      width="200px"
      height="200px"
      />
    return(
      <div className = "row">
        <h1 className = "small-8 small-centered columns">{this.state.name}</h1>
        <hr/>
        <div className = "small-12 small-centered columns panel">
          <span>
            <a href="#" onClick = {this.handleUpClick}>
              <i className="fas fa-plus fa-5x"></i>
            </a>
            {clock}
            <a href="#" onClick = {this.handleDownClick}>
              <i className="fas fa-minus fa-5x"></i>
            </a>
          </span>
          <span> {this.state.ticks}/{this.state.segments} </span>
        </div>
        <div className = "panel small-12 small-centered columns"> <p>{this.state.description}</p></div>
        <div className = {npcOrFactionClass}>{this.state.npc_name}{this.state.faction_name}</div>
        <ul className = "button-group small-12 small-centered columns even-2">
          <li><Link to={"/clocks/"+this.state.id+"/edit"} className = "button">Edit Clock Details</Link></li>
          <li><Link to={"/games/"+this.state.game_id+"/clocks"} className = "button">Back to Clock List</Link></li>
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

export default ClockShowContainer
