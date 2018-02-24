import React from 'react'
import { Link } from 'react-router'

const CommentTile = (props) => {
  return(
    <div className = "panel">
     <p>{props.body}</p>
    </div>
  )
}

export default CommentTile
