import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';
import {
  CreateAccountPage,
} from '../authorization';
import './App.css';


export function App() {
  return (
    <Router>
      <Switch>
        <Route path='/sign-in'>

        </Route>
        <Route path='/create-account'>
          <CreateAccountPage />
        </Route>
      </Switch>
    </Router>
  );
}


