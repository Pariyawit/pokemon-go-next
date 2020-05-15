import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/App.scss';

import Header from './components/Header';
import Map from './views/Map';
import Pokedex from './views/Pokedex';

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
        </Switch>
      </main>
    </Router>
  );
}

export default App;
