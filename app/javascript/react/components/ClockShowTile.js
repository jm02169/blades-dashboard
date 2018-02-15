import React from 'react'
import { Link } from 'react-router'
import { Chart } from 'react-google-charts'

const ClockShowTile = (props) => {
  let newTicks;
  let handleUpClick = (event) => {
    event.preventDefault()
    if (props.ticks == props.segments) {
      newTicks = props.ticks
    } else {
      newTicks = props.ticks + 1
    }
    props.handleClick(props.id, newTicks)
  }
  let handleDownClick = (event) => {
    event.preventDefault()
    if (props.ticks == 0) {
      newTicks = 0
    } else {
      newTicks = props.ticks - 1
    }
    props.handleClick(props.id, newTicks)
  }
  let unticked = props.segments - props.ticks
  let data = [["ticks", "segments"],["ticked", props.ticks], ["unticked", unticked]]
  let options = {
    chartArea: {width: "100%", height: "100%"},
    legend: "none",
    backgroundColor: "#f2f2f2",
    enableInteractivity: false,
    slices: [{color: "black"}, {color: "white"}],
    pieSliceText: "none"
  }
  let clock =
    <Chart
    chartType = "PieChart"
    data = {data}
    options = {options}
    width="60px"
    height="60px"
    />

    let name;
    let nameLink;
    if (props.npcName) {
      name = props.npcName
      nameLink = `/npcs/${props.npcId}`
    } else if (props.factionName) {
      name = props.factionName
      nameLink = `/factions/${props.factionId}`
    } else {
      name = "N/A"
      nameLink = `/games/${props.gameId}`
    }
  return(
    <div className = "panel">
      <span className = 'row'>
        <Link to={"/clocks/"+props.id} className="small-5 columns"><h4>{props.name}</h4></Link>
        <Link to={nameLink} className = "small-3 columns"><h4> {name} </h4></Link>
        <span className = "small-2 columns">
          <a href="#" onClick={handleUpClick}>
            <i className="fas fa-plus"> </i>
          </a>
          <span>{'\u00A0'}{props.ticks}/{props.segments}{'\u00A0'}</span>
          <a href="#" onClick = {handleDownClick}>
            <i className="fas fa-minus"></i>
          </a>
        </span>
        <div className = "small-2 columns">{clock}</div>
      </span>
    </div>
  )
}

export default ClockShowTile
