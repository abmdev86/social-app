import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';
import {
  CreateAccountPage,
  SignInPage,
  ProtectedRoute,
} from '../authorization';
import './App.css';
import { Home } from './Home';


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
        <ProtectedRoute isAuthed={false} isLoading={null} path='/edit-profile'>
          <div>Coming soon!</div>
        </ProtectedRoute>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}


