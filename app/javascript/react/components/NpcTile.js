import React from 'react'
import { Link } from 'react-router'

const NpcTile = (props) => {
  return(
    <div className = "panel">
      <h3>NPCs</h3>
      <hr/>
      <Link to={"/games/"+props.id+"/npcs"} className="small-12 small-centered columns button">View NPCs</Link>
    </div>
  )
}

export default NpcTile
