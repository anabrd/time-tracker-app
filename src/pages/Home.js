// TODO: create check so only one project can be active
// Routing between login and home
// Setup local storage for current user

import './Home.css'
import Login from '../components/Login'
import NewProject from '../components/NewProject'
import {useState, useEffect} from 'react'
import Dashboard from '../components/Dashboard'
import Project from '../components/Project'

export default function() {
    const [currentUser, setCurrentUser] = useState(null);
    const [showNewProject, setShowNewProject] = useState(false);
    const [currentProject, setCurrentProject] = useState({});
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);


    const [logData, setLogData] = useState([
        {
            username: "Ana",
            projects: [
                {
                    projectName: "HTML",
                    description: "basic pracitce",
                    start: "3/9/2021, 12:50:47 AM",
                    startTime: null,
                    totalTime: 0,
                    status: "inactive",
                    isActive: false
                },
                {
                    projectName: "CSS",
                    description: "style website",
                    start: "2/9/2021, 08:50:47 PM",
                    startTime: null,
                    totalTime: 0,
                    status: "inactive",
                    isActive: false
                }
            ]
        }
    ]);


    // LOG IN
    let toTracker = (event) =>
    {
        event.preventDefault();
        let result = logData.filter(user => user.username == event.currentTarget.children[1].value);
        if (result.length !== 0) {
            setCurrentUser(result[0]);
        } else {
            let newUser = {};
            newUser.username = event.currentTarget.children[1].value;
            newUser.projects = [];
            setLogData([...logData, newUser]);
            setCurrentUser(newUser);
        }
        setLoggedIn(true);
    }

    // PROJECTS
    let ProjectGroup = () => {
        console.log(currentUser.projects)
        let projects = currentUser.projects.map(project => 
            <Project name = {project.projectName}  description = {project.description} start = {project.start} status = {project.status} play = {startTime} stop = {stopTime} totalTime = {project.totalTime} isActive = {project.isActive} />);
        console.log(projects);
        return (<div className="project-wrapper">
            { projects }
            </div>);
    }

    // ADD NEW PROJECT
    let addNewProject = () =>
    {
        setShowNewProject(true);
    }

    let submitNewProjectHandler = (event) => {
        event.preventDefault();
        let newProject = {};
        newProject.projectName = event.currentTarget.children[1].children[0].value;
        newProject.description = event.currentTarget.children[1].children[1].value;
        newProject.start = new Date().toLocaleString();
        newProject.status = "inactive";
        newProject.totalTime = 0;
        newProject.isActive = false;
        setCurrentUser({...currentUser, projects: [...currentUser.projects, newProject]});
        setShowNewProject(false);
    }

    // START TIME
    let startTime = (event) => {

        // Check if another project already active
        let prevActive = currentUser.projects.filter(project => project.isActive);
        prevActive.isActive = false;

        // Log clicked project as active
        let projectName = event.currentTarget.parentElement.parentElement.children[0].innerHTML;
        let currentlyActive = currentUser.projects.filter(project => project.projectName == projectName);
        currentlyActive[0].status = "active";
        currentlyActive[0].isActive = true;
        setCurrentProject(currentlyActive);
        console.log("current total time", totalSeconds)
    }

    // STOP TIME
    let stopTime = (event) => {
        let projectName = event.currentTarget.parentElement.parentElement.children[0].innerHTML;
        let currentlyActive = currentUser.projects.filter(project => project.projectName == projectName);
        currentlyActive[0].status = "inactive";
        currentlyActive[0].isActive = false;
        currentlyActive[0].totalTime = event.currentTarget.dataset.set;
        setCurrentProject(currentlyActive);
        console.log("current total time", currentlyActive[0].totalTime);
        console.log(logData)
    }


    return (
            <div id="page">
            <h1>Time Tracker</h1>
            <main>
            {loggedIn ? <Dashboard username = {currentUser.username} content = {currentUser.projects.length > 0 ? <ProjectGroup />: "You have no projects yet."} />
            :
                <Login preview = "Insert username" action = {toTracker} />
            }
            </main>
            
            {showNewProject ? <NewProject submitNewProject = {submitNewProjectHandler}/>
            :
            null}

            {loggedIn && (!showNewProject) ? <div><button id="btn-new" className="btn btn-main" onClick={addNewProject}>New Project</button>
            <span>Log out</span></div>
            :
            null}
            </div>
        )
}