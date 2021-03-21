import Home from './pages/Home'
import Reports from './pages/Reports'
import Register from './pages/Register'
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'
import Landing from './pages/Landing';



function App() {

  return (
    <Router>
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
        </ul>
      </nav>

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
            <Landing />
          </Route>
        </Switch>
        </main>
        </div>
    </Router>
  );
}

export default App;
