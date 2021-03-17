import Home from './pages/Home'
import Reports from './pages/Reports'
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'



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
    </div>

      <Switch>
          <Route path="/reports">
            <Reports />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
