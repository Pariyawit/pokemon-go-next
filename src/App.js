import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/App.scss';

import Header from './components/Header';
import Map from './views/Map';
import Pokedex from './views/Pokedex';
import User from './views/User';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path='/'>
            <Map />
          </Route>
          <Route path='/pokedex'>
            <Pokedex />
          </Route>
          <Route path='/user'>
            <User />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
