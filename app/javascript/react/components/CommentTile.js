import React from 'react'
import { Link } from 'react-router'

const CommentTile = (props) => {
  return(
    <div className = "panel">
      <h3>Comments</h3>
      <hr/>
      <Link to={"/games/"+props.id+"/comments"} className="small-12 small-centered columns button">View Comments</Link>
    </div>
  )
}

export default CommentTile
