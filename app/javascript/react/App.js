import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import GamesIndexContainer from './containers/GamesIndexContainer'
import GameHomePageContainer from './containers/GameHomePageContainer'
import ClocksIndexContainer from './containers/ClocksIndexContainer'
import ClockShowContainer from './containers/ClockShowContainer'
import NewClockFormContainer from './containers/NewClockFormContainer'

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
          <Route path='/games/:id' component={(props) => <GameHomePageContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/games/:id/clocks' component={(props) => <ClocksIndexContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/clocks/:id' component={(props) => <ClockShowContainer currentUserId={currentUserId} {...props} />} />
          <Route path='/games/:id/clocks/new' component={(props) => <NewClockFormContainer currentUserId={currentUserId} {...props} />} />
        </Route>
    </Router>
    )
  }
}

export default App
