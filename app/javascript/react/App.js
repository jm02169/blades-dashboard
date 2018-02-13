import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import GamesIndexContainer from './containers/GamesIndexContainer'
import GameHomePageContainer from './containers/GameHomePageContainer'
import ClocksIndexContainer from './containers/ClocksIndexContainer'
import ClockShowContainer from './containers/ClockShowContainer'
import NewClockFormContainer from './containers/NewClockFormContainer'
import ClockEditContainer from './containers/ClockEditContainer'
import NewGameFormContainer from './containers/NewGameFormContainer'
import FactionsIndexContainer from './containers/FactionsIndexContainer'
import FactionShowContainer from './containers/FactionShowContainer'
import NewFactionFormContainer from './containers/NewFactionFormContainer'
import FactionEditContainer from './containers/FactionEditContainer'

const App = (props) => {

  let currentUserId=document.getElementById('app').dataset.currentUserId

  if (currentUserId == 0) {
    return(
      <h1>Please sign in or sign up</h1>
    )
  } else {
    return(
      <Router history={browserHistory}>
        <Route path='/' >
        <IndexRoute component={(props) => <GamesIndexContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/games' component={(props) => <GamesIndexContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/games/new' component={(props) => <NewGameFormContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/games/:id' component={(props) => <GameHomePageContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/games/:id/clocks' component={(props) => <ClocksIndexContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/clocks/:id' component={(props) => <ClockShowContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/games/:id/clocks/new' component={(props) => <NewClockFormContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/clocks/:id/edit' component={(props) => <ClockEditContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/games/:id/factions' component={(props) => <FactionsIndexContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/games/:id/factions/new' component={(props) => <NewFactionFormContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/factions/:id' component={(props) => <FactionShowContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/factions/:id/edit' component={(props) => <FactionEditContainer currentUserId={currentUserId} {...props} />} />
        </Route>
    </Router>
    )
  }
}

export default App
