// TODO:

// PRIMARY
// Fix edit lack of update on first change
// Add username to database
// set username in db
// update pie chart with dynamic data rendering
// add relevant colors to pie chart
// change navbar add proj button when not on dashboard

// SECONDARY
// Add search, filter function by tags or dates
// Same filter for project reports
// Add and edit project
// Design rehaul
// Mobile design

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
import './App.css';
import ApiToGo from "api-to-go"


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [projectsDB, setProjectsDB] = useState([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("api-to-go"));

  useEffect(() => {
    if (localStorage.getItem("api-to-go") !== null) {
      setLoggedIn(true);
      ApiToGo.get().then(output => setProjectsDB(output[0]));
    } else {
      setLoggedIn(false);
      setToken(localStorage.getItem("api-to-go"))
    }
  }, []);

  useEffect(() => {
    ApiToGo.post(projectsDB).then(output => console.log(output));
  }, [projectsDB]);

  let logout = () => {
      localStorage.removeItem("api-to-go");
      setLoggedIn(false);
      setRegistered(false);
    }

  return (
    <Router>
      <div className="App">
        <nav>
            <h1><Link to="/">Time Tracker ⏱</Link></h1>
            <ul>
                <li>
                  {loggedIn ?  <button className="btn btn-main" id = "nav-btn" onClick = {()=> showNewProject ? setShowNewProject(false) : setShowNewProject(true)}>New Project</button> : null}
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
                <Reports data = {projectsDB} />
              </Route>

              <Route path="/register">
                {registered ? <Redirect to="/" /> : <Register setRegistered = {setRegistered}/>}
              </Route>

              <Route path="/">
                {loggedIn ?
                <Home 
                projectsDB = {projectsDB}
                setProjectsDB = {setProjectsDB}
                showNewProject = {showNewProject} 
                setShowNewProject = {setShowNewProject} /> : 
                <Login 
                setLoggedIn = {setLoggedIn} 
                setToken = {setToken}/> }
              </Route>

            </Switch>
          </main>
      </div>
    </Router>
  );
}

export default App;
