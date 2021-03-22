// TODO: create check so only one project can be active
// Routing between login and home
// Setup local storage for current user

import './Home.css'

import NewProject from '../components/NewProject'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Project from '../components/Project'

export default function() {
   /*  const [currentUser, setCurrentUser] = useState(null); */
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


    let timeUpdater = (newTime) => {
        setTotalSeconds(newTime);
    }

    let currentUser = logData[0];

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
        /* setCurrentUser({...currentUser, projects: [...currentUser.projects, newProject]}); */
        setShowNewProject(false);
    }

    // START TIME
    let startTime = (projectName) => {
        let prevActive = currentUser.projects.filter(project => project.isActive);
        prevActive.isActive = false;
        let currentlyActive = currentUser.projects.filter(project => project.projectName == projectName);
        currentlyActive[0].status = "active";
        currentlyActive[0].isActive = true;
        setCurrentProject(currentlyActive);
    }

    // STOP TIME
    let stopTime = (projectName, time) => {
        let currentlyActive = currentUser.projects.filter(project => project.projectName == projectName);
        currentlyActive[0].status = "inactive";
        currentlyActive[0].isActive = false;
        setTotalSeconds(time);
        currentlyActive[0].totalTime = time;
        setCurrentProject(currentlyActive);
    }

    return (
            <div id="page">
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

            <h1>Time Tracker</h1>
            <main>
                <Dashboard username = {currentUser.username} content = {currentUser.projects.length > 0 ? <ProjectGroup />: "You have no projects yet."} />
            </main>
            
            {showNewProject ? <NewProject submitNewProject = {submitNewProjectHandler}/> : null}

            {loggedIn && (!showNewProject) ? <div><button id="btn-new" className="btn btn-main" onClick={addNewProject}>New Project</button>
            <span>Log out</span></div>
            :
            null}
            </div>
        )
}