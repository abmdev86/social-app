import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';
import {
  CreateAccountPage, SignInPage
} from '../authorization';
import './App.css';


export function App() {
  return (
    <Router>
      <Switch>
        <Route path='/sign-in'>
          <SignInPage />
        </Route>
        <Route path='/create-account'>
          <CreateAccountPage />
        </Route>
      </Switch>
    </Router>
  );
}


