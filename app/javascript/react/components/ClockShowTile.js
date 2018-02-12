import React from 'react'
import { Link } from 'react-router'

const ClockShowTile = (props) => {
  return(
    <div className = "panel">
      <span className = 'row'>
      <Link to={"/clocks/"+props.id} className="small-6 columns">{props.name}</Link>

        <div className = "small-4 columns"> {props.npcName}{props.factionName} </div>
        <div className = "small-2 columns">
          <i className="fas fa-plus"></i>
           {props.ticks}/{props.segments}
          <i className="fas fa-minus"></i>
        </div>
      </span>
    </div>
  )
}

export default ClockShowTile
