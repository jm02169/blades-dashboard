import React from 'react'
import { Link } from 'react-router'

const FactionShowTile = (props) => {
  let newStatus;
  let handleUpClick = (event) => {
    event.preventDefault()
    if (props.factionStatus == 3) {
      newStatus = props.factionStatus
    } else {
      newStatus = props.factionStatus + 1
    }
    props.handleClick(props.id, newStatus)
  }
  let handleDownClick = (event) => {
    event.preventDefault()
    if (props.factionStatus == -3) {
      newStatus = -3
    } else {
      newStatus = props.factionStatus - 1
    }
    props.handleClick(props.id, newStatus)
  }

  return(
    <div className = "panel">
      <span className = 'row'>
      <Link to={"/factions/"+props.id} className="small-6 columns">{props.name}</Link>
        <div className = "small-2 columns">
          <a href="#" onClick={handleUpClick}>
          <i className="fas fa-plus"></i>
          </a>
           <span> {props.factionStatus} </span>
          <a href="#" onClick = {handleDownClick}>
          <i className="fas fa-minus"></i>
          </a>
        </div>
      </span>
    </div>
  )
}

export default FactionShowTile
