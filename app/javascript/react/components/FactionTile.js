import React from 'react'
import { Link } from 'react-router'

const FactionTile = (props) => {
  return(
    <div className = "panel">
      <h3>Factions</h3>
      <Link to={"/games/"+props.id+"/factions"} className="button">View Factions</Link>
    </div>
  )
}

export default FactionTile
