import Home from './pages/Home'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Register from './pages/Register'
import React from "react";
import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css'



function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [username, setUsername] = useState("Ana");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    console.log("ok on app.js")
  }, []);

let logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <Router>
      <div className="App">
        <nav>
            <h1>Time Tracker</h1>
            <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  {loggedIn ?  <Link to="/reports">Reports</Link> : null}
                </li>
                <li>
                  {loggedIn ?  <Link to="/" onClick = {logout}>Logout</Link> : null}
                </li>
            </ul>
        </nav>
        <main>
          <Switch>
              <Route path="/reports">
                <Reports />
              </Route>

              <Route path="/register">
                {registered ? <Redirect to="/" /> : <Register setRegistered = {setRegistered} username = {setUsername}/>}
              </Route>

              <Route path="/">
                {loggedIn ? <Home username = {username} /> :  <Login setLoggedIn = {setLoggedIn} /> }
              </Route>
            </Switch>
          </main>
      </div>
    </Router>
  );
}

export default App;
