import React from 'react'
import { Link } from 'react-router'

const ClockTile = (props) => {
  return(
    <div className = "panel">
      <h3>Clocks</h3>
      <hr/>
      <Link to={"/games/"+props.id+"/clocks"} className="small-12 small-centered columns button">View Clocks</Link>
    </div>
  )
}

export default ClockTile
