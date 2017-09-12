import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';

import Login from './components/Login';
import Store from './components/Store';


class App extends Component {
  render() {
    return (
        <HashRouter>
          <div>
            <Route exact path='/' component={ Login } />
            <Route path='/store' component={ Store } />
          </div>
        </HashRouter>
    );
  }
}

export default App;
