// TODO:

// PRIMARY
// scroll to new proj comp onclick
// refactor database:
//// - add user name
//// - separate entry for each log
//// - contain date information
// add fallback for report with no data
// update pie chart with dynamic data rendering
// add relevant colors to pie chart

// SECONDARY
// Add search, filter function by tags or dates
// Same filter for project reports
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
  Redirect
} from "react-router-dom";
import './App.css';
import ApiToGo from "api-to-go"

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loader, setLoader] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [projectsDB, setProjectsDB] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("api-to-go"));

  // Check if user is logged in based on token in localStorage
  useEffect(() => {
    if (localStorage.getItem("api-to-go") !== null) {
      setLoggedIn(true);
      console.log("log in happens");
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  // Toggle loading while data is fetching
  useEffect(() => {
    setLoader(true);
    ApiToGo.get().then(output => 
      {setProjectsDB(output[0]);
      console.log(output[0])
      setLoader(false);
      }).catch(error => console.log(error));
    
  }, [token]);

  // Update server datapase on change in local db
  useEffect(() => {
    if (loggedIn) {
    let updatedDB = [...projectsDB]
    ApiToGo.post(updatedDB).then(output => console.log(output)).catch(error => console.log(error));
    }
  }, [projectsDB, loggedIn]);


  // Logut func
  let logout = () => {
      localStorage.removeItem("api-to-go");
      setLoggedIn(false);
      setRegistered(false);
      setProjectsDB([]);
  }

  return (
    <Router>
      <div className="App">
        <Navbar 
        loggedIn = {loggedIn}
        logout = {logout}
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
                /> : 
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
