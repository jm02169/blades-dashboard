import React from 'react'

const ClockShowTile = (props) => {
  return(
    <div className = "panel">
      <span className = 'row'>
        <div className = "small-6 columns clock-name">{props.name}</div>
        <div className = "small-4 columns"> {props.npcName}{props.factionName} </div>
        <div className = "small-2 columns">{props.ticks}/{props.segments}</div>
      </span>
    </div>
  )
}

export default ClockShowTile
