import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import GamesIndexContainer from './containers/GamesIndexContainer'
import GameHomePageContainer from './containers/GameHomePageContainer'


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
        </Route>
    </Router>
    )
  }
}

export default App
