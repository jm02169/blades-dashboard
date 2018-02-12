import React from 'react'
import { Link } from 'react-router'

const ClockTile = (props) => {
  return(
    <div className = "panel">
      <h3>Clocks</h3>
      <Link to={"/games/"+props.id+"/clocks"} className="button">View Clocks</Link>
    </div>
  )
}

export default ClockTile
