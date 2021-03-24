// TODO: create check so only one project can be active
// Setup local storage for current user

import './Home.css'

import NewProject from '../components/NewProject'
import {useState, useEffect} from 'react'
import Dashboard from '../components/Dashboard'
import Project from '../components/Project'

export default function(props) {

    const [showNewProject, setShowNewProject] = useState(false);
    const [currentProject, setCurrentProject] = useState({});
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [projectsDB, setProjectsDB] = useState([]);

    useEffect(() => {
    let localProjects = JSON.parse(localStorage.getItem("localProjects"));
    if (localProjects !== null) {
        setProjectsDB(localProjects)
    }
    }, []);

    useEffect(() => {
        localStorage.setItem("localProjects", JSON.stringify(projectsDB));
    }, [projectsDB]);

    let timeUpdater = (newTime) => {
        setTotalSeconds(newTime);
    }


    // PROJECTS
    let ProjectGroup = () => {
        let projects = projectsDB.map(project => 
            <Project name = {project.projectName}  description = {project.description} start = {project.start} status = {project.status} play = {startTime} stop = {stopTime} totalTime = {project.totalTime} isActive = {project.isActive} />);
        return (<div className="project-wrapper">
            { projects }
            </div>);
    }

    let submitNewProjectHandler = (event) => {
        event.preventDefault();
        let newProject = {};
        newProject.projectName = event.currentTarget.children[1].children[0].value;
        newProject.description = event.currentTarget.children[1].children[1].value;
        newProject.start = new Date().toLocaleString();
        newProject.status = "inactive";
        newProject.startTime = null;
        newProject.totalTime = 0;
        newProject.isActive = false;
        props.setShowNewProject(false);
        setProjectsDB([...projectsDB, newProject]);
    }

    // START TIME
    let startTime = (projectName) => {
        let prevActive = projectsDB.filter(project => project.isActive);
        prevActive.isActive = false;
        let currentlyActive = projectsDB.filter(project => project.projectName == projectName);
        currentlyActive[0].status = "active";
        currentlyActive[0].isActive = true;
        setCurrentProject(currentlyActive);
    }

    // STOP TIME
    let stopTime = (projectName, time) => {
        let currentlyActive = projectsDB.filter(project => project.projectName == projectName);
        currentlyActive[0].status = "inactive";
        currentlyActive[0].isActive = false;
        setTotalSeconds(time);
        currentlyActive[0].totalTime = time;
        setCurrentProject(currentlyActive);
    }

    return (
        <div>
            <Dashboard username = {props.username} content = {projectsDB.length > 0 ? <ProjectGroup />: "You have no projects yet."} />
            {props.showNewProject ? <NewProject submitNewProject = {submitNewProjectHandler}/> : null}
        </div>
        )
}