import Home from './pages/Home'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Register from './pages/Register'
import React from "react";
import {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'


function App() {

  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Router>
    <div className="App">
      <main>
        <Switch>
            <Route path="/reports">
              <Reports />
            </Route>
            <Route path="/login">
              <Reports />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              {loggedIn ? <Login /> : <Home />}
            </Route>
          </Switch>
        </main>
        </div>
    </Router>
  );
}

export default App;
