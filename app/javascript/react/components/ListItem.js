import React from 'react'

const ListItem = props => {
  return(
    <option value={`${props.identifier}`+`${props.id}`}>{props.name}</option>
  )
}

export default ListItem
