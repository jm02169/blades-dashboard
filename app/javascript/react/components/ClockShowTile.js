import React from 'react'
import { Link } from 'react-router'

const ClockShowTile = (props) => {
  let newTicks;
  let handleUpClick = (event) => {
    event.preventDefault()
    if (props.ticks == props.segments) {
      newTicks = props.ticks
    } else {
      newTicks = props.ticks + 1
    }
    props.handleClick(props.id, newTicks)
  }
  let handleDownClick = (event) => {
    event.preventDefault()
    if (props.ticks == 0) {
      newTicks = 0
    } else {
      newTicks = props.ticks - 1
    }
    props.handleClick(props.id, newTicks)
  }

  return(
    <div className = "panel">
      <span className = 'row'>
      <Link to={"/clocks/"+props.id} className="small-6 columns">{props.name}</Link>

        <div className = "small-4 columns"> {props.npcName}{props.factionName} </div>
        <div className = "small-2 columns">
          <a href="#" onClick={handleUpClick}>
          <i className="fas fa-plus"></i>
          </a>
           {props.ticks}/{props.segments}
          <a href="#" onClick = {handleDownClick}>
          <i className="fas fa-minus"></i>
          </a>
        </div>
      </span>
    </div>
  )
}

export default ClockShowTile
