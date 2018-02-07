import React from 'react'

const GameTile = (props) => {
  return(
    <div className = 'panel'>
      <h2 className="small-12 small-centered columns">{props.name}</h2>
      <hr/>
      <p><b>Description</b>: {props.description}</p>
    </div>
  )
}

export default GameTile
