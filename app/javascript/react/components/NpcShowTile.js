import React from 'react'
import { Link } from 'react-router'

const NpcShowTile = (props) => {
  let factionName;
  if (props.factionName) {
    factionName = props.factionName
  } else {
    factionName = "N/A"
  }
  let factionLink;
  if (props.factionId) {
    factionLink = `/factions/${props.factionId}`
  } else {
    factionLink = `/games/${props.gameId}`
  }
  return(
    <div className = "panel">
      <span className = "row">
        <Link to={"/npcs/"+props.id} className="small-7 columns npc-name">{props.name}</Link>
        <Link to={factionLink} className="small-3 columns"><h4>{factionName}</h4></Link>
      </span>
    </div>
  )
}

export default NpcShowTile
