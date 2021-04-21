// TODO:

// PRIMARY
// parse and format time from seconds function
// clean up reports
// internationalize date format
// why stuff gets lost on current page render
// update data and page info on timecriteria change
// add fallback for report with no data
// update pie chart with dynamic data rendering
// add relevant colors to pie chart
// fix render data on refresh
// Same filter for project reports

// SECONDARY
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
import CSSBaseline from '@material-ui/core/CssBaseline'

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
      { 
        if (typeof(output) == "string") {
          console.log(output);
          setLoader(false)
        } else {
          setProjectsDB(output[0]);
          console.log(output[0])
          setLoader(false)
      }
      }).catch(error => {
        console.log(error)
        setLoader(false)
      }
        );
      ;
  }, [token]);

//  Update server datapase on change in local db
  useEffect(() => {
    if (loggedIn) {
    let updatedDB = [...projectsDB]
    ApiToGo.post(updatedDB).then(output => console.log(output)).catch(error => console.log(error));
    }
  }, [projectsDB]);


  // Logut func
  let logout = () => {
      setLoggedIn(false);
      localStorage.removeItem("api-to-go");
      setRegistered(false);
      setProjectsDB([]);
  }

  return (
    <Router>
      <CSSBaseline />
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
                loggedIn = {loggedIn}
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
