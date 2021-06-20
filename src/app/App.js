import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';
import {
  CreateAccountPage, SignInPage, ProtectedRoute
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
        <ProtectedRoute isAuthed={false} isLoading={true  } path='edit-profile'>
          <div>Coming soon!</div>
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}


