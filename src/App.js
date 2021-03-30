// TODO:
// Add username to database
// set username in db
// update pie chart with dynamic data rendering
// add relevant colors to pie chart
// change navbar add proj button when not on dashboard

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
  const [username, setUsername] = useState("");
  const [projectsDB, setProjectsDB] = useState([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [pathname, setPathname] = useState(window.location.pathname);
  console.log(pathname);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      setToken(localStorage.getItem("token"))
    }
    console.log("ok on app.js")
  }, []);

  useEffect(async() => {
        let url = "https://auth404.herokuapp.com/api/my-data";
        let options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        }

        await fetch(url,options).then(res => res.json()).then(output => setProjectsDB(output.data.data)).catch(error => console.log(error));
        console.log(projectsDB);
    }, []);

    useEffect(() => {
        let url = "https://auth404.herokuapp.com/api/my-data";
        let updatedData = [...projectsDB]
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({data: updatedData})
            }

        fetch(url,options).then(res => res.json()).then(output => console.log("post", output));
    }, [projectsDB]);

let logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
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
                {registered ? <Redirect to="/" /> : <Register setRegistered = {setRegistered} username = {setUsername}/>}
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
