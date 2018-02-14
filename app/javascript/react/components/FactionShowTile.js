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

  let panelColor;
  if (props.factionStatus == -3) {
    panelColor = "minus-three panel"
  } else if (props.factionStatus == -2) {
    panelColor = "minus-two panel"
  } else if (props.factionStatus == -1) {
    panelColor = "minus-one panel"
  } else if (props.factionStatus == 1) {
    panelColor = "plus-one panel"
  } else if (props.factionStatus == 2) {
    panelColor = "plus-two panel"
  } else if (props.factionStatus == 3) {
    panelColor = "plus-three panel"
  } else {
    panelColor = "panel"
  }



  return(
    <div className = {panelColor}>
      <span className = 'row'>
      <Link to={"/factions/"+props.id} className="small-8 columns faction-name">{props.name}</Link>
        <div className = "small-2 columns">
          <span>
            <a href="#" onClick={handleUpClick}>
              <i className="fas fa-plus"></i>
            </a>
             <span className = "faction-status"> {'\u00A0'}{props.factionStatus}{'\u00A0'} </span>
            <a href="#" onClick = {handleDownClick}>
              <i className="fas fa-minus"></i>
            </a>
          </span>
        </div>
      </span>
    </div>
  )
}

export default FactionShowTile
