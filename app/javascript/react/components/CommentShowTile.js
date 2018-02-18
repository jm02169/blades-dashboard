import React from 'react'

const CommentShowTile = (props) => {
  return(
    <li className = "panel">
      {props.commentBody}
    </li>
  )
}

export default CommentShowTile
