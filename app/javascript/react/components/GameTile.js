import React from 'react'
import { Link } from 'react-router'

const GameTile = (props) => {
  return(
    <div className = 'panel'>
      <h2 className="small-12 small-centered columns">{props.name}</h2>
      <hr/>
      <p><b>Description</b>: {props.description}</p>
      <Link to={"/games/"+props.id} className="button">View Game</Link>
    </div>
  )
}

export default GameTile
