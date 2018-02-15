import React from 'react'
import { Link } from 'react-router'

const NpcShowTile = (props) => {
  let factionName;
  if (props.faction) {
    factionName = props.faction
  } else {
    factionName = "N/A"
  }
  return(
    <div className = "panel">
      <span className = "row">
        <Link to={"/npcs/"+props.id} className="small-7 columns npc-name">{props.name}</Link>
        <h4 className="small-3 columns">{factionName}</h4>
      </span>
    </div>
  )
}

export default NpcShowTile
