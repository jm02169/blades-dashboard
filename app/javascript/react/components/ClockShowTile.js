import React from 'react'
import { Link } from 'react-router'

const ClockShowTile = (props) => {
  return(
    <div className = "panel">
      <span className = 'row'>
      <Link to={"/clocks/"+props.id} className="small-6 columns">{props.name}</Link>

        <div className = "small-4 columns"> {props.npcName}{props.factionName} </div>
        <div className = "small-2 columns">{props.ticks}/{props.segments}</div>
      </span>
    </div>
  )
}

export default ClockShowTile
