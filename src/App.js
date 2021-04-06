// TODO:

// PRIMARY
// refactor database:
//// - add user name
//// - separate entry for each log
//// - contain date information
// add fallback for report with no data
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
import Navbar from './components/Navbar'
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
  const [loader, setLoader] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [projectsDB, setProjectsDB] = useState([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("api-to-go"));
  const [isHome, setisHome] = useState(true);

  // Check if user is logged in based on token in localStorage
  useEffect(() => {
    if (localStorage.getItem("api-to-go") !== null) {
      setLoggedIn(true);
      console.log("log in happens")
    } else {
      setLoggedIn(false);
    }
  }, []);

  // Toggle loading while data is fetching
  useEffect(() => {
    setLoader(true);
    ApiToGo.get().then(output => 
      {setProjectsDB(output[0]);
      setLoader(false);
      }).catch(error => console.log(error));
    
  }, [token]);

  // Update server datapase on change in local db
  useEffect(() => {
    let updatedDB = [...projectsDB]
    ApiToGo.post(updatedDB).then(output => console.log(output));
  }, [projectsDB]);


  // Logut func
  let logout = () => {
      localStorage.removeItem("api-to-go");
      setLoggedIn(false);
      setRegistered(false);
  }

  return (
    <Router>
      <div className="App">
        <Navbar 
        loggedIn = {loggedIn}
        showNewProject = {showNewProject}
        logout = {logout}
        setShowNewProject = {setShowNewProject}
        isHome = {isHome}
        setisHome = {setisHome}
        />
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
                loader = {loader}
                projectsDB = {projectsDB}
                setProjectsDB = {setProjectsDB}
                showNewProject = {showNewProject} 
                setShowNewProject = {setShowNewProject} /> : 
                <Login
                setLoggedIn = {setLoggedIn} 
                setToken = {setToken}
                /> }
              </Route>

            </Switch>
          </main>
      </div>
    </Router>
  );
}

export default App;
