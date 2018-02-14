import React from 'react'
import { Link } from 'react-router'

const FactionTile = (props) => {
  return(
    <div className = "panel">
      <h3>Factions</h3>
      <hr/>
      <Link to={"/games/"+props.id+"/factions"} className="small-12 small-centered columns button">View Factions</Link>
    </div>
  )
}

export default FactionTile
